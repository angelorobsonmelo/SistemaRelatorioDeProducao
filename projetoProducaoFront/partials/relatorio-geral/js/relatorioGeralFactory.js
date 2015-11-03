(function () {

    'use strict';

    angular.module('ielApp')
        .factory('RelatorioGeralFactory', ['$http', '$q', '$window', function ($http, $q, $window) {

            function exibirRelatorioGeral(relatorio, $scope) {


                var retorno = $q.defer();

                $http.post('/SistemaDeRelatorioDeProducaoPHP/branches/Crud2/resources/relatorioDosProjetosRecebidos', relatorio)
                    .success(function (data) {

                        if (data == '') {

                            alert("Não há dados entre essas datas, tente outras datas!");

                        } else {

                            var total = 0;

                            for (var i = 0; i < data.length; i++) {

                                data[i].data_inicio = moment(data[i].data_inicio).format('L');
                                data[i].data_recebimento = moment(data[i].data_recebimento).format('L');
                                data[i].data_entrega = moment(data[i].data_entrega).format('L');
                                data[i].valor = parseInt(data[i].valor);

                                total += data[i].valor;
                            }
                        }

                        $scope.resultadoTotal = total;

                        retorno.resolve(data);

                    })
                    .error(function () {
                        alert("alguma coisa ruim aconteceu")
                    });

                return retorno.promise;

            }

            function gerarOPdfAlternativa(dados) {

                $http.post('/SistemaDeRelatorioDeProducaoPHP/branches/Crud2/resources/gerarPdfDosProjetosRecebidos', dados)
                    .success(function () {
                        console.log("sucesso!")
                    })
                    .error(function () {
                        console.log('erro');
                    })
            }

            function verAgendaPorStatus($scope, filtro) {

                var agora = new Date();
                var mesAtual = agora.getMonth();
                var anoAtual = agora.getFullYear();

                var dadosAtuais = [];
                var dadosAntigos = [];

                var retorno = $q.defer();

                if (filtro == '') {

                    var somaPorStatus = 0;
                    $scope.resultadoTotal = somaPorStatus;
                    $scope.relatorio = '';
                    $scope.esconderBotaoImprimir = false;


                }
                else if (filtro == 'todos') {
                    $scope.esconderBotaoImprimir = true;
                    var somaPorStatus = 0;
                    var nada = [];

                    $http.get('/SistemaDeRelatorioDeProducaoPHP/branches/Crud2/resources/agenda')
                        .success(function (data) {

                            for (var i = 0; i < data.length; i++) {

                                var dataRecebimento = new Date(data[i].data_recebimento);

                                if (dataRecebimento.getFullYear() == anoAtual && dataRecebimento.getMonth() == mesAtual) {

                                    data[i].data_recebimento = moment(data[i].data_recebimento).format('L');
                                    data[i].data_inicio = moment(data[i].data_inicio).format('L');
                                    data[i].data_entrega = moment(data[i].data_entrega).format('L');

                                    data[i].valor = parseInt(data[i].valor);
                                    somaPorStatus += data[i].valor;

                                    dadosAtuais.push({
                                        "id": data[i].id,
                                        "status": data[i].status,
                                        "descricao": data[i].descricao,
                                        "data_recebimento": data[i].data_recebimento,
                                        "data_inicio": data[i].data_inicio,
                                        "valor": data[i].valor,
                                        "tipo_folha": data[i].tipo_folha,
                                        "data_entrega": data[i].data_entrega

                                    });


                                } else {
                                    dadosAntigos.push({
                                        "id": data[i].id,
                                        "status": data[i].status,
                                        "descricao": data[i].descricao,
                                        "data_recebimento": data[i].data_recebimento,
                                        "data_inicio": data[i].data_inicio,
                                        "valor": data[i].valor,
                                        "tipo_folha": data[i].tipo_folha,
                                        "data_entrega": data[i].data_entrega

                                    });

                                }

                            }


                            retorno.resolve(dadosAtuais);
                            $scope.resultadoTotal = somaPorStatus;

                        })
                        .error(function () {

                            alert("Sem conexão com a internet");
                        })
                    return retorno.promise;

                }
                else {

                    $http.get('/SistemaDeRelatorioDeProducaoPHP/branches/Crud2/resources/projetoPorStatus/' + filtro)
                        .success(function (data) {
                            $scope.esconderBotaoImprimir = true;

                            var somaPorStatus = 0;

                            for (var i = 0; i < data.length; i++) {

                                var dataRecebimento = new Date(data[i].data_recebimento);

                                if (dataRecebimento.getFullYear() == anoAtual && dataRecebimento.getMonth() == mesAtual) {

                                    data[i].data_recebimento = moment(data[i].data_recebimento).format('L');
                                    data[i].data_inicio = moment(data[i].data_inicio).format('L');
                                    data[i].data_entrega = moment(data[i].data_entrega).format('L');
                                    data[i].valor = parseInt(data[i].valor);

                                    somaPorStatus += data[i].valor;

                                    dadosAtuais.push({
                                        "id": data[i].id,
                                        "status": data[i].status,
                                        "descricao": data[i].descricao,
                                        "data_recebimento": data[i].data_recebimento,
                                        "data_inicio": data[i].data_inicio,
                                        "valor": data[i].valor,
                                        "tipo_folha": data[i].tipo_folha,
                                        "data_entrega": data[i].data_entrega

                                    });


                                } else {
                                    dadosAntigos.push({
                                        "id": data[i].id,
                                        "status": data[i].status,
                                        "descricao": data[i].descricao,
                                        "data_recebimento": data[i].data_recebimento,
                                        "data_inicio": data[i].data_inicio,
                                        "valor": data[i].valor,
                                        "tipo_folha": data[i].tipo_folha,
                                        "data_entrega": data[i].data_entrega

                                    });

                                }

                            }


                            retorno.resolve(dadosAtuais);
                            $scope.resultadoTotal = somaPorStatus;

                        })
                        .error(function () {

                            alert("Sem conexão com a internet");
                        })
                }
                return retorno.promise;
            }

            function imprimirRelatorio() {

                $window.location = "/SistemaDeRelatorioDeProducaoPHP/branches/Crud2/resources/downloadPdfMensal";
            }

            return {

                exibirRelatorioGeral: exibirRelatorioGeral,
                gerarOPdfAlternativa: gerarOPdfAlternativa,
                verAgendaPorStatus: verAgendaPorStatus,
                imprimirRelatorio: imprimirRelatorio

            }

        }]);

}());
