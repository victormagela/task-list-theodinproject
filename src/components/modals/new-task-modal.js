import "../../styles/modals.css";

import Project from "../../Models/project.js";
import stateManager from "../../services/state-manager.js";
import { loadTaskGrid } from "../main-content.js";
import { formManager } from "../../services/form-manager.js";


export default function loadNewTaskModal() {    
    const newTaskBtn = document.getElementById('newTaskBtn');
    const taskDialog = document.getElementById('TaskDialog');
    const taskForm = document.getElementById('TaskForm');
    const taskHeading = document.getElementById('taskHeading');
    const taskSubmitBtn = document.getElementById('taskSubmitBtn');
    const cancelBtn = document.getElementById('cancelTaskBtn');

    newTaskBtn.addEventListener('click', () => {
        formManager.formIntent = 'CREATE';
        const activeProject = stateManager.getCurrentProject();

        if (!activeProject) {
            alert('Please select a project first.');
            return;
        }

        taskHeading.textContent = `New Task for ${activeProject.title}`;
        taskSubmitBtn.textContent = 'Create';
        taskDialog.showModal();
    })

    taskForm.addEventListener('submit', () => {
        if (formManager.formIntent === 'EDIT') return;
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
        taskForm.reset();
        taskDialog.close();
    });
}