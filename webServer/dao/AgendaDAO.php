<?php
/**
 * Created by PhpStorm.
 * User: AngeloRobson
 * Date: 04/03/2015
 * Time: 22:30
 */

include_once '../conexao/Conexao.class.php';


class AgendaDAO {

    private $conexao;

    public function  __construct()
    {

        $this->conexao = Conexao::getInstancia();
    }

    public function  agenda()
    {

        $com  = $this->conexao->prepare("SELECT * FROM agenda A, folha F WHERE A.id_folha = F.id"
        );

        $com->execute();

        $linha = $com->fetchAll(PDO::FETCH_OBJ); // fetchAll retorna o array



        return $linha;
    }

    public function  projetosTerminados()
    {

        $com  = $this->conexao->prepare("SELECT F.tipo_folha, F.valor, A.id, A.id_folha, A.descricao, A.data_recebimento, A.data_inicio, A.data_entrega, A.status FROM agenda A, folha F WHERE A.id_folha = F.id AND A.status = 'T'

"
        );

        $com->execute();

        $linha = $com->fetchAll(PDO::FETCH_OBJ); // fetchAll retorna o array



        return $linha;
    }

    public function  projetoPorStatus($status)
    {

        $com  = $this->conexao->prepare("SELECT F.tipo_folha, F.valor, A.id, A.id_folha, A.descricao, A.data_recebimento, A.data_inicio, A.data_entrega, A.status FROM agenda A, folha F WHERE A.id_folha = F.id AND A.status = ?"

        );
        $com->bindValue(1, $status);

        $com->execute();

        $linha = $com->fetchAll(PDO::FETCH_OBJ); // fetchAll retorna o array



        return $linha;
    }

    public function  iniciarProjeto($projeto)
    {

        $com  = $this->conexao->prepare("UPDATE agenda SET data_inicio=?, status=? WHERE id = ?"

        );
        $com->bindValue(1, $projeto->data_inicio);
        $com->bindValue(2, 'I');
        $com->bindValue(3, $projeto->id);

        $com->execute();


    }

    public function  finalizarProjeto($projeto)
    {

        $com  = $this->conexao->prepare("UPDATE agenda SET data_entrega=?, status=?, id_folha=? WHERE id = ?"

        );
        $com->bindValue(1, $projeto->data_entrega);
        $com->bindValue(2, 'T');
        $com->bindValue(3, $projeto->id_folha);
        $com->bindValue(4, $projeto->id);

        $com->execute();


    }

    public function  salvarProjeto($projeto)
    {

        $com  = $this->conexao->prepare("INSERT INTO agenda (id_folha, descricao, data_recebimento, status) VALUES (?, ?, ?, ?)"

        );
        $com->bindValue(1, 4);
        $com->bindValue(2, $projeto->descricao);
        $com->bindValue(3, $projeto->data_recebimento);
        $com->bindValue(4, 'A');

        $com->execute();


    }

    public function  salvarProjetoCompleto($projeto)
    {

        $com  = $this->conexao->prepare("INSERT INTO agenda (id_folha, descricao, data_recebimento, data_inicio, data_entrega, status) VALUES (?, ?, ?, ?, ?, ?)"

        );
        $com->bindValue(1, $projeto->id_folha);
        $com->bindValue(2, $projeto->descricao);
        $com->bindValue(3, $projeto->data_recebimento);
        $com->bindValue(4, $projeto->data_inicio);
        $com->bindValue(5, $projeto->data_entrega);
        $com->bindValue(6, 'T');

        $com->execute();


    }

    public function  excluirProjeto($id)
    {

        $com  = $this->conexao->prepare("DELETE FROM agenda WHERE id = ?"

        );
        $com->bindValue(1, $id);

        $com->execute();


    }

    public function  pesquisarProjetoPorId($id)
    {

        $com  = $this->conexao->prepare("SELECT F.tipo_folha, F.valor, A.id, A.id_folha, A.descricao, A.data_recebimento, A.data_inicio, A.data_entrega, A.status FROM agenda A, folha F WHERE A.id_folha = F.id AND A.id = ?"

        );
        $com->bindValue(1, $id);

        $com->execute();

        $linha = $com->fetch(PDO::FETCH_OBJ); // fetch retorna um objeto

        return $linha;




    }


    public function  atualizarProjeto($projeto)
    {

        $com  = $this->conexao->prepare("UPDATE agenda SET id_folha=?, descricao=?, data_recebimento=?, data_inicio=?, data_entrega=? WHERE id = ?"

        );
        $com->bindValue(1, $projeto->id_folha);
        $com->bindValue(2, $projeto->descricao);
        $com->bindValue(3, $projeto->data_recebimento);
        $com->bindValue(4, $projeto->data_inicio);
        $com->bindValue(5, $projeto->data_entrega);
        $com->bindValue(6, $projeto->id);

        $com->execute();


    }


    public function  relatorioDosProjetosTerminados($projeto)
    {

        $com  = $this->conexao->prepare("SELECT A.id, A.id_folha, A.descricao, A.data_recebimento, A.data_inicio, A.data_entrega, F.tipo_folha, F.valor FROM agenda A, folha F WHERE A.id_folha = F.id  AND data_entrega BETWEEN ? AND ? AND A.status = 'T'"

        );
        $com->bindValue(1, $projeto->de);
        $com->bindValue(2, $projeto->a);


        $com->execute();

        $linha = $com->fetchAll(PDO::FETCH_OBJ); // fetch retorna um objeto

        return $linha;


    }

    public function  relatorioDosProjetosRecebidos($projeto)
    {

        $com  = $this->conexao->prepare("SELECT A.id, A.id_folha, A.descricao, A.data_recebimento, A.data_inicio, A.data_entrega, A.status, F.tipo_folha, F.valor FROM agenda A, folha F WHERE A.id_folha = F.id AND data_recebimento BETWEEN ? AND ? ORDER BY status
"

        );
        $com->bindValue(1, $projeto->de);
        $com->bindValue(2, $projeto->a);


        $com->execute();

        $linha = $com->fetchAll(PDO::FETCH_OBJ); // fetch retorna um objeto

        return $linha;


    }






























} 