import "../../styles/modals.css";

import Project from "../../Models/project.js";
import { loadNewProject } from "../sidebar-content.js";

const projectDialog = document.getElementById('newProjectDialog');
const projectForm = document.getElementById('newProjectForm');
const cancelBtn = document.getElementById('cancelBtn');

export default function loadNewProjectModal() {
    const newProjectBtn = document.getElementById('newProjectBtn');
    const newProjectDialog = document.getElementById('newProjectDialog');
    const newProjectForm = document.getElementById('newProjectForm');
    const cancelBtn = document.getElementById('cancelBtn');
    
    newProjectBtn.addEventListener('click', () => {
        newProjectDialog.showModal();
    });

    cancelBtn.addEventListener('click', () => {
        newProjectDialog.close();
    });

    newProjectForm.addEventListener('submit', () => {
        const formData = new FormData(newProjectForm);
        const projectName = formData.get('projectName');
        const projectDescription = formData.get('projectDescription');

        const newProject = Project.create(projectName, projectDescription);

        loadNewProject(newProject);
        newProjectForm.reset();
    });

    newProjectForm.addEventListener('click', (e) => e.stopPropagation());

    newProjectDialog.addEventListener('click', () => newProjectDialog.close());

}

const setupProjectModalEvents = () => {
    projectForm.addEventListener('submit', () => {
        const formData = new FormData(newProjectForm);
        const projectName = formData.get('projectName');
        const projectDescription = formData.get('projectDescription');

        const newProject = Project.create(projectName, projectDescription);
        loadNewProject(newProject);
    })

    cancelBtn.addEventListener('click', () => projectDialog.close());

    projectDialog.addEventListener('close', () => projectForm.reset());
}

const renderProjectModal = () => {

}