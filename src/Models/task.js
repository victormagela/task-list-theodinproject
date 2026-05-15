const SECRET = Symbol('secret');
const EQUALS = Symbol('equals');

export default class Task {
    static #counter = 0;

    #id;
    #title;
    #description;
    #dueDate;
    #isDone;
    #priority;

    constructor(key, id, title, description, dueDate, isDone, priority) {
        if (key !== SECRET) throw new Error('Use Task.create() to create a new task');
        
        this.#id = id;
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#isDone = isDone;
        this.#priority = priority;
    }

    static create(title, description, dueDate, priority) {
        return new Task(SECRET, ++Task.#counter, title, description, dueDate, false, priority);
    }

    static fromObj(obj) {
    Task.#counter = Math.max(Task.#counter, obj.id);

    return new Task(SECRET, obj.id, obj.title, obj.description, obj.dueDate, obj.isDone, obj.priority);
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

    get dueDate() {
        return this.#dueDate;
    }

    get isDone() {
        return this.#isDone;
    }

    get priority() {
        return this.#priority;
    }

    set title(title) {
        this.#title = title;
    }

    set description(description) {
        this.#description = description;
    }

    set dueDate(dueDate) {
        this.#dueDate = dueDate;
    }

    set priority(priority) {
        this.#priority = priority;
    }

    toogle() {
        this.#isDone = !this.#isDone;
    }

    [Symbol.toPrimitive](hint) {
        if (hint === 'number') return this.#id;
        else return `Task ${this.#id}: ${this.#title} - ${this.#description}, Due: ${this.#dueDate}, Done: ${this.#isDone}, Priority: ${this.#priority}) `; 
    }

    [EQUALS](other) {
        if (!other instanceof Task) return false;

        return this.#id === other.id;
    }
}