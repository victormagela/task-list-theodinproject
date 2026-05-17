import Project from '../Models/project.js';
import { loadTaskGrid } from './main-content.js';

const projectList = document.getElementById('projectList');

export function loadNewProject(project) {
    const listItem = document.createElement('li');
    const projectItem = document.createElement('button');
    projectItem.textContent = project.title;
    projectItem.classList.add('project');
    projectItem.addEventListener('click', () => loadTaskGrid(project.tasks));
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
        loadTaskGrid(defaultProject.tasks);
    }
}
