/**
 * Returns the current date and time formatted as:
 * "Mon DD, YYYY | HH:MM AM/PM"
 *
 * Example output:
 * "Feb 01, 2026 | 3:45 PM"
 *
 * @returns {string} A formatted date-time string in US locale.
 */
function getCurrentTime() {
  const date = new Date();

  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${month} ${day}, ${year} | ${time}`;
}

export default getCurrentTime;
