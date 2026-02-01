import { readFile, writeFile } from "node:fs/promises";
import handleError from "./ErrorHandler.js";
import { DB_PATH } from "./initializeDB.js";

/**
 * Reads the database file and parses its JSON contents.
 *
 * @async
 * @function readDBFile
 * @returns {Promise<Object|undefined>} Parsed database object, or undefined if an error occurs.
 *
 * @throws Will not throw directly; errors are delegated to handleError.
 */
async function readDBFile() {
  try {
    const data = await readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    handleError("Failed to read db file.");
  }
}

/**
 * Writes data to the database file as JSON.
 *
 * @async
 * @function writeDBFile
 * @param {Object} dbData - The database object to be serialized and written.
 *
 * @returns {Promise<void>}
 * @throws Will not throw directly; errors are delegated to handleError.
 */
async function writeDBFile(dbData) {
  try {
    await writeFile(DB_PATH, JSON.stringify(dbData));
  } catch {
    handleError("Failed to write to db file.");
  }
}

export { readDBFile, writeDBFile };
