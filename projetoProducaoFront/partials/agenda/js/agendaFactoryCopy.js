(function () {

    'use strict';

    angular.module('ielApp')
        .factory('AgendaFactory', ['$http', '$q', '$window', function ($http, $q, $window) {

            function add(projeto) {

                $http.post('/ProjetoRelatorioBackEnd/rest/agenda/agendar', projeto)
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

                $http.get('/Crud2/resources/pesquisarFolha/' + id)
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

                $http.get('/Crud2/resources/folhas')
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

                $http.get('/Crud2/resources/agenda')
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


                    $http.get('/Crud2/resources/agenda')
                        .success(function (data) {

                            for (var i = 0; i < data.length; i++) {


                                data[i].data_recebimento = moment(data[i].data_recebimento).format('L');
                                data[i].data_inicio = moment(data[i].data_inicio).format('L');
                                data[i].data_entrega = moment(data[i].data_entrega).format('L');
                                data[i].valor = parseInt(data[i].valor)
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

                    $http.get('/Crud2/resources/projetoPorStatus/' + filtro)
                        .success(function (data) {

                            var somaPorStatus = 0;

                            for (var i = 0; i < data.length; i++) {

                                data[i].data_recebimento = moment(data[i].data_recebimento).format('L');
                                data[i].data_inicio = moment(data[i].data_inicio).format('L');
                                data[i].data_entrega = moment(data[i].data_entrega).format('L');
                                data[i].valor = parseInt(data[i].valor)

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

                    $http.delete('/ProjetoRelatorioBackEnd/rest/agenda/excluir/' + id)
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

                    $http.put('/Crud2/resources/iniciarProjeto', objToJson())
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

            function colocarDataFinal(objeto, terminar, id) {


                if (terminar == true) {

                    var dataHoje = new Date();
                    var dataRecebimento = objeto.data_recebimento;

                    var diaRecebimento = dataRecebimento.substring(0, 2);
                    var mesRecebimento = dataRecebimento.substring(3, 5);
                    var anoRecebimento = dataRecebimento.substring(6, 10);

                    var dataRecebimentoPadraoEng = anoRecebimento + "/" + mesRecebimento + "/" + diaRecebimento;

                    var dataRecebimentoParse = new Date(dataRecebimentoPadraoEng);

//				****************************************************************
                    var dataInicio = objeto.data_inicio;

                    var diaInicio = dataInicio.substring(0, 2);
                    var mesInicio = dataInicio.substring(3, 5);
                    var anoInicio = dataInicio.substring(6, 10);

                    var dataInicioPadraoEng = anoInicio + "/" + mesInicio + "/" + diaInicio;

                    var dataInicioParse = new Date(dataInicioPadraoEng);

                    var objToJson = function () {
                        return angular.toJson({
                            "id": id,
                            "id_folha": objeto.id_folha,
                            "descricao": objeto.descricao,
                            "data_recebimento": dataRecebimentoParse,
                            "data_inicio": dataInicioParse,
                            "data_entrega": dataHoje

                        });

                    };

                    console.log(objToJson());

                    $http.put('/Crud2/resources/finalizarProjeto', objToJson())
                        .success(function () {
                            alert('projeto Finalizado com sucesso!');
                            $window.location.reload();


                        })
                        .error(function () {
                            console.log('aconteceu algo ruim');
                        })

                } else {

                    console.log("fazer nada");
                }
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