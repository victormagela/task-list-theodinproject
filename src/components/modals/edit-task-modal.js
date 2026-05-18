import stateManager from "../../services/state-manager.js";

export default function loadEditTaskModal(task) {
    const taskDialog = document.getElementById('TaskDialog');
    const taskForm = document.getElementById('TaskForm');
    const taskHeading = document.getElementById('taskHeading');
    const taskSubmitBtn = document.getElementById('taskSubmitBtn');
    const cancelBtn = document.getElementById('cancelTaskBtn');    

    taskHeading.textContent = `Edit Task: ${task.title}`;
    taskForm.querySelector('#taskName').value = task.title;
    taskForm.querySelector('#taskDescription').value = task.description;
    taskForm.querySelector('#taskDue').value = task.dueDate;
    taskForm.querySelector('#taskPriority').value = task.priority;
    taskSubmitBtn.textContent = 'Save';

    taskDialog.showModal();
}