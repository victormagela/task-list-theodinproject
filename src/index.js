import "./styles/reset.css";
import "./styles/style.css";

import stateManager from "./services/state-manager.js";
import { formManager } from "./services/form-manager.js";
import { firstTimeRender, setupSidebarEvents } from "./components/sidebar.js";
import { setupProjectModalEvents } from "./components/modals/project-modal.js";
import { configTaskModal, setupModalEvents as setupTaskModalEvents } from "./components/modals/task-modal.js";
import { setupGridEvents } from "./components/task-grid.js";

const projects = stateManager.getProjects();

setupSidebarEvents();
setupTaskModalEvents();
setupProjectModalEvents();
setupGridEvents();

const newTaskBtn = document.getElementById('newTaskBtn');
newTaskBtn.addEventListener('click', () => {
    formManager.taskFormIntent = 'CREATE';
    configTaskModal();
});

firstTimeRender(projects);