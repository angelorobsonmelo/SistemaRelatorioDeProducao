/**
 * Created by AngeloRobson on 04/03/2015.
 */
(function () {

    'use strict';

    angular.module('webservicePHP')
        .factory('usuarioFactory', ['$http', '$q', '$window', function ($http, $q, $window) {

            function verTodosUsuarios() {

                var retorno = $q.defer();

                $http.get('/Crud2/resources/users')
                    .success(function (data) {

                        retorno.resolve(data);

                    }).
                    error(function () {

                        console.log("Deu algum erro");
                    })

                return retorno.promise;

            }

            function excluir(id) {

                $http.delete('/Crud2/resources/deleteUser/' + id)
                    .success(function () {

                        alert('Excluído com sucesso!');
                        $window.location.reload();
                    })
                    .error(function () {
                        console.log('Erro');
                    })
            }

            function pesquisarUsuario(id) {

                var retorno = $q.defer()

                $http.get('/Crud2/resources/pesquisarUsuario/' + id)
                    .success(function (data) {

                        retorno.resolve(data);

                    }).
                    error(function () {

                        console.log("Deu algum erro");
                    })

                return retorno.promise;

            }

            function cadastrar(usuario) {


                $http.post('/Crud2/resources/cadastrar', usuario)
                    .success(function () {

                        alert("cadastrado com sucesso");
                        $window.location.reload();

                    }).
                    error(function () {

                        alert("cadastrado com sucesso");
                        $window.location.reload();
                    })

            }

            function atualizar(usuario) {


                $http.put('/Crud2/resources/atualizar', usuario)
                    .success(function () {

                        alert("cadastrado com sucesso");
                        $window.location.reload();

                    }).
                    error(function () {

                        alert("cadastrado com sucesso");
                        $window.location.reload();
                    })

            }


            return {

                verTodosUsuarios: verTodosUsuarios,
                excluir: excluir,
                pesquisarUsuario: pesquisarUsuario,
                cadastrar: cadastrar,
                atualizar: atualizar

            }

        }]);

}());
