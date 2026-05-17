import Project from '../Models/project.js';
import stateManager from '../../services/state-manager.js';
import { loadTaskGrid } from './main-content.js';

const projectList = document.getElementById('projectList');

export function loadNewProject(project) {
    const listItem = document.createElement('li');
    const projectItem = document.createElement('button');

    projectItem.textContent = project.title;
    projectItem.classList.add('project');
    projectItem.addEventListener('click', () => {
        stateManager.setCurrentProject(project);
        loadTaskGrid(project.tasks);
        console.log(stateManager.getCurrentProject());
    });

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
        stateManager.setCurrentProject(defaultProject);
        loadTaskGrid(defaultProject.tasks);
    }
}
