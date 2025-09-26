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
  deleteTaskBtn,
} from './dom.js';

import { openModal, closeModal } from './modal.js';
import { loadTheme, toggleTheme } from './theme.js';
import { toggleSidebar } from './sidebar.js';
import { loadTasks, saveTask, updateTask, deleteTask } from './storage.js';
import { renderAllTasks } from './render.js';

export function setupEventListeners() {
  if (addTaskBtn) addTaskBtn.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (themeSwitch) themeSwitch.addEventListener('change', toggleTheme);
  if (hideSidebarbtn) hideSidebarbtn.addEventListener('click', () => toggleSidebar(sidebar));

  taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = taskTitleInput.value.trim();
    const description = taskDescInput.value.trim();
    const status = taskStatusSelect.value;
    const priority = taskPrioritySelect.value;

    if (!title || !status) {
      alert('! Please fill out this field.');
      return;
    }

    
        let tasks = loadTasks();
        if (!Array.isArray(tasks)) tasks = []; // Ensure tasks is always an array

        // Check if editing
        if (taskForm.dataset.editing) {
            const id = Number(taskForm.dataset.editing);
            const taskToUpdate = tasks.find(t => t.id === id);
    if (taskToUpdate) {
      taskToUpdate.title = title;
      taskToUpdate.description = description;
      taskToUpdate.status = status;
      taskToUpdate.priority = priority;
      await updateTask(taskToUpdate);
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
            await saveTask(newTask);
        }

        tasks = await loadTasks()
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