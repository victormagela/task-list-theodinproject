const taskGrid = document.getElementById('taskGrid');
import stateManager from "../services/state-manager.js";

export function loadTaskGrid(tasks) {
    taskGrid.replaceChildren();

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

        const taskTitle = document.createElement('h3');
        taskTitle.textContent = `Title: ${task.title}`;

        const taskDescription = document.createElement('p');
        taskDescription.textContent = `Description: ${task.description}`;

        const taskDueDate = document.createElement('p');
        taskDueDate.textContent = `Due: ${task.dueDate}`;

        const taskPriority = document.createElement('p');
        taskPriority.textContent = `Priority: ${task.priority}`;

        const checkbox = renderCheckBox(task);

        taskCard.appendChild(taskTitle);
        taskCard.appendChild(taskDescription);
        taskCard.appendChild(taskDueDate);
        taskCard.appendChild(taskPriority);
        taskCard.appendChild(checkbox);

        taskGrid.appendChild(taskCard);
    });
}

const renderCheckBox = (task) => {
    const label = document.createElement('label');
    label.textContent = 'Done: ';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.isDone;
    label.appendChild(checkbox);
    checkbox.addEventListener('change', () => {
        task.toggle();
        const today = new Date();
        const dueDate = new Date(task.dueDate);
        
        if (!task.isDone && dueDate > today) {
            label.parentElement.className = "";
            label.parentElement.classList.add('task', 'active');
        } else if (task.isDone && dueDate > today) {
            label.parentElement.className = "";
            label.parentElement.classList.add('task', 'completed');
        } else if (!task.isDone && dueDate < today) {
            label.parentElement.className = "";
            label.parentElement.classList.add('task', 'expired');
        } else if (task.isDone && dueDate < today) {
            label.parentElement.className = "";
            label.parentElement.classList.add('task', 'completed');
        }

        loadTaskGrid(stateManager.getCurrentProject().tasks);
    })


    return label;
}