/**
 * Created by Angelo Robson on 14/11/2014.
 */

(function(){
	'use strict';

	angular.module('ielApp')
	.controller('LoginCtrl',  ['$scope', 'LoginFactory', '$rootScope', '$modal', '$log', function($scope, LoginFactory, $rootScope,  $modal, $log){
		
		$rootScope.logo = "img/user.jpg";
		$rootScope.titulo = "Login";
		 $scope.open = function (size) {

			    var modalInstance = $modal.open({
			      templateUrl: 'esqueceu-senha.html',
			      controller: 'LoginInstanceCtrl',
			      size: size,
			      resolve: {
			        items: function () {
			          return $scope.items;
			        }
			      }
			    });
			   
			  };
		
		$rootScope.usuario = null;
		$rootScope.esconderHeader = false;

		$scope.autenticar = function(){


			LoginFactory.autenticar($scope.usuario);
		};

	}]);
	
	angular.module('ielApp').controller('LoginInstanceCtrl', ['$scope', '$modalInstance', 'items', 'LoginFactory', function ($scope, $modalInstance, items, LoginFactory) {

		  $scope.esconder= true;		
		  
		  
		  $scope.ok = function () {
			  
			  $scope.esconder= false;
			  $scope.enviando = true;
			  LoginFactory.esqueceuSenha($scope.usuario, $scope);
		    
		  };

		  $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		  };
		}]);

}());
