/**
 * @file theme.js
 * @description Handles toggling between light and dark themes and persisting user preference.
 */

import { themeSwitch } from './dom.js';

/**
 * Toggles the dark theme on the document body.
 * Saves the current theme in localStorage.
 */
export function toggleTheme() {
  document.body.classList.toggle('dark-theme');

  const isDark = document.body.classList.contains('dark-theme');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

/**
 * Loads the saved theme from localStorage and applies it.
 * Sets the theme switch checkbox state accordingly.
 */
export function loadTheme() {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    if (themeSwitch) themeSwitch.checked = true;
  } else {
    // Explicitly remove dark theme for any other saved value or none
    document.body.classList.remove('dark-theme');
    if (themeSwitch) themeSwitch.checked = false;
  }
}

