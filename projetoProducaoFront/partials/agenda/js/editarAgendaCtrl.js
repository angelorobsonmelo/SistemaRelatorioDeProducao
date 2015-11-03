(function() {
	'use strict';
	angular.module('ielApp')
	.controller('EditarAgendaCtrl', ['$scope', '$routeParams', 'EditarAgendaFactory' ,'$modal', '$rootScope', '$location', '$window', function($scope, $routeParams, EditarAgendaFactory, $modal, $rootScope, $location, $window) {

		$rootScope.titulo = "Editar Agenda";
		$rootScope.activetab = $location.path();
		$rootScope.esconderHeader = true;

		EditarAgendaFactory.verProjeto($routeParams.id).then(function(projeto) {

			var projetoCopy = angular.copy(projeto);
			
			console.log(projetoCopy);

			// este aqui é apenas para converter em data os dados do banco
			var dataDeInicio = new Date(projetoCopy.data_inicio);
			var dataDeRecebimento = new Date(projetoCopy.data_recebimento);
			var dataEntrega = new Date(projetoCopy.data_entrega);
			// fim das variáveis para edição

			// está é apenas para visualização na tabela 
			$scope.dataRecebimentoVisualizar = moment(projetoCopy.data_recebimento).format('L');
			$scope.dataInicioParaVisualizar = moment(projetoCopy.data_inicio).format('L');
			$scope.dataEntregaVisualizar =  moment(projetoCopy.data_entrega).format('L');
			// fim para visualizar apenas

//			este aqui é para visualizar no formulário      
			projetoCopy.data_inicio = dataDeInicio;
			projetoCopy.data_recebimento = dataDeRecebimento;
			projetoCopy.data_entrega = dataEntrega;
// fim

			$scope.projeto = projetoCopy;

		});

		EditarAgendaFactory.verFolhas().then(function(folhas) {

			var folhasCopy = angular.copy(folhas);

			$scope.folhas = folhasCopy;


		})

		$scope.pegarId = function() {

			var id =  $scope.projeto.id_folha;

			EditarAgendaFactory.verFolha(id).then(function(folha) {

				var folhaCopy = angular.copy(folha);

				$scope.folha = folhaCopy;

			})

		}


		$scope.atualizar = function() {


			EditarAgendaFactory.atualizar($scope.projeto);

		}

		$scope.back = function() {

			history.back();
		}

	}]);

}())