/**
 * @file dom.js
 * @description Exports references to key DOM elements used throughout the application.
 * Ensures all selectors are centralized for maintainability.
 */

/** @type {HTMLButtonElement | null} */
export const addTaskBtn = document.getElementById('add-new-task-btn');

/** @type {HTMLButtonElement | null} */
export const closeModalBtn = document.getElementById('close-modal-btn');

/** @type {HTMLDialogElement | null} */
export const taskModal = document.getElementById('task-modal');

/** @type {HTMLFormElement | null} */
export const taskForm = document.getElementById('task-form');

/** @type {HTMLInputElement | null} */
export const taskTitleInput = document.getElementById('task-title');

/** @type {HTMLTextAreaElement | null} */
export const taskDescInput = document.getElementById('task-desc');

/** @type {HTMLSelectElement | null} */
export const taskStatusSelect = document.getElementById('task-status');

/** @type {HTMLButtonElement | null} */
export const deleteTaskBtn = document.getElementById('delete-task-btn');

/** @type {HTMLSelectElement | null} */
export const taskPrioritySelect = document.getElementById('task-priority');

/** @type {HTMLSelectElement | null} */
export const newTaskPrioritySelect = document.getElementById('select-priority');

/** @type {HTMLInputElement | null} */
export const themeSwitch = document.getElementById('theme-switch');

/** @type {HTMLButtonElement | null} */
export const hideSidebarBtn = document.getElementById('hide-sidebar-btn');

/** @type {HTMLElement | null} */
export const sidebar = document.getElementById('side-bar-div');