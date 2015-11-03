(function() {

	'use strict';
	angular.module('ielApp')
	.controller('ProjetoCtrl', ['$scope', 'ProjetoFactory' ,'$modal', '$routeParams', '$rootScope', '$location', '$window', function($scope, ProjetoFactory, $modal, $routeParams, $rootScope, $location, $window) {

		$rootScope.titulo = "Projetos"; // serve para colocar um titulo dinâmico
		$rootScope.activetab = $location.path(); // serve para deixar o menu ativo
		$rootScope.esconderHeader = true; // serve para esconder o menu na tela de login

		$scope.mostrar = function() {
			
			$scope.mostrarTabelaAnterior = $scope.mostrarTabela;
		}

	// Trecho para listar nas tabelas de acordo com as datas

		ProjetoFactory.verProjetos().then(function(projetos) {

			var projetosCopy = angular.copy(projetos);

			$scope.projetos = projetosCopy;

			// pegando mês e ano atual;
			var agora = new Date();
			var mesAtual = agora.getMonth();
			var anoAtual = agora.getFullYear();
			// fim

			// criando um array vazio para os respectivos dados
			var dadosAtuais = [];
			var dadosAntigos = [];
			// fim

			// iniciando uma variável com o valor 0 para poder fazer a soma a cada interação do array
			var somaMesAntigo = 0;
			var somaMesAtual = 0
			// fim
			
			// fazendo um for no array vindo do banco
			for(var i =0; i < projetosCopy.length; i ++) {

				var dataInicio = moment(projetosCopy[i].data_inicio).format('L'); // transformando as datas vindo do banco em objeto data do html
				var dataRecebimento = moment(projetosCopy[i].data_recebimento).format('L');
				var dataEntrega =  new Date(projetosCopy[i].data_entrega);
				var dataEntregaComMoment =  moment(projetosCopy[i].data_entrega).format('L');
				// fim
				
				// fazendo uma condição que se o ano atual e a o mês atual de hoje for igual ao que veio do banco e assim criando um novo array.
				if(dataEntrega.getFullYear() == anoAtual && dataEntrega.getMonth() == mesAtual){

					projetosCopy[i].valor = parseInt(projetosCopy[i].valor);

					somaMesAtual += projetosCopy[i].valor; // fazendo a soma dos valores

					dadosAtuais.push({id: projetosCopy[i].id, descricao: projetosCopy[i].descricao, folha: projetosCopy[i].tipo_folha, // colocando os dados no array vazio com a função push
						valor: projetosCopy[i].valor, dataRecebimento: dataRecebimento, dataInicio: dataInicio,
						dataEntrega: dataEntregaComMoment});



				}else { // o inverso da condição

					projetosCopy[i].valor = parseInt(projetosCopy[i].valor)

					somaMesAntigo+= projetosCopy[i].valor;

					dadosAntigos.push({id: projetosCopy[i].id, descricao: projetosCopy[i].descricao, folha: projetosCopy[i].tipo_folha,
						valor: projetosCopy[i].valor, dataRecebimento: dataRecebimento, dataInicio: dataInicio,
						dataEntrega: dataEntregaComMoment});


				}


			}
			
			// armazenando todos os resultudados

			$scope.dadosAntigos = dadosAntigos;
			$scope.dadosAtuais = dadosAtuais;

			$scope.somaMesAtual = somaMesAtual;
			$scope.somaMesAntigo = somaMesAntigo;
			
			// fim

		})

	// Fim do trecho da tabela
		
		// trecho necessário para abrir o model

		$scope.abrirCadastroProjeto = function(){
			var modalInstance = $modal.open({
				templateUrl: 'add_projeto_modal',
				controller: $scope.model
			});
		};

		$scope.model = function($scope,$modalInstance,ProjetoFactory){

			// pegando todas as folhas para listar no html
			ProjetoFactory.verFolhas().then(function(folhas) {

				var folhasCopy = angular.copy(folhas);

				$scope.folhas = folhasCopy;


			})
			// fim de pegar as folhas
			
			// pegando o id das folhas para fazer uma pesquisa no banco e assim trazer o valor de forma dinâmica
			  $scope.pegarId = function() {

				var id =  $scope.projeto.id_folha;

				ProjetoFactory.verFolha(id).then(function(folha) {

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
					console.log($scope.projeto);

					ProjetoFactory.add($scope.projeto);
					$modalInstance.dismiss('cancel');
				}
				// de salvar

				
			};
			
			// fim do modal

		
		
		var dataAtual = moment(new Date()).format('L');
		
		$scope.dataAtual = dataAtual;

		$scope.excluir = function(id, itens) {
			
			ProjetoFactory.excluir(id, itens);
		}
		

	}]);

}());