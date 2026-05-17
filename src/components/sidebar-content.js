import Project from '../Models/project.js';
import stateManager from '../services/state-manager.js';
import { loadTaskGrid } from './main-content.js';

const projectList = document.getElementById('projectList');

export function loadNewProject(project) {
    const listItem = document.createElement('li');
    const projectItem = document.createElement('button');

    projectItem.textContent = project.title.charAt(0).toUpperCase() + project.title.slice(1);
    projectItem.classList.add('project');
    projectItem.addEventListener('click', (e) => {
        highlightActiveProject(e.target);

        stateManager.setCurrentProject(project);
        loadTaskGrid(project.description, project.tasks);
    });

    listItem.appendChild(projectItem);
    projectList.appendChild(listItem);
    
    return projectItem;
} 

export function loadProjects() {
    if (!projectList.hasChildNodes()) {
        const defaultProject = Project.create(
            'My First Project',
            'This is your default first project'
        );
        const projectItem = loadNewProject(defaultProject);
        stateManager.setCurrentProject(defaultProject);
        loadTaskGrid(defaultProject.description, defaultProject.tasks);

        highlightActiveProject(projectItem);
    }
}

const highlightActiveProject = (projectItem) => {
    const activeProjectItem = document.querySelector('.active-project');

    if (activeProjectItem) activeProjectItem.classList.remove('active-project');
    projectItem.classList.add('active-project');
}