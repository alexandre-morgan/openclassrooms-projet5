// Variables
let categories=['teddies','cameras','furniture']
let allProducts = []
let teddiesList = document.getElementById(categories[0])
let camerasList = document.getElementById(categories[1])
let furnitureList = document.getElementById(categories[2])
let columnForProducs = [teddiesList, camerasList, furnitureList]
let nbProductInCart = document.getElementById('nbProductInCart')
let loading = document.getElementById('loading')





console.log(allProducts)
// Afficher les produits par catégorie
var displayProducts = function (results,list,j){
    loading.innerHTML = ''
    var ul = document.createElement('ul')
    ul.classList.add('list-unstyled')
    list.appendChild(ul)
    for(var i = 0; i < results.length; i++){
        var li = document.createElement('li')
        // Création de la carte
        // Première Div
        var div = document.createElement('div')
        div.classList.add('card')
        // Image
        var img = document.createElement('img')
        img.setAttribute('src',results[i].imageUrl)
        img.classList.add('card-img-top')
        // Deuxième div
        var div2 = document.createElement('div')
        div2.classList.add('card-body')
        // Titre de la carte
        var title = document.createElement('h5')
        title.innerHTML=results[i].name
        title.classList.add('card-title')
        // Description de la carte
        var description = document.createElement('p')
        description.classList.add('card-text')
        description.innerHTML=results[i].price/100 + " €"
        // Lien de la carte
        var lien = document.createElement('a')
        //lien.classList.add('d-none')
        lien.classList.add('stretched-link')
        lien.setAttribute('href','pages/one-product.html'
        + '?categorie=' + categories[j] + '&' + 'id=' + results[i]._id)

        ul.appendChild(li)
        li.appendChild(div)
        div.appendChild(img)
        div.appendChild(div2)
        div2.appendChild(title)
        div2.appendChild(description)
        div2.appendChild(lien)
    }
}

// Afficher tous les produits
var displayAllProducts = function(){
    for(let j = 0; j < categories.length; j++){
        displayProducts(allProducts[j],columnForProducs[j],j)
    }
}


// var getAllProducts = function(){
//     return getProductByCategorie('teddies').then(function(response){
//         allProducts.push(JSON.parse(reponse))
//         console.log(allProducts)
//         return getProductByCategorie('cameras')    
//     }).then(function(response){
//         allProducts.push(JSON.parse(reponse))
//         return getProductByCategorie('furniture')
//     }).then(function(response){
//         allProducts.push(response)
//     })
// }

// PROGRAMME DE FONCTIONNEMENT
let indexParameters = window.location.search
console.log(indexParameters)

getProductByCategorie('teddies').then(function(response){
    switch(indexParameters){
        default:
            displayAllProducts()
            break;
        
        case '?categorie=teddies':
            displayProducts(allProducts[0],columnForProducs[0],0)
            break;
    
        case '?categorie=cameras':
            displayProducts(allProducts[1],columnForProducs[1],1)
            break;
    
        case '?categorie=furniture':
            displayProducts(allProducts[2],columnForProducs[2],2)
            break;
    }
    
})


 


nbProductInCart.innerHTML = cartObject.nbProducts

// Afficher la quantité du panier
console.log(localStorage.getItem('cartNumber'))