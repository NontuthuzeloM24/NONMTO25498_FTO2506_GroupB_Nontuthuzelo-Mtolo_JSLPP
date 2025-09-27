import { setupEventListeners } from './events.js';
import { loadTasks, getCurrentTasks } from './storage.js';
import { renderAllTasks, updateColumnCounts } from './render.js';
import { loadTheme } from './theme.js';

/**
 * Initializes the Kanban app once the DOM is fully loaded.
 * Loads tasks from API/localStorage, renders them sorted by priority,
 * updates column counts, applies the theme, and sets up event listeners.
 * @async
 */
document.addEventListener('DOMContentLoaded', async () => {
  console.log('🚀 Kanban App Initializing...');

  try {
    // Load tasks from API or fallback to localStorage
    await loadTasks();

    // Get the current tasks from localStorage (single source of truth)
    const tasks = getCurrentTasks();

    // Render all tasks (already sorted by priority in renderAllTasks)
    renderAllTasks(tasks);

    // Update column header counts
    updateColumnCounts(tasks);
  } catch (error) {
    console.error('❌ Failed to load and render tasks:', error);
  }

  // Apply user-selected theme
  loadTheme();

  // Setup UI event listeners
  setupEventListeners();
});


