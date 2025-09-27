/**
 * @file initialData.js
 * @description Provides initial seed tasks for first-time users or testing purposes.
 * Each task contains a unique id, title, description, status, priority, and board.
 */

/**
 * @typedef {Object} Task
 * @property {number} id - Unique identifier for the task
 * @property {string} title - Title of the task
 * @property {string} description - Description/details of the task
 * @property {'todo' | 'doing' | 'done'} status - Current status/category
 * @property {'low' | 'medium' | 'high'} priority - Priority level
 * @property {string} board - Associated board
 */

/** @type {Task[]} */
export const initialTasks = [
  {
    id: 1,
    title: "Launch Epic Career 🚀",
    description: "Create a killer Resume",
    status: "todo",
    priority: 'medium',
    board: "Launch Career",
  },
  {
    id: 2,
    title: "Master JavaScript 💛",
    description: "Get comfortable with the fundamentals",
    status: "doing",
    priority: 'high',
    board: "Launch Career",
  },
  {
    id: 3,
    title: "Keep on Going 🏆",
    description: "You're almost there",
    status: "doing",
    priority: 'medium',
    board: "Launch Career",
  },
  {
    id: 11,
    title: "Learn Data Structures and Algorithms 📚",
    description: "Study fundamental data structures and algorithms to solve coding problems efficiently",
    status: "todo",
    priority: 'low',
    board: "Launch Career",
  },
  {
    id: 12,
    title: "Contribute to Open Source Projects 🌐",
    description: "Gain practical experience and collaborate with others in the software development community",
    status: "done",
    priority: 'medium',
    board: "Launch Career",
  },
  {
    id: 13,
    title: "Build Portfolio Projects 🛠️",
    description: "Create a portfolio showcasing your skills and projects to potential employers",
    status: "done",
    priority: 'high',
    board: "Launch Career",
  },
];