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
import { renderAllTasks, updateColumnCounts } from './render.js';

/**
 * Helper to toggle modal buttons based on context (add/edit).
 * @param {boolean} isEditing - True if editing an existing task
 */
function setModalButtons(isEditing) {
  const saveBtn = document.getElementById('save-task-btn');
  const deleteBtn = document.getElementById('delete-task-btn');

  if (isEditing) {
    if (saveBtn) saveBtn.style.display = 'inline-block';
    if (deleteBtn) deleteBtn.style.display = 'inline-block';
  } else {
    if (saveBtn) saveBtn.style.display = 'none';
    if (deleteBtn) deleteBtn.style.display = 'none';
  }
}

/**
 * Sets up all UI event listeners for the Kanban app.
 */
export function setupEventListeners() {
  // Open modal for creating new task
  if (addTaskBtn) {
    addTaskBtn.addEventListener('click', () => {
      taskForm.reset();
      delete taskForm.dataset.editing; // clear editing state
      setModalButtons(false);          // hide save/delete buttons
      openModal();
    });
  }

  // Close modal
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (themeSwitch) themeSwitch.addEventListener('change', toggleTheme);
  if (hideSidebarBtn) hideSidebarBtn.addEventListener('click', () => toggleSidebar(sidebar));

  // Task form submission (create or edit)
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

    if (taskForm.dataset.editing) {
      // Edit existing task
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
    } else {
      // Create new task
      const newTask = { title, description, status, priority };
      await saveTask(newTask);
    }

    const tasks = getCurrentTasks();
    renderAllTasks(tasks);
    updateColumnCounts(tasks);
    closeModal();
    loadTheme();
  });

  // Delete task button with confirmation
  if (deleteTaskBtn) {
    deleteTaskBtn.addEventListener('click', async () => {
      if (!taskForm.dataset.editing) return;

      const confirmed = window.confirm(
        '⚠️ Are you sure you want to delete this task? This action cannot be undone.'
      );
      if (!confirmed) return;

      const id = Number(taskForm.dataset.editing);
      await deleteTask(id);

      const tasks = getCurrentTasks();
      renderAllTasks(tasks);
      updateColumnCounts(tasks);
      closeModal();
      loadTheme();
    });
  }

  // ================================
  // Mobile Sidebar Toggle Handlers
  // ================================
  const hamburgerBtn = document.getElementById('menu-toggle');
  const mobileSidebar = document.getElementById('side-bar-div');
  const overlay = document.getElementById('sidebar-overlay');
  const closeSidebarBtn = document.getElementById('close-sidebar');

  if (hamburgerBtn && mobileSidebar && overlay && closeSidebarBtn) {
    hamburgerBtn.addEventListener('click', () => {
      mobileSidebar.classList.add('show-sidebar');
      overlay.classList.add('active');
    });

    closeSidebarBtn.addEventListener('click', () => {
      mobileSidebar.classList.remove('show-sidebar');
      overlay.classList.remove('active');
    });

    overlay.addEventListener('click', () => {
      mobileSidebar.classList.remove('show-sidebar');
      overlay.classList.remove('active');
    });
  }
}



