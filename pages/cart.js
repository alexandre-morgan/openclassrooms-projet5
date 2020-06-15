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

let cartList = document.getElementById('cart')
let categorieOfProduct
let dataOfProduct
let data


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

// Afficher les produits du panier
var displayProductsInCart = function (results){
    var divContainer = document.createElement('div')
    // Création de la ligne
    divContainer.classList.add('row','list-group-item')
    // div pour image
    var divImg = document.createElement('div')
    divImg.classList.add('col-4')
    // Image
    var img = document.createElement('img')
    img.setAttribute('src',results.imageUrl)
    img.classList.add('w-100')
    divImg.appendChild(img)
    // div pour name
    var divName = document.createElement('div')
    divName.classList.add('col-4')
    divName.innerHTML=results.name
    // div pour le prix
    var divPrice = document.createElement('div')
    divPrice.classList.add('col-4')
    divPrice.innerHTML=results.price

    divContainer.appendChild(divImg)
    divContainer.appendChild(divName)
    divContainer.appendChild(divPrice)
    cartList.appendChild(divContainer)
}



for(let i = 1; i < localStorage.length; i++){
    dataOfProduct = localStorage.getItem('product_' + [i]).split(',')
    categorieOfProduct = dataOfProduct[0]
    idOfProduct = dataOfProduct[1]
    data = getProduct(categorieOfProduct,idOfProduct)
    displayProductsInCart(data)
}



