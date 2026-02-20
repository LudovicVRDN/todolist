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

//Create Task Interface

interface ITask {
    id: string;
    title: string;
    date: string;
    importance: string;
    isChecked: boolean;
}

//Create Interface IFormCheck

interface IFormCheck {
    checkInput(): void;
}

//Create Class Form

class Form implements IFormCheck {
    private title: string;
    private date: string;
    private importance: string;

    constructor(title: string, date: string, importance: string) {
        this.importance = importance;
        this.title = title;
        this.date = date;
    }
    checkInput(event?: Event): boolean {
        const errors: string[] = [];
        if (!this.title) {
            errors.push("Le titre n'est pas valable ! ");
        } else if (!this.date) {
            errors.push("La date n'est pas indiquée !");
        } else if (!this.importance) {
            errors.push("L'importance n'est pas indiquée !");
        }
        if (errors.length > 0) {
            if (event) event.preventDefault();
            errors.forEach((error) => {
                alert(`${error}`);
                return false;
            });
        }
        return true;
    }
    public getTitle(): string {
        return this.title;
    }
    public getDate(): string {
        return this.date;
    }
    public getImportance(): string {
        return this.importance;
    }
}

//Create interface IArrayStock

interface IArrayStock {
    saveInArray(task: Task): void;

}
//Create Class Task

class Task  {
    private id: string;
    private form: Form;
    private isChecked: boolean;
    constructor(id: string, form: Form, isChecked: boolean) {
        this.id = id;
        this.form = form;
        this.isChecked = isChecked;
    }

 
    public getID() {
        return this.id;
    }
    public getTaskTitle(): string {
        return this.form.getTitle();
    }
    public getTaskDate(): string {
        return this.form.getDate();
    }
    public getTaskImportance(): string {
        return this.form.getImportance();
    }
    public getIsChecked(): boolean {
        return this.isChecked;
    }
    public setIsChecked(value: boolean): void {
        this.isChecked = value;
    }
}

//Create interface Storage

interface IStorage {
    save(tasks: ITask[]): void;
    load(): Task[];
}

//Create storage

class ToDoStorage implements IStorage {
    private key: string;
    constructor(key: string) {
        this.key = key;
    }
    save(tasks: ITask[]): void {
        const LocalTaskArray = JSON.stringify(tasks);
        localStorage.setItem(this.key, LocalTaskArray);
    }
    load(): Task[] {
        const tasks = localStorage.getItem(this.key) ?? "";
        if (!tasks) return [];
        const LocalTasks: ITask[] = JSON.parse(tasks);
        return LocalTasks.map((t) => {
            const form = new Form(t.title, t.date, t.importance);
            return new Task(t.id, form, t.isChecked); // vraies instances Task
        });
    }
}
//CreateInterface IDisplayStorage

interface IDisplayStorage {
    render(list: HTMLElement): void;
}

interface IDelete {
    deleteById(card: HTMLElement): boolean;
}

//Create Interface IFilter

interface IFilter {
    displayFilter(): void;
}

//Create class ToDoList

class ToDoList implements IDisplayStorage, IDelete, IFilter, IArrayStock {
    private tasks: Task[];
    private storage: IStorage;
    constructor(tasks: Task[], storage: IStorage) {
        this.storage = storage;
        this.tasks = this.storage.load();
    }
    public updateStorage(): void {
        const flatTasks: ITask[] = this.tasks.map((t) => ({
            id: t.getID(),
            title: t.getTaskTitle(),
            date: t.getTaskDate(),
            importance: t.getTaskImportance(),
            isChecked: t.getIsChecked()
        }));
        this.storage.save(flatTasks);
    }
    public saveInArray(task: Task): void {
        this.tasks.push(task);
    
        this.updateStorage()
        
    }
    public displayFilter(): void {
        //Filter date and priority
        this.tasks.sort((a: Task, b: Task) => {
            //Filter priority
            const priority = (task: Task): number => {
                const cat = task.getTaskImportance().toLowerCase();
                if (cat.includes("urgent")) return 3;
                if (cat.includes("important")) return 2;
                if (cat.includes("facultatif")) return 1;
                return 0;
            }
                //Filter date
                const priorityOrder = priority(b) - priority(a);
                if (priorityOrder !== 0) return priorityOrder;
                return b.getTaskDate().localeCompare(a.getTaskDate());

            });
    }
    public getTaskById(card: HTMLElement): Task | undefined {
        const cardID = card.dataset.id;
        return this.tasks.find((task) => task.getID() === cardID)
    }
    public deleteLocal(id: string) {
        const TaskIndex = this.tasks.findIndex((task) => task.getID() === id);
        this.tasks.splice(TaskIndex, 1);
        this.updateStorage()
    }

    public deleteById(card: HTMLElement): boolean {
        const cardID = card.dataset.id;
        if (!cardID) return false;
        if (this.tasks.filter((todo) => todo.getID() === cardID)) {
            card.remove();
            this.deleteLocal(cardID);
            return true;
        } else {
            return false;
        }
    }
    public render(list: HTMLElement): void {
        this.tasks = this.storage.load();
        this.displayFilter()
        list.innerHTML =''
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
const importanceInput = document.querySelector("#importance") as HTMLInputElement;
const titleInput = document.querySelector("#title") as HTMLInputElement;
const dateInput = document.querySelector("#date") as HTMLInputElement;
//Select ul in HTML
const todoList = document.querySelector('ul') as HTMLElement;
//Select form in HTML
const form = document.querySelector('form') as HTMLFormElement
//Select validateBttn in HTML
const validateBttn = document.querySelector('#validate') as HTMLButtonElement;
//Create newStorage
const StorageLocal = new ToDoStorage('key')
//Create taskArray
const taskArray: Task[] = []
//Create newToDoList
const taskList = new ToDoList(taskArray, StorageLocal)
//Create generateID
const generateId = (): string => crypto.randomUUID();
//Create validateBool
const validateBool: boolean = false
//DarkMode
const boutton = document.querySelector(".darkMode") as HTMLButtonElement;
const html = document.querySelector('html') as HTMLElement;

boutton.addEventListener('click', () => {
    html.classList.toggle('dark');
    if (html.classList.contains('dark')) {
        boutton.innerText = 'Light Mode ☀️'
    } else if (!html.classList.contains('dark')) {
        boutton.innerText = 'Dark Mode 🌙'
    }
})
form?.addEventListener("submit", (e) => {
    e.preventDefault()
    //Create newForm
    const toDoForm = new Form(titleInput.value, dateInput.value, importanceInput.value)
    if (toDoForm.checkInput()) {
        const taskToDo = new Task(generateId(), toDoForm, validateBool)
        
        taskList.saveInArray(taskToDo)
        taskList.render(todoList);
       
        form.reset()

    } else {
        return false
    }

})
todoList.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const card = target.closest('li') as HTMLElement;
    if (!card) return;
    if (target.closest(".deleteButton")) {
        taskList.deleteById(card)
    }
    if (target.closest('.custom-checkbox')) {
        const checkbox = target as HTMLInputElement;
        if (checkbox.checked) {
            checkbox.disabled = true;

            const task = taskList.getTaskById(card);
            if (task) {
                task.setIsChecked(true);
                taskList.updateStorage();
            }
        }

    }
})



const cacherBouton = document.querySelector('#hide') as HTMLButtonElement;
cacherBouton.addEventListener('click', () => {
    if (form.classList.contains("flex")) {
        form.classList.add('hidden');
        form.classList.remove('flex');
    }
    else {
        form.classList.add('flex')
        form.classList.remove('hidden')
    }

})
document.addEventListener("DOMContentLoaded", () => {
    taskList.render(todoList)
})
