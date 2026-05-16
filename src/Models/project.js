import { SECRET } from './task.js';
import Task from './task.js';

export default class Project {
    static #counter = 0;

    #id;
    #title;
    #description;
    #tasks;

    constructor(key, id, title, description) {
        if (key !== SECRET) throw new Error('Use Project.create() to create a new project');

        this.#id = id;
        this.#title = title;
        this.#description = description;
        this.#tasks = [];
    }

    static create(title, description) {
        return new Project(SECRET, ++Project.#counter, title, description);
    }

    static fromObj(obj) {
        Project.#counter = Math.max(Project.#counter, obj.id);
    
        return new Project(SECRET, obj.id, obj.title, obj.description, obj.tasks.map(t => Task.fromObj(t)));
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