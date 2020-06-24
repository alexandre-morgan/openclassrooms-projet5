

let inputName = document.getElementById('inputName')
let inputNameValidation = false
let inputFirstName = document.getElementById('inputFirstName')
let inputFirstNameValidation = false
let inputAddress = document.getElementById('inputAddress')
let inputAddressValidation = false
let inputCity = document.getElementById('inputCity')
let inputCityValidation = false
let inputEmail = document.getElementById('inputEmail')
let inputEmailValidation = false

let invalidSubmit = document.getElementById('invalid-submit')

let submitButton = document.getElementById('submitButton')


inputEmail.addEventListener('input', function(response){
    if(emailIsValid(response.target.value)) {
        inputEmail.classList.remove('border','border-danger')
        inputEmail.classList.add('border','border-success')
        inputEmailValidation = true
    }else{
        inputEmail.classList.remove('border','border-success')
        inputEmail.classList.add('border','border-danger')
        inputEmailValidation = false
    }
})

inputName.addEventListener('input', function(response){
    if(nameIsValid(response.target.value)) {
        inputName.classList.remove('border','border-danger')
        inputName.classList.add('border','border-success')
        inputNameValidation = true
        }else{
        inputName.classList.remove('border','border-success')
        inputName.classList.add('border','border-danger')
        inputNameValidation = false
    }
})

inputFirstName.addEventListener('input', function(response){
    if(nameIsValid(response.target.value)) {
        inputFirstName.classList.remove('border','border-danger')
        inputFirstName.classList.add('border','border-success')
        inputFirstNameValidation = true
        }else{
        inputFirstName.classList.remove('border','border-success')
        inputFirstName.classList.add('border','border-danger')
        inputFirstNameValidation = false
    }
})

inputAddress.addEventListener('input', function(response){
    if(notEmpty(response.target.value)) {
        inputAddress.classList.remove('border','border-danger')
        inputAddress.classList.add('border','border-success')
        inputAddressValidation = true
        }else{
        inputAddress.classList.remove('border','border-success')
        inputAddress.classList.add('border','border-danger')
        inputAddressValidation = false
    }
})

inputCity.addEventListener('input', function(response){
    if(notEmpty(response.target.value)) {
        inputCity.classList.remove('border','border-danger')
        inputCity.classList.add('border','border-success')
        inputCityValidation = true
        }else{
        inputCity.classList.remove('border','border-success')
        inputCity.classList.add('border','border-danger')
        inputCityValidation = false
    }
})



function emailIsValid(value){
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
}

function nameIsValid(value){
    return /^[A-Za-zÀ-ÖØ-öø-ÿ]+([-]?[A-Za-zÀ-ÖØ-öø-ÿ]+)$/.test(value)
}

function notEmpty(value){
    return /\S+/.test(value)
}


let productsList = []
for(let i = 0; i < cartObject.products.length; i++){
    productsList.push(cartObject.products[i]._id)
}


var form = document.getElementById('form')

form.addEventListener('submit', function(e){
    e.preventDefault()
    //Validation du form
    if(inputNameValidation && inputFirstNameValidation && 
        inputAddressValidation && inputCityValidation && inputEmailValidation){
        //Construction de l'Objet envoyé sur le serveur
        let dataToSend = {
            contact: {
                firstName: inputFirstName.value,
                lastName: inputName.value,
                address: inputAddress.value,
                city: inputCity.value,
                email: inputEmail.value
            },
            products: productsList
        };
        console.log(dataToSend)
        // Requête AJAX
        ajaxRequestPost(dataToSend).then(function(response){
            console.log(response)
        })
    } else {
        invalidSubmit.innerHTML = "Veuillez renseigner correctement vos coordonnées"
    }
})
