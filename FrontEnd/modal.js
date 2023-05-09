
import {genererProjets} from "/acceuil.js";
import {projets} from "/acceuil.js";

const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const modalButton = document.querySelector(".open-modal-2")

modalTriggers.forEach(trigger =>trigger.addEventListener('click', toggleModal))

function toggleModal(){
    modalContainer.classList.toggle("active")
    document.querySelector('.modal').style.display=null;
    document.querySelector('.modal2').style.display='none';
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

    const galleryEdit = document.querySelector(".gallery-edit");
    
        json.forEach(element => {
 
            if (!galleryEdit.querySelector(`[data-id="${element.id}"]`)) {
            const figureElement = document.createElement("figure");
            const imageElement = document.createElement("img");
            imageElement.src = element.imageUrl;
            imageElement.alt = element.title;
            const editerTitre = document.createElement("figcaption");
            editerTitre.innerHTML="éditer";
            const iconMove = document.createElement("button");
            iconMove.className="fa-solid fa-arrows-up-down-left-right";
 
 
            const iconPoubelle = document.createElement("button");
            iconPoubelle.className="fa-regular fa-trash-can";
            iconPoubelle.addEventListener("click", function() {
                const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer ce projet ?"); // Ajout du message de confirmation
                if (confirmDelete) {
                    supprimerProjet(element.id, iconPoubelle, figureElement);
                }
            });

            figureElement.dataset.id = element.id;
 
            galleryEdit.appendChild(figureElement);
            figureElement.appendChild(imageElement);
            figureElement.appendChild(editerTitre);
            figureElement.appendChild(iconPoubelle);
            figureElement.appendChild(iconMove);
        }
    });
}
 
//supprimer elements sur page d'acceuil et modale dynamiquement

const projetAcceuil = document.querySelector('.projetAcceuil')

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
           figureElement.remove();

            console.log(projetAcceuil)
            // projetAcceuil.remove();
 
            const projets = await getData()
             ocument.querySelector(".gallery").innerHTML=""
            genererProjets(projets)
 
            console.log(projets)

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

modalButton.addEventListener("click", modalAjouterPhotos)

async function modalAjouterPhotos() {
    document.querySelector('.modal').style.display='none';
    document.querySelector('.modal2').style.display=null;
}

// Retour vers la première modale

const switchModal = document.querySelector('.switch-modal')
switchModal.addEventListener("click", switchModal1)

async function switchModal1(){
    document.querySelector('.modal').style.display=null;
    document.querySelector('.modal2').style.display='none';
}

// Visuel de la photo a ajouter qui s'affiche si critères okay

const fileInput = document.getElementById('file-upload');
const iconForm = document.querySelector('.fa-image');
const boutonForm = document.getElementById('upload-button')
const textForm = document.querySelector('.text-form')
const imagePreview = document.getElementById('image');

// custom alertes 
const photoAlert = document.getElementById('alert');

fileInput.addEventListener('change', (event) => {

  let file = event.target.files[0];

  //verification taille
  const fileSize = file.size;
  const maxFileSize = 4 * 1024 * 1024;
  if (fileSize > maxFileSize) {

    photoAlert.innerHTML = 'Le fichier sélectionné est trop volumineux.';
    photoAlert.style.display = 'block';

    fileInput.value = ''; // Efface le fichier sélectionné 
    imagePreview.src = '';

  }else{

    photoAlert.style.display = 'none';
  const reader = new FileReader();
  reader.onload = (event) => {
    imagePreview.src = event.target.result;
    //masquer le reste
    iconForm.style.display = 'none'
    boutonForm.style.display = 'none'
    textForm.style.display = 'none'
    fileInput.style.display = 'none'
  };

  reader.readAsDataURL(file);
    }
});

//Envoie API

const champsRequired = document.querySelector('.alert-2');
const successfullyAdded = document.querySelector('.alert-3')
const notAdded = document.querySelector('.alert-4')

async function newWorks(){
    const addWorks = document.getElementById('upload-form');
    const titleInput = document.getElementById('titre');
    const categoryInput = document.getElementById('categorie');
    const fileInput = document.getElementById('file-upload');
    const submitButton = document.querySelector('.validatePictures');

    function updateSubmitButton() {
        if (titleInput.value !== '' && categoryInput.value !== '' && fileInput.files.length > 0) {
          submitButton.classList.remove('disabled');
          submitButton.style.backgroundColor = '#1D6154';
        } else {
          submitButton.classList.add('disabled');
          submitButton.style.backgroundColor = '#cbc9c977';
        }
    }

    titleInput.addEventListener('input', updateSubmitButton);
    categoryInput.addEventListener('change', updateSubmitButton);
    fileInput.addEventListener('change', updateSubmitButton);

    //Recuperer les catégories de manière dynamique et plus en html.
    categoryInput.addEventListener('focus', async () => {
        const categorySelect = document.getElementById("categorie");
        const response = await fetch("http://localhost:5678/api/categories");
        if (response.ok) {
          const categories = await response.json();
          categorySelect.innerHTML = ""; //Pour éviter les doublons
          categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category.id;
            option.text = category.name;
            categorySelect.appendChild(option);
          });
        } else {
          console.log("Erreur lors de la récupération des catégories");
        }
    });

    addWorks.addEventListener('submit', async(e) =>{
        e.preventDefault();

        if (submitButton.classList.contains('disabled')) {
            champsRequired.innerHTML = 'Veuillez remplir tout les champs.';
            champsRequired.style.display = 'block';
            return;
        }
    
        const title = document.getElementById('titre').value;
        const category = document.getElementById('categorie').value;
        const image = fileInput.files[0];

        console.log(title)
        console.log(category)

        champsRequired.style.display = 'none';
        const reader = new FileReader();
        reader.onload = async () => {

            const formData = new FormData();
        formData.append('image', image);
        formData.append('title', title);
        formData.append('category', category);

        console.log(image)
    
            try{
                const reponse = await fetch("http://localhost:5678/api/works", {
                    method: "POST",
                    body: formData,
                    headers: {
                        'accept': 'application/json',
                        "Authorization": "Bearer " + sessionStorage.getItem("token"),
                   },
                });
                if (reponse.ok){
                    successfullyAdded.innerHTML = 'Projet ajouté avec succès.';
                    successfullyAdded.style.display = 'block';

                    const projets = await getData()
                    document.querySelector(".gallery").innerHTML=""
                    genererProjets(projets)
                    editerGallery();
                
                    titleInput.value = '';
                    categoryInput.value = '';
                    fileInput.value = '';
                    imagePreview.src = '';

                    // Réafficher le formulaire photo
                    iconForm.style.display = null
                    boutonForm.style.display = null
                    textForm.style.display = null
                    fileInput.style.display = null

                     // Masquer le message de succès après 2 secondes
                    setTimeout(() => {
                    successfullyAdded.style.display = 'none';
                    }, 2000);

                } else {
                    notAdded.innerHTML = 'Erreur lors de l\'envoi du projet.';
                    notAdded.style.display = 'block';
                }
            } catch (error) {
                console.error(error);
            }
        }

        reader.readAsBinaryString(image);
    }); 
}

newWorks();

// changer boutton du formulaire pour ajouter des photos

const addPhotoButton = document.getElementById('upload-button');
const fileUploadInput = document.getElementById('file-upload');

addPhotoButton.addEventListener('click', () => {
  fileUploadInput.click();
});
