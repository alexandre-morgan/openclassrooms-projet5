let nbProductInCart = document.getElementById('nbProductInCart')

let selectQuantity = document.getElementById('selectQuantity')
let quantity = selectQuantity.value
let addToCart = document.getElementById('cart')

let imgProduct = document.getElementById('imgProduct')
let nameProduct = document.getElementById('name')
let priceProduct = document.getElementById('price')
let descriptionProduct = document.getElementById('description')
let customizationProduct = document.getElementById('inputCustomization')

// Paramètre categorie et id du produit qui permet de faire une requête http
let oneProductParameters 

// Données du produit récupérées par la requête http
let oneProduct

// Tableau pour stocker les produits du panier (récupérés du localStorage)
let productsInCart=[]

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

// Requête http pour récupérer les données du produit
var getProduct = function(categorie,id){
    let request = new getHttpRequest()
    request.open('GET','http://localhost:3000/api/' + categorie + '/' + id,false)
    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200){
            return JSON.parse(request.responseText)
        }else{
            alert('Problème de connexion avec le server')
        }
    }
    request.send()
    return request.onreadystatechange()
}

// Afficher les données du produit sélectionné
var displayOneProduct = function(oneProduct){
    
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

// FONCTIONNEMENT DU PANIER

// Récupérer les données du panier
var getDataFromStorage = function(){
    if(localStorage.length === 0){
        
    }else{
        for(let i = 1; i < localStorage.length; i++){
            productsInCart.push(localStorage.getItem('product_' + [i]))
        }
        for(let i = 0; i < productsInCart.length; i++){
            let vectTemp = productsInCart[i].split(',')
            productsInCart[i] = vectTemp
        }    
    }
    console.log(productsInCart)
}

var add1ToCartLines = function(){
    let cartLines = localStorage.getItem('cartLines')
    cartLines++
    localStorage.setItem('cartLines',cartLines)
}

var displayCartQuantity = function(){
    let sumCart = 0
    if(productsInCart.length === 0){
        nbProductInCart.innerHTML = '0'
    }else{
        for(let i = 0; i < productsInCart.length; i++){
            sumCart += productsInCart[i][2]
        }
        console.log(sumCart)
    }
}






// ROUTINE DE FONCTIONNEMENT
oneProductParameters = extractUrlParams()
console.log(oneProductParameters)
oneProduct = getProduct(oneProductParameters[0],oneProductParameters[1])
console.log(oneProduct)
displayOneProduct(oneProduct)
getDataFromStorage()
displayCartQuantity()

addToCart.addEventListener('click', function(e){
    if(localStorage.length === 0){
        localStorage.setItem('cartLines','1')
        localStorage.setItem('product_' + localStorage.getItem('cartLines'),oneProductParameters + ',' + quantity)
    }else{
        
        add1ToCartLines()
        localStorage.setItem('product_' + localStorage.getItem('cartLines'),oneProductParameters + ',' + quantity)
    }
    console.log(localStorage)
})