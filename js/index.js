import { createTasks, CrossOutAndDeleteTheTask, createMarkupToLocalStorage } from './function.js'

const refs = {
    btnEl : document.getElementById('addBtn'),
    ulEl : document.getElementById('myUL'),
}

refs.btnEl.addEventListener('click', createTasks);
refs.ulEl.addEventListener('click', CrossOutAndDeleteTheTask);
window.addEventListener('DOMContentLoaded', createMarkupToLocalStorage);


