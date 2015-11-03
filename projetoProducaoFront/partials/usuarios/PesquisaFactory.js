(function(){
    'use strict';
    angular.module('ielApp')
        .factory('PesquisaService',['$http','$q','$window',function($http,$q,$window){

        	
            function getPesquisas(){
            	var retorno = $q.defer();
            	$http.get('/IelServidor1.0/rest/pesquisa/listar')
            	.success(function(data){
            		retorno.resolve(data);
            	})
            	.error(function() {
					console.log("Problemas aconteceram ");
				});
            	return retorno.promise;
            }

            function getPesquisa(id){
            	var retorno = $q.defer();
            	$http.get('/IelServidor1.0/rest/pesquisa/selecionar/'+id)
            	.success(function(data){
            		retorno.resolve(data);
            	})
            	.error(function() {
					console.log("Problemas aconteceram ");
				});
            	return retorno.promise;
            }

            return {
                getPesquisas: getPesquisas,
                getPesquisa: getPesquisa
            }

        }]);
}());