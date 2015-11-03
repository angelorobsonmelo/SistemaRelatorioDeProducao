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


$app->get('/gerarDosProjetosTerminados', 'gerarDosProjetosTerminados');
function gerarDosProjetosTerminados()
{



    $saida =
        "<html>
            <body>
                <h1>MEU PRIMEIRO Ângelo PDF</h1>
                <ul>
                    <li>PHP</li>
                    <li>HTML</li>
                    <li>PDF</li>
                </ul>
                <h5><i>Mais em http://www.programatche.net</h5>
            </body>
        </html>
        ";

    $arquivo = "Exemplo03.pdf";

   // $mpdf = new mPDF();
  //  $mpdf->WriteHTML($saida);
    /*
     * F - salva o arquivo NO SERVIDOR
     * I - abre no navegador E NÃO SALVA
     * D - chama o prompt E SALVA NO CLIENTE
     */
    $request = \Slim\Slim::getInstance()->response();
    $request->headers->set("Content-Type", "application/pdf"); //$f->type
    $request->setBody($saida);

  //  $mpdf->Output($arquivo, 'D');


}


$app->get('/relatorioDosProjetosRecebidos/:de/:a', 'relatorioDosProjetosRecebidos');
function relatorioDosProjetosRecebidos($de, $a)
{
    $agendaDAO = new AgendaDAO();

    echo json_encode($agendaDAO->relatorioDosProjetosRecebidos($de, $a));

}


/******FIM DO REST DA AGENDA*******/

$app->run();
