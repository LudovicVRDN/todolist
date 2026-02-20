"use strict";
/*
Créer une to do list avec un code en POO / TypeScript qui se remplit dynamiquement :
1) Les informations sont entrées par l'utilisateur dans le formulaire prévu,
2) Les informations sont ensuite utilisées pour créer un nouvel objet d'un tableau afin de les stocker en y ajoutant un id.
3) Un tableau visant à stocker via le LocalStorage est crée et est instancié avec le premier tableau?
4) En reprenant les données de l'objet crée via le formulaire une nouvelle "to-do card" est créee.
5) Cette card est implanté dans le HTMl à l'endroit prévu dans une liste (ul / li).
6) Cette liste est triées par ordre d'importance et de date.
7) Un bouton supprimer permettra également de supprimer la tâche de la liste , du tableau et du LocalStorage.
8) Si la to do est validé par la "checkbox" il sera impossible de revenir dessus.
*/
//Create Class Form
class Form {
    title;
    date;
    importance;
    constructor(title, date, importance) {
        this.importance = importance;
        this.title = title;
        this.date = date;
    }
    checkInput(event) {
        const errors = [];
        if (!this.title) {
            errors.push("Le titre n'est pas valable ! ");
        }
        else if (!this.date) {
            errors.push("La date n'est pas indiquée !");
        }
        else if (!this.importance) {
            errors.push("L'importance n'est pas indiquée !");
        }
        if (errors.length > 0) {
            if (event)
                event.preventDefault();
            errors.forEach((error) => {
                alert(`${error}`);
                return false;
            });
        }
        return true;
    }
    getTitle() {
        return this.title;
    }
    getDate() {
        return this.date;
    }
    getImportance() {
        return this.importance;
    }
}
//Create Class Task
class Task {
    id;
    form;
    isChecked;
    constructor(id, form, isChecked) {
        this.id = id;
        this.form = form;
        this.isChecked = isChecked;
    }
    getID() {
        return this.id;
    }
    getTaskTitle() {
        return this.form.getTitle();
    }
    getTaskDate() {
        return this.form.getDate();
    }
    getTaskImportance() {
        return this.form.getImportance();
    }
    getIsChecked() {
        return this.isChecked;
    }
    setIsChecked(value) {
        this.isChecked = value;
    }
}
//Create storage
class ToDoStorage {
    key;
    constructor(key) {
        this.key = key;
    }
    save(tasks) {
        const LocalTaskArray = JSON.stringify(tasks);
        localStorage.setItem(this.key, LocalTaskArray);
    }
    load() {
        const tasks = localStorage.getItem(this.key) ?? "";
        if (!tasks)
            return [];
        const LocalTasks = JSON.parse(tasks);
        return LocalTasks.map((t) => {
            const form = new Form(t.title, t.date, t.importance);
            return new Task(t.id, form, t.isChecked); // vraies instances Task
        });
    }
}
//Create class ToDoList
class ToDoList {
    tasks;
    storage;
    constructor(tasks, storage) {
        this.storage = storage;
        this.tasks = this.storage.load();
    }
    updateStorage() {
        const flatTasks = this.tasks.map((t) => ({
            id: t.getID(),
            title: t.getTaskTitle(),
            date: t.getTaskDate(),
            importance: t.getTaskImportance(),
            isChecked: t.getIsChecked()
        }));
        this.storage.save(flatTasks);
    }
    saveInArray(task) {
        this.tasks.push(task);
        this.updateStorage();
    }
    displayFilter() {
        //Filter date and priority
        this.tasks.sort((a, b) => {
            //Filter priority
            const priority = (task) => {
                const cat = task.getTaskImportance().toLowerCase();
                if (cat.includes("urgent"))
                    return 3;
                if (cat.includes("important"))
                    return 2;
                if (cat.includes("facultatif"))
                    return 1;
                return 0;
            };
            //Filter date
            const priorityOrder = priority(b) - priority(a);
            if (priorityOrder !== 0)
                return priorityOrder;
            return b.getTaskDate().localeCompare(a.getTaskDate());
        });
    }
    getTaskById(card) {
        const cardID = card.dataset.id;
        return this.tasks.find((task) => task.getID() === cardID);
    }
    deleteLocal(id) {
        const TaskIndex = this.tasks.findIndex((task) => task.getID() === id);
        this.tasks.splice(TaskIndex, 1);
        this.updateStorage();
    }
    deleteById(card) {
        const cardID = card.dataset.id;
        if (!cardID)
            return false;
        if (this.tasks.filter((todo) => todo.getID() === cardID)) {
            card.remove();
            this.deleteLocal(cardID);
            return true;
        }
        else {
            return false;
        }
    }
    render(list) {
        this.tasks = this.storage.load();
        this.displayFilter();
        list.innerHTML = '';
        this.tasks.forEach((task) => {
            const newCard = document.createElement("li");
            newCard.innerHTML = `
             <li class="border shadow-lg border-gray-200 p-4 flex justify-between rounded-2xl dark:shadow-gray-800" data-id = ${task.getID()}>
                    <p>
                        Titre: ${task.getTaskTitle()} <br>
                        Date : ${task.getTaskDate()}<br>
                        Importance : ${task.getTaskImportance()} <br>
                    </p>
                    <div class="flex flex-col items-center cursor-pointer gap-3">
                    <label  for="taskDone">
                        <input type="checkbox" class="custom-checkbox" id="taskDone" ${task.getIsChecked() ? 'checked disabled' : ''}>
                    </label>
                    <button class="deleteButton"> <i class="fa-solid fa-x"></i> </button>
                    </div>
                </li>
        `;
            list.appendChild(newCard);
        });
    }
}
//Select all inputs in HTML
const importanceInput = document.querySelector("#importance");
const titleInput = document.querySelector("#title");
const dateInput = document.querySelector("#date");
//Select ul in HTML
const todoList = document.querySelector('ul');
//Select form in HTML
const form = document.querySelector('form');
//Select validateBttn in HTML
const validateBttn = document.querySelector('#validate');
//Create newStorage
const StorageLocal = new ToDoStorage('key');
//Create taskArray
const taskArray = [];
//Create newToDoList
const taskList = new ToDoList(taskArray, StorageLocal);
//Create generateID
const generateId = () => crypto.randomUUID();
//Create validateBool
const validateBool = false;
//DarkMode
const boutton = document.querySelector(".darkMode");
const html = document.querySelector('html');
boutton.addEventListener('click', () => {
    html.classList.toggle('dark');
    if (html.classList.contains('dark')) {
        boutton.innerText = 'Light Mode ☀️';
    }
    else if (!html.classList.contains('dark')) {
        boutton.innerText = 'Dark Mode 🌙';
    }
});
form?.addEventListener("submit", (e) => {
    e.preventDefault();
    //Create newForm
    const toDoForm = new Form(titleInput.value, dateInput.value, importanceInput.value);
    if (toDoForm.checkInput()) {
        const taskToDo = new Task(generateId(), toDoForm, validateBool);
        taskList.saveInArray(taskToDo);
        taskList.render(todoList);
        form.reset();
    }
    else {
        return false;
    }
});
todoList.addEventListener('click', (e) => {
    const target = e.target;
    const card = target.closest('li');
    if (!card)
        return;
    if (target.closest(".deleteButton")) {
        taskList.deleteById(card);
    }
    if (target.closest('.custom-checkbox')) {
        const checkbox = target;
        if (checkbox.checked) {
            checkbox.disabled = true;
            const task = taskList.getTaskById(card);
            if (task) {
                task.setIsChecked(true);
                taskList.updateStorage();
            }
        }
    }
});
const cacherBouton = document.querySelector('#hide');
cacherBouton.addEventListener('click', () => {
    if (form.classList.contains("flex")) {
        form.classList.add('hidden');
        form.classList.remove('flex');
    }
    else {
        form.classList.add('flex');
        form.classList.remove('hidden');
    }
});
document.addEventListener("DOMContentLoaded", () => {
    taskList.render(todoList);
});
//# sourceMappingURL=script.js.map