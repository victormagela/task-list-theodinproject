const taskGrid = document.getElementById('taskGrid');
import stateManager from "../services/state-manager.js";

export function loadTaskGrid(projectDescription, tasks) {
    taskGrid.replaceChildren();

    const projectHeader = document.createElement('h3');
    projectHeader.textContent = projectDescription;
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

        if (new Date(task.dueDate) < new Date() && !task.isDone) {
            taskCard.classList.add('task', 'expired');
        } else if (task.isDone) {
            taskCard.classList.add('task', 'completed');
        } else {
            taskCard.classList.add('task', 'active');
        }
        
        const taskPriority = document.createElement('p');
        taskPriority.textContent = task.priority.toUpperCase();
        taskPriority.classList.add('task-priority');

        const taskTitle = document.createElement('h3');
        taskTitle.textContent = task.title.charAt(0).toUpperCase() + task.title.slice(1);
        taskTitle.classList.add('task-title');

        const taskDescription = document.createElement('p');
        taskDescription.textContent = task.description.charAt(0).toUpperCase() + task.description.slice(1);
        taskDescription.classList.add('task-description');

        const taskDueDate = document.createElement('p');
        taskDueDate.textContent = `Due ${task.dueDate}`;
        taskDueDate.classList.add('task-due-date');

        const checkbox = renderCheckBox(task);
        checkbox.classList.add('task-checkbox');

        taskCard.appendChild(taskPriority);
        taskCard.appendChild(taskTitle);
        taskCard.appendChild(taskDescription);
        taskCard.appendChild(taskDueDate);
        taskCard.appendChild(checkbox);

        taskGrid.appendChild(taskCard);
    });
}

const renderCheckBox = (task) => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.isDone;

    checkbox.addEventListener('change', () => {
        task.toggle();
        const today = new Date();
        const dueDate = new Date(task.dueDate);
        
        if (!task.isDone && dueDate > today) {
            checkbox.parentElement.className = "";
            checkbox.parentElement.classList.add('task', 'active');
        } else if (task.isDone && dueDate > today) {
            checkbox.parentElement.className = "";
            checkbox.parentElement.classList.add('task', 'completed');
        } else if (!task.isDone && dueDate < today) {
            checkbox.parentElement.className = "";
            checkbox.parentElement.classList.add('task', 'expired');
        } else if (task.isDone && dueDate < today) {
            checkbox.parentElement.className = "";
            checkbox.parentElement.classList.add('task', 'completed');
        }

        loadTaskGrid(stateManager.getCurrentProject().tasks);
    })


    return checkbox;
}