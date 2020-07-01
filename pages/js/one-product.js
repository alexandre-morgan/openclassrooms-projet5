// Variables pour récupérer les éléments qui vont être modifiés ou ajoutés
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

// Fonction pour afficher les données du produit sélectionné
const displayOneProduct = function(){
    
    imgProduct.setAttribute('src',oneProduct.imageUrl)
    nameProduct.innerHTML = oneProduct.name
    priceProduct.innerHTML = priceFormating(oneProduct.price)
    descriptionProduct.innerHTML = oneProduct.description
    displayCustomization(oneProductParameters[0])
}

// Fonction pour afficher les choix de personnalisation du produit
const displayCustomization = function(categorie){
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

// Function pour vérifier la sélection de la personnalisation
const customizationValidation = function(){
    let choice = customizationProduct.selectedIndex
    if(choice === 0){
        return false
    }else{
        return true
    }
}

// Function d'affichage de l'erreur si aucune personnalisation n'a été choisie
const customizationError = function(){
    customizationProduct.classList.add('border-danger')
    $('#modalNOK').modal('show')
    customizationProduct.addEventListener('change', function(){
        if(customizationProduct.selectedIndex === 0){
            customizationProduct.classList.remove('border-success')
            customizationProduct.classList.add('border-danger')
        }else {
            customizationProduct.classList.remove('border-danger')
            customizationProduct.classList.add('border-success')
        }
    })
}


// Récupérer le produit
const getProduct = function(){
    return getOneProduct(oneProductParameters[0],oneProductParameters[1]).then(function(response){
        oneProduct = JSON.parse(response)
        return oneProduct
    }) 
}

// Ajouter event sur le bouton addToCart
const addEventToAddToCart = function() {
    addToCartBtn.addEventListener('click',function(){
        if(customizationValidation()){
            oneProduct.quantity = selectQuantity.selectedIndex + 1
            oneProduct.category = oneProductParameters[0]
            cartObject.cartUpdate(oneProduct,true)
            nbProductInCart.innerHTML = cartObject.nbProducts
            $('#modalOK').modal('show')
            modalBodyName.innerHTML = oneProduct.name
            }else{
            customizationError()
        }
    })
    
}


// PROGRAMME DE FONCTIONNEMENT (se déroule lorsque la page charge)
nbProductInCart.innerHTML = cartObject.nbProducts

getProduct().then(function(oneProduct){
    displayOneProduct()
    addEventToAddToCart()
}).catch(displayErrorConnection)

