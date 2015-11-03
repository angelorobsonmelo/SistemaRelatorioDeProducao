(function() {
	'use strict';
	
	angular.module('ielApp')
	.factory('EditarAgendaFactory', ['$http', '$q', '$window', function($http, $q, $window) {

		function verProjeto(id) {
			
			var retorno = $q.defer();
			$http.get('/SistemaDeRelatorioDeProducaoPHP/branches/Crud2/resources/pesquisarProjetoPorId/' + id)
			.success(function(data) {

					var projetoCopy = angular.copy(data);
		         retorno.resolve(projetoCopy);
			})
			.error(function() {
				alert("aconteceu algum erro");
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
		
		function atualizar(projeto) {
			
			if(projeto.data_inicio == 'Wed Dec 31 1969 21:00:00 GMT-0300 (Hora oficial do Brasil)' && projeto.data_entrega == 'Wed Dec 31 1969 21:00:00 GMT-0300 (Hora oficial do Brasil)') {
				
				    projeto.data_inicio = ''
					projeto.data_entrega = ''
					console.log(projeto.data_inicio)
					$http.put('/Crud2/resources/atualizarProjeto', projeto)
					.success(function() {
						alert("atualizado com sucesso!")
						$window.location.reload();
					})
					.error(function() {
						alert("aconteceu algum erro");
					})
			} else {
				
				$http.put('/SistemaDeRelatorioDeProducaoPHP/branches/Crud2/resources/atualizarProjeto', projeto)
				.success(function() {
					alert("atualizado com sucesso!")
					$window.location.reload();
				})
				.error(function() {
					alert("aconteceu algum erro");
				})
				
			}
			
			
		}
		
		return {
			
			verProjeto: verProjeto,
			verFolhas: verFolhas,
			verFolha: verFolha,
			atualizar: atualizar
			
		}
		
	}]);
	
}())
