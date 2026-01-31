import { COLORS as C, columns } from "../utils/constants.js";
import handleError from "./ErrorHandler.js";

/**
 * Apply ANSI color to task status.
 *
 * @param {string} status - Task status value
 * @returns {string} Colorized status string
 */
function colorStatus(status) {
  if (status === "done") return `${C.green}${status}${C.reset}`;
  if (status === "in-progress") return `${C.yellow}${status}${C.reset}`;
  return `${C.red}${status}${C.reset}`;
}

/**
 * Prints a formatted ASCII table with optional colored values.
 *
 * @param {string} title - Title displayed at the top of the table
 * @param {Array<Object>} rows - Array of row objects matching column keys
 *
 * Expected row shape:
 * {
 *   [column.key]: string | number
 * }
 */
function printTable(title, rows) {
  try {
    const padding = 2;

    /**
     * Calculate column widths based on:
     * - column label length
     * - longest cell value in that column
     */
    const widths = columns.map(
      (col) =>
        Math.max(
          col.label.length,
          ...rows.map((r) => String(r[col.key]).length),
        ) + padding,
    );

    //  Total width of table content (excluding outer borders)

    contentWidth = widths.reduce((a, b) => a + b, 0) + (columns.length - 1) * 3;

    const horizontal = "─".repeat(contentWidth + 2);

    // Remove ANSI escape codes so spacing calculations stay correct
    const stripAnsi = (str) => str.replace(/\x1b\[[0-9;]*m/g, "");

    /**
     * Pads text to a fixed width, accounting for ANSI color codes
     *
     * @param {string} text
     * @param {number} width
     * @returns {string}
     */
    const pad = (text, width) => {
      const rawLength = stripAnsi(String(text)).length;
      return String(text) + " ".repeat(width - rawLength);
    };

    // Top border + title
    console.log(`┌${horizontal}┐`);
    console.log(`│ ${C.cyan}${title.padEnd(contentWidth)}${C.reset} │`);

    // If no rows, close table early
    console.log(rows.length > 0 ? `├${horizontal}┤` : `└${horizontal}┘`);

    if (rows.length > 0) {
      // Header row
      console.log(
        `│ ` +
          columns.map((c, i) => pad(c.label, widths[i])).join(" │ ") +
          ` │`,
      );

      console.log(`├${horizontal}┤`);

      // Data rows
      rows.forEach((row) => {
        console.log(
          `│ ` +
            columns
              .map((c, i) => {
                let value = row[c.key];

                // Colorize status column only
                if (c.key === "status") {
                  value = colorStatus(value);
                }

                return pad(value, widths[i]);
              })
              .join(" │ ") +
            ` │`,
        );
      });

      // Bottom border
      console.log(`└${horizontal}┘`);
    }
  } catch {
    // Centralized error handling keeps CLI output clean
    handleError("Failed to print table.");
  }
}

export default printTable;
