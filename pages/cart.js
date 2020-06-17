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
let sumPrice=0
let nbProductInCart = document.getElementsByClassName('nbProductInCart')
let totalPrice = document.getElementById('totalPrice')



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


var sub1ToCartCounter= function(){
    let quantity = localStorage.getItem('cartNumber')
    quantity--
    localStorage.setItem('cartNumber',quantity)
}



// Afficher les produits du panier
var displayProductsInCart = function (results,cat,index){
    let divRow = document.createElement('div')
    divRow.classList.add('border','border-secondary','rounded','align-items-center','my-2')
    // Création de la ligne
    divRow.classList.add('row','position-relative')
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
            divContainer.classList.add('container-fluid')
            divInfo.appendChild(divContainer)

                // Div row in container
                let divRowContainer = document.createElement('div')
                divRowContainer.classList.add('row')
                divContainer.appendChild(divRowContainer)

                    // Div col flex
                    let divCol = document.createElement('div')
                    divCol.classList.add('col','d-flex','justify-content-between','h5')
                    divRowContainer.appendChild(divCol)

                        // titre h2 pour name
                        let divName = document.createElement('div')
                        divName.innerHTML=results.name
                        divCol.appendChild(divName)

                        // p pour le prix
                        let pPrice = document.createElement('p')
                        pPrice.classList.add('text-nowrap')
                        pPrice.innerHTML=results.price/100 + ' €'
                        divCol.appendChild(pPrice)

                // Div row in container
                let divRowContainer2 = document.createElement('div')
                divRowContainer2.classList.add('row')
                divContainer.appendChild(divRowContainer2)

                    // Div col pour lien produit
                    let divColLinkProduct = document.createElement('div')
                    divColLinkProduct.classList.add('col-6','text-center','h3')
                    divRowContainer2.appendChild(divColLinkProduct)
                        // Lien produit
                        let divLinkProduct = document.createElement('a')
                        divLinkProduct.classList.add('btn','btn-info')
                        divLinkProduct.setAttribute('title',"Voir l'article : " + results.name)
                        divLinkProduct.setAttribute('href','one-product.html'
                        + '?categorie=' + cat + '&' + 'id=' + results._id)
                            // Icon du lien
                            let imgLinkProduct = document.createElement('img')
                            imgLinkProduct.setAttribute('src','../node_modules/bootstrap-icons/icons/search.svg')
                            divLinkProduct.appendChild(imgLinkProduct)
                            divColLinkProduct.appendChild(divLinkProduct)
                    // Div col pour lien poubelle
                    let divColLinkTrash = document.createElement('div')
                    divColLinkTrash.classList.add('col-6','text-center','h3')
                    divRowContainer2.appendChild(divColLinkTrash)

                        // Lien poubelle
                        let divTrash = document.createElement('a')
                        divTrash.classList.add('btn','btn-danger')
                        divTrash.setAttribute('id','trash' + index)
                        divTrash.setAttribute('href','#')
                            // Icon du lien
                            let imgTrash = document.createElement('img')
                            imgTrash.setAttribute('src','../node_modules/bootstrap-icons/icons/trash.svg')
                            divTrash.appendChild(imgTrash)
                            divColLinkTrash.appendChild(divTrash)

    cartList.appendChild(divRow)
}


// Afficher la quantité du panier
var displayCartQuantity = function(){
    for(let i =0; i < nbProductInCart.length; i++){
        nbProductInCart[i].innerHTML = localStorage.getItem('cartNumber')
        console.log(localStorage.getItem('cartNumber'))        
    }
    totalPrice.innerHTML = sumPrice + ' €'
}

// Event for delete a product of cart
var addEventOnTrash = function(i){
    let trash = document.getElementById('trash' + i)
    trash.addEventListener('click', function(e){
        e.preventDefault()
        localStorage.removeItem('product_' + i)
        sub1ToCartCounter()
        window.location.reload()
    })
    console.log(localStorage)
}


// PROGRAMME DE FONCTIONNEMENT

// Test si panier vide
if(localStorage.getItem('cartNumber') === null){
    // Si panier vide
    let message = document.createElement('p')
    message.classList.add('text-center','h2')
    message.innerHTML = 'Votre panier est vide.'
    cartList.appendChild(message)
} else{
    // Si panier NON vide
    for(let i = 1; i < localStorage.length; i++){     
        dataOfProduct = localStorage.getItem('product_' + [i]).split(',')
        categorieOfProduct = dataOfProduct[0]
        idOfProduct = dataOfProduct[1]
        data = getProduct(categorieOfProduct,idOfProduct)
        sumPrice += data.price/100
        displayProductsInCart(data,categorieOfProduct,i)
        addEventOnTrash(i)
    }
    console.log(sumPrice)
    displayCartQuantity() 
}
console.log(localStorage)


