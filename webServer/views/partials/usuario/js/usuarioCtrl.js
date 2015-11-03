/**
 * Created by AngeloRobson on 04/03/2015.
 */
(function () {
    'use strict';

    angular.module('teste')
        .controller('usuarioCtrl', ['$scope', 'usuarioFactory', function ($scope, usuarioFactory) {

            $scope.limpar = function () {

                $scope.usuario = '';
            }

            $scope.save = function () {


                usuarioFactory.atualizar($scope.usuario);
            }


            $scope.cadastrar = function () {

                usuarioFactory.cadastrar($scope.usuario);
            }


            $scope.pesquisarUsuario = function (id) {

                usuarioFactory.pesquisarUsuario(id).then(function (usuario) {

                    var usuarioCopy = angular.copy(usuario);


                    $scope.usuario = usuarioCopy;

                });
            }


            $scope.excluir = function (id) {

                usuarioFactory.excluir(id);
            }

            usuarioFactory.verTodosUsuarios().then(function (usuarios) {

                $scope.usuarios = usuarios;

            });


        }]);


}())