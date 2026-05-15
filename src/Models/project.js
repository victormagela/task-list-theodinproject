class Project {
    #id;
    #title;
    #description;
    #tasks;

    constructor(id, title, description) {
        this.#id = id;
        this.#title = title;
        this.#description = description;
        this.#tasks = [];
    }

    get id() {
        return this.#id;
    }

    get title() {
        return this.#title;
    }

    get description() {
        return this.#description;
    }

    get tasks() {
        return [...this.#tasks];
    }

    set title(title) {
        this.#title = title;
    }

    set description(description) {
        this.#description = description;
    }

    addTask(title, description, dueDate, priority) {
        const task = Task.create(title, description, dueDate, false, priority);
        this.#tasks.push(task);
        return task;
    }
}