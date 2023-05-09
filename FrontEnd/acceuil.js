// Récupération des projets depuis l'API //
async function getData(){
    const reponseProjets = await fetch('http://localhost:5678/api/works/');
    return reponseProjets.json();
}

const projets = await getData()

export{ getData, genererProjets };

// Génération des projets //
async function genererProjets(projets) {
    for (const projet of projets) {
        const galleryElements = document.querySelector(".gallery");
        const projetElements = document.createElement("figure");
        projetElements.className='projetAcceuil';
        const imageProjet = document.createElement("img");
        imageProjet.src = projet.imageUrl;
        const titreProjet = document.createElement("figcaption");
        titreProjet.innerText = projet.title;

        // Rattachement des elements
        galleryElements.appendChild(projetElements)
        projetElements.appendChild(imageProjet);
        projetElements.appendChild(titreProjet);   
    }
}
genererProjets(projets);

// Récupération des Catégories
const reponseCategories = await fetch('http://localhost:5678/api/categories/');
const categories = await reponseCategories.json();

// Génération des boutons filtres catégories
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



