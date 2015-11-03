(function(){
    'use strict';
    angular.module('ielApp')
        .controller('IncluirClienteEventoCtrl',['$scope','$modalInstance','ClientesService', '$routeParams', '$rootScope', '$location', 'PesquisaService','InovacaoService','$window', function($scope,$modalInstance,ClientesService,$routeParams, $rootScope, $location,PesquisaService,InovacaoService,$window){
        	
            PesquisaService.getPesquisas().then(function(retorno){
            	$scope.pesquisas = retorno;
            });
            
            InovacaoService.getInovacoes().then(function(retorno){
            	$scope.inovacoes = retorno;
            });
            
            ClientesService.getClientes().then(function(retorno){
            	$scope.clientes = retorno;
            	//console.log(retorno);
            });
            
            $scope.selecionarPorPesquisa = function(idPesquisa) {
            	angular.forEach($scope.clientes, function (cliente) {
            		angular.forEach(cliente.pesquisas , function(pesquisa) {
            			if(pesquisa.id == idPesquisa){
                			cliente.selecionado = true;
                			return;
                        }
            		});
            		
                });
            };
            
            $scope.deselecionarPorPesquisa = function(idPesquisa) {
            	angular.forEach($scope.clientes, function (cliente) {
            		angular.forEach(cliente.pesquisas , function(pesquisa) {
            			if(pesquisa.id == idPesquisa){
                			cliente.selecionado = false;
                			return;
                        }
            		});
            		
                });
            };
            
            $scope.selecionarPorInovacao = function(idInovacao) {
            	angular.forEach($scope.clientes, function (cliente) {
            		angular.forEach(cliente.inovacoes , function(inovacao) {
            			if(inovacao.id == idInovacao){
                			cliente.selecionado = true;
                			return;
                        }
            		});
            		
                });
            };
            
            $scope.deselecionarPorInovacao = function(idInovacao) {
            	angular.forEach($scope.clientes, function (cliente) {
            		angular.forEach(cliente.inovacoes , function(inovacao) {
            			if(inovacao.id == idInovacao){
                			cliente.selecionado = false;
                			return;
                        }
            		});
            		
                });
            };
            
            $scope.checkedteste = function (valor, id){
            	if(valor)
            		$scope.selecionarPorPesquisa(id);
            	else
            		$scope.deselecionarPorPesquisa(id);
            	
            	
            };
            
            $scope.inovacaocheckteste = function (valor, id){
            	if(valor)
            		$scope.selecionarPorInovacao(id);
            	else
            		$scope.deselecionarPorInovacao(id);

            };

            
          $scope.incluir = function (id) {
    	    $modalInstance.close(id);
    	  };

    	  $scope.cancel = function () {
    	    $modalInstance.dismiss('cancel');
    	  };
            
            

        }]);
}());