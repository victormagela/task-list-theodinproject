import Project from '../Models/project.js';
import stateManager from '../services/state-manager.js';
import { renderTaskGrid } from './main-content.js';
import { configProjectModal } from './modals/project-modal.js';
import { formManager } from '../services/form-manager.js';

const projectListDisplay = document.getElementById('projectList');
const newProjectBtn = document.getElementById('newProjectBtn');

const firstTimeRender = (projects) => {
    if (projects.length !== 0) return;

    if (!projectListDisplay.hasChildNodes()) {
        const defaultProject = Project.create(
            'My First Project',
            'This is your default first project'
        );
        const projectItem = loadNewProject(defaultProject);
        stateManager.setCurrentProject(defaultProject);
        renderTaskGrid(defaultProject.description, defaultProject.tasks);

        highlightActiveProject(projectItem);
    }
}

const renderProjectList = (projects) => {
    projectListDisplay.innerHTML = '';

    projects.forEach(project => {
        const listItem = document.createElement('li');
        const projectItem = document.createElement('button');

        projectItem.dataset.action = 'render';
        projectItem.dataset.id = project.id;
        
        projectItem.textContent = project.title.charAt(0).toUpperCase() 
                                + project.title.slice(1);
        projectItem.classList.add('project');
        
        listItem.appendChild(projectItem);
        projectListDisplay.appendChild(listItem);
    });
}

const setupSidebarEvents = () => {
    newProjectBtn.addEventListener('click', () => {
        formManager.projectFormIntent = 'CREATE';
        configProjectModal();
    });

    projectListDisplay.addEventListener('click', (e) => {
        const projectItem = e.target.closest('[data-action]');

        if (!projectItem) return;

        if (projectItem.dataset.action === 'render') {
            highlightActiveProject(projectItem);
            const project = stateManager.getProjectById(projectItem.dataset.id);
            stateManager.setCurrentProject(project);
            renderTaskGrid(project.description, project.tasks);
        }
    })
}

export function loadNewProject(project) {
    const listItem = document.createElement('li');
    const projectItem = document.createElement('button');

    projectItem.textContent = project.title.charAt(0).toUpperCase()
                            + project.title.slice(1);
    projectItem.classList.add('project');
    projectItem.addEventListener('click', (e) => {
        highlightActiveProject(e.target);

        stateManager.setCurrentProject(project);
        renderTaskGrid(project.description, project.tasks);
    });

    listItem.appendChild(projectItem);
    projectListDisplay.appendChild(listItem);
    
    return projectItem;
} 

export function loadProjects() {
    if (!projectListDisplay.hasChildNodes()) {
        const defaultProject = Project.create(
            'My First Project',
            'This is your default first project'
        );
        const projectItem = loadNewProject(defaultProject);
        stateManager.setCurrentProject(defaultProject);
        renderTaskGrid(defaultProject.description, defaultProject.tasks);

        highlightActiveProject(projectItem);
    }
}

const highlightActiveProject = (projectItem) => {
    const activeProjectItem = document.querySelector('.active-project');

    if (activeProjectItem) activeProjectItem.classList.remove('active-project');
    projectItem.classList.add('active-project');
}

export { renderProjectList, firstTimeRender, setupSidebarEvents };