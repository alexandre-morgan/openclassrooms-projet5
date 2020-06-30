// Fonction pour gérer le changement de catégorie dans le localStorage
const productSwitch = function(){
    let productSwitchButtons = document.querySelectorAll('a.dropdown-item')
    let productSwitchNo = document.querySelectorAll('#productSwitchNo')
    let productSwitchYes = document.getElementById('productSwitchYes')
    let cat = ""

    // initialisation des boutons de choix de la catégorie en fonction des click
    for(let i = 0; i < productSwitchButtons.length; i++){
        productSwitchButtons[i].addEventListener('click', function(e){
            e.preventDefault()
            if(cartObject.products.length !== 0){
                cat = productSwitchButtons[i].innerText || productSwitchButtons[i].textContent
                if(cat !== localStorage.getItem('category')){
                    $('#productSwitchModal').modal('show')
                    productSwitchYes.addEventListener('click', function(){
                        localStorage.removeItem('cart')
                        localStorage.setItem('category', cat)
                        window.location.href = productSwitchButtons[i].getAttribute('href')
                    }) 
                }else {
                    window.location.href = productSwitchButtons[i].getAttribute('href')
                }
            }else{
                cat = productSwitchButtons[i].innerText || productSwitchButtons[i].textContent
                localStorage.setItem('category', cat)
                window.location.href = productSwitchButtons[i].getAttribute('href')
                }
        })
    }
}


// PROGRAMME DE FONCTIONNEMENT
if(localStorage.getItem('category') === null){
    localStorage.setItem('category','teddies')
    productSwitch() 
}else{
    productSwitch()
}





