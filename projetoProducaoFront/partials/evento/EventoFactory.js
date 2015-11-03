(function(){
	'use strict';
	
	angular.module('ielApp')
	.factory("EventoService",['$http','$q','$window', function($http,$q,$window){
		
		function getEventos(){
			var retorno = $q.defer();
			$http.get('/IelServidor1.0/rest/evento/listar')
        	.success(function(data){
        		retorno.resolve(data);
        	})
        	.error(function() {
				console.log("Problemas aconteceram ");
			});
        	return retorno.promise;
		}
		function getEvento(id){
			var retorno = $q.defer();
			$http.get('/IelServidor1.0/rest/evento/selecionar/'+id)
        	.success(function(data){
        		retorno.resolve(data);
        	})
        	.error(function() {
				console.log("Problemas aconteceram ");
			});
        	return retorno.promise;
		}

		function addEvento(newEvento){
			var retorno = $q.defer();
        	$http.post('/IelServidor1.0/rest/evento/salvar', newEvento)
			.success(function(d) {
				retorno.resolve(d);
				//$window.location.reload();
				
			})
			.error(function() {
				alert("ERRO: não foi poossível cadastrar o evento");
			});	
        	return retorno.promise;
        }
		
		function addEmail(titulo,corpo){
			$http.get('/IelServidor1.0/rest/evento/criar_emailevento/'+titulo+"/"+corpo)
			.success(function(data){
				console.log("Email do evento foi criado");
			})
			.error(function(){
				console.log("Problema ao criar email do evento");
			});
		}
		
		function vincularCliente(idCliente){
			$http.get('/IelServidor1.0/rest/evento/vincular_cliente/'+idCliente)
			.success(function(data){
				console.log("cliente vinculado");
			})
			.error(function() {
				console.log("não foi possível vincular o cliente");
			});
		}
		
		function vincularClienteAoEvento(idCliente,idEvento){
			$http.get('/IelServidor1.0/rest/evento/vincular_cliente_evento/'+idCliente+'/'+idEvento)
			.success(function(data){
				console.log("cliente vinculado");
			})
			.error(function() {
				console.log("não foi possível vincular o cliente");
			});
		}
		
		function vincularClientes(clientes){
			var retorno = $q.defer();
			var evento = {};
			evento.nome="";
			evento.data="25/12/2014";
			evento.categoria=1;
			evento.tipo=1;
			evento.clientes = clientes;
			console.log(evento);
			//evento.clientes.push(clientes);
			$http.post('/IelServidor1.0/rest/evento/vincular_clientes', evento)
			.success(function(data){
				console.log("clientes vinculados");
				retorno.resolve(data);
			})
			.error(function() {
				console.log("não foi possível vincular os clientes");
				//retorno.resolve(data);
			});
			return retorno.promise;
		}

        function editEvento(id, newEvento){
        	//console.log(newEvento);
        	$http.post('/IelServidor1.0/rest/evento/salvar', newEvento)
			.success(function(d) {
				console.log(d);
				//$window.location.reload();
			})
			.error(function() {
				alert("ERRO: Não foi possível editar o evento");
			});
        }

        function deleteEvento(id){
        	$http.delete('/IelServidor1.0/rest/evento/deletar/'+id)
        	.success(function(d){
        		console.log(d);
        		$window.location.reload();
        	})
        	.error(function(){
        		alert("erro ao deletar");
        	});
        }
        
        function getTiposEvento(){
        	var retorno = $q.defer();
			$http.get('/IelServidor1.0/rest/tipo_evento/listar')
        	.success(function(data){
        		retorno.resolve(data);
        		//console.log(data);
        		//return data;
        	})
        	.error(function() {
				console.log("Problemas aconteceram ");
			});
        	return retorno.promise;
        }
        function getCategoriasEvento(){
        	var retorno = $q.defer();
			$http.get('/IelServidor1.0/rest/categoria_evento/listar')
        	.success(function(data){
        		retorno.resolve(data);
        		//console.log(data);
        		//return data;
        	})
        	.error(function() {
				console.log("Problemas aconteceram ");
			});
        	return retorno.promise;
        }
        function getTipoEvento(id){
        	$http.get('/IelServidor1.0/rest/tipo_evento/selecionar/'+id)
        	.success(function(data){
        		//retorno.resolve(data);
        		console.log(data);
        		return data;
        	})
        	.error(function() {
				console.log("Problemas aconteceram ");
			});
        }
        function enviarEmailCliente(titulo,corpo,email,id_cliente){
        	$http.get('/IelServidor1.0/rest/evento/enviar_email/'+titulo+'/'+corpo+'/'+email+'/'+id_cliente)
        	.success(function(data){
        		if(data == true){
        			
        		}
        		else{
        			
        		}
        	})
        	.error(function(){
        		console.log('Erro ao enviar email');
        	});
        }
        
        function verificarEnviadoEmailCliente(id_cliente,id_evento){
        	var retorno = $q.defer();
        	$http.get('/IelServidor1.0/rest/evento/verificaremail_enviado/'+id_evento+"/"+id_cliente)
        	.success(function(data){
        		retorno.resolve(data);
        	})
        	.error(function(){
        		console.log('erro ao verificar');
        	});
        	return retorno.promise;
        }
        
        function reenviarEmailCliente(id_cliente,id_evento){
        	$http.get('/IelServidor1.0/rest/evento/reenviaremail/'+id_evento+'/'+id_cliente)
        	.success(function(data){
        		if(data == true){
        			$window.location.reload();
        		}
        		else{
        			
        		}
        	})
        	.error(function(){
        		console.log('Erro ao enviar email');
        	});
        }

        return {
            getEventos: getEventos,
            getEvento:getEvento,
            addEvento:addEvento,
            addEmail:addEmail,
            editEvento:editEvento,
            deleteEvento:deleteEvento,
            getTiposEvento:getTiposEvento,
            getTipoEvento:getTipoEvento,
            getCategoriasEvento:getCategoriasEvento,
            vincularClientes:vincularClientes,
            vincularClienteAoEvento:vincularClienteAoEvento,
            vincularCliente:vincularCliente,
            enviarEmailCliente:enviarEmailCliente,
            verificarEnviadoEmailCliente:verificarEnviadoEmailCliente,
            reenviarEmailCliente:reenviarEmailCliente
        }
	}]);
}());