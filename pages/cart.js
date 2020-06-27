// Variables pour récupérer les éléments qui vont être modifiés ou ajoutés
let cartList = document.getElementById('cart')
let categorieOfProduct
let dataOfProduct
let data
let sumPrice=0
let nbProductInCart = document.getElementById('nbProductInCart')
let totalPrice = document.getElementById('totalPrice')


// Afficher les produits du panier
var displayProductsInCart = function (results,cat,index){
    let divRow = document.createElement('div')
    divRow.classList.add('border','border-secondary','rounded','align-items-center','my-2')
    divRow.setAttribute('id','product' + index)
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
                        divName.classList.add('text-left')
                        divName.innerHTML=results.name
                        divCol.appendChild(divName)

                        // p pour le prix
                        let pPrice = document.createElement('p')
                        pPrice.classList.add('text-nowrap')
                        pPrice.innerHTML = priceFormating(results.price)
                        divCol.appendChild(pPrice)

                // Div row in container
                let divRowContainer2 = document.createElement('div')
                divRowContainer2.classList.add('row')
                divContainer.appendChild(divRowContainer2)

                    // Div col pour lien produit
                    let divColLinkProduct = document.createElement('div')
                    divColLinkProduct.classList.add('col-4','text-center','h3')
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
                    
                    // Div col pour quantité du produit
                    let divColQtyProduct = document.createElement('div')
                    divColQtyProduct.classList.add('col-4')
                    divRowContainer2.appendChild(divColQtyProduct)
                        // span pour texte quantité
                        let labelQuantity = document.createElement('label')
                        labelQuantity.setAttribute('for','inputQuantity' + index)
                        labelQuantity.innerHTML = 'Qté :'
                        divColQtyProduct.appendChild(labelQuantity)

                        // Input pour quantité
                        let inputQuantity = document.createElement('input')
                        inputQuantity.classList.add('w-100','text-center')
                        inputQuantity.setAttribute('type','number')
                        inputQuantity.setAttribute('value',results.quantity)
                        inputQuantity.setAttribute('min','1')
                        inputQuantity.setAttribute('id','inputQuantity' + index)
                        divColQtyProduct.appendChild(inputQuantity)

                    // Div col pour lien poubelle
                    let divColLinkTrash = document.createElement('div')
                    divColLinkTrash.classList.add('col-4','text-center','h3')
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

var displayTotalPrice = function(empty){
    if(empty){
        totalPrice.innerHTML = 0

    }else{
        let sumPrice = 0
        for(let i = 0; i <cartObject.products.length; i++){
            sumPrice += cartObject.products[i].price * cartObject.products[i].quantity
        }
        totalPrice.innerHTML = priceFormating(sumPrice)
    }
}


// Event for delete a product of cart
var addEventOnTrash = function(i){
    let trash = document.getElementById('trash' + i)
    trash.addEventListener('click', function(e){
        e.preventDefault()
        cartObject.deleteToCart(i)
        location.reload()
    })
}

var addEventOnQuantity = function(i){
    let quantityBtn = document.getElementById('inputQuantity' + i)
    quantityBtn.addEventListener('change', function(){
        cartObject.updateQuantityOfOneProduct(quantityBtn.value, i)
        updateData()
    })
}

var updateData = function(){
    //Affichage qté
    nbProductInCart.innerHTML = cartObject.nbProducts

    // Affichage prix total
    if(cartObject.nbProducts === 0){
        displayTotalPrice(true)
    }else{
        displayTotalPrice(false)
    }
    // Test si panier vide
    if(cartObject.products.length === 0){
        // Si panier vide
        let message = document.createElement('p')
        message.classList.add('text-center','h2')
        message.innerHTML = 'Votre panier est vide.'
        cartList.appendChild(message)
    }
}


// PROGRAMME DE FONCTIONNEMENT
updateData()

// Si panier NON vide
for(let i = 0; i < cartObject.products.length; i++){     
    displayProductsInCart(cartObject.products[i],cartObject.products[i].category,i)
    addEventOnTrash(i)
    addEventOnQuantity(i)
}
