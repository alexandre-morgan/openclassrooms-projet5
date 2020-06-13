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

var categories=['teddies','cameras','furniture']
var allProducts = []
var teddiesList = document.getElementById(categories[0])
var camerasList = document.getElementById(categories[1])
var furnitureList = document.getElementById(categories[2])
var columnForProducs = [teddiesList, camerasList, furnitureList]

for(let i = 0; i < categories.length; i++){
    let request = new getHttpRequest()
    request.open('GET','http://localhost:3000/api/' + categories[i],false)
    
    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200){
            let results = JSON.parse(request.responseText)
            allProducts.push(results)
        }
    }
    request.send()
}

// Afficher les produits par catégorie
var displayProducts = function (results,list){
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
        lien.setAttribute('href','#header')

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
        displayProducts(allProducts[j],columnForProducs[j])
    }
}

let parameters = window.location.search
console.log(parameters)

switch(parameters){
    default:
        displayAllProducts()
        break;
    
    case '?categorie=teddies':
        displayProducts(allProducts[0],columnForProducs[0])
        break;

    case '?categorie=cameras':
        displayProducts(allProducts[1],columnForProducs[1])
        break;

    case '?categorie=furniture':
        displayProducts(allProducts[2],columnForProducs[2])
        break;
}