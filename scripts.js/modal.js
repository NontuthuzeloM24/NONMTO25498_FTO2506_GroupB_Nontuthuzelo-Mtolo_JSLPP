/**
 * @file modal.js
 * @description Handles opening and closing of the task modal dialog.
 */

import { taskForm, taskModal } from './dom.js';

/**
 * Opens the task modal dialog.
 * Assumes `taskModal` is a valid <dialog> element.
 */
export function openModal() {
  if (taskModal) {
    taskModal.showModal();
  } else {
    console.warn('⚠️ taskModal element not found.');
  }
}

/**
 * Closes the task modal and resets the form.
 * Assumes `taskForm` and `taskModal` are both valid DOM elements.
 */
export function closeModal() {
  if (taskForm) taskForm.reset();
  if (taskModal) {
    taskModal.close();
  } else {
    console.warn('⚠️ taskModal element not found.');
  }
}