import handleError from "../utils/ErrorHandler";
import Task from "../utils/Task";

async function createTask(description) {
  try {
    if (!description || description.trim().length === 0) {
      handleError(`Please provide valid description for the task`);
      return;
    }
    const task = await Task.create(description);
    printTable("Task Added Successfully", [task]);
  } catch {
    handleError(`Failed to create task.`);
  }
}
export default createTask;
