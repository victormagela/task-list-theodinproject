import "../../styles/modals.css";

import Project from "../../Models/project.js";
import { loadNewProject } from "../sidebar-content.js";
import { formManager } from "../../services/form-manager.js";

const projectDialog = document.getElementById('newProjectDialog');
const projectForm = document.getElementById('newProjectForm');
const projectHeading = document.getElementById('projectHeading');
const projectSubmitBtn = document.getElementById('projectSubmitBtn');
const cancelBtn = document.getElementById('projectCancelBtn');

const projectTitleInput = projectForm.querySelector('#projectTitle');
const projectDescriptionInput = projectForm.querySelector('#projectDescription');

export default function loadNewProjectModal() {
    const newProjectBtn = document.getElementById('newProjectBtn');
    const newProjectDialog = document.getElementById('newProjectDialog');
    const newProjectForm = document.getElementById('newProjectForm');
    const cancelBtn = document.getElementById('projectCancelBtn');
    
    newProjectBtn.addEventListener('click', () => {
        newProjectDialog.showModal();
    });

    cancelBtn.addEventListener('click', () => {
        newProjectDialog.close();
    });

    projectForm.addEventListener('submit', () => {
        const formData = new FormData(projectForm);
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
        const currentFormIntent = formManager.projectFormIntent;
        
        const formData = new FormData(projectForm);
       
        const projectName = formData.get('projectName');
        const projectDescription = formData.get('projectDescription');
        
        if (currentFormIntent === 'CREATE') {
            const newProject = Project.create(projectName, projectDescription);
            loadNewProject(newProject);
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