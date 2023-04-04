import { save, parseLocalStorage } from "./storage.js";

const refs = {
    inputEl : document.getElementById('myInput'),
    ulEl : document.getElementById('myUL'),
}

const STORAGE_KEY = 'task';
let currentId = 0;

function createTasks () {
    const task = refs.inputEl.value.trim();
    refs.inputEl.value = "";

    if(task === "") {
        alert('incorrect');
        return;
    }

    createLi(task);
    addTasksToLocalStor(task);
}

function createLi (task, isDone, id = currentId) {
    const liEl = document.createElement('li');
    const pEl = document.createElement('p');

    pEl.textContent = task;
    liEl.dataset.id = id;

    if (isDone) liEl.classList = 'checked';

    liEl.appendChild(pEl);
    refs.ulEl.appendChild(liEl);
    createCloseElement(liEl);
}

function createCloseElement (elem) {
    const span = document.createElement('span');
    const text = document.createTextNode('\u00D7');
    span.classList.add('close');

    span.appendChild(text);
    elem.appendChild(span);
}

function CrossOutAndDeleteTheTask ({ target }) {
    const currentTarget = parseLocalStorage(STORAGE_KEY);
    if(target.nodeName === 'P') {
        target.classList.toggle('checked');

        //delete element of array;
        const taskIndex = currentTarget.
        findIndex((tasks) => +tasks.id === +target.parentNode.dataset.id);
        currentTarget[taskIndex].isDone = !currentTarget[taskIndex].isDone;

        save(STORAGE_KEY, currentTarget);
    } else if (target.nodeName === 'SPAN') {
        target.parentNode.remove();

        const taskIndex = currentTarget.
        findIndex((tasks) => +tasks.id === +target.parentNode.dataset.id);
        currentTarget.splice(taskIndex, 1);

        save(STORAGE_KEY, currentTarget);
    }
}

function createTasksObj (text, isDone) {
    return {
        text,
        isDone,
        id : currentId,
    }
}

function addTasksToLocalStor (text, isDone = false) {
    const currentState = parseLocalStorage(STORAGE_KEY);

    if (currentState === undefined) {
        const arr = [createTasksObj(text, isDone)];
        save(STORAGE_KEY, arr);
    } else {
        currentState.push(createTasksObj(text, isDone));
        save(STORAGE_KEY, currentState);
    }

    currentId += 1;
}

function createMarkupToLocalStorage () {
    const currentState = parseLocalStorage(STORAGE_KEY);
    if(currentState) {
        currentState.forEach(({ text }) => {
            createLi(text);
        });
    }
}

export { createTasks, CrossOutAndDeleteTheTask, createMarkupToLocalStorage };