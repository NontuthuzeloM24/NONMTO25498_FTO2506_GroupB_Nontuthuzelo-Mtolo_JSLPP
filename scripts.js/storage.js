import { initialTasks } from './initialData.js'

// -------------------------
// Storage Helpers
// -------------------------
export function loadTasks() {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [...initialTasks];
}

export function saveTasks(tasks) {
    localStorage.setItem('task', JSON.stringify(tasks));
}