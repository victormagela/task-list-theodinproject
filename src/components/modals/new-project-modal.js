import "../../styles/modals.css";

import Project from "../../Models/project.js";
import { loadNewProject } from "../sidebar-content.js";

export default function loadNewProjectModal() {
    const newProjectBtn = document.getElementById('newProjectBtn');
    const newProjectDialog = document.getElementById('newProjectDialog');
    const newProjectForm = document.getElementById('newProjectForm');
    const cancelBtn = document.getElementById('cancelBtn');
    
    newProjectBtn.addEventListener('click', () => {
        newProjectDialog.showModal();
    })

    cancelBtn.addEventListener('click', () => {
        newProjectDialog.close();
    })

    newProjectForm.addEventListener('submit', () => {
        const formData = new FormData(newProjectForm);
        const projectName = formData.get('projectName');
        const projectDescription = formData.get('projectDescription');

        const newProject = Project.create(projectName, projectDescription);

        loadNewProject(newProject);
        newProjectForm.reset();
    })

}

