// L'objet cart permet de gérer le panier
class cart {
    
    constructor() {
        // Permet de remettre à zéro le panier après avoir quitté la page de confirmation
        if(localStorage.getItem('order-confirmation') !== null &&
        localStorage.getItem('cart') !== null){
            localStorage.removeItem('order-confirmation')
            localStorage.removeItem('cart')
        }
        if(localStorage.getItem('cart') === null){
            this.nbProducts = 0
            this.products = []
        }else{
            this.products = JSON.parse(localStorage.getItem('cart'))
            let sumProducts = 0
            for(let i = 0; i < this.products.length; i++){
                sumProducts += parseInt(this.products[i].quantity)
            }
            this.nbProducts = sumProducts
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
                this.products[i].quantity += parseInt(product.quantity)
                contain = true
            }
        }
        // Si produit déja dans panier, changer la quantité
        if(!contain){
            this.products.push(product)
        }

        // Mise à jour du nombre d'articles dans le panier
        this.updateNbProducts()
        }

    deleteToCart(index) {
        this.products.splice(index,1)
        this.updateNbProducts()
        this.saveCartToLocalStorage()
    }

    updateQuantityOfOneProduct(quantity,index){
        this.products[index].quantity = quantity
        this.updateNbProducts()
        this.saveCartToLocalStorage()
    }

    updateNbProducts(){
        let sumProducts = 0
        for(let i = 0; i < this.products.length; i++){
            sumProducts += parseInt(this.products[i].quantity)
        }
        this.nbProducts = sumProducts
    }

    cartUpdate = function(product,addOrDel){
        if(addOrDel){
            this.addToCart(product)
            this.saveCartToLocalStorage()    
        }else{
            this.deleteToCart(product)
            this.saveCartToLocalStorage()    
        }
    }
    
}


let cartObject = new cart()

const priceFormating = function(priceToFormat){
    priceToFormat = priceToFormat.toString()
    let priceCent = priceToFormat.slice(-2)
    let priceInt = priceToFormat.slice(0, priceToFormat.length - 2)
    return priceInt + ',' + priceCent + ' €'
}
