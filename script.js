/* ajout de la fonction du popup*/


let popup = document.querySelector("#popupoverlay");
function togglePopup() {

    popup.classList.toggle("open")
}

function removeclass() {
    popup.classList.remove("open");
};

/*ajout de la fonction de création des notes */
const local = JSON.parse(localStorage.getItem("notes"));

let ajout = document.querySelector(".buttonajout");
let annuler = document.querySelector(".buttonannuler");

ajout.onclick = () => {
    const note = {
        titre: titre.value,
        datededebut: datededebut.value,
        datefin: datefin.value,
        categorie: categorie.value,
        fait: fait.value,
        description: description.value,
        remarque: remarques.value,
    };
    localStorage.setItem("notes", JSON.stringify(note));
    document.location.reload();
}

let titrenote = document.querySelector(".titrenotes")


/* test création des notes*/
const todolist = document.querySelector('#todo');
const li = document.createElement("li");

li.innerHTML = `Titre de la note : ${local.titre} Date de début : ${local.datededebut}  Date de fin : ${local.datefin} <br>
Description: <br> ${local.description} <br> Remarques : <br> ${local.remarque} 
<input type="checkbox" , class="checkboxround" name="faitpasfait" value="off">`;

todolist.appendChild(li);

/*fonction pour valider la checkbox */
let checkbox = document.querySelectorAll(".checkboxround");
let casfait = document.getElementById("fait");


/* FONCTIONS POUR LA TO DO LIST //

Fonction du bouton "Ajouter" : 
1)Ouvrir le pop up pour créer une note; X
2) Créer des notes (setItem); X
3)Les lire (getItem); X
4)Remplir les notes avec la valeur du localStorage correspondante; X
5)Créer individuellement les notes (si 1 note crée seulement 1 note affichée si 99 notes crées affichées les 99);

Fonctions pour le bouton "Affichage priorité":
1)Filtrer les notes soit par importances soit par date;
2)Changer l'affichage en fonction du mode choisi;

Fonctions pour les notes:
1)Pouvoir consulter la note;
2)Pouvoir modififer la note tant qu'elle n'est pas terminée;
3)Pouvoir supprimer la note;
4)Ne peux plus pouvoir modifier la note une fois qu'elle est terminée sauf la remarque;
5)Ouverture d'un pop up pour enregistrer la modification;
6)Ouverture d'un pop up pour valider la suppression;

Fonction pour la checkbox:
1)Si la checkbox est "checked" alors la note doit etre considérée comme faites (fait = on); */
