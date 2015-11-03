(function(){
	'use strict';
	angular.module('ielApp')
	.factory('UsuarioFactory',['$http','$q', '$window', function($http,$q,$window){


	
		
		
		function getUsuarios(){
			var retorno = $q.defer();
			$http.get('/IelServidor1.0/rest/usuario/listarUsuarios')
			.success(function(data){
				retorno.resolve(data);
			})
			.error(function() {
				console.log("Problemas aconteceram ");
			});
			return retorno.promise;
		}

		function getUsuario(id){
			var retorno = $q.defer();
			$http.get('/IelServidor1.0/rest/usuario/listarUsuario/'+id)
			.success(function(data){
				retorno.resolve(data);
			})
			.error(function() {
				console.log("Problemas aconteceram ");
			});
			return retorno.promise;
		}

		function salvarUsuario(usuario) {


			var retorno = $q.defer();

			$http.get('/IelServidor1.0/rest/usuario/existeUsuario/'+usuario.email).success(function(data) {

				if(data == true) {

					retorno.resolve("Email existente no nosso banco de dados!");
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

		function editCliente(id, newCliente) {
			$http.post('/IelServidor1.0/rest/cliente/salvar', newCliente)
			.success(function(d) {
				console.log(d);
				$window.location.reload();
			})
			.error(function() {
				alert("Não encontrado");
			});	
		}

		function deleteCliente(id) {
			$http.delete('/IelServidor1.0/rest/cliente/deletar/'+id)
			.success(function(d){
				console.log(d);
				$window.location.reload();
			})
			.error(function(){
				alert("erro ao deletar");
			});
		}

		return {
			
			getUsuario: getUsuario,
			getUsuarios: getUsuarios,
			salvarUsuario: salvarUsuario,
			editCliente: editCliente,
			deleteCliente: deleteCliente
		}

	}]);
}());