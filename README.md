JSL Portfolio Piece: Kanban App
Overview

This project is a Kanban app implemented with JavaScript, HTML, and CSS, featuring task management with priority sorting, theme toggling, a responsive sidebar, and persistent data using localStorage. The app is deployed to Netlify and demonstrates clean, modular, and well-documented code.

Live Demo & Presentation

Deployed App: [[Your Netlify URL here](https://nontuthuzelo-mtolo-jslpp.netlify.app/)]

Recorded Presentation: [[Public link to your video presentation](https://www.loom.com/share/f841bbfe468449c188f0f0b871ea8551?sid=a52c9670-fcaa-472a-8e54-328e584b2042)]
[[Public link to your video presentation](https://www.loom.com/share/9391893ce1d94271a31f420889846e3b?sid=6d0609d5-46a3-46b8-b74c-fb9b50346116)]


Features
Task Management

Create, edit, and delete tasks via a modal interface.

Tasks are categorized by status: To Do, Doing, Done.

Priority system: High, Medium, Low. Tasks automatically sorted by priority within each column.

Persistent storage: Tasks are saved to localStorage for data consistency across page reloads.

Sidebar & Mobile Menu

Desktop sidebar: Toggleable with show/hide functionality.

Mobile menu: Accessible from app logo, includes theme toggle, closable overlay, and full sidebar functionality.

Theme Toggle

Switch between light and dark mode.

Theme preference saved in localStorage.

Consistent UI styling across desktop and mobile.

Deployment & Hosting

App is deployed to Netlify with a live, shareable URL.

Project structured for best practices in deployment.

Project Structure
kanban-app/
├─ index.html
├─ css/
│  └─ style.css
├─ js/
│  ├─ main.js
│  ├─ dom.js
│  ├─ events.js
│  ├─ render.js
│  ├─ storage.js
│  ├─ modal.js
│  ├─ sidebar.js
│  ├─ theme.js
│  └─ initialData.js
└─ README.md


main.js: App initialization, loads tasks, renders board, applies theme, sets up events.

dom.js: Centralizes DOM element selectors.

events.js: Handles user interactions (form submissions, modals, sidebar toggles, theme switch).

render.js: Renders tasks, updates column counts, displays priority badges.

storage.js: Handles API fetch, localStorage persistence, task CRUD operations.

modal.js: Open/close task modal.

sidebar.js: Sidebar toggle for desktop and mobile.

theme.js: Dark/light theme toggle and persistence.

initialData.js: Provides seed tasks for first-time users.

Setup & Deployment Instructions

Clone the repo:

git clone https://github.com/<username>/kanban-app.git
cd kanban-app


Open index.html locally to test features.

Deploy to Netlify:

Log in to Netlify
.

Click New Site → Import from Git and select this repository.

Branch: main

Build command: leave blank

Publish directory: root (/)

Test live app: Ensure all functionality works (task CRUD, priority sorting, theme toggle, sidebar, mobile menu).

Code Quality & Best Practices

Modular JS: Functions and logic separated by responsibility.

JSDoc Documentation: Every major function and module documented.

Descriptive Naming: Clear variable and function names for readability.

Responsive Design: Fully functional across desktop and mobile devices.

Data Persistence: LocalStorage ensures tasks remain after page reloads.

Expected Outcome

Fully functional Kanban board with persistent tasks and priority sorting.

Responsive, mobile-friendly sidebar with theme toggling.

Modular, maintainable, and well-documented code.

Live deployment on Netlify with a public URL.

Presentation-ready code demo for review.
