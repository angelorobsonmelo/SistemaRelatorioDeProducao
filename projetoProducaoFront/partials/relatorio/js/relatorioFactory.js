(function() {

	'use strict';

	angular.module('ielApp')
	.factory('RelatorioFactory', ['$http', '$q', '$window', '$sce', function($http, $q, $window, $sce){

		function exibirRelatorio(relatorio, $scope) {


			var retorno = $q.defer();

			$http.post('/SistemaDeRelatorioDeProducaoPHP/branches/Crud2/resources/relatorioDosProjetosTerminados', relatorio)
			.success(function(data) {
				
				if(data == '') {
					
					alert("Não há dados entre essas datas, tente outras datas!");
					
					

				}else {


					var total = 0;
					
					for(var i =0; i < data.length; i ++) { 
						
						data[i].data_inicio = moment(data[i].data_inicio).format('L');
						data[i].data_recebimento = moment(data[i].data_recebimento).format('L');
						data[i].data_entrega = moment(data[i].data_entrega).format('L');

						data[i].valor = parseInt(data[i].valor);
						total += data[i].valor;
					}
				}
				
				$scope.resultadoTotal = total;

				retorno.resolve(data);

			})
			.error(function() {
				alert("alguma coisa ruim aconteceu")
			});

			return retorno.promise;

		}

			function gerarOPdfAlternativa(dados) {

				$http.post('/SistemaDeRelatorioDeProducaoPHP/branches/Crud2/resources/gerarPdfDosProjetosTerminados', dados)
					.success(function() {
						console.log("sucesso!")
					})
					.error(function() {
						console.log('erro');
					})
			}
		
		function imprimirRelatorio(obj, $scope) {

			$window.location = "/SistemaDeRelatorioDeProducaoPHP/branches/Crud2/resources/downloadPdfTerminados";
		}


		return {

			exibirRelatorio: exibirRelatorio,
			imprimirRelatorio: imprimirRelatorio,
			gerarOPdfAlternativa: gerarOPdfAlternativa
			

		}

	}]);

}());
