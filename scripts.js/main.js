import { setupEventListeners } from './events.js';
import { loadTasks, saveTasks } from './storage.js';
import { renderAllTasks } from './render.js';
import { loadTheme } from './theme.js';
import { themeSwitch } from './dom.js';

const tasks = loadTasks();
saveTasks(tasks); // Ensure tasks are saved initially
renderAllTasks(tasks);
loadTheme(themeSwitch);

setupEventListeners(); // Attach all interactions