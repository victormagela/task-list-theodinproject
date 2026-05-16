import Project from "../../Models/project.js";

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

        const newProject = new Project(1, projectName, projectDescription);
        
        console.log(newProject.id, newProject.description, newProject.title);

    })

}

