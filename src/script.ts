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

//Create interface IGenerate

interface IGenerate {
    generate(): string;
}
//Create interface IArrayStock

interface IArrayStock {
    saveInArray(array: ITask[]): void;
}
//Create Class Task

class Task implements IAddToHTML, IArrayStock {
    private id: string;
    private form: Form;
    private isChecked: boolean;
    constructor(id: string, form: Form, isChecked: boolean) {
        this.id = id;
        this.form = form;
        this.isChecked = isChecked;
    }
    saveInArray(array: ITask[]): void {
        const task = {
            id: this.id,
            title: this.form.getTitle(),
            date: this.form.getDate(),
            importance: this.form.getImportance(),
            isChecked: this.isChecked,
        };
        array.push(task);
    }

    addToHTML(List: HTMLElement): void {
        const newCard = document.createElement("li");
        newCard.innerHTML = `
             <li class="border shadow-lg border-gray-200 p-4 flex justify-between rounded-2xl dark:shadow-gray-800" data-id = ${this.id}>
                    <p>
                        Titre:${this.form.getTitle()} <br>
                        Date :${this.form.getDate()}<br>
                        Importance :${this.form.getImportance()} <br>
                    </p>
                    <div class="flex flex-col items-center cursor-pointer gap-3">
                    <label  for="taskDone">
                        <input type="checkbox" class="custom-checkbox" id="taskDone">
                    </label>
                    <button class="deleteButton"> <i class="fa-solid fa-x"></i> </button>
                    </div>
                </li>
        `;
        List.appendChild(newCard);
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
}

//Create interface Storage

interface IStorage {
    save(tasks: Task[]): void;
    load(): Task[];
}

//Create storage

class Storage implements IStorage {
    private key: string;
    constructor(key: string) {
        this.key = key;
    }
    save(tasks: Task[]): void {
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

//Create Interface IAddToHTML

interface IAddToHTML {
    addToHTML(inHtml: HTMLElement): void;
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

class ToDoList implements IDisplayStorage, IDelete, IFilter {
    private tasks: Task[];
    private storage: IStorage;
    constructor(tasks: Task[], storage: IStorage) {
        this.storage = storage;
        this.tasks = this.storage.load();
    }
    displayFilter(): void {
        //Filter date and priority
        this.tasks.sort((a: Task, b: Task) => {
            //Filter date
            const dateFiltered = b.getTaskDate().localeCompare(a.getTaskDate());
            if (!dateFiltered) return dateFiltered;
            //Filter priority
            const priority = (task: Task): number => {
                const cat = task.getTaskImportance().toLowerCase();
                if (cat.includes("urgent")) return 3;
                if (cat.includes("important")) return 2;
                if (cat.includes("facultatif")) return 1;
                return 0;
            };
            return priority(b) - priority(a);
        });
    }
    public deleteLocal(id: string) {
        const TaskIndex = this.tasks.findIndex((task) => task.getID() === id);
        this.tasks.splice(TaskIndex, 1);
        this.storage.save(this.tasks);
    }

    deleteById(card: HTMLElement): boolean {
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
        this.tasks.forEach((task) => {
            const newCard = document.createElement("li");
            newCard.innerHTML = `
             <li class="border shadow-lg border-gray-200 p-4 flex justify-between rounded-2xl dark:shadow-gray-800" data-id = ${task.getID()}>
                    <p>
                        Titre:${task.getTaskTitle()} <br>
                        Date :${task.getTaskDate()}<br>
                        Importance :${task.getTaskImportance()} <br>
                    </p>
                    <div class="flex flex-col items-center cursor-pointer gap-3">
                    <label  for="taskDone">
                        <input type="checkbox" class="custom-checkbox" id="taskDone">
                    </label>
                    <button class="deleteButton"> <i class="fa-solid fa-x"></i> </button>
                    </div>
                </li>
        `;
            list.appendChild(newCard);
        });
    }
}

