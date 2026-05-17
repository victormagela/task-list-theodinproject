const taskGrid = document.getElementById('taskGrid');

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
        taskCard.classList.add('task');

        const taskTitle = document.createElement('h3');
        taskTitle.textContent = `Title: ${task.title}`;

        const taskDescription = document.createElement('p');
        taskDescription.textContent = `Description: ${task.description}`;

        const taskDueDate = document.createElement('p');
        taskDueDate.textContent = `Due: ${task.dueDate}`;

        const taskPriority = document.createElement('p');
        taskPriority.textContent = `Priority: ${task.priority}`;

        taskCard.appendChild(taskTitle);
        taskCard.appendChild(taskDescription);
        taskCard.appendChild(taskDueDate);
        taskCard.appendChild(taskPriority);

        taskGrid.appendChild(taskCard);
    });
}