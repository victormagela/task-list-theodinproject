const EQUALS = Symbol('equals');

class Task {
    #id;
    #title;
    #description;
    #dueDate;
    #isDone;
    #priority;

    constructor(id, title, description, dueDate, isDone, priority) {
        this.#id = id;
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#isDone = isDone;
        this.#priority = priority;
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

    set isDone(isDone) {
        this.#isDone = isDone;
    }

    set priority(priority) {
        this.#priority = priority;
    }

    [Symbol.toPrimitive](hint) {
        if (hint === 'number') return this.#id;
        else return this.#description; 
    }

    [EQUALS](other) {
        if (!other instanceof Task) return false;

        return this.#id === other.id;
    }
}

