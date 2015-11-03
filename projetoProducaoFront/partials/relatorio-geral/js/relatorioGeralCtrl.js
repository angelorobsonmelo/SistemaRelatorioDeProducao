(function() {

	'use strict';

	angular.module('ielApp')
	.controller('RelatorioGeralCtrl', ['$scope', 'RelatorioGeralFactory' ,'$modal', '$routeParams', '$rootScope', '$location', '$window', function($scope, RelatorioGeralFactory, $modal, $routeParams, $rootScope, $location, $window) {

		$rootScope.titulo = "Relatório Diário"; 
		$rootScope.activetab = $location.path(); 
		$rootScope.esconderHeader = true; 

		$scope.esconderBotaoImprimir = false;


		$scope.exibirRelatorioGeral = function() {

			RelatorioGeralFactory.exibirRelatorioGeral($scope.projeto, $scope).then(function(dados) {

				var dadosCopy = angular.copy(dados);

				$scope.relatorio = dadosCopy;

				RelatorioGeralFactory.gerarOPdfAlternativa(dadosCopy);

				if(dadosCopy == '') {
					$scope.esconderBotaoImprimir = false;
					$scope.esconderFiltro = false;
				}else {

					$scope.esconderBotaoImprimir = true;
					$scope.esconderFiltro = true
				}

			});

		}

		$scope.filtrar = function(filtro) {

			RelatorioGeralFactory.verAgendaPorStatus($scope, filtro).then(function(agendaPorStatus) {

				var agendaPorStatusCopy = angular.copy(agendaPorStatus);

				$scope.relatorio = agendaPorStatusCopy;

				RelatorioGeralFactory.gerarOPdfAlternativa(agendaPorStatusCopy);

			})
		}

			$scope.imprimirRelatorio = function() {



				RelatorioGeralFactory.imprimirRelatorio();
			}






	}]);


}());
