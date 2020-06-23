// Variables
let allProducts = []
let categories=['teddies','cameras','furniture']
let teddiesList = document.getElementById(categories[0])
let camerasList = document.getElementById(categories[1])
let furnitureList = document.getElementById(categories[2])
let columnForProducs = [teddiesList, camerasList, furnitureList]
let productsList = document.getElementById('productsList')
let nbProductInCart = document.getElementById('nbProductInCart')
let loading = document.getElementById('loading')


// Afficher les produits par catégorie
var displayProducts = function (results,j,oneOrNot){
    loading.classList.add('d-none')
    // div colonne des produits de la catégorie
    let divCol = document.createElement('div')
    productsList.appendChild(divCol)
    //Titre pour la catégorie
    let catTitle = document.createElement('h3')
    catTitle.classList.add('text-center')
    catTitle.innerHTML = categories[j]
    divCol.appendChild(catTitle)
    // Liste
    let ul = document.createElement('ul')
    divCol.appendChild(ul)
    
    if(oneOrNot){
        divCol.classList.add('col-12','m-auto')
        ul.classList.add('list-unstyled','text-center')
    } else {
        divCol.classList.add('col-12','col-md-4')
        ul.classList.add('list-unstyled')
    }
    for(let i = 0; i < results.length; i++){
        let li = document.createElement('li')
        li.classList.add('list-inline-item')
        ul.appendChild(li)
        // Création de la carte
        // Première Div
        let div = document.createElement('div')
        div.classList.add('card','my-4')
        div.setAttribute('style','width: 18rem;')
        // Div de l'image
        let divImg = document.createElement('div')
        divImg.setAttribute('style','height: 150px;')
        divImg.classList.add('text-center')
        // Image
        let img = document.createElement('img')
        img.setAttribute('src',results[i].imageUrl)
        img.classList.add('h-100')
        // Deuxième div
        let div2 = document.createElement('div')
        div2.classList.add('card-body')
        // Titre de la carte
        let title = document.createElement('h5')
        title.innerHTML=results[i].name
        title.classList.add('card-title')
        // Description de la carte
        let description = document.createElement('p')
        description.classList.add('card-text')
        description.innerHTML=results[i].price/100 + " €"
        // Lien de la carte
        let lien = document.createElement('a')
        //lien.classList.add('d-none')
        lien.classList.add('stretched-link')
        lien.setAttribute('href','pages/one-product.html'
        + '?categorie=' + categories[j] + '&' + 'id=' + results[i]._id)

        
        li.appendChild(div)
        div.appendChild(divImg)
        divImg.appendChild(img)
        div.appendChild(div2)
        div2.appendChild(title)
        div2.appendChild(description)
        div2.appendChild(lien)
 
    }
}

// Afficher tous les produits
var displayAllProducts = function(){
    for(let j = 0; j < categories.length; j++){
        displayProducts(allProducts[j],j,false)
    }
}


// Fonction de récupération de tous les produits
var getAllProducts = function() {
    return getProductsByCategorie('teddies').then(function(response) {
        allProducts.push(JSON.parse(response))
        return getProductsByCategorie('cameras')
    }).then(function(response){
        allProducts.push(JSON.parse(response))
        return getProductsByCategorie('furniture')
    }).then(function(response){
        allProducts.push(JSON.parse(response))
        return allProducts
    })  
}


// PROGRAMME DE FONCTIONNEMENT
let indexParameters = window.location.search
console.log(indexParameters)
// Afficher la quantité du panier
nbProductInCart.innerHTML = cartObject.nbProducts

getAllProducts().then(function(allProducts){
    switch(indexParameters){
        default:
            displayAllProducts()
            break;
        
        case '?categorie=teddies':
            displayProducts(allProducts[0],0,true)
            break;
    
        case '?categorie=cameras':
            displayProducts(allProducts[1],1,true)
            break;
    
        case '?categorie=furniture':
            displayProducts(allProducts[2],2,true)
            break;
    }
}).catch(displayErrorConnection)
