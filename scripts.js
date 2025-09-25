import { initialTasks } from './initialData.js'

// DOM Elements
const addTaskBtn = document.getElementById('add-new-task-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const taskModal = document.getElementById('task-modal');
const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const taskDescInput = document.getElementById('task-desc');
const taskStatusSelect = document.getElementById('task-status');
const deleteTaskBtn = document.getElementById('delete-task-btn');

// Sidebar footer elements (theme and hide sidebar)
const themeSwitch = document.getElementById('theme-switch');
const hideSidebarbtn = document.getElementById('hide-sidebar-btn');
const sidebar = document.getElementById('side-bar-div');

// -------------------------
// Storage Helpers
// -------------------------
function loadTasks() {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [...initialTasks];
}

function saveTasks() {
    localStorage.setItem('task', JSON.stringify(tasks));
}

// -------------------------
// Rendering Helpers
// -------------------------
function renderTask(task) {
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

function renderAllTasks(tasks) {
    document.querySelectorAll('.tasks-container').forEach((container) => {
        container.innerHTML = '';
    });

    tasks.forEach(renderTask);
    updateColumnCounts(tasks);
}

function updateColumnCounts(tasks) {
    ['todo', 'doing', 'done'].forEach((status) => {
        const count = task.filter((t) => t.status === status).length;
        const header = document.querySelector(`.column-div[data-status="${status}"] h4`);
        if (header) header.textContent = `${status.toUpperCase()} (${count})`;
    });
}

// -------------------------
// Modal + Form Handling
// -------------------------
function openModal() {
    taskModal.showModal();
}

function closeModal() {
    taskForm.reset();
    taskModal.close();
    delete taskForm.dataset.editing;
    deleteTaskBtn.style.display = 'none'
}

function handleFormSubmit(e) {
    e.preventDefault();
    const title = taskTitleInput.value.trim();
    const description = taskDescInput.value.trim();
    const status = taskStatusSelect.value;

    if (!title || !status) {
        alert('! Please fill out this field.');
        return;
    }

    let tasks = loadTasks();
    const editingId = taskForm.dataset.editing;

    if (editingId) {
        const index = tasks.findIndex((t) => t.id === parseInt(editingId));
        if (index !== -1) {
            tasks[index] = { ...tasks[index], title, description, status };
        }
    } else {
        const newTask = {
            id: Date.now()
            title,
            description,
            status,
        };
        tasks.push(newTask);
    }

    saveTasks(tasks);
    renderAllTasks(tasks);
    closeModal();
}

function handleTaskDelete() {
    const editingId = taskForm.dataset.editing
    if (!editingId) return;

    let tasks = loadTasks();
    tasks = tasks.filter((t) => t.id !== parseInt(editingId));

    saveTasks(tasks);
    renderAllTasks(tasks);
    closeModal();
}

// -------------------------
// Theme Toggle
// -------------------------
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const mode = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', mode);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeSwitch) themeSwitch.checked = true;
    }
}

// -------------------------
// Sidebar Toggle Handling
// -------------------------
function toggleSidebar() {
    sidebar.style.display = 'none'
    const showBtn = document.createElement('button');
    showBtn.textContent = '🚫 Show Sidebar';
    showBtn.clasName = 'show-sidebar-btn';
    showBtn.style.position = 'fixed';
    showBtn.style.left = '10px';
    showBtn.style.bottom = '10px';
    showBtn.style.zIndex = '1000';
    showBtn.style.backgroundColor = '#635fc7';
    showBtn.style.color = 'white';
    showBtn.style.border = 'none';
    showBtn.style.padding = '8px 12px';
    showBtn.style.borderRadius = '4px';
    showBtn.style.cursor = 'pointer';

    document.body.appendChild(showBtn);
    showBtn.addEventListener('click', () => {
        sidebar.style.display = 'flex';
        showBtn.remove();
    });
}

