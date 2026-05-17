import Project from '../Models/project.js';

const projectList = document.getElementById('projectList');

export function loadNewProject(project) {
    const listItem = document.createElement('li');
    const projectItem = document.createElement('button');
    projectItem.textContent = project.title;
    projectItem.classList.add('project');
    listItem.appendChild(projectItem);
    projectList.appendChild(listItem);
} 

export function loadProjects() {
    if (!projectList.hasChildNodes()) {
        const defaultProject = Project.create(
            'My First Project',
            'This is your default first project'
        );
        loadNewProject(defaultProject);
    }
}
