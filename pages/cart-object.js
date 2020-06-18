class cart {
    nbProduts = 0
    products = []

    createFromLocalStorage() {
        this.products = JSON.parse(localStorage.getItem('cart'))
        this.nbProduts = this.products.length
    }
}