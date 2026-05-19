import stateManager from "../../services/state-manager.js";
import { formManager } from "../../services/form-manager.js";
import { renderTaskGrid } from "../main-content.js";

export default function configEditTaskModal(task) {
    const taskForm = document.getElementById('taskForm');
    
    taskForm.addEventListener('submit', () => {
        if (formManager.formIntent === "CREATE") return;

        const activeProject = stateManager.getCurrentProject();

        const formData = new FormData(taskForm);

        const taskName = formData.get('taskName');
        const taskDescription = formData.get('taskDescription');
        const taskDueDate = formData.get('taskDue');
        const taskPriority = formData.get('taskPriority');

        const taskObj = {
                title: taskName,
                description: taskDescription,
                dueDate: taskDueDate,
                priority: taskPriority
            };
        console.log(taskObj);

        activeProject.updateTask(
            task.id,
            taskObj
        );

        taskForm.reset();
        renderTaskGrid(activeProject.description, activeProject.tasks);
    })
}