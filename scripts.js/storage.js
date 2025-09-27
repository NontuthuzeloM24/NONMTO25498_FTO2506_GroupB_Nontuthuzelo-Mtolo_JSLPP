import { initialTasks } from './initialData.js';

const API_URL = 'https://jsl-kanban-api.vercel.app';

let localTasks = [];

/**
 * Save tasks array to localStorage and update localTasks variable.
 * @param {Array<Object>} tasks - Array of task objects to save
 */
function saveToLocal(tasks) {
  localTasks = tasks;
  localStorage.setItem('tasks', JSON.stringify(localTasks));
}

/**
 * Load tasks from localStorage.
 * If localStorage is empty or invalid, load initial tasks.
 * @returns {Array<Object>} - Array of task objects
 */
function loadFromLocal() {
  const stored = localStorage.getItem('tasks');
  if (stored) {
    try {
      localTasks = JSON.parse(stored);
      return localTasks;
    } catch {
      localTasks = [...initialTasks];
      saveToLocal(localTasks);
      return localTasks;
    }
  } else {
    localTasks = [...initialTasks];
    saveToLocal(localTasks);
    return localTasks;
  }
}

/**
 * Fetch tasks from API, fallback to localStorage if API fails.
 * @async
 * @returns {Promise<Array<Object>>} - Array of task objects
 */
async function loadTasks() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    const data = await response.json();
    if (Array.isArray(data)) {
      saveToLocal(data);
      return data;
    }
    throw new Error('API did not return array');
  } catch (error) {
    return loadFromLocal();
  }
}

/**
 * Save a new task to API and localStorage.
 * @async
 * @param {Object} task - Task object to save
 * @param {string} task.title - Task title
 * @param {string} [task.board] - Optional board name
 * @returns {Promise<Object>} - Saved task object
 */
async function saveTask(task) {
  const taskToSave = {
    ...task,
    id: Date.now(),
    board: task.board || "Launch Career"
  };

  let savedTask = null;
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskToSave),
    });
    if (!response.ok) throw new Error('Failed to save task');
    savedTask = await response.json();
  } catch (error) {
    savedTask = taskToSave;
  }

  const tasks = loadFromLocal();
  tasks.push(savedTask);
  saveToLocal(tasks);

  return savedTask;
}

/**
 * Update an existing task in API and localStorage.
 * @async
 * @param {Object} task - Task object to update
 * @param {number|string} task.id - Task ID
 * @returns {Promise<Object>} - Updated task object
 */
async function updateTask(task) {
  let updatedTask = null;
  try {
    const response = await fetch(`${API_URL}/${Number(task.id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Failed to update task');
    updatedTask = await response.json();
  } catch (error) {
    updatedTask = task;
  }

  let tasks = loadFromLocal();
  const idx = tasks.findIndex(t => Number(t.id) === Number(task.id));
  if (idx !== -1) {
    tasks[idx] = updatedTask;
    saveToLocal(tasks);
  }
  return updatedTask;
}

/**
 * Delete a task from API and localStorage.
 * @async
 * @param {number|string} id - ID of the task to delete
 * @returns {Promise<boolean>} - True when deletion is done
 */
async function deleteTask(id) {
  try {
    const response = await fetch(`${API_URL}/${Number(id)}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete task');
  } catch (error) {
    // Ignore, fallback to local
  }

  let tasks = loadFromLocal();
  const newTasks = tasks.filter(t => Number(t.id) !== Number(id));
  saveToLocal(newTasks);
  return true;
}

/**
 * Get the latest tasks from localStorage.
 * @returns {Array<Object>} - Array of task objects
 */
function getCurrentTasks() {
  return loadFromLocal();
}

export { loadTasks, saveTask, updateTask, deleteTask, getCurrentTasks };
