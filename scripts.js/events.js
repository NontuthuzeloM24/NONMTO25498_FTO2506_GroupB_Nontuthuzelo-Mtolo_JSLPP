import {
  addTaskBtn,
  closeModalBtn,
  taskForm,
  taskTitleInput,
  taskDescInput,
  taskStatusSelect,
  taskPrioritySelect,
  themeSwitch,
  hideSidebarBtn,
  sidebar,
  deleteTaskBtn,
} from './dom.js';

import { openModal, closeModal } from './modal.js';
import { loadTheme, toggleTheme } from './theme.js';
import { toggleSidebar } from './sidebar.js';
import { saveTask, updateTask, deleteTask, getCurrentTasks } from './storage.js';
import { renderAllTasks } from './render.js';

/**
 * Sets up all UI event listeners for the Kanban app.
 * Handles task form submission, modal open/close,
 * theme toggling, sidebar toggling, and task deletion.
 */
export function setupEventListeners() {
  // Open task modal
  if (addTaskBtn) addTaskBtn.addEventListener('click', openModal);

  // Close task modal
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  // Toggle theme
  if (themeSwitch) themeSwitch.addEventListener('change', toggleTheme);

  // Toggle sidebar visibility
  if (hideSidebarBtn) hideSidebarBtn.addEventListener('click', () => toggleSidebar(sidebar));

  /**
   * Handle task form submission for creating or editing tasks.
   * @param {Event} e - Submit event
   */
  taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = taskTitleInput.value.trim();
    const description = taskDescInput.value.trim();
    const status = taskStatusSelect.value;
    const priority = taskPrioritySelect.value;

    if (!title || !status) {
      alert('⚠️ Title and Status are required fields.');
      return;
    }

    // Edit existing task
    if (taskForm.dataset.editing) {
      const id = Number(taskForm.dataset.editing);
      const tasks = getCurrentTasks();
      const taskToUpdate = tasks.find((t) => Number(t.id) === id);
      if (taskToUpdate) {
        taskToUpdate.title = title;
        taskToUpdate.description = description;
        taskToUpdate.status = status;
        taskToUpdate.priority = priority;
        await updateTask(taskToUpdate);
      }
      delete taskForm.dataset.editing;
    } 
    // Create new task
    else {
      const newTask = { title, description, status, priority };
      await saveTask(newTask);
    }

    renderAllTasks(getCurrentTasks());
    closeModal();
    loadTheme();
  });

  // Delete task button handler
  if (deleteTaskBtn) {
    /**
     * Deletes the currently editing task.
     * @async
     */
    deleteTaskBtn.addEventListener('click', async () => {
      if (!taskForm.dataset.editing) return;

      const id = Number(taskForm.dataset.editing);
      await deleteTask(id);

      renderAllTasks(getCurrentTasks());
      closeModal();
      loadTheme();
    });
  }
}
