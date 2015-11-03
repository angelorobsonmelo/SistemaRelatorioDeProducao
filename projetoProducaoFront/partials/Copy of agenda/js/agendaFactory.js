(function() {
	
	'use strict';
	
	angular.module('ielApp')
	.factory('AgendaFactory', [ '$http', '$q', '$window', function($http, $q, $window) {
		
		function add(projeto) {

			$http.post('/ProjetoRelatorioBackEnd/rest/projeto/salvar', projeto)
			.success(function() {
				
				alert("salvo com sucesso!");
				$window.location.reload();
			})
			.error(function() {
				
				alert("aconteceu algum erro");
			})
		}

		function verFolha(id) {

			var retorno = $q.defer();

			$http.get('/ProjetoRelatorioBackEnd/rest/folha/folha/' + id)
			.success(function(data) {

				retorno.resolve(data);
			})
			.error(function() {

				alert("Sem conexão com a internet");
			})
			return retorno.promise;

		}

		function verFolhas() {

			var retorno = $q.defer();

			$http.get('/ProjetoRelatorioBackEnd/rest/folha/folhas')
			.success(function(data) {

				retorno.resolve(data);
			})
			.error(function() {

				alert("Sem conexão com a internet");
			})
			return retorno.promise;
		}
		
		function verAgenda($scope) {

			var retorno = $q.defer();

			$http.get('/ProjetoRelatorioBackEnd/rest/agenda/verTodos')
			.success(function(data) {
             
				var soma = 0;
				
				for (var i = 0; i < data.length; i++) {
					
					
					
					data[i].dataRecebimento = moment(data[i].dataRecebimento).format('L');
					data[i].dataInicio = moment(data[i].dataInicio).format('L');
					data[i].dataEntrega = moment(data[i].dataEntrega).format('L');
					
					soma += data[i].folha.valor;
					
					
				}
				
				
				retorno.resolve(data);
				$scope.soma = soma;
				
			})
			.error(function() {

				alert("Sem conexão com a internet");
			})
			return retorno.promise;
		}
		
		function excluir(id, itens) {
			
			if(window.confirm("Tem certeza que deseja excluir o projeto " + itens.descricao +" que teve a data de entrega no dia: " + itens.dataEntrega)){
			
			$http.delete('/ProjetoRelatorioBackEnd/rest/projeto/excluir/' + id)
			.success(function() {
				
				alert("Excluído com sucesso!");
				$window.location.reload();
			})
			.error(function() {
				alert("alguma coisa ruim aconteceu");
			})
		}else {
			
			
		}
			
		}

		return {

			add: add,
			verFolhas: verFolhas,
			verFolha: verFolha,
			verAgenda: verAgenda,
			excluir: excluir
		}
	}]);
	
}())