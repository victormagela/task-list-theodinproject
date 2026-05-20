import "../../styles/modals.css";

import Project from "../../Models/project.js";
import stateManager from "../../services/state-manager.js";
import { renderTaskGrid } from "../task-grid.js";
import { formManager } from "../../services/form-manager.js";

const taskDialog = document.getElementById('taskDialog');
const taskForm = document.getElementById('taskForm');
const taskHeading = document.getElementById('taskHeading');
const taskSubmitBtn = document.getElementById('taskSubmitBtn');
const cancelBtn = document.getElementById('cancelTaskBtn');

const taskTitleInput = taskForm.querySelector('#taskTitle');
const taskDescriptionInput = taskForm.querySelector('#taskDescription');
const taskDueInput = taskForm.querySelector('#taskDue');
const taskPriorityInput = taskForm.querySelector('#taskPriority');

const configTaskModal = (taskId = null) => {
    taskDialog.dataset.id = taskId;
    const activeProject = stateManager.getCurrentProject();
    const currentFormIntent = formManager.taskFormIntent;

    if (currentFormIntent === 'CREATE') {
        taskHeading.textContent = `New Task for ${activeProject.title}`;
        taskTitleInput.value = '';
        taskDescriptionInput.value = '';
        taskDueInput.value = '';
        taskPriorityInput.value = 'medium';
        taskSubmitBtn.textContent = 'Create';
    } else if (currentFormIntent === 'EDIT') {
        if (!taskId) return;

        const task = activeProject.findTask(taskId);
        
        taskHeading.textContent = `Edit Task for ${activeProject.title}`;
        taskTitleInput.value = task.title;
        taskDescriptionInput.value = task.description;
        taskDueInput.value = task.dueDate;
        taskPriorityInput.value = task.priority;
        taskSubmitBtn.textContent = 'Edit';
    }

    taskDialog.showModal();
}

const setupModalEvents = () => {
    taskForm.addEventListener('submit', (e) => {
        const currentFormIntent = formManager.taskFormIntent;
        const activeProject = stateManager.getCurrentProject();
        
        const formData = new FormData(taskForm);

        const taskTitle = formData.get('taskTitle');
        const taskDescription = formData.get('taskDescription');
        const taskDue = formData.get('taskDue');
        const taskPriority = formData.get('taskPriority');

        if (currentFormIntent === 'CREATE') {
            activeProject.addTask(taskTitle, taskDescription, taskDue, taskPriority);
        } else if (currentFormIntent === 'EDIT') {
            const taskId = taskDialog.dataset.id ?? null;

            if (!taskId) return;

            activeProject.updateTask(
                taskId,
                {
                    title: taskTitle,
                    description: taskDescription,
                    dueDate: taskDue,
                    priority: taskPriority
                }    
            );
        }

        renderTaskGrid(activeProject.description, activeProject.tasks);
        console.log(activeProject.tasks);
    });

    cancelBtn.addEventListener('click', () => taskDialog.close());

    taskDialog.addEventListener('close', () => taskForm.reset());
}

export { configTaskModal, setupModalEvents };