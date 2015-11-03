(function() {

	'use strict';

	angular.module('ielApp')
	.factory('RedefinirSenhaFactory', ['$http', '$location', function($http, $location) {

		function redefinirSenha(usuario) {

			$http.post('/IelServidor1.0/rest/usuario/redefinirSenha', usuario)
			.success(function(data) {

				alert("Senha renovada com sucesso!")
				$location.path('/');
			})
			.error(function(data) {

				alert("Não encontrou o caminho rest")
			})

		}
		return{
			redefinirSenha: redefinirSenha
			
		}

	}]);


}());
