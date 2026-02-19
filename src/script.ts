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
     title: string;
     date: Date;
     importance: string
}

//Create Class Form

class Form {
    private title: string;
    private date: Date;
    private importance: string

    constructor(title: string, date: Date, importance: string) {
        this.title = title;
        this.date = date;
        this.importance = importance;
    }
    public getTitle():string {
        return this.title
    }
    public getDate() :Date {
        return this.date
    }
    public getImportance() :string {
        return this.importance
    }
    public createNewTask() :ITask {
        const newTask = {
            title : this.title,
            date : this.date,
            importance :this.importance
        }
        return newTask
    }
}
//Create interface IGenerate

interface IGenerate{
    generate() :string 
}

//Create interface IBlock
interface IBlock{
    block():void
}
//Create Class Task

class Task {
    private id : string;
    private title : string;
    private date : string;
    private importance : string;
    private isChecked : boolean;
    constructor(id : string, title : string,date : string,importance : string,isChecked : boolean){
        this.id = id;
        this.title = title;
        this.date = date;
        this.importance = importance;
        this.isChecked = isChecked
    }
    public getID(){
        return this.id
    }
}

//Create interface Storage

interface IStorage{
    save(tasks :Task[]):void;
    load():Task[];
}

//Create storage

class Storage implements IStorage{
    private key :string
    constructor(key: string){
        this.key = key
    }
    save(tasks: Task[]): void {
        const LocalTaskArray = JSON.stringify(tasks);
        localStorage.setItem(this.key,LocalTaskArray);
    }
    load(): Task[] {
        const tasks  = localStorage.getItem(this.key) ?? 'string';
        if(!tasks) return []
        const LocalTasks :Task[] = JSON.parse(tasks)
        return LocalTasks
    }

}

//Create Interface IAddToHTML

interface IAddToHTML{
    addToHTML() :void;
    render() :void
}

interface IDelete{
    deleteById() :void ;
}

//Create Interface IFilter

interface IFilter{
    displayFilter() :void ;
}

//Create class ToDoList

class ToDoList{
    private tasks : Task[]
    private storage : IStorage;
    constructor(tasks:Task[],storage:IStorage){
        this.storage = storage
        this.tasks = this.storage.load()
    }
    public deleteLocal(id:string){
        const TaskIndex = this.tasks.findIndex((task) => task.getID() === id)
        this.tasks.splice(TaskIndex,1);
        this.storage.save(this.tasks)
    }
}

