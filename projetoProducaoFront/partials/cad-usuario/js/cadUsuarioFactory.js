/**
 * 
 */
/**
 * Created by Angelo Robson on 17/11/2014.
 */
(function(){
    'use strict';

    angular.module('ielApp')
        .factory('CadUsuarioFabrica', ['$window', '$http', '$q', '$location', function($window, $http, $q, $location){

             
             function salvarUsuario(usuario) {


                 var retorno = $q.defer();
                 
                 $http.get('/IelServidor1.0/rest/usuario/existeUsuario/'+usuario.email).success(function(data) {

     				if(data == true) {
     					
     					alert("Email existente no nosso banco de dados!");
     				} else {
     					
     					 $http.post('/IelServidor1.0/rest/usuario/salvar', usuario)
                         .success(function(data){
                        	 retorno.resolve('Cadastrado com sucesso!');

                                  usuario = "";

                         })
                         .error(function(data){

                             alert(" <h1>Algo Ruim Aconteceu! Verifique sua conexão de internet </h1>" );

                         });
     					
     				}
     			})
     			.error(function() {

     				alert("Aconteceu algo ruim! Verifique sua conex�o de internet");
     			}); 
                 
                
                 
                 return retorno.promise;

             }
             return {

            	 salvarUsuario: salvarUsuario
             };
                

           

        }]);

}());
