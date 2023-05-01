// Récupération des projets depuis l'API
export const reponseProjets = await fetch('http://localhost:5678/api/works/');
export const projets = await reponseProjets.json();

if(reponseProjets.ok){
    console.log(projets);
}else{
    console.log("Erreur de recupération.");
}

// génération des projets
const galleryElements = document.querySelector(".gallery");

export function genererProjets(projets) {
    if (projets != null){
        console.log("projet n'est pas null")


    for (const projet of projets) {

        const galleryElements = document.querySelector(".gallery");
        const projetElements = document.createElement("figure");
        projetElements.className='projetAcceuil';
        const imageProjet = document.createElement("img");
        imageProjet.src = projet.imageUrl;
        const titreProjet = document.createElement("figcaption");
        titreProjet.innerText = projet.title;

        // Rattachement des elements
        projetElements.appendChild(imageProjet);
        projetElements.appendChild(titreProjet);
        galleryElements.appendChild(projetElements)

    }
}
else{
    console.log("pas de projets");
}
}
genererProjets(projets);

// Récupération des Catégories
const reponseCategories = await fetch('http://localhost:5678/api/categories/');
const categories = await reponseCategories.json();

// génération des boutons filtres categories
const conteneurFiltre = document.querySelector(".conteneurBtnFiltre");

const filtreTous = document.querySelector(".btnTous");
filtreTous.addEventListener("click", function(){
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(projets);  ; 
});

const filtreObjets = document.querySelector(".btnObjets");
filtreObjets.addEventListener("click", function(){
    const filtre = projets.filter(function(element){
        return element.category.name === "Objets"
    });
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(filtre);;
});

const filtreAppartements = document.querySelector(".btnAppartements");
filtreAppartements.addEventListener("click", function(){
    const filtre = projets.filter(function(element){
        return element.category.name === "Appartements"
    });
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(filtre);;
});

const filtreHotelsEtRestaurants = document.querySelector(".btnHotelsEtRestaurants");
filtreHotelsEtRestaurants.addEventListener("click", function(){
    const filtre = projets.filter(function(element){
        return element.category.name === "Hotels & restaurants"
    });
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(filtre);;
});



