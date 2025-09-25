import { sidebar } from './dom.js';

export function toggleSidebar() {
    sidebar.style.display = 'none'
    
    const showBtn = document.createElement('button');
    showBtn.textContent = '🚫 Show Sidebar';
    showBtn.className = 'show-sidebar-btn';
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