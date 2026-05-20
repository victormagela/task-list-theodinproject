import Project from '../Models/project.js';
import stateManager from '../services/state-manager.js';
import { renderTaskGrid } from './task-grid.js';
import { configProjectModal } from './modals/project-modal.js';
import { formManager } from '../services/form-manager.js';

const projectListDisplay = document.getElementById('projectList');
const newProjectBtn = document.getElementById('newProjectBtn');
const newProjectDialog = document.getElementById('newProjectDialog');

const firstTimeRender = (projects) => {
    if (projects.length !== 0) return;

    const defaultProject = Project.create(
        'My First Project',
        'This is your default first project'
    );
    
    stateManager.addProject(defaultProject);
    stateManager.setCurrentProject(defaultProject);
    renderTaskGrid(defaultProject.description, defaultProject.tasks);

    highlightActiveProject(renderProject(defaultProject));
}

const renderProjectList = (projects) => {
    projectListDisplay.innerHTML = '';

    projects.forEach(project => renderProject(project));
    const activeProjectId = stateManager.getCurrentProject().id;
    const activeProjectItem = document.querySelector(`[data-id="${activeProjectId}"]`);
    highlightActiveProject(activeProjectItem);
}

const setupSidebarEvents = () => {
    newProjectBtn.addEventListener('click', () => {
        formManager.projectFormIntent = 'CREATE';
        configProjectModal();
        newProjectDialog.showModal();
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

const renderProject = (project) => {
    const listItem = document.createElement('li');
    const projectItem = document.createElement('button');

    projectItem.dataset.action = 'render';
    projectItem.dataset.id = project.id;
    
    projectItem.textContent = project.title.charAt(0).toUpperCase() 
                            + project.title.slice(1);
    projectItem.classList.add('project');
    
    listItem.appendChild(projectItem);
    projectListDisplay.appendChild(listItem);

    return projectItem;
}

const highlightActiveProject = (projectItem) => {
    const activeProjectItem = document.querySelector('.active-project');

    if (activeProjectItem) activeProjectItem.classList.remove('active-project');
    projectItem.classList.add('active-project');
}

export { renderProjectList, firstTimeRender, setupSidebarEvents, highlightActiveProject };