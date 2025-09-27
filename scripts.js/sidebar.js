/**
 * @file sidebar.js
 * @description Handles toggling the sidebar visibility and managing the show button.
 */

import { sidebar } from './dom.js';

/**
 * Toggles the sidebar visibility.
 * When sidebar is hidden, creates a floating "Show Sidebar" button.
 * Clicking the button shows the sidebar again and removes the button.
 */
export function toggleSidebar() {
  if (!sidebar) {
    console.warn('⚠️ Sidebar element not found.');
    return;
  }

  const isVisible = sidebar.style.display !== 'none';

  if (isVisible) {
    // Hide sidebar
    sidebar.style.display = 'none';

    // Prevent multiple show buttons
    if (document.querySelector('.show-sidebar-btn')) return;

    // Create show button
    const showBtn = document.createElement('button');
    showBtn.textContent = '👁️ Show Sidebar'; // Clear UX wording
    showBtn.className = 'show-sidebar-btn';

    // Styling (consider moving to CSS for maintainability)
    Object.assign(showBtn.style, {
      position: 'fixed',
      left: '10px',
      bottom: '10px',
      zIndex: '1000',
      backgroundColor: '#635fc7',
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
    });

    document.body.appendChild(showBtn);

    showBtn.addEventListener('click', () => {
      sidebar.style.display = 'flex';
      showBtn.remove();
    });
  } else {
    // If sidebar is hidden and toggle called again, just show it
    sidebar.style.display = 'flex';

    const existingBtn = document.querySelector('.show-sidebar-btn');
    if (existingBtn) existingBtn.remove();
  }
}

