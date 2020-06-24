// Récupération de la réponse du serveur ajoutée plus tôt dans le localStorage
let orderConfirmation = JSON.parse(localStorage.getItem('order-confirmation'))

let contactConfirmation = orderConfirmation.contact

let cartConfirmation = JSON.parse(localStorage.getItem('cart'))

let orderId = orderConfirmation.orderId

let confirmFirstName = document.getElementById('confirm-firstName')
let confirmEmail = document.getElementById('confirm-email')
let confirmOrderId = document.getElementById('confirm-order-id')

confirmFirstName.innerHTML = contactConfirmation.firstName
confirmEmail.innerHTML = contactConfirmation.email
confirmOrderId.innerHTML = orderId

const calculTotalPrice = function(){
    let sumPrice = 0
    for(let i = 0; i <cartConfirmation.length; i++){
        sumPrice += cartConfirmation[i].price * cartConfirmation[i].quantity
    }
    return sumPrice
}


// Afficher les produits commandés :
let confirmCart = document.getElementById('confirm-cart')
// En-tête
let li = document.createElement('li')
li.classList.add('list-group-item','container','small','text-secondary')
let row = document.createElement('div')
row.classList.add('row','text-right')
let colName = document.createElement('div')
colName.innerHTML = 'Nom'
colName.classList.add('col-4')
let colQty = document.createElement('div')
colQty.innerHTML = 'Quantité'
colQty.classList.add('col-4')
let colPrice = document.createElement('div')
colPrice.innerHTML = 'Prix'
colPrice.classList.add('col-4')
row.appendChild(colName)
row.appendChild(colQty)
row.appendChild(colPrice)
li.appendChild(row)
confirmCart.appendChild(li)

for(let i = 0; i < cartConfirmation.length; i++){
    li = document.createElement('li')
    li.classList.add('list-group-item','container')
     row = document.createElement('div')
    row.classList.add('row','text-right')
     colName = document.createElement('div')
    colName.innerHTML = cartConfirmation[i].name
    colName.classList.add('col-4')
     colQty = document.createElement('div')
    colQty.innerHTML = cartConfirmation[i].quantity
    colQty.classList.add('col-4')
     colPrice = document.createElement('div')
    colPrice.innerHTML = cartConfirmation[i].price / 100 + ' €'
    colPrice.classList.add('col-4')
    row.appendChild(colName)
    row.appendChild(colQty)
    row.appendChild(colPrice)
    li.appendChild(row)
    confirmCart.appendChild(li)
}
 li = document.createElement('li')
li.classList.add('list-group-item','container')
 row = document.createElement('div')
row.classList.add('row','text-right')
let colTextPrice = document.createElement('div')
colTextPrice.innerHTML = 'Prix total :'
colTextPrice.classList.add('col-8')
let colTotalPrice = document.createElement('div')
colTotalPrice.innerHTML = calculTotalPrice() / 100 + ' €'
colTotalPrice.classList.add('col-4')
row.appendChild(colTextPrice)
row.appendChild(colTotalPrice)
li.appendChild(row)
confirmCart.appendChild(li)

