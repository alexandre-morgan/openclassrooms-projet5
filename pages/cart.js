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

// Afficher la quantité du panier
var displayCartQuantity = function(){
    nbProductInCart.innerHTML = localStorage.getItem('cartNumber')
    console.log(localStorage.getItem('cartNumber'))    
}


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
    let divRow = document.createElement('div')
    // Création de la ligne
    divRow.classList.add('row')
        // div pour image
        let divImg = document.createElement('div')
        divImg.classList.add('col-12', 'col-md-6')
            // Image
            let img = document.createElement('img')
            img.setAttribute('src',results.imageUrl)
            img.classList.add('w-100')
            divImg.appendChild(img)
        divRow.appendChild(divImg)

        // div pour informations
        let divInfo = document.createElement('div')
        divInfo.classList.add('col-12', 'col-md-6')
        divRow.appendChild(divInfo)
            // Div container
            let divContainer = document.createElement('div')
            divContainer.classList.add('container')
            divInfo.appendChild(divContainer)

                // Div row in container
                let divRowContainer = document.createElement('div')
                divRowContainer.classList.add('row')
                divContainer.appendChild(divRowContainer)

                    // Div col flex
                    let divCol = document.createElement('div')
                    divCol.classList.add('col','d-flex','justify-content-between','h2')
                    divContainer.appendChild(divCol)

                        // titre h2 pour name
                        let h2Name = document.createElement('h2')
                        h2Name.innerHTML=results.name
                        divCol.appendChild(h2Name)

                        // p pour le prix
                        let pPrice = document.createElement('p')
                        pPrice.classList.add('text-nowrap')
                        pPrice.innerHTML=results.price/100 + ' €'
                        divCol.appendChild(pPrice)
    cartList.appendChild(divRow)
}


displayCartQuantity()

if(localStorage.getItem('cartNumber') === null){
    // Si panier vide
    let message = document.createElement('p')
    message.classList.add('text-center','h2')
    message.innerHTML = 'Votre panier est vide.'
    cartList.appendChild(message)
} else{
    for(let i = 1; i < localStorage.length; i++){
        // Test si panier vide

            // Si panier NON vide
            dataOfProduct = localStorage.getItem('product_' + [i]).split(',')
            categorieOfProduct = dataOfProduct[0]
            idOfProduct = dataOfProduct[1]
            data = getProduct(categorieOfProduct,idOfProduct)
            displayProductsInCart(data)    
        }
}



