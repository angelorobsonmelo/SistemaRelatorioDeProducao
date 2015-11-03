(function(){

	'use strict';
	angular.module('ielApp',['ngAnimate','ui.bootstrap','ui.calendar','ngDragDrop','ngRoute','checklist-model','mgo-angular-wizard','ui.mask','ngSanitize'])

	.config(['$routeProvider', function($routeProvider){
		$routeProvider
		.when('/index', {
			controller : 'DashBoardCtrl',
			templateUrl: 'partials/dashboard/dashboard.html'
		})
		.when('/login',{
			controller : 'LoginCtrl',
			templateUrl: 'partials/login/login.html'
				
		})
		.when('/usuarios',{
			controller : 'UsuarioCtrl',
			templateUrl: 'partials/usuarios/usuario.html'
				
		})
		.when('/usuarios/:id',{
			controller: 'UsuarioCtrl',
			templateUrl: 'partials/usuarios/usuario_ver.html'
		})
		.when('/cad-usuario', {
			controller: 'CadUsuarioCtrl',
			templateUrl: 'partials/cad-usuario/cad-usuario.html'
		})
		.when('/redefinir-senha/:email', {

			controller: 'RedefinirSenhaCtrl',
			templateUrl: 'partials/redefinir-senha/redefinir-senha.html'

		})
		.when('/', {
			
			controller: 'ProjetoCtrl',
			templateUrl: 'partials/projeto/projeto.html'
			
		})
		.when('/projeto-ver/:id', {

			controller: 'EditarCtrl',
			templateUrl: 'partials/projeto/ver-projeto.html'

		})
		.when('/editar/:id', {
			
			controller: 'EditarCtrl',
			templateUrl: 'partials/projeto/editarProjeto.html'
				
		})
		.when('/relatorio', {
			
			controller: 'RelatorioCtrl',
			templateUrl: 'partials/relatorio/relatorio.html'
			
		})
		.when('/agenda', {
			
			controller: 'AgendaCtrl',
			templateUrl: 'partials/agenda/agenda.html'
			
		})
		.when('/editar-agenda/:id', {
			
			controller: 'EditarAgendaCtrl',
			templateUrl: 'partials/agenda/editar-agenda.html'
				
		})
		.when('/relatorio-geral', {
			
			controller: 'RelatorioGeralCtrl',
			templateUrl: 'partials/relatorio-geral/relatorio-geral.html'
			
		})
	
		.otherwise('/');
	}]);
	
	angular.module('ielApp')
    .filter('tel', function () {
        return function (text) {
    		try{
    			return ((text.substr(0, 0)+ "("+text).substr(0,3)+ ")"+text.slice(2)).substr(0,8)+"-"+text.slice(6);
    		}catch(e){
    			//console.log(e);
    		}
		}
    });
	
	angular.module('ielApp')
    .filter('cnpj', function () {
        return function (text) {
    		try{
    			return (((text.substr(0, 2)+ "."+text.slice(2)).substr(0,6)+ "."+text.slice(5)).substr(0,10)+"/"+text.slice(8)).substr(0,15)+"-"+text.slice(12);
    		}catch(e){
    			//console.log(e);
    		}
		}
    });
}());