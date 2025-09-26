import { setupEventListeners } from './events.js';
import { loadTasks } from './storage.js';
import { renderAllTasks } from './render.js';
import { loadTheme } from './theme.js';
import { themeSwitch } from './dom.js';

document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Kanban App Initializing...');

    const tasks = await loadTasks(); // Await this promise
    renderAllTasks(tasks);
    loadTheme();
    setupEventListeners();
});