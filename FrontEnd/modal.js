
import {genererProjets} from "/acceuil.js";
import {projets} from "/acceuil.js";

const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const modalButton = document.querySelector(".open-modal-2")

modalTriggers.forEach(trigger =>trigger.addEventListener('click', toggleModal))

function toggleModal(){
    modalContainer.classList.toggle("active")
}


// etre administateur pour afficher le mode edition
const admin = sessionStorage.getItem("token");
if(admin){
    console.log(admin); // test

    document.querySelectorAll('.admin').forEach(a => {
        a.style.display=null;
    })

    document.querySelectorAll('.non-admin').forEach(a => {
        a.style.display='none';
    });

} else {
    console.log("erreur de token")
}

//logout
const logout = document.querySelector(".logout");
logout.addEventListener("click", function(){
    sessionStorage.removeItem('token');

    document.querySelectorAll('.admin').forEach(a => {
        a.style.display='none';
    })

    document.querySelectorAll('.non-admin').forEach(a => {
        a.style.display=null;
    })
});



//afficher gallery premiere modale

async function editerGallery(){
    const reponse = await fetch("http://localhost:5678/api/works")
    const json = await reponse.json()
        json.forEach(element => {
 
             const galleryEdit = document.querySelector(".gallery-edit");
             const figureElement = document.createElement("figure");
             const imageElement = document.createElement("img");
             imageElement.src = element.imageUrl;
             imageElement.alt = element.title;
             const editerTitre = document.createElement("figcaption");
             editerTitre.innerHTML="éditer";
 
             const iconPoubelle = document.createElement("button");
             iconPoubelle.className="fa-regular fa-trash-can";
            iconPoubelle.addEventListener("click", function() {
                const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer ce projet ?"); // Ajout du message de confirmation
                if (confirmDelete) {
                    supprimerProjet(element.id, iconPoubelle, figureElement);
                }
           });
 
             galleryEdit.appendChild(figureElement);
             figureElement.appendChild(imageElement);
             figureElement.appendChild(editerTitre);
             figureElement.appendChild(iconPoubelle);
        });
}
 
async function supprimerProjet(id, iconPoubelle, figureElement) {
    try {
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
             method: "DELETE",
             headers: {
                 "Content-Type": "application/json",
                 "Authorization": "Bearer " + sessionStorage.getItem("token"),
            },
        });
        if (response.ok) {
           const galleryElements = document.querySelector(".gallery");
            //galleryElements.innerHTML="";
            
            figureElement.remove(); 
            galleryElements.remove()

            if (projets != null){
                console.log("projet n'est pas null")
        
        
            for (const projet of projets) {
        
                const projetElements = document.createElement("figure");
                const imageProjet = document.createElement("img");
                imageProjet.src = projet.imageUrl;
                const titreProjet = document.createElement("figcaption");
                titreProjet.innerText = projet.title;
        
                // Rattachement des elements
                projetElements.appendChild(imageProjet);
                projetElements.appendChild(titreProjet);
                const gallery = galleryElements.appendChild(projetElements)
                galleryElements.innerHTML += gallery
        
            }
        }
        else{
            console.log("pas de projets");
        }

             console.log("suppression du projet reussie")

        } else {
             console.log("La suppression du projet a échoué.");
        }
    } catch (error) {
         console.error("Erreur lors de la suppression du projet :", error);
    }
}
editerGallery();

 
// Aller vers la deuxieme modale

modalButton.addEventListener("click", ajouterPhotos)

async function ajouterPhotos() {

}

 
