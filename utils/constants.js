/* -------------------------------------------------------------------------- */
/*                different colors codes supported in terminals               */
/* -------------------------------------------------------------------------- */
export const COLORS = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",

  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
};

/* -------------------------------------------------------------------------- */
/*                   list of commands along with description                  */
/* -------------------------------------------------------------------------- */
export const COMMANDS = [
  {
    cmd: "add <task_desc>",
    desc: "Add a new task",
  },
  {
    cmd: "list",
    desc: "List all tasks",
  },
  {
    cmd: "list todo",
    desc: "List all task with status todo",
  },
  {
    cmd: "list in-progress",
    desc: "List all task with status in-progress",
  },
  {
    cmd: "list done",
    desc: "List all tasks with status done",
  },
  {
    cmd: "mark-todo <task_id>",
    desc: "Update task status as todo",
  },
  {
    cmd: "mark-in-progress <task_id>",
    desc: "Update task status as in-progress",
  },
  {
    cmd: "mark-done <task_id>",
    desc: "Update task status as done",
  },
  {
    cmd: "update <id> <desc>",
    desc: "Update task description",
  },
  {
    cmd: "delete <id>",
    desc: "Delete a task",
  },
  {
    cmd: "help",
    desc: "Show this help screen",
  },
];

/* -------------------------------------------------------------------------- */
/*                 represents how data is stored in json file                 */
/* -------------------------------------------------------------------------- */
export const INITIAL_DATA = {
  free_ids: [],
  next_id: 1,
  tasks: {},
};

export const DIR_NAME = ".track";
export const DB_NAME = "./db.json";
