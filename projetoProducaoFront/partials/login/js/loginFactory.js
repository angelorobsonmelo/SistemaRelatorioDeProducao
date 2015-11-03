/**
 * Created by Angelo Robson on 17/11/2014.
 */
(function(){
    'use strict';

    angular.module('ielApp')
        .factory('LoginFactory', ['$window', '$http', '$location', function($window, $http, $location){

            function autenticar(usuario) {

               
                
                

                $http.get('/SistemaDeRelatorioDeProducaoPHP/branches/Crud2/resources/login/'+ usuario.email +'/'+ usuario.senha)
                    .success(function(data){
                    	
                    	if (data.status == 'D') {
                    		
                    		 localStorage.setItem('usuarioLogado', angular.toJson(data));
                    		 $location.path('index');
            				    
            				}
                    	else {
                    		
                    		alert("senha invalida");
                    	}
                    		
                    })
                    .error(function(data){

                        console.log("Algo Ruim Aconteceu! Verifique sua conex�o de internet " );

                    });
                
            }
            
            function esqueceuSenha(usuario, $scope) {
            	
            	$http.get('/IelServidor1.0/rest/usuario/existeUsuario/'+usuario.email).success(function(existeEmail) {

     				if(existeEmail == true) {
     					
     					 $http.post('/IelServidor1.0/rest/usuario/esqueceuSenha', usuario)
                         .success(function(envio){
                                 
                        	if(envio == true) { 
                        	 
                        	$scope.enviando = false;
         					$scope.sucessoAoEnviarEmail = true;
         					$scope.erroAoEnviarEmail = false;
         					$scope.esconder= true;	
         					$scope.emailNaoExiste = false;
         					
                                  
                        	}
                        	else {
                        		$scope.sucessoAoEnviarEmail = false;
                        		$scope.enviando = false;
             					$scope.erroAoEnviarEmail = true;
             					$scope.esconder= true;	
             					$scope.emailNaoExiste = false;
             				
                        	}
                        	
                         })
                         .error(function(data){

                             alert(" <h1>Algo Ruim Aconteceu! Verifique sua conexão de internet </h1>" );

                         });
     					 
     				}
     				
     				else {
     					$scope.sucessoAoEnviarEmail = false;
     					$scope.erroAoEnviarEmail = false;
     					$scope.emailNaoExiste = true;
     					$scope.enviando = false;
     					$scope.esconder= true;	
     					
     				}
     			})
     			.error(function() {

     				alert("Aconteceu algo ruim! Verifique sua conex�o de internet");
     			}); 
			}

            return {

                autenticar: autenticar,
                esqueceuSenha: esqueceuSenha
            }

        }]);

}());
