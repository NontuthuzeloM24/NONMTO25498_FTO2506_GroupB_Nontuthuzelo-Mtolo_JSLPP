import { initialTasks } from './initialData.js'

const API_URL = 'https://jsl-kanban-api.vercel.app/tasks';

// Load tasks from API
export async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch tasks');
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Error loading tasks:', error);
        return [];
    }
}

// Save tasks to API (example: POST new task)
export async function saveTask(task) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
        });
        if (!response.ok) throw new Error('Failed to save task');
        return await response.json();
    } catch (error) {
        console.error('Error saving task:', error);
        return null;
    }
}

// Update a task (PUT)
export async function updateTask(task) {
    try {
        const response = await fetch(`${API_URL}/${task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
        });
        if (!response.ok) throw new Error('Failed to update task');
        return await response.json();
    } catch (error) {
        console.error('Error updating task:', error);
        return null;
    }
}

// Delete a task (DELETE)
export async function deleteTask(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete task');
        return true;
    } catch (error) {
        console.error('Error deleting task:', error);
        return false;
    }
}