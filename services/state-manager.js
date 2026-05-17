const stateManager = (function() {
    let currentProject = null;

    const setCurrentProject = (project) => {
        currentProject = project;
    };

    const getCurrentProject = () => {
        return currentProject;
    };

    return {
        setCurrentProject,
        getCurrentProject
    };
})();

export default stateManager;