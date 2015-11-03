(function () {

    'use strict';

    angular.module('ielApp')
        .factory('AgendaFactory', ['$http', '$q', '$window', function ($http, $q, $window) {

            function add(projeto) {

                $http.post('/SistemaDeRelatorioDeProducaoPHP/branches/Crud2/resources/salvarProjeto', projeto)
                    .success(function () {

                        alert("salvo com sucesso!");
                        $window.location.reload();
                    })
                    .error(function () {

                        alert("aconteceu algum erro");
                    })
            }

            function verFolha(id) {

                var retorno = $q.defer();

                $http.get('/SistemaDeRelatorioDeProducaoPHP/branches/Crud2/resources/pesquisarFolha/' + id)
                    .success(function (data) {

                        retorno.resolve(data);
                        console.log(data);
                    })
                    .error(function () {

                        alert("Sem conexão com a internet");
                    })
                return retorno.promise;

            }

            function verFolhas() {

                var retorno = $q.defer();

                $http.get('/SistemaDeRelatorioDeProducaoPHP/branches/Crud2/resources/folhas')
                    .success(function (data) {

                        retorno.resolve(data);
                        console.log(data);
                    })
                    .error(function () {

                        alert("Sem conexão com a internet");
                    })
                return retorno.promise;
            }

            function verAgenda($scope) {

                var retorno = $q.defer();

                $http.get('/SistemaDeRelatorioDeProducaoPHP/branches/Crud2/resources/agenda')
                    .success(function (data) {


                        var soma = 0;
                        var condicao = [];
                        var dinamica = 0;

                        for (var i = 0; i < data.length; i++) {


                            data[i].data_recebimento = moment(data[i].data_recebimento).format('L');
                            data[i].data_inicio = moment(data[i].data_inicio).format('L');
                            data[i].data_entrega = moment(data[i].data_entrega).format('L');

                            data[i].valor = parseInt(data[i].valor)



                        }


                        retorno.resolve(data);
                        $scope.somaPorStatus = 0;

                    })
                    .error(function () {

                        alert("Sem conexão com a internet");
                    })
                return retorno.promise;
            }

            function verAgendaPorStatus($scope, filtro) {

                var retorno = $q.defer();

                if (filtro == '') {


                    $scope.somaPorStatus = 0;
                    $scope.agendaPorStatus = '';

                }
                else if (filtro == 'todos') {

                    var somaDeTodos = 0;


                    $http.get('/SistemaDeRelatorioDeProducaoPHP/branches/Crud2/resources/agenda')
                        .success(function (dados) {

                            var data = angular.copy(dados);
                            for (var i = 0; i < data.length; i++) {


                                data[i].data_recebimento = moment(data[i].data_recebimento).format('L');
                                data[i].data_inicio = moment(data[i].data_inicio).format('L');
                                data[i].data_entrega = moment(data[i].data_entrega).format('L');
                                data[i].valor = parseInt(data[i].valor);
                                somaDeTodos += data[i].valor;


                            }


                            retorno.resolve(data);
                            $scope.somaPorStatus = somaDeTodos;

                        })
                        .error(function () {

                            alert("Sem conexão com a internet");
                        })
                    return retorno.promise;

                }
                else {

                    $http.get('/SistemaDeRelatorioDeProducaoPHP/branches/Crud2/resources/projetoPorStatus/' + filtro)
                        .success(function (data) {

                            var somaPorStatus = 0;

                            for (var i = 0; i < data.length; i++) {

                                data[i].data_recebimento = moment(data[i].data_recebimento).format('L');
                                data[i].data_inicio = moment(data[i].data_inicio).format('L');
                                data[i].data_entrega = moment(data[i].data_entrega).format('L');
                                data[i].valor = parseInt(data[i].valor);

                                somaPorStatus += data[i].valor;


                            }

                            retorno.resolve(data);
                            $scope.somaPorStatus = somaPorStatus;


                        })
                        .error(function () {

                            alert("Sem conexão com a internet");
                        })
                }
                return retorno.promise;
            }

            function excluir(id, itens) {

                if (window.confirm("Tem certeza que deseja excluir o projeto " + itens.descricao + "?")) {

                    $http.delete('/SistemaDeRelatorioDeProducaoPHP/branches/Crud2/resources/excluirProjeto/' + id)
                        .success(function () {

                            alert("Excluído com sucesso!");
                            $window.location.reload();
                        })
                        .error(function () {
                            alert("alguma coisa ruim aconteceu");
                        })
                } else {


                }

            }

            function colocarDataInicio(id, iniciar) {

                if (iniciar == true) {

                    var dataHoje = new Date();

                    var objToJson = function () {
                        return angular.toJson({
                            "id": id,
                            "data_inicio": dataHoje

                        });

                    };

                    $http.put('/SistemaDeRelatorioDeProducaoPHP/branches/Crud2/resources/iniciarProjeto', objToJson())
                        .success(function () {
                            alert('projeto iniciado com sucesso!');
                            $window.location.reload();


                        })
                        .error(function () {
                            console.log('aconteceu algo ruim');
                        })

                } else {

                    console.log("fazer nada");
                }
            }

            function colocarDataFinal(id_folha, id) {

                    var dataHoje = new Date();

                    var objToJson = function () {
                        return angular.toJson({
                            "id": id,
                            "data_entrega": dataHoje,
                            "id_folha": id_folha
                        });

                    };


                    console.log(objToJson());

                    $http.put('/SistemaDeRelatorioDeProducaoPHP/branches/Crud2/resources/finalizarProjeto', objToJson())
                        .success(function () {
                            alert('projeto Finalizado com sucesso!');
                            $window.location.reload();


                        })
                        .error(function () {
                            console.log('aconteceu algo ruim');
                        })

                }

            return {

                add: add,
                verFolhas: verFolhas,
                verFolha: verFolha,
                verAgenda: verAgenda,
                excluir: excluir,
                colocarDataInicio: colocarDataInicio,
                verAgendaPorStatus: verAgendaPorStatus,
                colocarDataFinal: colocarDataFinal
            }
        }]);

}())