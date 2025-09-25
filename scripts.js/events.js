import {
  addTaskBtn,
  closeModalBtn,
  taskForm,
  taskTitleInput,
  taskDescInput,
  taskStatusSelect,
  taskPrioritySelect,
  newTaskPrioritySelect,
  themeSwitch,
  hideSidebarbtn,
  sidebar,
} from './dom.js';

import { openModal, closeModal } from './modal.js';
import { loadTheme, toggleTheme } from './theme.js';
import { toggleSidebar } from './sidebar.js';
import { loadTasks, saveTasks } from './storage.js';
import { renderAllTasks } from './render.js';

export function setupEventListeners() {
  if (addTaskBtn) addTaskBtn.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (themeSwitch) themeSwitch.addEventListener('change', toggleTheme);
  if (hideSidebarbtn) hideSidebarbtn.addEventListener('click', () => toggleSidebar(sidebar));

  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = taskTitleInput.value.trim();
    const description = taskDescInput.value.trim();
    const status = taskStatusSelect.value;
    const priority = taskPrioritySelect.value;

    if (!title || !status) {
      alert('! Please fill out this field.');
      return;
    }

    
        const tasks = loadTasks();

        // Check if editing
        if (taskForm.dataset.editing) {
            const id = Number(taskForm.dataset.editing);
            const index = tasks.findIndex(t => t.id === id);
            if (index !== -1) {
                tasks[index].title = title;
                tasks[index].description = description;
                tasks[index].status = status;
                tasks[index].priority = priority;
            }
            delete taskForm.dataset.editing;
        } else {
            const newTask = {
                id: Date.now(),
                title,
                description,
                status,
                priority,
            };
            tasks.push(newTask);
        }

        saveTasks(tasks);
        renderAllTasks(tasks);
        closeModal();
        loadTheme();
    });

    // Add delete event listener outside the submit handler
    if (typeof deleteTaskBtn !== 'undefined' && deleteTaskBtn) {
        deleteTaskBtn.addEventListener('click', () => {
            if (!taskForm.dataset.editing) return;

            const id = Number(taskForm.dataset.editing);
            let tasks = loadTasks();
            tasks = tasks.filter((t) => t.id !== id);

            saveTasks(tasks);
            renderAllTasks(tasks);
            closeModal();
            loadTheme();
        });
    }
}