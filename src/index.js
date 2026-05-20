import "./styles/reset.css";
import "./styles/style.css";

import loadNewProjectModal from "./components/modals/project-modal.js";
import { formManager } from "./services/form-manager.js";
import { configTaskModal, setupModalEvents } from "./components/modals/task-modal.js";
import { loadProjects } from "./components/sidebar-content.js";
import { setupGridEvents } from "./components/main-content.js";

loadProjects();
loadNewProjectModal();
setupModalEvents();
setupGridEvents();

const newTaskBtn = document.getElementById('newTaskBtn');
newTaskBtn.addEventListener('click', () => {
    formManager.formIntent = 'CREATE';
    configTaskModal();
});