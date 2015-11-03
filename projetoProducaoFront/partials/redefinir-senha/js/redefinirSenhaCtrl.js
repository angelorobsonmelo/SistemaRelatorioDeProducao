(function() {

	'use strict';

	angular.module('ielApp')
	.controller('RedefinirSenhaCtrl', ['$scope',  '$routeParams', 'RedefinirSenhaFactory', '$rootScope', function($scope, $routeParams, RedefinirSenhaFactory, $rootScope) {

	   $rootScope.titulo = "Redefinir senha";
       var usuarioJson = {"email": $routeParams.email}
                      
       
		 
		
		$scope.usuario = usuarioJson;
		
		
		
		
		

		$scope.redefinirSenha = function() {

			RedefinirSenhaFactory.redefinirSenha($scope.usuario);

		}


	}]);


}());