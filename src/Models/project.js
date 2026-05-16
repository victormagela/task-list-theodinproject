import Task from './task.js';

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
        const task = Task.create(title, description, dueDate, priority);
        this.#tasks.push(task);
        return task;
    }

    removeTask(taskId) {
        const task = this.#tasks.find(t => +t === +taskId);
        if (!task) return;

        this.#tasks = this.#tasks.filter(t => +t !== +taskId);
    }

    toogleTask(taskId) {
        const task = this.#tasks.find(t => +t === +taskId);
        if (!task) return;

        task.toogle();
    }

    updateTask(id, fn) {
        const task = this.#tasks.find(t => +t === +id);
        if (!task) return;

        fn(task);
    }
}