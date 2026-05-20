import "../../styles/modals.css";

import Project from "../../Models/project.js";
import { highlightActiveProject, renderProjectList } from "../sidebar.js";
import { formManager } from "../../services/form-manager.js";
import stateManager from "../../services/state-manager.js";
import { renderTaskGrid } from "../task-grid.js";

const projectDialog = document.getElementById('newProjectDialog');
const projectForm = document.getElementById('newProjectForm');
const projectHeading = document.getElementById('projectHeading');
const projectSubmitBtn = document.getElementById('projectSubmitBtn');
const cancelBtn = document.getElementById('projectCancelBtn');

const projectTitleInput = projectForm.querySelector('#projectTitle');
const projectDescriptionInput = projectForm.querySelector('#projectDescription');

const setupProjectModalEvents = () => {
    projectForm.addEventListener('submit', () => {
        const currentFormIntent = formManager.projectFormIntent;
        
        const formData = new FormData(projectForm);
       
        const projectName = formData.get('projectTitle');
        const projectDescription = formData.get('projectDescription');
        
        if (currentFormIntent === 'CREATE') {
            const newProject = Project.create(projectName, projectDescription);
            stateManager.addProject(newProject);
            stateManager.setCurrentProject(newProject);
            renderProjectList(stateManager.getProjects());
            renderTaskGrid(newProject.description, newProject.tasks);
        }
        else if (currentFormIntent === 'EDIT') {
            console.log('NOT YET IMPLEMENTED');
        }
    })

    cancelBtn.addEventListener('click', () => projectDialog.close());

    projectDialog.addEventListener('close', () => projectForm.reset());
}

const configProjectModal = () => {
    const currentFormIntent = formManager.projectFormIntent;

    if (currentFormIntent === 'CREATE') {
        projectHeading.textContent = 'New Project';
        projectTitleInput.value = '';
        projectDescriptionInput.value = '';
        projectSubmitBtn.textContent = 'Create';
    } else if (currentFormIntent === 'EDIT') {
        projectHeading.textContent = 'Edit Project';
        projectSubmitBtn.textContent = 'Edit';
        console.log('NOT YET IMPLEMENTED');
    }
}

export { configProjectModal, setupProjectModalEvents };