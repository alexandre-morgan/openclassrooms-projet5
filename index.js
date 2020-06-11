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

var listTeddy = document.getElementById('teddies')
var listCamera = document.getElementById('cameras')
var listFurniture = document.getElementById('furniture')


var productsTeddy = new getHttpRequest()
productsTeddy.onreadystatechange = function(){
    if (productsTeddy.readyState === 4){
        if(productsTeddy.status === 200){
            var results = JSON.parse(productsTeddy.responseText)
            displayProducts(results,listTeddy)
        } else{
            alert('impossible de contacter le serveur')
        }
    } 
    
}
productsTeddy.open('GET','http://localhost:3000/api/teddies',true)
productsTeddy.send()
        
var productscamera = new getHttpRequest()
productscamera.onreadystatechange = function(){
    if (productscamera.readyState === 4){
        if(productscamera.status === 200){
            var results = JSON.parse(productscamera.responseText)
            displayProducts(results,listCamera)
        
        } else{
            alert('impossible de contacter le serveur')
        }
    } 
    
}
productscamera.open('GET','http://localhost:3000/api/cameras',true)
productscamera.send()

var productsFurniture = new getHttpRequest()
productsFurniture.onreadystatechange = function(){
    if (productsFurniture.readyState === 4){
        if(productsFurniture.status === 200){
            var results = JSON.parse(productsFurniture.responseText)
            displayProducts(results,listFurniture)
        
        } else{
            alert('impossible de contacter le serveur')
        }
    } 
    
}
productsFurniture.open('GET','http://localhost:3000/api/furniture',true)
productsFurniture.send()



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

