(function() {

	'use strict';

	angular.module('ielApp')
	.controller('AgendaCtrl', ['$scope', '$routeParams', 'AgendaFactory' ,'$modal', '$rootScope', '$location', '$window', function($scope, $routeParams, AgendaFactory, $modal, $rootScope, $location, $window) {

		$rootScope.titulo = "Agenda";
		$rootScope.activetab = $location.path();
		$rootScope.esconderHeader = true;

		$scope.iniciar = true;
		
		$scope.iniciarProjeto = function(iniciar) {

			
			console.log(iniciar);
			
			
			if(iniciar == true){
				
				var dataHoje = new Date();
				console.log("data de hoje: " + dataHoje);
			}else {
				
				alert("fazer nada");
			}
		
			

		}

		$scope.finalizarProjeto = function(finalizar) {

			console.log(finalizar);
			
			
			
			

		}

		AgendaFactory.verAgenda($scope).then(function(agenda) {

			var agendaCopy = angular.copy(agenda);

			$scope.agenda = agendaCopy;

		})



		$scope.abrirCadastroProjeto = function(){
			var modalInstance = $modal.open({
				templateUrl: 'add_projeto_modal',
				controller: $scope.model
			});
		};

		$scope.model = function($scope,$modalInstance,AgendaFactory){

			// pegando todas as folhas para listar no html
			AgendaFactory.verFolhas().then(function(folhas) {

				var folhasCopy = angular.copy(folhas);

				$scope.folhas = folhasCopy;


			})
			// fim de pegar as folhas

			// pegando o id das folhas para fazer uma pesquisa no banco e assim trazer o valor de forma dinâmica
			$scope.pegarId = function() {

				var id =  $scope.projeto.idFolha;

				AgendaFactory.verFolha(id).then(function(folha) {

					var folhaCopy = angular.copy(folha);

					$scope.folha = folhaCopy;

				});

			};
			// fim de pegar os valores dinâmicos


			// serve para cancelar e fechar o modal
			$scope.cancel = function(){
				$modalInstance.dismiss('cancel');
			};

			// fim do trechos

			// serve para adicionar/salvar

			$scope.add = function() {

				AgendaFactory.add($scope.projeto);
				$modalInstance.dismiss('cancel');
			}
			// de salvar


		};

		// fim do modal

	}]);

}());
