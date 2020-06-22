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

var displayErrorConnection = function(){
    console.error('Probleme de connexion avec le serveur')
}


// var postCart = function(){
//     return new Promise(function(resolve, reject){
//         let request = new getHttpRequest()
//         request.onreadystatechange = function(){
//             if(request.readyState === 4){
//                 if(request.status === 200){
//                     resolve(request.responseText) 
//                 }else{
//                     reject(request)
//                 }
//             }
//         }
//         request.open('POST','http://localhost:3000/api/order',true)
//         request.send()
//     })
// }