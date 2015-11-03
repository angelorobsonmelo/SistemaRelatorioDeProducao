(function() {

	'use strict';

	angular.module('ielApp')
	.factory('ProjetoFactory', ['$http', '$q', '$window', function($http, $q, $window) {

		function add(projeto) {

			$http.post('/SistemaDeRelatorioDeProducaoPHP/branches/Crud2/resources/salvarProjetoCompleto', projeto)
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

			$http.get('/SistemaDeRelatorioDeProducaoPHP/branches/Crud2/resources/pesquisarFolha/' + id)
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

			$http.get('/SistemaDeRelatorioDeProducaoPHP/branches/Crud2/resources/folhas')
			.success(function(data) {

				retorno.resolve(data);
			})
			.error(function() {

				alert("Sem conexão com a internet");
			})
			return retorno.promise;
		}
		
		function verProjetos() {

			var retorno = $q.defer();

			$http.get('/SistemaDeRelatorioDeProducaoPHP/branches/Crud2/resources/projetosTerminados')
			.success(function(data) {

				retorno.resolve(data);
				console.log(data);
			})
			.error(function() {

				alert("Sem conexão com a internet");
			})
			return retorno.promise;
		}
		
		function excluir(id, itens) {
			
			if(window.confirm("Tem certeza que deseja excluir o projeto " + itens.descricao +" que teve a data de entrega no dia: " + itens.dataEntrega)){
			
			$http.delete('/SistemaDeRelatorioDeProducaoPHP/branches/Crud2/resources/excluirProjeto/' + id)
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
			verProjetos: verProjetos,
			excluir: excluir
		}


	}])

}());
