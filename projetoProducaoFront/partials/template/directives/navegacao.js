
(function() {
	
	
'use strict';
	
	angular.module('ielApp')
	.directive('header',function(){
	  return {
	    restrict:'E',
	   
	    templateUrl:'partials/template/header.html'
	  };
	});


}());