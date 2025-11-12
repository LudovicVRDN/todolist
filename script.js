/* ajout de la fonction du popup*/

function togglePopup(){
    let popup = document.querySelector("#popupoverlay");
    popup.classList.toggle("open")
}

/*Changement de couleur des boutons*/

let boutons = document.querySelectorAll('.bouton');

boutons.forEach(bouton => {
    boutons.addEventListener('click',() => {
        boutons.classList.toggle('fait');
    });
});
