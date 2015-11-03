(function () {
    'use strict';

    angular.module('ielApp')
        .factory('EditarFactory', ['$http', '$q', '$window', function ($http, $q, $window) {

            function verProjeto(id) {

                var retorno = $q.defer();
                $http.get('/SistemaDeRelatorioDeProducaoPHP/branches/Crud2/resources/pesquisarProjetoPorId/' + id)
                    .success(function (data) {

                        var projetoCopy = angular.copy(data);
                        retorno.resolve(projetoCopy);
                    })
                    .error(function () {
                        alert("aconteceu algum erro");
                    })

                return retorno.promise;

            }

            function verFolhas() {

                var retorno = $q.defer();

                $http.get('/SistemaDeRelatorioDeProducaoPHP/branches/Crud2/resources/folhas')
                    .success(function (data) {

                        retorno.resolve(data);
                    })
                    .error(function () {

                        alert("Sem conexão com a internet");
                    })
                return retorno.promise;
            }

            function verFolha(id) {

                var retorno = $q.defer();

                $http.get('/SistemaDeRelatorioDeProducaoPHP/branches/Crud2/resources/pesquisarFolha/' + id)
                    .success(function (data) {

                        retorno.resolve(data);
                    })
                    .error(function () {

                        alert("Sem conexão com a internet");
                    })
                return retorno.promise;

            }


            return {

                verProjeto: verProjeto,
                verFolhas: verFolhas,
                verFolha: verFolha

            }

        }]);

}())
