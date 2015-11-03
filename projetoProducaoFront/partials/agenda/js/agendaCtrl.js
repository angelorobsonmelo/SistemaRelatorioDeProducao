(function () {

    'use strict';

    angular.module('ielApp')
        .controller('AgendaCtrl', ['$scope', '$routeParams', 'AgendaFactory', '$modal', '$rootScope', '$location', '$window', function ($scope, $routeParams, AgendaFactory, $modal, $rootScope, $location, $window) {

            $rootScope.titulo = "Agenda";
            $rootScope.activetab = $location.path();
            $rootScope.esconderHeader = true;

            $scope.filtrar = function (filtro) {


                AgendaFactory.verAgendaPorStatus($scope, filtro).then(function (agendaPorStatus) {

                    var agendaPorStatusCopy = angular.copy(agendaPorStatus);

                    var statusCopia = angular.copy(agendaPorStatusCopy);

                    $scope.agendaPorStatus = statusCopia;

                })
            }


            $scope.iniciarProjeto = function (id, iniciar) {

                AgendaFactory.colocarDataInicio(id, iniciar);

            }


            AgendaFactory.verAgenda($scope).then(function (agenda) {

                var agendaCopy = angular.copy(agenda);

                $scope.agenda = agendaCopy;

            })

            $scope.excluir = function (id, obj) {

                AgendaFactory.excluir(id, obj);
            }

            $scope.abrirCadastroProjeto = function () {
                var modalInstance = $modal.open({
                    templateUrl: 'add_projeto_modal',
                    controller: $scope.model
                });
            };

            $scope.model = function ($scope, $modalInstance, AgendaFactory) {

                // pegando todas as folhas para listar no html
                AgendaFactory.verFolhas().then(function (folhas) {

                    var folhasCopy = angular.copy(folhas);

                    $scope.folhas = folhasCopy;


                })
                // fim de pegar as folhas

                // pegando o id das folhas para fazer uma pesquisa no banco e assim trazer o valor de forma dinâmica
                $scope.pegarId = function () {

                    var id = $scope.projeto.id_folha;

                    AgendaFactory.verFolha(id).then(function (folha) {

                        var folhaCopy = angular.copy(folha);

                        $scope.folha = folhaCopy;

                    });

                };
                // fim de pegar os valores dinâmicos


                // serve para cancelar e fechar o modal
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };

                // fim do trechos

                // serve para adicionar/salvar

                $scope.add = function () {

                    AgendaFactory.add($scope.projeto);
                    $modalInstance.dismiss('cancel');
                }
                // de salvar


            };

            // fim do modal


            $scope.abrirFinalizarProjeto = function (clienteId, finalizar) {

                if (finalizar == true) {

                    var modalInstance = $modal.open({
                        templateUrl: 'finalizar_projeto_modal',
                        controller: $scope.edicao,
                        resolve: {
                            id: function () {
                                return clienteId;
                            }
                        }
                    });

                } else {


                }
            };


            $scope.edicao = function ($scope, $modalInstance, id, AgendaFactory) {

                // pegando todas as folhas para listar no html
                AgendaFactory.verFolhas().then(function (folhas) {

                    var folhasCopy = angular.copy(folhas);

                    $scope.folhas = folhasCopy;


                })
                // fim de pegar as folhas

                // pegando o id das folhas para fazer uma pesquisa no banco e assim trazer o valor de forma dinâmica
                $scope.pegarId = function () {

                    var id = $scope.projeto.id_folha;

                    AgendaFactory.verFolha(id).then(function (folha) {

                        var folhaCopy = angular.copy(folha);

                        $scope.folha = folhaCopy;

                    });

                };
                // fim de pegar os valores dinâmicos

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };

                $scope.terminar = function () {

                    AgendaFactory.colocarDataFinal($scope.projeto.id_folha, id);


                    $modalInstance.dismiss('cancel');
                };

            };

        }]);

}());
