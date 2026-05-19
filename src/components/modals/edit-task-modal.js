import stateManager from "../../services/state-manager.js";
import { formManager } from "../../services/form-manager.js";

export default function configEditTaskModal(task) {
    taskForm.addEventListener('submit', () => {
        if (formManager.formIntent === "CREATE") return;

        console.log('edit form submitted');
        taskForm.reset();
    })
}