class cart {
    
    constructor() {
        if(localStorage.length === 0){
            this.nbProducts = 0
            this.products = []
        }else{
            this.products = JSON.parse(localStorage.getItem('cart'))
            let sumOfProducts = 0
            for(let i = 0; i < this.products.length; i++){
                sumOfProducts += this.products[i].quantity
            }
            this.nbProducts = sumOfProducts
        }
    }

    saveCartToLocalStorage(){
        localStorage.setItem('cart',JSON.stringify(this.products))
    }

    addToCart(product) {
        // Ajout du produit
        let contain = false
        for(let i = 0; i < this.products.length; i++){
            if(this.products[i]._id === product._id){
                this.products[i].quantity += product.quantity
                contain = true
            }
        }
        // Si produit déja dans panier, changer la quantité
        if(!contain){
            this.products.push(product)
        }

        // Mise à jour du nombre d'articles dans le panier
        let sumProducts = 0
        for(let i = 0; i < this.products.length; i++){
            sumProducts += this.products[i].quantity
        }
        this.nbProducts = sumProducts
    }

    subToCart(product) {
        this.products = product
    }


}

var cartUpdate = function(cartObject,product,addOrSub){
    if(addOrSub){
        cartObject.addToCart(product)
        cartObject.saveCartToLocalStorage()    
    }else{
        cartObject.subToCart(product)
        cartObject.saveCartToLocalStorage()    
    }
}

let cartObject = new cart()
