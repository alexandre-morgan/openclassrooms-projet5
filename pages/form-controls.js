let inputName = document.getElementById('inputName')
let inputFirstName = document.getElementById('inputFirstName')
let inputAddress = document.getElementById('inputAddress')
let inputCity = document.getElementById('inputCity')
let inputEmail = document.getElementById('inputEmail')

inputEmail.addEventListener('input', function(response){
    if(emailIsValid(response.target.value)) {
        inputEmail.classList.remove('border','border-danger')
        inputEmail.classList.add('border','border-succes')
      } else{
        inputEmail.classList.remove('border','border-succes')
        inputEmail.classList.add('border','border-danger')
      }
})

inputName.addEventListener('input', function(response){
    if(emailIsValid(response.target.value)) {
        inputName.classList.remove('border','border-danger')
        inputName.classList.add('border','border-succes')
      } else{
        inputName.classList.remove('border','border-succes')
        inputName.classList.add('border','border-danger')
      }
})


function emailIsValid(value){
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
}

function nameIsValid(value){
    return /a-zA-Z/.test(value)
}