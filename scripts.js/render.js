/**
 * @file render.js
 * @description Handles rendering of tasks and updating UI elements like counts.
 */

import { taskTitleInput, taskDescInput, taskStatusSelect, taskForm, deleteTaskBtn, taskPrioritySelect } from './dom.js';
import { openModal } from './modal.js';

/**
 * Renders a single task card inside the appropriate column container.
 * @param {Object} task - The task object to render.
 */
export function renderTask(task) {
  const taskCard = document.createElement('div');
  taskCard.classList.add('task-div');
  taskCard.dataset.id = task.id;
  taskCard.textContent = task.title;
  taskCard.tabIndex = 0; // Make focusable for accessibility

  const container = document.querySelector(`.column-div[data-status="${task.status}"] .tasks-container`);
  if (container) container.appendChild(taskCard);

  // Click to edit
  const openEditModal = () => {
    taskTitleInput.value = task.title;
    taskDescInput.value = task.description;
    taskStatusSelect.value = task.status;
    taskPrioritySelect.value = task.priority || 'low';
    taskForm.dataset.editing = task.id;
    if (deleteTaskBtn) deleteTaskBtn.style.display = 'block';
    openModal();
  };

  taskCard.addEventListener('click', openEditModal);
  taskCard.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openEditModal();
    }
  });
}

/**
 * Clears all tasks containers and renders all tasks.
 * @param {Object[]} tasks - Array of task objects to render.
 */
export function renderAllTasks(tasks) {
  document.querySelectorAll('.tasks-container').forEach((container) => {
    container.innerHTML = '';
  });
  tasks.forEach(renderTask);
}

/**
 * Updates the header counts for each task status column.
 * @param {Object[]} tasks - Array of task objects.
 */
export function updateColumnCounts(tasks) {
  ['todo', 'doing', 'done'].forEach((status) => {
    const count = tasks.filter((t) => t.status === status).length;
    const header = document.querySelector(`.column-div[data-status="${status}"] h4`);
    if (header) header.textContent = `${status.toUpperCase()} (${count})`;
  });
}