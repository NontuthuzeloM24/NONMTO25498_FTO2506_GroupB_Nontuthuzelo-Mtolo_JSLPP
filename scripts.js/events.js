import {
  addTaskBtn,
  closeModalBtn,
  taskForm,
  taskTitleInput,
  taskDescInput,
  taskStatusSelect,
  themeSwitch,
  hideSidebarbtn,
  sidebar,
} from './dom.js';

import { openModal, closeModal } from './modal.js';
import { toggleTheme } from './theme.js';
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

    if (!title || !status) {
      alert('! Please fill out this field.');
      return;
    }

    const tasks = loadTasks();
    const newTask = {
      id: Date.now(),
      title,
      description,
      status,
    };

    tasks.push(newTask);
    saveTasks(tasks);
    renderAllTasks(tasks);
    closeModal();
  });
}