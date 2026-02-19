/*//ETAPE 1 : initialisation des variables
let ajout = document.querySelector(".buttonajout");

//ETAPE 2 : declaration des fonctions

function addNote(){
    //a l'ajout d'une note
}

function getID(){
    const ID = JSON.parse(localStorage.getItem("ID")) || 0;
    localStorage.setItem("ID", JSON.stringify(ID+1));
    return ID;
}

function togglePopup() {
    let popup = document.querySelector("#popupoverlay");
    popup.classList.toggle("open")
}

function removeclass() {
    let popup = document.querySelector("#popupoverlay");
    popup.classList.remove("open");
};

ajout.onclick = () => {
    const note = {
        titre: titre.value,
        datededebut: datededebut.value,
        datefin: datefin.value,
        categorie: categorie.value,
        fait: fait.value,
        description: description.value,
        remarque: remarques.value,
        id: getID()
    };


    //attention, on doit pouvoir ajouter. Actuellement on ecrase.
    /*
        1. recup les données du localStorage (bien sous la forme d'une liste)
        2. ajouter la note qu'on vient de créer a la liste
        3. enregistrer dans le localStorage la liste mise a jour
    */
 /*   json = localStorage.getItem("notes"); //ca marche pas, attention a bien transformer en liste

    if(json == null){
        listeNotes = [];
    }else{
        listeNotes = JSON.parse(json);
    }
    listeNotes.push(note)

    localStorage.setItem("notes", JSON.stringify(listeNotes));

    document.location.reload();
}

function addtoHTLM(){
    let local = JSON.parse(localStorage.getItem("notes"));
    let todolist = document.querySelector('#todo');

    local.forEach(note => {
        /* test création des notes*/
   /*     let li = document.createElement("li");

        li.innerHTML = `Titre de la note : ${note.titre} Date de début : ${note.datededebut}  Date de fin : ${note.datefin} <br>
        Description: <br> ${note.description} <br> Remarques : <br> ${note.remarque} 
        <input type="checkbox" , class="checkboxround" name="faitpasfait" value="off">`;

        todolist.appendChild(li);
    });

}*/

const boutton = document.querySelector(".darkMode");
const html = document.querySelector('html');

boutton.addEventListener('click' ,() => { 
    html.classList.toggle('dark');
    if(html.classList.contains('dark')){
        boutton.innerText = 'Light Mode ☀️'
    }else if (!html.classList.contains('dark')){
        boutton.innerText ='Dark Mode 🌙'
    }
})

const cacherBouton = document.querySelector('#hide');
const formulaire = document.querySelector('#form');

cacherBouton.addEventListener('click',() =>{
    if(formulaire.classList.contains("flex")){
    formulaire.classList.add('hidden');
    formulaire.classList.remove('flex');
    }
    else{
    formulaire.classList.add('flex')
    formulaire.classList.remove('hidden')
    }

})

