(function(){
	'use strict';
	angular.module('ielApp')
	.controller('UsuarioCtrl',['$scope','$modal','UsuarioFactory', '$routeParams', '$rootScope', '$location', '$window', function($scope,$modal, UsuarioFactory, $routeParams, $rootScope, $location, $window){
		$rootScope.titulo = "Usuários";
		$rootScope.activetab = $location.path();
		$rootScope.esconderHeader = true;
		$scope.alerts = [
		                 ];





		UsuarioFactory.getUsuarios().then(function(retorno){
			$scope.usuarios = retorno;

		});	

		UsuarioFactory.getUsuario($routeParams.id).then(function(retorno){
			$scope.usuarioVisto = retorno;
			console.log(retorno);
		});

		$scope.back = function(){
			$window.history.back();
		};

		$scope.abrirCadastroCliente = function(){
			var modalInstance = $modal.open({
				templateUrl: 'add_cliente_modal',
				controller: $scope.model
			});
		};

		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};

		$scope.model = function($scope,$modalInstance,UsuarioFactory){
			$scope.alerts = [];
			$scope.cliente = {};


			$scope.cancel = function(){
				$modalInstance.dismiss('cancel');
			};

			$scope.add = function(){


				console.log($scope.usuario);

				UsuarioFactory.salvarUsuario($scope.usuario).then(function(retorno) {

					alert(retorno);
					$window.location.reload();

				});
				$modalInstance.dismiss('cancel');
			};




		};



	}]);



}());