import { taskTitleInput, taskDescInput, taskStatusSelect, taskForm, deleteTaskBtn } from './dom.js';
import { openModal } from './modal.js';

export function renderTask(task) {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-div');
    taskCard.dataset.id = task.id
    taskCard.textContent = task.title

const container = document.querySelector(`.column-div[data-status="${task.status}"] .tasks-container`);
if (container) container.appendChild(taskCard);

// Click to edit
taskCard.addEventListener('click', () => {
    taskTitleInput.value = task.title;
    taskDescInput.value = task.description;
    taskStatusSelect.value = task.status;
    taskForm.dataset.editing = task.id;
    deleteTaskBtn.style.display = 'block';
    openModal();
});
}

export function renderAllTasks(tasks) {
    document.querySelectorAll('.tasks-container').forEach((container) => {
        container.innerHTML = '';
    });

    tasks.forEach(renderTask);
    updateColumnCounts(tasks);
}

export function updateColumnCounts(tasks) {
    ['todo', 'doing', 'done'].forEach((status) => {
        const count = tasks.filter((t) => t.status === status).length;
        const header = document.querySelector(`.column-div[data-status="${status}"] h4`);
        if (header) header.textContent = `${status.toUpperCase()} (${count})`;
    });
}