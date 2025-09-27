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

export function setupEventListeners() {
  if (addTaskBtn) addTaskBtn.addEventListener('click', openModal);
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
      // Editing existing task
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
      // Creating new task
      const newTask = { title, description, status, priority };
      await saveTask(newTask);
    }

    // Always render from localStorage to ensure persistence
    const tasks = getCurrentTasks();
    renderAllTasks(tasks);
    updateColumnCounts(tasks);

    closeModal();
    loadTheme();
  });

  // Delete task
  if (deleteTaskBtn) {
    deleteTaskBtn.addEventListener('click', async () => {
      if (!taskForm.dataset.editing) return;

      const id = Number(taskForm.dataset.editing);
      await deleteTask(id);

      const tasks = getCurrentTasks();
      renderAllTasks(tasks);
      updateColumnCounts(tasks);

      closeModal();
      loadTheme();
    });
  }

  // Mobile sidebar
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


