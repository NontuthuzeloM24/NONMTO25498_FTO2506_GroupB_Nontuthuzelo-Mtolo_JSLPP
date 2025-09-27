/**
 * @file render.js
 * @description Handles rendering of tasks and updating UI elements including visual priority badges.
 */

import {
  taskTitleInput,
  taskDescInput,
  taskStatusSelect,
  taskForm,
  deleteTaskBtn,
  taskPrioritySelect,
} from './dom.js';
import { openModal } from './modal.js';

/**
 * Creates a visual badge element for task priority.
 * Instead of words, we use colored circle emojis.
 * @param {string} priority - The priority level ('low', 'medium', 'high').
 * @returns {HTMLElement} The styled badge span element.
 */
function createPriorityBadge(priority) {
  const badge = document.createElement('span');
  badge.classList.add('priority-badge');

  // Normalize priority
  const pr = (priority || 'low').toLowerCase();
  badge.classList.add(pr);

  // Use emoji instead of text
  switch (pr) {
    case 'high':
      badge.textContent = '🔴'; // red circle
      break;
    case 'medium':
      badge.textContent = '🟠'; // orange circle
      break;
    default:
      badge.textContent = '🟢'; // green circle (low)
      break;
  }

  return badge;
}

/**
 * Renders a single task card inside the appropriate column container.
 * @param {Object} task - The task object to render.
 */
export function renderTask(task) {
  console.log('Rendering task:', task.title, 'priority:', task.priority);

  const taskCard = document.createElement('div');
  taskCard.classList.add('task-div');
  taskCard.dataset.id = task.id;
  taskCard.tabIndex = 0; // keyboard focusable

  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('task-content-wrapper');

  // Add priority badge
  const badge = createPriorityBadge(task.priority);
  contentWrapper.appendChild(badge);

  // Add title
  const titleSpan = document.createElement('span');
  titleSpan.classList.add('task-title-span');
  titleSpan.textContent = task.title;
  contentWrapper.appendChild(titleSpan);

  taskCard.appendChild(contentWrapper);

  // Append card to correct column
  const container = document.querySelector(
    `.column-div[data-status="${task.status}"] .tasks-container`
  );
  if (container) container.appendChild(taskCard);

  // Click/edit logic
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
 * Clears all task containers and re-renders all tasks.
 * @param {Object[]} tasks - Array of task objects to render.
 */
export function renderAllTasks(tasks) {
  document.querySelectorAll('.tasks-container').forEach((container) => {
    container.innerHTML = '';
  });

  tasks.forEach(renderTask);
}

/**
 * Updates the column header counts
 * @param {Object[]} tasks - Array of task objects.
 */
export function updateColumnCounts(tasks) {
  ['todo', 'doing', 'done'].forEach((status) => {
    const count = tasks.filter((t) => t.status === status).length;
    const header = document.querySelector(`.column-div[data-status="${status}"] h4`);
    if (header) header.textContent = `${status.toUpperCase()} (${count})`;
  });
}

