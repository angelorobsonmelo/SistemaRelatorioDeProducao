/**
 * Created by Angelo Robson on 14/11/2014.
 */

(function(){
    'use strict';

    angular.module('ielApp')
        .controller('CadUsuarioCtrl',  ['$scope', 'CadUsuarioFabrica', '$rootScope', function($scope, CadUsuarioFabrica, $rootScope){

        	
       $rootScope.titulo = "Cadastrar Usuário";
       $scope.salvarUsuario = function(){


    	   CadUsuarioFabrica.salvarUsuario($scope.usuario).then(function(dados){
               alert(dados);
           },

               function(){
               alert('erro');
           });;
       };

        }]);

}());
