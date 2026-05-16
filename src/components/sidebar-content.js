import Project from '../Models/project.js';

const projectList = document.getElementById('projectList');

export function loadNewProject(project) {
    const projectItem = document.createElement('li');
    projectItem.textContent = project.title;
    projectList.appendChild(projectItem);
} 
