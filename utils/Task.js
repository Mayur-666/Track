import getCurrentTime from "./getCurrentTime";
import { readDBFile, writeDBFile } from "./handleFile";

/**
 * Task
 * ----
 * DB-aware model class responsible for creating, reading,
 * updating, and deleting tasks.
 *
 * NOTE:
 * - This class does NOT perform input validation.
 * - Validation and user-facing errors should be handled
 *   by command / route functions.
 */
class Task {
  /**
   * Create a new task and persist it to the database.
   *
   * @param {string} description - Task description (assumed valid)
   * @returns {Promise<Object>} The newly created task
   * @throws {Error} If DB read/write fails
   */
  static async create(description) {
    try {
      const db = await readDBFile();

      const id = db.free_ids.length > 0 ? db.free_ids.pop() : db.new_id++;

      const now = getCurrentTime();

      const task = {
        id,
        description,
        status: "todo",
        createdAt: now,
        updatedAt: now,
      };

      db.tasks[id] = task;
      await writeDBFile(db);

      return task;
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * Read all tasks or filter tasks by status.
   *
   * @param {Object} params
   * @param {string|null} params.status - Optional status filter
   * @returns {Promise<Array<Object>>} List of tasks
   * @throws {Error} If DB read fails
   */
  static async read({ status = null }) {
    try {
      const db = await readDBFile();
      const tasks = Object.values(db.tasks);

      if (tasks.length === 0) return [];

      if (!status) return tasks;

      return tasks.filter((task) => task.status === status);
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * Update a task's description and/or status.
   *
   * @param {Object} params
   * @param {number} params.id - Task ID
   * @param {string|null} params.description - New description
   * @param {string|null} params.status - New status
   * @returns {Promise<Array<Object>>} Updated task wrapped in an array
   * @throws {Error} If task does not exist or DB write fails
   */
  static async update({ id, description = null, status = null }) {
    try {
      const db = await readDBFile();
      const task = db.tasks[id];

      if (!task) {
        throw new Error(`Task with ID ${id} does not exist.`);
      }

      if (description) task.description = description;
      if (status) task.status = status;

      task.updatedAt = getCurrentTime();
      db.tasks[id] = task;

      await writeDBFile(db);
      return [task];
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * Delete a task by ID.
   *
   * @param {Object} params
   * @param {number} params.id - Task ID
   * @returns {Promise<Array<Object>>} Deleted task wrapped in an array
   * @throws {Error} If task does not exist or DB write fails
   */
  static async delete({ id }) {
    try {
      const db = await readDBFile();
      const task = db.tasks[id];

      if (!task) {
        throw new Error(`Task with ID ${id} does not exist.`);
      }

      delete db.tasks[id];
      db.free_ids.push(id);

      await writeDBFile(db);
      return [task];
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default Task;
