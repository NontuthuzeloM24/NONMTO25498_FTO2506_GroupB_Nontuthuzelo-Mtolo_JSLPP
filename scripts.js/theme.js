export function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const mode = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', mode);
}

export function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeSwitch) themeSwitch.checked = true;
    }
}