(function() {
	'use strict';
	angular.module('ielApp')
	.controller('EditarCtrl', ['$scope', '$routeParams', 'EditarFactory' ,'$modal', '$rootScope', '$location', '$window', function($scope, $routeParams, EditarFactory, $modal, $rootScope, $location, $window) {
		
		$rootScope.titulo = "Editar Projeto";
		$rootScope.activetab = $location.path();
		$rootScope.esconderHeader = true;
       
       EditarFactory.verProjeto($routeParams.id).then(function(projeto) {
    	
         var projetoCopy = angular.copy(projeto);
         
         // este aqui é apenas para a edição
         var dataDeInicio = new Date(projetoCopy.data_inicio);
         var dataDeRecebimento = new Date(projetoCopy.data_recebimento);
         // fim das variáveis para edição
         
      // está é apenas para visualização 
         $scope.dataRecebimentoVisualizar = moment(projetoCopy.data_recebimento).format('L');
         $scope.dataInicioParaVisualizar = moment(projetoCopy.data_inicio).format('L');
         $scope.dataEntregaVisualizar =  moment(projetoCopy.data_entrega).format('L');
      // fim para visualizar apenas
         
         projetoCopy.data_inicio = dataDeInicio;
         projetoCopy.data_recebimento = dataDeRecebimento;

		   Object.freeze(projetoCopy);
         $scope.projeto = projeto;

    	   
	});
       
       EditarFactory.verFolhas().then(function(folhas) {

			var folhasCopy = angular.copy(folhas);

			$scope.folhas = folhasCopy;


		})
       
   	$scope.pegarId = function() {

		var id =  $scope.projeto.idFolha;

		EditarFactory.verFolha(id).then(function(folha) {

			var folhaCopy = angular.copy(folha);

			$scope.folha = folhaCopy;

		})

	}
       
       
       $scope.atualizar = function() {
		
    	   
    	   EditarFactory.atualizar($scope.projeto);
    	   
	}
       
       $scope.back = function() {
		
    	   history.back();
	}
		
	}]);
	
}())