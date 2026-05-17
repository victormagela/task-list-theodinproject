import "../../styles/modals.css";

import Project from "../../Models/project.js";
import stateManager from "../../../services/state-manager.js";


export default function loadNewTaskModal() {
    const activeProject = stateManager.getCurrentProject();
    
    
    const newTaskBtn = document.getElementById('newTaskBtn');
    const newTaskDialog = document.getElementById('newTaskDialog');
    const newTaskForm = document.getElementById('newTaskForm');
    const cancelBtn = document.getElementById('cancelTaskBtn');

    newTaskBtn.addEventListener('click', () => {
        if (!activeProject) {
            alert('Please select a project first.');
            return;
        }

        newTaskDialog.showModal();
    })

    newTaskForm.addEventListener('submit', () => {
        const formData = new FormData(newTaskForm);
        const taskName = formData.get('taskName');
        const taskDescription = formData.get('taskDescription');
        const taskDue = formData.get('taskDue');
        const taskPriority = formData.get('taskPriority');

        activeProject.addTask(taskName, taskDescription, taskDue, taskPriority);
        
        newTaskForm.reset();
    })

    cancelBtn.addEventListener('click', () => {
        newTaskDialog.close();
    });
}