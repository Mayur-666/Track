import { COLORS } from "./constants.js";

/**
 * Centralized error handler for the CLI.
 * Formats error messages consistently and highlights them in red.
 *
 * @param {string} msg - Human-readable error message
 */
function handleError(msg) {
  // Print the error message with red coloring and reset styling afterward
  console.error(`Error: ${COLORS.red}${msg}${COLORS.reset}`);
}

export default handleError;
