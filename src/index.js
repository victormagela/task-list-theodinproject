import "./styles/reset.css";
import "./styles/style.css";

import loadNewProjectModal from "./components/modals/new-project-modal.js";
import loadNewTaskModal from "./components/modals/new-task-modal.js";
import { loadProjects } from "./components/sidebar-content.js";
import { setupGridEvents } from "./components/main-content.js";

loadProjects();
loadNewProjectModal();
loadNewTaskModal();
setupGridEvents();