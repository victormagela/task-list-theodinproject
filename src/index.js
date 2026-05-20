import "./styles/reset.css";
import "./styles/style.css";

import loadNewProjectModal from "./components/modals/new-project-modal.js";
import { formManager } from "./services/form-manager.js";
import { renderTaskModal, setupModalEvents } from "./components/modals/task-modal.js";
import { loadProjects } from "./components/sidebar-content.js";
import { setupGridEvents } from "./components/main-content.js";

loadProjects();
loadNewProjectModal();
setupModalEvents();
setupGridEvents();

const newTaskBtn = document.getElementById('newTaskBtn');
newTaskBtn.addEventListener('click', (e) => {
    formManager.formIntent = 'CREATE';
    renderTaskModal(e);
});