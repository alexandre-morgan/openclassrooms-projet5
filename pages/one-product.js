// Variables
let imgProduct = document.getElementById('imgProduct')
let nameProduct = document.getElementById('name')
let priceProduct = document.getElementById('price')
let descriptionProduct = document.getElementById('description')
let customizationProduct = document.getElementById('inputCustomization')
let selectQuantity = document.getElementById('selectQuantity')
let nbProductInCart = document.getElementById('nbProductInCart')
let oneProduct
let oneProductParameters = extractUrlParams()
let addToCartBtn = document.getElementById('cart')
let modalBodyName = document.getElementById('modal-body-name')
let continueBtn = document.getElementById('continueBtn')

// Fonction pour extraire les paramètres de l'url :
function extractUrlParams () {
    let t = location.search.substring(1).split('&');
    let f = [];
    for (let i = 0; i < t.length; i++) {
        let x = t[ i ].split('=');
        f[i] = x[1]
    }
    return f;
    }

// Afficher les données du produit sélectionné
var displayOneProduct = function(){
    
    imgProduct.setAttribute('src',oneProduct.imageUrl)
    nameProduct.innerHTML = oneProduct.name
    priceProduct.innerHTML = oneProduct.price/100 + ' €'
    descriptionProduct.innerHTML = oneProduct.description
    displayCustomization(oneProductParameters[0])
}

// Fonction pour afficher les choix de personnalisation du produit
var displayCustomization = function(categorie){
    let customChoices
    let option
    switch(categorie){
        case 'teddies':
            customChoices = oneProduct.colors
            option = document.createElement('option')
            option.innerHTML = 'Couleurs'
            option.setAttribute('selected', true)
            customizationProduct.appendChild(option)
            for(let i = 0; i < customChoices.length; i++){
                option = document.createElement('option')
                option.innerHTML = customChoices[i]
                customizationProduct.appendChild(option)
            }
            break;
        case 'cameras':
            customChoices = oneProduct.lenses
            option = document.createElement('option')
            option.innerHTML = 'Lentilles'
            option.setAttribute('selected', true)
            customizationProduct.appendChild(option)
            for(let i = 0; i < customChoices.length; i++){
                option = document.createElement('option')
                option.innerHTML = customChoices[i]
                customizationProduct.appendChild(option)
            }
            break;
        case 'furniture':
            customChoices = oneProduct.varnish
            option = document.createElement('option')
            option.innerHTML = 'Vernis'
            option.setAttribute('selected', true)
            customizationProduct.appendChild(option)
            for(let i = 0; i < customChoices.length; i++){
                option = document.createElement('option')
                option.innerHTML = customChoices[i]
                customizationProduct.appendChild(option)
            }
            break;
    }
}


// Afficher la quantité du panier
var displayCartQuantity = function(){
    nbProductInCart.innerHTML = localStorage.getItem('cartNumber')
    console.log(localStorage.getItem('cartNumber'))    
}



// console.log(oneProduct)

// Récupérer le produit
var getProduct = function(){
    return getOneProduct(oneProductParameters[0],oneProductParameters[1]).then(function(response){
        oneProduct = JSON.parse(response)
        return oneProduct
    })
}



// PROGRAMME DE FONCTIONNEMENT

getProduct().then(function(oneProduct){
    displayOneProduct()
    nbProductInCart.innerHTML = cartObject.nbProducts
})

addToCartBtn.addEventListener('click',function(){
    if(customizationValidation()){
        oneProduct.quantity = selectQuantity.selectedIndex + 1
        addToCart(cartObject,oneProduct)
        nbProductInCart.innerHTML = cartObject.nbProducts
        $('#modalOK').modal('show')
        modalBodyName.innerHTML = oneProduct.name
        }else{
        $('#modalNOK').modal('show')
    }
})


var addProductToCart = function(){
    let indice = localStorage.getItem('cartNumber')
    localStorage.setItem('product_' + indice,oneProductParameters)
}

var Add1ToCartCounter= function(){
    let quantity = localStorage.getItem('cartNumber')
    quantity++
    localStorage.setItem('cartNumber',quantity)
}

let cartResetBtn = document.getElementById('cartReset')

cartResetBtn.addEventListener('click', function(){
    localStorage.clear()
    displayCartQuantity()
})

var customizationValidation = function(){
    let choice = customizationProduct.selectedIndex
    if(choice === 0){
        return false
    }else{
        return true
    }
}

displayCartQuantity()


    // if(localStorage.getItem('cartNumber') === null){
    //     localStorage.setItem('cartNumber',0)
    //     if(customizationValidation()){
    //         Add1ToCartCounter()
    //         addProductToCart()
    //         alert(oneProduct.name + ' a bien été ajouté à votre panier')
    //         console.log(localStorage)    
    //     }else{
    //         alert('Veuillez choisir une personnalisation.')
    //     }
    // }else{
    //     if(customizationValidation()){
    //         Add1ToCartCounter()
    //         addProductToCart()
    //         alert(oneProduct.name + ' a bien été ajouté à votre panier')
    //         console.log(localStorage)
    //     }else{
    //         alert('Veuillez choisir une personnalisation.')
    //     }
    // }
    // displayCartQuantity()
