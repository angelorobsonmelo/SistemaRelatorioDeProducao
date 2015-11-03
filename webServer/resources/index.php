<?php
/**
 * Created by PhpStorm.
 * User: AngeloRobson
 * Date: 02/03/2015
 * Time: 19:33
 */
require '../vendor/autoload.php';
include_once '../dao/UsuarioDAO.php';
include_once '../dao/FolhaDAO.php';
include_once '../dao/AgendaDAO.php';
date_default_timezone_set('America/Sao_Paulo');
include '../pdf/mpdf.php';

$app = new \Slim\Slim();
$app->response()->header('Content-Type', 'application/json;charset=utf-8');


/********  REST DO USUÁRIO   ******/
$app->get('/users', 'buscarTodos');
function buscarTodos()
{
    $usuarios = new UsuarioDAO();

    echo json_encode($usuarios->buscarTodos());

}


$app->post('/cadastrar', 'cadastrar');
function cadastrar()
{


    $request = \Slim\Slim::getInstance()->request();

    $body = $request->getBody();

    $usuario = json_decode($body);

    $usuarioDAO = new UsuarioDAO();
    $usuarioDAO->inserir($usuario);

}

$app->put('/atualizar', 'atualizar');
function atualizar()
{


    $request = \Slim\Slim::getInstance()->request();
    $body = $request->getBody();

    $usuario = json_decode($body);

    $usuarioDAO = new UsuarioDAO();
    $usuarioDAO->atualizar($usuario);

}

$app->delete('/deleteUser/:id', 'deletarUsuario');
function deletarUsuario($id)
{

    $usuarioDAO = new UsuarioDAO();
    $usuarioDAO->delete($id);


}


$app->get('/pesquisarUsuario/:id', 'pesquisarUsuario');
function pesquisarUsuario($id)
{

    $usuarioDAO = new UsuarioDAO();
    echo json_encode($usuarioDAO->pesquisarUsuario($id));


}

$app->get('/login/:email/:senha', 'login');
function login($email, $senha)
{

    $usuarioDAO = new UsuarioDAO();
    echo json_encode($usuarioDAO->login($email, $senha));


}

/******FIM DO REST DO USUÁRIO *******/


/******INÍCIO DO REST DA FOLHA*******/
$app->get('/folhas', 'folhas');
function folhas()
{
    $folha = new FolhaDAO();

    echo json_encode($folha->folhas());

}

$app->get('/pesquisarFolha/:id', 'pesquisarFolha');
function pesquisarFolha($id)
{

    $folhaDAO = new FolhaDAO();
    echo json_encode($folhaDAO->pesquisarFolha($id));


}

/******FIM DO REST DA FOLHA*******/


/******INÍCIO DA REST DA AGENDA*******/


$app->get('/agenda', 'agenda');
function agenda()
{


    $agendaDAO = new AgendaDAO();

    echo json_encode($agendaDAO->agenda());

}

$app->get('/projetosTerminados', 'projetosTerminados');
function projetosTerminados()
{
    $agendaDAO = new AgendaDAO();

    echo json_encode($agendaDAO->projetosTerminados());

}

$app->get('/projetoPorStatus/:status', 'projetoPorStatus');
function projetoPorStatus($status)
{
    $agendaDAO = new AgendaDAO();

    echo json_encode($agendaDAO->projetoPorStatus($status));

}

$app->put('/iniciarProjeto', 'iniciarProjeto');
function iniciarProjeto()
{


    $request = \Slim\Slim::getInstance()->request();
    $body = $request->getBody();

    $projeto = json_decode($body);

    $projetoDAO = new AgendaDAO();
    $projetoDAO->iniciarProjeto($projeto);

}

$app->put('/finalizarProjeto', 'finalizarProjeto');
function finalizarProjeto()
{


    $request = \Slim\Slim::getInstance()->request();
    $body = $request->getBody();

    $projeto = json_decode($body);

    $projetoDAO = new AgendaDAO();
    $projetoDAO->finalizarProjeto($projeto);

}

$app->post('/salvarProjeto', 'salvarProjeto');
function salvarProjeto()
{


    $request = \Slim\Slim::getInstance()->request();
    $body = $request->getBody();

    $projeto = json_decode($body);

    $projetoDAO = new AgendaDAO();
    $projetoDAO->salvarProjeto($projeto);

}

$app->post('/salvarProjetoCompleto', 'salvarProjetoCompleto');
function salvarProjetoCompleto()
{


    $request = \Slim\Slim::getInstance()->request();
    $body = $request->getBody();

    $projeto = json_decode($body);

    $projetoDAO = new AgendaDAO();
    $projetoDAO->salvarProjetoCompleto($projeto);

}

$app->delete('/excluirProjeto/:id', 'excluirProjeto');
function excluirProjeto($id)
{
    $agendaDAO = new AgendaDAO();

    echo json_encode($agendaDAO->excluirProjeto($id));

}


$app->get('/pesquisarProjetoPorId/:id', 'pesquisarProjetoPorId');
function pesquisarProjetoPorId($id)
{
    $agendaDAO = new AgendaDAO();

    echo json_encode($agendaDAO->pesquisarProjetoPorId($id));

}

$app->put('/atualizarProjeto', 'atualizarProjeto');
function atualizarProjeto()
{


    $request = \Slim\Slim::getInstance()->request();
    $body = $request->getBody();

    $projeto = json_decode($body);

    $projetoDAO = new AgendaDAO();
    $projetoDAO->atualizarProjeto($projeto);

}

$app->post('/relatorioDosProjetosTerminados', 'relatorioDosProjetosTerminados');
function relatorioDosProjetosTerminados()
{

    $request = \Slim\Slim::getInstance()->request();
    $body = $request->getBody();

    $projeto = json_decode($body);

    $agendaDAO = new AgendaDAO();

    echo json_encode($agendaDAO->relatorioDosProjetosTerminados($projeto));

}


$app->post('/gerarPdfDosProjetosTerminados', 'gerarPdfDosProjetosTerminados');
function gerarPdfDosProjetosTerminados()
{

    $request = \Slim\Slim::getInstance()->request();
    $body = $request->getBody();

    $projeto = json_decode($body);

    $total = 0;

    $saida =
        '
        <style>
       body {
  background-color: #fff;
  color: #111;
  margin: 0;
  padding: 0;
  font: 1.00em/0.1 "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Verdana, Tahoma, sans-serif;

}

.wrapper {
  width: 500%;
  margin: 20px auto 40px auto;
   text-align: center;
}

.datatable {
  width: 500%;
  border: 1px solid #d6dde6;
  border-collapse: collapse;
  font-size: x-large;
   text-align: center;
}
.datatable td {
  border: 1px solid #d6dde6;
  padding: 0.3em;
  font-size: x-large;
   text-align: center;
}
.datatable th {
  border: 1px solid #828282;
  background-color: #C0C0C0;
  font-weight: bold;
  text-align: center;
  padding-left: 0.3em;
  font-size: x-large;

}


        </style>
<html>
            <body>

        ';

    $data = date("d/m/Y");
    $hora = date("H:i:s");


    $saida .= "<h1 style='text-align: center'>Relatório</h1><br/>
      <h3  style='text-align: center'>Solicitado no dia $data às $hora</h3>
     <hr/>
     <div class='wrapper'>
     <table class='datatable' >
     <tr class='altrow'>
     <th>Descrição</th>
     <th>Folha</th>
     <th>Valor</th>
     <th>Data de recebimento</th>
     <th>Data de ínicio</th>
     <th>Data de entrega</th>
     </tr>
";

    foreach ($projeto as $obj) {

        $total += $obj->valor;
        $saida .= "
        <tr class='altrow'>
        <td>$obj->descricao</td>
        <td>$obj->tipo_folha</td>
        <td>R$$obj->valor,00</td>
        <td>$obj->data_recebimento</td>
        <td>$obj->data_inicio</td>
        <td>$obj->data_entrega</td>
        </tr>
";

    }

    $quantidadeDeProjetos = sizeof($projeto);

    $saida .= "<tr><td><b>Total de projetos:</b> $quantidadeDeProjetos </td>";

    $saida .= "<tr><td><b>Total:</b> R$$total,00</td>


</tr>";

    $saida .= "</table></div></body></html>";

    $arquivo = "relatorio-projetos-terminados.pdf";

    $mpdf = new mPDF();
    $mpdf->WriteHTML($saida);
    /*
     * F - salva o arquivo NO SERVIDOR
     * I - abre no navegador E NÃO SALVA
     * D - chama o prompt E SALVA NO CLIENTE
     */

    $mpdf->Output($arquivo, 'F');

    //echo "PDF GERADO COM SUCESSO";


}


$app->get('/downloadPdfTerminados', 'downloadPdfTerminados');
function downloadPdfTerminados()
{

    $request = \Slim\Slim::getInstance()->response();
    $request->header("Content-Type", "application/pdf");


    $myfile = fopen("relatorio-projetos-terminados.pdf", "r") or die("Unable to open file!");
    echo fread($myfile, filesize("relatorio-projetos-terminados.pdf"));
    fclose($myfile);


}


$app->post('/relatorioDosProjetosRecebidos', 'relatorioDosProjetosRecebidos');
function relatorioDosProjetosRecebidos()
{

    $request = \Slim\Slim::getInstance()->request();
    $body = $request->getBody();

    $projeto = json_decode($body);

    $agendaDAO = new AgendaDAO();

    echo json_encode($agendaDAO->relatorioDosProjetosRecebidos($projeto));

}


$app->post('/gerarPdfDosProjetosRecebidos', 'gerarPdfDosProjetosRecebidos');
function gerarPdfDosProjetosRecebidos()
{




    $request = \Slim\Slim::getInstance()->request();
    $body = $request->getBody();

    $projeto = json_decode($body);

    $total = 0;

    $saida =
        '
        <style>
       body {
  background-color: #fff;
  color: #111;
  margin: 0;
  padding: 0;
  font: 1.00em/0.1 "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Verdana, Tahoma, sans-serif;

}

.wrapper {
  width: 500%;
  margin: 20px auto 40px auto;
   text-align: center;
}

.datatable {
  width: 500%;
  border: 1px solid #d6dde6;
  border-collapse: collapse;
  font-size: x-large;
   text-align: center;
}
.datatable td {
  border: 1px solid #d6dde6;
  padding: 0.3em;
  font-size: x-large;
   text-align: center;
}
.datatable th {
  border: 1px solid #828282;
  background-color: #C0C0C0;
  font-weight: bold;
  text-align: center;
  padding-left: 0.3em;
  font-size: x-large;

}


        </style>
<html>
            <body>

        ';

    $data = date("d/m/Y");
    $hora = date("H:i:s");


    $saida .= "<h1 style='text-align: center'>Relatório</h1><br/>
      <h3  style='text-align: center'>Solicitado no dia $data às $hora</h3>
     <hr/>
     <div class='wrapper'>
     <table class='datatable' >
     <tr class='altrow'>
     <th>Descrição</th>
     <th>Folha</th>
     <th>Valor</th>
     <th>Data de recebimento</th>
     <th>Data de ínicio</th>
     <th>Data de entrega</th>
     <th>Status</th>
     </tr>
";

    foreach ($projeto as $obj) {

        $total += $obj->valor;
        $saida .= "
        <tr class='altrow'>
        <td>$obj->descricao</td>
        <td>$obj->tipo_folha</td>
        <td>R$$obj->valor,00</td>
        <td>$obj->data_recebimento</td>
        <td>$obj->data_inicio</td>
        <td>$obj->data_entrega</td>
        <td>$obj->status</td>
        </tr>
";

    }

    $quantidadeDeProjetos = sizeof($projeto);

    $saida .= "<tr><td><b>Total de projetos:</b> $quantidadeDeProjetos </td>";

    $saida .= "<tr><td><b>Total:</b> R$$total,00</td>


    </tr></table>";

   // $saida.= "<h3>$dataHora</h3>";

    $saida .= "</div></body></html>";

    $arquivo = "relatorio-projetos-recebidos.pdf";

    $mpdf = new mPDF();
    $mpdf->WriteHTML($saida);
    /*
     * F - salva o arquivo NO SERVIDOR
     * I - abre no navegador E NÃO SALVA
     * D - chama o prompt E SALVA NO CLIENTE
     */

    $mpdf->Output($arquivo, 'F');

    //echo "PDF GERADO COM SUCESSO";


}


$app->get('/downloadPdfMensal', 'downloadPdfMensal');
function downloadPdfMensal()
{

    $request = \Slim\Slim::getInstance()->response();
    $request->header("Content-Type", "application/pdf");


    $myfile = fopen("relatorio-projetos-recebidos.pdf", "r") or die("Unable to open file!");
    echo fread($myfile, filesize("relatorio-projetos-recebidos.pdf"));
    fclose($myfile);


}



/******FIM DO REST DA AGENDA*******/

$app->run();
