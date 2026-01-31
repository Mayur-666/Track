import os from "node:os";
import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import handleError from "./ErrorHandler.js";
import { DB_NAME, DIR_NAME, INITIAL_DATA } from "./constants.js";

const dataDir = path.join(os.homedir(), DIR_NAME); // makes .track folder in home dir.
export const DB_PATH = path.join(dataDir, DB_NAME); // adds db.json to home dir path.
const dirPath = path.dirname(new_path); // complete dir name.

/**
 * Initializes the task database.
 * - Creates the data directory if it does not exist
 * - Creates the JSON database file with initial data
 * - Does nothing if the file already exists
 */
async function initializeDB() {
  try {
    // Create the directory structure recursively (safe if it already exists)
    await mkdir(dirPath, { recursive: true });

    // Create the database file only if it does not already exist
    // "wx" flag ensures the operation fails if the file is present
    await writeFile(DB_PATH, JSON.stringify(INITIAL_DATA, null, 2), {
      flag: "wx",
    });
  } catch (err) {
    // Ignore "file already exists" errors
    // Any other error indicates a real problem
    if (err.code !== "EEXIST") {
      handleError("Unable to initialize database.");
    }
  }
}

export default initializeDB;
