import "../../styles/modals.css";

import Task from "../../Models/task.js";

export default function loadNewTaskModal() {
    const newTaskBtn = document.getElementById('newTaskBtn');
    const newTaskDialog = document.getElementById('newTaskDialog');
    const newTaskForm = document.getElementById('newTaskForm');
    const cancelBtn = document.getElementById('cancelTaskBtn');

    newTaskBtn.addEventListener('click', () => {
        newTaskDialog.showModal();
    })

    cancelBtn.addEventListener('click', () => {
        newTaskDialog.close();
    });
}