(function(){
    'use strict';
    angular.module('ielApp')
        .controller('EventoCtrl',['$scope', '$rootScope','$location','EventoService','$routeParams','$modal','$window','$controller','ClientesService','PesquisaService','InovacaoService',  function($scope, $rootScope,$location,EventoService,$routeParams,$modal,$window,$controller,ClienteService,PesquisaService,InovacaoService){
        	$rootScope.titulo = "Eventos";
        	$rootScope.esconderHeader = true;
        	$rootScope.activetab = $location.path();
        	EventoService.getCategoriasEvento().then(function(retorno){
            	$scope.categoriasEvento = retorno;
            });
        	
        	
        	EventoService.getTiposEvento().then(function(retorno){
            	$scope.tiposEvento = retorno;
            });
        	
            EventoService.getEventos().then(function(retorno){
            	$scope.eventos = retorno;
            	//console.log($scope.eventos);
            });
            
            if($routeParams.id){
            	EventoService.getEvento($routeParams.id).then(function(retorno){
            		$scope.eventoVisto = retorno;
            		
            		angular.forEach($scope.eventoVisto.clientes, function(cliente){
                		EventoService.verificarEnviadoEmailCliente(cliente.id,$scope.eventoVisto.id).then(function(retorno){
                			cliente.emailEnviado = retorno;
                		});
                	});
            		
            	});
            	
            	/*
            	angular.forEach($scope.eventoVisto.clientes, function(cliente){
            		EventoService.verificarEnviadoEmailCliente().then(function(retorno){
            			cliente.emailEnviado = retorno;
            		});
            	});
            	*/
            	
            }
            
            $scope.reenviarEmail = function(id_cliente,id_evento){
            	console.log("reenviando email para : "+id_cliente+" do evento "+id_evento);
            	
            	var retorno = EventoService.reenviarEmailCliente(id_cliente,id_evento);
            	
            	console.log(retorno);
            };
            
            
            $scope.resetTipo = function(){
            	$scope.filtro.tipo = "";
            };
            
            $scope.descricaoTipoEventoPorId = function(id){
            	try{
	            	for(var i= 0; i < $scope.tiposEvento.length; i++){
	            		if($scope.tiposEvento[i].id == id){
	            			//console.log($scope.tiposEvento[i].descricao);
	            			return $scope.tiposEvento[i].descricao;
	            		}
	            	}
	            	return "";
            	}catch(e){
            		
            	}
            };
            $scope.descricaoCategoriaEventoPorId = function(id){
            	try{
	            	for(var i= 0; i < $scope.categoriasEvento.length; i++){
	            		if($scope.categoriasEvento[i].id == id){
	            			//console.log($scope.tiposEvento[i].descricao);
	            			return $scope.categoriasEvento[i].descricao;
	            		}
	            	}
	            	return "";
            	}catch(e){
            		
            	}
            };
            
            
            $scope.abrirIncluirCliente = function(){
            	var modalInstance = $modal.open({
            		templateUrl:'partials/evento/incluir_cliente.html',
            		controller:  $scope.incluirClienteCtrl,
            		size: 'lg',
            		resolve:{
            			id: function(){
            				return null;
            			}
            		}
            	});
            	
            	modalInstance.result.then(function (idCliente){
            		
            		EventoService.vincularClienteAoEvento(idCliente,$scope.eventoVisto.id);
            		$window.location.reload();
            	});
            };
            
            $scope.abrirDeletarEventoDialog= function(idEvento){
            	var modalInstance = $modal.open({
            		templateUrl:'partials/utils/modal_confirm.html',
            		controller: $scope.confirmar,
            		size: 'sm',
            		resolve:{
            			id: function(){
            				return idEvento;
            			}
            		}
            	});
            	
            	modalInstance.result.then(function (confirm) {
            	      if(confirm){
            	    	  EventoService.deleteEvento(idEvento);
            	      }
            	    }
            	);
            };
            
            $scope.back = function(){
            	$window.history.back();
            };
            
            $scope.confirmar = function ($scope,$modalInstance){
            	$scope.ok = function () {
            	    $modalInstance.close(true);
            	  };

            	  $scope.cancel = function () {
            	    $modalInstance.dismiss('cancel');
            	  };
            };
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            $scope.incluirClienteCtrl = function($scope,$modalInstance,ClientesService,PesquisaService,InovacaoService){
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
                	console.log("selecionou por pesquisa");
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
                	console.log("selecionou por inovacao");
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
                	console.log(valor+" "+id);
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
            };

        }]);
}());