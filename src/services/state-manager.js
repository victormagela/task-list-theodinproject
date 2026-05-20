const stateManager = (function() {
    let currentProject = null;
    const projects = [];

    const getProjectById = (id) => {
        return projects.find(p => +p.id === +id);
    }

    const setCurrentProject = (project) => {
        currentProject = project;
    };

    const getCurrentProject = () => {
        return currentProject;
    };

    const getProjects = () => {
        return [...projects];
    };

    const addProject = (project) => {
        projects.push(project);
    }

    return {
        getProjectById,
        setCurrentProject,
        getCurrentProject,
        getProjects,
        addProject
    };
})();

export default stateManager;