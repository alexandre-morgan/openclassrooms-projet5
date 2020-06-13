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
let customizationProduct = document.getElementById('customization')

var displayOneProduct = function(){
    imgProduct.setAttribute('src',oneProduct.imageUrl)
    nameProduct.innerHTML = oneProduct.name
    priceProduct.innerHTML = oneProduct.price/100 + ' €'
    descriptionProduct.innerHTML = oneProduct.description
}

displayOneProduct()