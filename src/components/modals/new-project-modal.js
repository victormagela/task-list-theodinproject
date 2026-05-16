export default function loadNewProjectModal() {
    const newProjectBtn = document.getElementById('newProjectBtn');
    const newProjectDialog = document.getElementById('newProjectDialog');
    const newProjectForm = document.getElementById('newProjectForm');
    const cancelBtn = document.getElementById('cancelBtn');
    
    newProjectBtn.addEventListener('click', () => {
        newProjectDialog.showModal();
    })

}

