import { formManager } from "../services/form-manager.js";
import stateManager from "../services/state-manager.js";
import { configTaskModal } from "./modals/task-modal.js";

const taskGrid = document.getElementById('taskGrid');
const taskDialog = document.getElementById('taskDialog');

const setupGridEvents = () => {
    taskGrid.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-action]')

        if (!btn) return;
        
        if (btn.dataset.action === 'delete') {
            const taskId = btn.closest('[data-id]').dataset.id;

            const confirmation = confirm('Are you sure you want to delete this task?');
    
            if (!confirmation) return; 
                
            const activeProject = stateManager.getCurrentProject();
            activeProject.removeTask(taskId);
            renderTaskGrid(activeProject.description, activeProject.tasks);
        } else if (btn.dataset.action === 'edit') {
            const taskId = btn.closest('[data-id]').dataset.id;

            formManager.taskFormIntent = 'EDIT';
            configTaskModal(taskId);
            taskDialog.showModal();
        }
    });

    taskGrid.addEventListener('change', (e) => {
        const checkbox = e.target;

        if (!checkbox) return;

        if (checkbox.dataset.action === 'toggle') {
            const activeProject = stateManager.getCurrentProject();
            const taskId = checkbox.closest('[data-id]').dataset.id;
            const task = activeProject.findTask(taskId);

            task.toggle();
            const today = new Date();
            const dueDate = new Date(task.dueDate);
            
            const taskStatusClass = getTaskStatusClass(task);
            checkbox.parentElement.className = "";
            checkbox.parentElement.classList.add('task', taskStatusClass);

            renderTaskGrid(stateManager.getCurrentProject().description, stateManager.getCurrentProject().tasks);
        }
    });
}

const renderTaskGrid = (projectDescription, tasks) => {
    taskGrid.replaceChildren();

    const projectHeader = document.createElement('h3');
    projectHeader.textContent = projectDescription.charAt(0).toUpperCase() + projectDescription.slice(1);
    projectHeader.classList.add('project-description');
    taskGrid.appendChild(projectHeader);

    if (tasks.length === 0) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('empty-message');

        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No tasks yet. Add a new task to get started!';

        messageContainer.appendChild(emptyMessage);
        taskGrid.appendChild(messageContainer);
        return;
    }

    tasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.dataset.id = task.id;

        taskCard.classList.add('task', getTaskStatusClass(task));

        const topRowContainer = document.createElement('div');
        topRowContainer.classList.add('task-top-row');

        const btnContainer = document.createElement('div');
        btnContainer.classList.add('task-btn-container');

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>trash-can-outline</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>'
        deleteBtn.classList.add('task-btn');
        deleteBtn.dataset.action = 'delete';
        
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pencil</title><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg>';
        editBtn.classList.add('task-btn');
        editBtn.dataset.action = 'edit';

        btnContainer.append(deleteBtn, editBtn);
        
        const taskPriority = document.createElement('p');
        taskPriority.textContent = task.priority.toUpperCase();
        taskPriority.classList.add('task-priority');

        topRowContainer.append(taskPriority, btnContainer);

        const taskTitle = document.createElement('h3');
        taskTitle.textContent = task.title.charAt(0).toUpperCase() + task.title.slice(1);
        taskTitle.classList.add('task-title');

        const taskDescription = document.createElement('p');
        taskDescription.textContent = task.description.charAt(0).toUpperCase() + task.description.slice(1);
        taskDescription.classList.add('task-description');

        const taskDueDate = document.createElement('p');
        taskDueDate.textContent = `Due ${task.dueDate}`;
        taskDueDate.classList.add('task-due-date');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.isDone;
        checkbox.classList.add('task-checkbox');
        checkbox.dataset.action = 'toggle';

        taskCard.appendChild(topRowContainer);
        taskCard.appendChild(taskTitle);
        taskCard.appendChild(taskDescription);
        taskCard.appendChild(taskDueDate);
        taskCard.appendChild(checkbox);

        taskGrid.appendChild(taskCard);
    });
}

const getTaskStatusClass = (task) => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);

    if (task.isDone) return 'completed';
    if (dueDate < today) return 'expired';
    return 'active';
}

export { setupGridEvents, renderTaskGrid };