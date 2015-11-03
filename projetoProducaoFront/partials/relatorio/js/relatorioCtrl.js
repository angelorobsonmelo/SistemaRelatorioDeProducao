(function() {

	'use strict';

	angular.module('ielApp')
	.controller('RelatorioCtrl', ['$scope', 'RelatorioFactory' ,'$modal', '$routeParams', '$rootScope', '$location', '$window', function($scope, RelatorioFactory, $modal, $routeParams, $rootScope, $location, $window) {

		$rootScope.titulo = "Relatório"; 
		$rootScope.activetab = $location.path(); 
		$rootScope.esconderHeader = true; 

		$scope.esconderBotaoImprimir = false;


		$scope.exibirRelatorio = function() {

			RelatorioFactory.exibirRelatorio($scope.projeto, $scope).then(function(dados) {

				var dadosCopy = angular.copy(dados);

				$scope.relatorio = dadosCopy;

				RelatorioFactory.gerarOPdfAlternativa(dadosCopy);
				
				if(dadosCopy == '') {
					$scope.esconderBotaoImprimir = false;
				}else {

				$scope.esconderBotaoImprimir = true;
				}

			});

		}

		$scope.imprimirRelatorio = function() {



			RelatorioFactory.imprimirRelatorio($scope.projeto, $scope);
		}


	}]);


}());
