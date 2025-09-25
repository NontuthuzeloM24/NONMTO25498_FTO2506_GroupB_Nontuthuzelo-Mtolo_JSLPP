import { taskForm, taskModal } from './dom.js';

export function openModal() {
  taskModal.showModal();
}

export function closeModal() {
  taskForm.reset();
  taskModal.close();
}