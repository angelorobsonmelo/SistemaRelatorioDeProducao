<?php
/**
 * Created by PhpStorm.
 * User: AngeloRobson
 * Date: 02/03/2015
 * Time: 19:20
 */
include_once '../conexao/Conexao.class.php';
include_once '../model/Usuario.class.php';


  class UsuarioDAO{


      private $conexao;

      public function  __construct(){

          $this->conexao = Conexao::getInstancia();
      }

      public function inserir($usuario){

          $com  = $this->conexao->prepare("INSERT INTO usuario (nome, sobrenome, email, senha, status) VALUES ( ?, ?, ?, ?, ?)");

          $com->bindValue(1, $usuario->nome);
          $com->bindValue(2, $usuario->sobrenome);
          $com->bindValue(3, $usuario->email);
          $com->bindValue(4, $usuario->senha);
          $com->bindValue(5, $usuario->status);

          echo "Cadastrado com sucesso";

          $com->execute();



      }




      public function atualizar($usuario){

          $com  = $this->conexao->prepare("UPDATE usuario SET nome=?, sobrenome=?, email=?, senha=?, status=? WHERE id=?");

          $com->bindValue(1, $usuario->nome);
          $com->bindValue(2, $usuario->sobrenome);
          $com->bindValue(3, $usuario->email);
          $com->bindValue(4, $usuario->senha);
          $com->bindValue(5, $usuario->status);
          $com->bindValue(6, $usuario->id);

          echo "Cadastrado com sucesso";

          $com->execute();



      }

      public function  buscarTodos()
      {

          $com  = $this->conexao->prepare("SELECT * FROM usuario");

          $com->execute();

          $linha = $com->fetchAll(PDO::FETCH_OBJ); // fetchAll retorna o array


          return $linha;
      }

     public function delete($id) {

         $com = $this->conexao->prepare("DELETE FROM usuario WHERE id=?");
         $com->bindValue(1, $id);
         $com->execute();
     }

      public function pesquisarUsuario($id) {

          $com = $this->conexao->prepare("SELECT * FROM usuario WHERE id=?");
          $com->bindValue(1, $id);
          $com->execute();
          $linha = $com->fetch(PDO::FETCH_OBJ); // fetch é para apenas um objeto
          return $linha;
      }


      public function login($mail, $senha) {

          $com = $this->conexao->prepare("SELECT U.nome, U.sobrenome, U.email, U.status FROM usuario U WHERE email = ? AND senha= ? ");
          $com->bindValue(1, $mail);
          $com->bindValue(2, $senha);
          $com->execute();
          $linha = $com->fetch(PDO::FETCH_OBJ); // fetch é para apenas um objeto
          return $linha;
      }
  }
