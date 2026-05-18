import "../../styles/modals.css";

import Project from "../../Models/project.js";
import stateManager from "../../services/state-manager.js";
import { loadTaskGrid } from "../main-content.js";


export default function loadNewTaskModal() {    
    const newTaskBtn = document.getElementById('newTaskBtn');
    const taskDialog = document.getElementById('TaskDialog');
    const taskForm = document.getElementById('TaskForm');
    const taskHeading = document.getElementById('taskHeading');
    const cancelBtn = document.getElementById('cancelTaskBtn');

    newTaskBtn.addEventListener('click', () => {
        const activeProject = stateManager.getCurrentProject();

        if (!activeProject) {
            alert('Please select a project first.');
            return;
        }

        taskHeading.textContent = `New Task for ${activeProject.title}`;
        taskDialog.showModal();
    })

    taskForm.addEventListener('submit', () => {
        const activeProject = stateManager.getCurrentProject();

        const formData = new FormData(taskForm);
        const taskName = formData.get('taskName');
        const taskDescription = formData.get('taskDescription');
        const taskDue = formData.get('taskDue');
        const taskPriority = formData.get('taskPriority');

        activeProject.addTask(taskName, taskDescription, taskDue, taskPriority);
        
        taskForm.reset();
        loadTaskGrid(activeProject.description, activeProject.tasks);
    })

    cancelBtn.addEventListener('click', () => {
        taskDialog.close();
    });
}