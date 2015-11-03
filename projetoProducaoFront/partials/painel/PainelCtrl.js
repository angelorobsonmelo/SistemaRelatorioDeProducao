(function(){
    'use strict';
    angular.module('ielApp')
        .controller('PainelCtrl',['$scope','ClientesService', '$rootScope', '$location','EventoService','WizardHandler','$window', function($scope,ClientesService, $rootScope, $location,EventoService, WizardHandler,$window){
        	
        	$rootScope.titulo = "Inicio";
        	$scope.evento = {};
        	
        	$scope.clientes = {};
        	$scope.clientesVinculados = [];
        	$scope.email = {};
        	
        	ClientesService.getClientes().then(function(retorno){
            	$scope.clientes = retorno;
            	//console.log($scope.clientes);
            });
        	
        	var usuarioLogado = angular.fromJson(localStorage.getItem('usuarioLogado'));
        	
        	$rootScope.usuario = usuarioLogado.nome + " " + usuarioLogado.sobreNome;
        	
        	$rootScope.activetab = $location.path();
        	$rootScope.esconderHeader = true;
        	
        	EventoService.getCategoriasEvento().then(function(retorno){
            	$scope.categoriasEvento = retorno;
            });
        	
        	EventoService.getTiposEvento().then(function(retorno){
            	$scope.tiposEvento = retorno;
            });
        	
        	
        	//console.log(localStorage.getItem("usuarioLogado"));
        	
        	$scope.resetTipo = function(){
            	$scope.evento.tipo = "";
            };
        	
            //uibootstrap calendario
            $scope.open = function($event){
                $event.preventDefault();
                $event.stopPropagation();
                $scope.opened = true;
            };
            
            
            
            $scope.etapa=0;
            
            $scope.cadastrarEvento = function(){
            	$scope.evento.data = moment($scope.evento.data).format('DD/MM/YYYY');
            	//console.log($scope.evento);
            	
            	//WizardHandler.wizard().next();
            	
            	EventoService.addEvento($scope.evento).then(function(retorno){
            		if(!retorno){
            			alert("Erro ao criar evento");
            		}
            		else{
            			$scope.cadastrado=true;
                        $scope.etapa=1;
                        WizardHandler.wizard().next();
            		}
            	});
            	
                
            };
            
            $scope.pesquisou = false;
            
            $scope.pesquisar = function(){
            	console.log("Pesquisou");
            	$scope.pesquisou = true;
            };
            
            $scope.vincularClientesAoEvento = function(){
            	angular.forEach($scope.clientes,function (cliente){
            		if(cliente.selecionado){
            			$scope.clientesVinculados.push(cliente);
            			EventoService.vincularCliente(cliente.id);
            		}
            		
            	});
            	//console.log($scope.clientesVinculados);
            	WizardHandler.wizard().next();
                $scope.etapa=2;
            	
            };
            /*
            $scope.vincularClientesAoEvento = function(){
            	angular.forEach($scope.clientes,function (cliente){
            		if(cliente.selecionado)
            			$scope.clientesVinculados.push(cliente);                    	
            	});
            	EventoService.vincularClientes($scope.clientesVinculados).then(function(retorno){
            		if(!retorno){
            			alert("Erro ao vincular clientes");
            		}else{
            			console.log($scope.clientesVinculados);
                    	WizardHandler.wizard().next();
                        $scope.etapa=2;
            		}
            	});
            	
            };
            */
            $scope.enviarEmailAosParticipantes = function () {
            	//console.log($scope.clientesVinculados);
            	EventoService.addEmail($scope.email.titulo,$scope.email.corpo);
            	
            	angular.forEach($scope.clientesVinculados, function (cliente) {
            		EventoService.enviarEmailCliente($scope.email.titulo,$scope.email.corpo,cliente.email,cliente.id);
            	});
            	WizardHandler.wizard().next();
                $scope.etapa=3;
            };
            
            $scope.finalizarCadastroDoEvento = function () {
            	WizardHandler.wizard().finish();
            };
            
            $scope.finishedWizard = function(){
            	//console.log($scope.evento);
            	//alert("Terminou o wizard");
            	$location.path("/eventos");
            	
            };
            
            $scope.selecionarTodos = function(){
            	angular.forEach($scope.clientes, function (cliente) {
                    cliente.selecionado = true;
                });
            };
            
            $scope.deselecionarTodos = function(){
            	angular.forEach($scope.clientes, function (cliente) {
                    cliente.selecionado = false;
                });
            };
            
            $scope.selecionarPorTipo = function(idTipo) {
            	angular.forEach($scope.clientes, function (cliente) {
            		angular.forEach(cliente.pesquisas , function(pesquisa) {
            			if(pesquisa.tipo == idTipo){
                			cliente.selecionado = true;
                			return;
                        }
            		});
            		
                });
            };
            
            
            
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
            
            $scope.inovacaocheckteste = function (valor, id){
            	
            	if(valor)
            		$scope.selecionarPorInovacao(id);
            	else
            		$scope.deselecionarPorInovacao(id);

            };
            
            $scope.deselecionarCliente = function(id){
            	
            	angular.forEach($scope.clientes, function (cliente) {
        			if(cliente.id == id){
            			cliente.selecionado = false;
            			return;
        			}
                });
            };
            
            $scope.checkedteste = function (valor, id){
            	if(valor)
            		$scope.selecionarPorPesquisa(id);
            	else
            		$scope.deselecionarPorPesquisa(id);
            	
            	
            };
            
            $scope.existeClienteSelecionado = function(){
            	var total=0;
            	angular.forEach($scope.clientes, function (cliente) {
                    if(cliente.selecionado == true){
                    	total+=1;
                    }
                });
            	if(total>0){
            		return true;
            	}
            	return false;
            };
            
            $scope.printarSelecionados = function(){
            	//console.log("Selecionados");
            	angular.forEach($scope.clientes, function (cliente) {
                    if(cliente.selecionado == true){
                    	console.log(cliente.pesquisas);
                    }
                });
            };
            
        }]);
}());