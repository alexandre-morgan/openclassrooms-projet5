// Fonction pour créer une requête http valide sur tous les navigateurs
var getHttpRequest = function (){
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        httpRequest = new XMLHttpRequest();
        if (httpRequest.overrideMimeType) {
          httpRequest.overrideMimeType('text/xml');
        }
    }
    else if (window.ActiveXObject) { // IE
        try {
          httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
          try {
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
          }
          catch (e) {}
        }
    }
    
    if (!httpRequest) {
        alert('Abandon :( Impossible de créer une instance XMLHTTP');
        return false;
    }
    
    return httpRequest
}

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

let oneProductParameters = extractUrlParams()
console.log(oneProductParameters)

var oneProduct

let request = new getHttpRequest()
request.open('GET','http://localhost:3000/api/' + oneProductParameters[0] + '/' + oneProductParameters[1],false)
request.onreadystatechange = function(){
    if(request.readyState === 4 && request.status === 200){
        let results = JSON.parse(request.responseText)
        oneProduct = results
    }else{
        alert('Problème de connexion avec le server')
    }
}
request.send()

console.log(oneProduct)

let imgProduct = document.getElementById('imgProduct')
let nameProduct = document.getElementById('name')
let priceProduct = document.getElementById('price')
let descriptionProduct = document.getElementById('description')
let customizationProduct = document.getElementById('inputCustomization')
let nbProductInCart = document.getElementById('nbProductInCart')

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


let cartAddingButton = document.getElementById('cart')
cartAddingButton.addEventListener('click',function(){
    if(localStorage.getItem('cartNumber') === null){
        localStorage.setItem('cartNumber',0)
        Add1ToCartCounter()
        addProductToCart()
        alert(oneProduct.name + ' a bien été ajouté à votre panier')
        console.log(localStorage)
    }else{
        Add1ToCartCounter()
        addProductToCart()
        alert(oneProduct.name + ' a bien été ajouté à votre panier')
        console.log(localStorage)
    }
    displayCartQuantity()
})

let test = document.getElementById('test')

var addProductToCart = function(){
    let indice = localStorage.getItem('cartNumber')
    localStorage.setItem('product_' + indice,oneProductParameters)
    test.innerHTML = localStorage.getItem('product_' + indice)
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

displayOneProduct()
displayCartQuantity()
