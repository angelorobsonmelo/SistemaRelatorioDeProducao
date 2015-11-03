<?php
/**
 * Created by PhpStorm.
 * User: AngeloRobson
 * Date: 02/03/2015
 * Time: 18:48
 */

class Conexao extends PDO {

  private static $instancia;

    public function Conexao($dns, $user, $pass) {

        parent::__construct($dns, $user, $pass);

    }

    public static function getInstancia(){

        if(!isset(self::$instancia)){

        try{


            self::$instancia= new Conexao(
                "mysql:host=localhost;dbname=producao;charset=utf8", "root", ""

             );


        }catch (Exception $e){

             die ('Erro ao conectar na base de dados');
        }


        }
        return self::$instancia;
    }

} 