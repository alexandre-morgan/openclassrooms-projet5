// Requête http valide sur tous les navigateurs
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


var getProductsByCategorie = function(categorie){
    return new Promise(function(resolve, reject){
        let request = new getHttpRequest()
        request.onreadystatechange = function(){
            if(request.readyState === 4){
                if(request.status === 200){
                    resolve(request.responseText) 
                }else{
                    reject(request)
                }
            }
        }
        request.open('GET','http://localhost:3000/api/' + categorie,true)
        request.send()
    })
}

var getOneProduct = function(categorie,id) {
    return new Promise(function(resolve, reject){
        let request = new getHttpRequest()
        request.onreadystatechange = function(){
            if(request.readyState === 4){
                if(request.status === 200){
                    resolve(request.responseText) 
                }else{
                    reject(request)
                }
            }
        }
        request.open('GET','http://localhost:3000/api/' + categorie + '/' + id,true)
        request.send()
    })

}

var displayErrorConnection = function(e){
    alert('Erreur de connexion avec le server', e)
}


var ajaxRequestPost = (data) => {
    return new Promise((resolve, reject) => {
      var request = new getHttpRequest();
        //retour de la requette si tout c'est bien passé
        request.onreadystatechange = function() {
            if(request.readyState === 4){
                if(request.status === 201){
                    resolve(JSON.parse(request.responseText)) 
                }else{
                    reject("la requette renvoie une erreur: " + this.status)
                }
            }
        };
        request.open("POST", "http://localhost:3000/api/furniture/order",true);
        request.setRequestHeader("Content-Type", "application/json");//Envoi au format JSON
        let dataToSend = JSON.stringify(data)
        console.log(dataToSend)
        request.send(dataToSend);//data est un objet JS
    })
  }