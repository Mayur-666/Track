#!/usr/bin/env node
import initializeDB from "./utils/initializeDB.js";
import handleError from "./utils/ErrorHandler.js";
import {
  createTask,
  deleteTask,
  readTask,
  updateTask,
} from "./commands/index.js";

// Ensure the database and storage directory exist before running any command
await initializeDB();

// Extract CLI arguments, ignoring `node` and script path
const args = process.argv.slice(2);

// The first positional argument is treated as the command
const command = args[0];

// maps commands to action handlers
const commandMap = {
  add: () => createTask(args.slice(1).join(" ")),
  update: () => updateTask,
  list: () => readTask,
  delete: () => deleteTask,
};

try {
  const action = commandMap[command];

  // handle unexpected commands.
  if (!action) {
    handleError(`Command ${command} not found`);
    return;
  }

  action();
} catch (e) {
  // Catch any unexpected runtime errors and display them cleanly
  handleError(e);
}
