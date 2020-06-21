// Variables
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



// Event for delete a product of cart
var addEventOnTrash = function(i){
    let trash = document.getElementById('trash' + i)
    trash.addEventListener('click', function(e){
        e.preventDefault()
        cartObject.products.splice(i,1)
        cartUpdate(cartObject,cartObject.products,false)
        window.location.reload()
    })
}


// PROGRAMME DE FONCTIONNEMENT

// Affichage de la quantité de produit dans le panier
nbProductInCart.innerHTML = cartObject.nbProducts

// Test si panier vide
if(cartObject.products.length === 0){
    // Si panier vide
    let message = document.createElement('p')
    message.classList.add('text-center','h2')
    message.innerHTML = 'Votre panier est vide.'
    cartList.appendChild(message)

} else{
    // Si panier NON vide
    for(let i = 0; i < cartObject.products.length; i++){     
        displayProductsInCart(cartObject.products[i],cartObject.products[i].category,i)
        addEventOnTrash(i)
    }
}


