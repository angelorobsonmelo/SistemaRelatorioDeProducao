<?php
/**
 * Created by PhpStorm.
 * User: AngeloRobson
 * Date: 04/03/2015
 * Time: 05:20
 */
include_once '../conexao/Conexao.class.php';


class FolhaDAO
{

    private $conexao;

    public function  __construct()
    {

        $this->conexao = Conexao::getInstancia();
    }



    public function  folhas()
    {

        $com  = $this->conexao->prepare("SELECT * FROM folha ORDER BY tipo_folha");

        $com->execute();

        $linha = $com->fetchAll(PDO::FETCH_OBJ); // fetchAll retorna o array



        return $linha;
    }

    public function pesquisarFolha($id) {

        $com = $this->conexao->prepare("SELECT * FROM folha WHERE id=?");
        $com->bindValue(1, $id);
        $com->execute();
        $linha = $com->fetch(PDO::FETCH_OBJ); // fetch é para apenas um objeto
        return $linha;
    }










}