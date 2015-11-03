(function() {
	'use strict';
	
	angular.module('ielApp')
	.factory('EditarAgendaFactory', ['$http', '$q', '$window', function($http, $q, $window) {

		function verProjeto(id) {
			
			var retorno = $q.defer();
			$http.get('/ProjetoRelatorioBackEnd/rest/agenda/verProjeto/' + id)
			.success(function(data) {
				 
		         retorno.resolve(data);
			})
			.error(function() {
				alert("aconteceu algum erro");
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
		
		function atualizar(projeto) {
			
			if(projeto.dataInicio == 'Wed Dec 31 1969 21:00:00 GMT-0300 (Hora oficial do Brasil)' && projeto.dataEntrega == 'Wed Dec 31 1969 21:00:00 GMT-0300 (Hora oficial do Brasil)') {
				
				    projeto.dataInicio = ''
					projeto.dataEntrega = ''
					console.log(projeto.dataInicio)
					$http.put('/ProjetoRelatorioBackEnd/rest/agenda/atualizar', projeto)
					.success(function() {
						alert("atualizado com sucesso!")
						$window.location.reload();
					})
					.error(function() {
						alert("aconteceu algum erro");
					})
			} else {
				
				$http.put('/ProjetoRelatorioBackEnd/rest/agenda/atualizar', projeto)
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
