<?php

header('Access-Control-Allow-Origin: http://localhost:4227');
header('Access-Control-Allow-Headers:*');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

include_once 'datos.php';

class Servicios{

    // Servicio para la Vista
    function getVista(){
        $users = new Users();
        $lista = array();
        $res = $users->Vista()->fetchAll();
        
        // Recorrer el arreglo de la consulta
        foreach($res as $row){
            // $r es un Array con la misma estructura de la tabla Curso
            $r['id']= $row['id'];
            $r['title']= $row['title'];
            $r['name']= $row['name'];
            $r['lastname'] = $row['lastname'];
            $r['email'] = $row['email'];
            $r['password'] = $row['password'];
            $r['role'] = $row['role'];
            $r['image'] = $row['image'];
            array_push($lista, $r);
        }
        // json_encode -> Convertir un arreglo a un objeto JSON
        echo json_encode($lista);
    }
        
        
    // Servicio para Buscar -> Luego crear la pagina php que lo ejecute
    function getBuscar($cod){
        $users = new Users();
        $lista = array();
        $res = $users->Buscar($cod);
        
        if($res->rowCount()==1){
            $row = $res->fetch();
            $r['id']= $row['id'];
            $r['title']= $row['title'];
            $r['name']= $row['name'];
            $r['lastname'] = $row['lastname'];
            $r['email'] = $row['email'];
            $r['password'] = $row['password'];
            $r['role'] = $row['role'];
            $r['image'] = $row['image'];
            array_push($lista, $r);
        }else{
            $r['id']= "";
            $r['title']= "";
            $r['name']= "";
            $r['lastname'] = "";
            $r['email'] = "";
            $r['password'] = "";
            $r['role'] = "";
            $r['image'] = "";
            array_push($lista, $r);
        }
        echo json_encode($lista);
    }
        
        
    function getNuevo($array){
        $users = new Users();
        
        try{
            $users->Nuevo($array);
            // echo "El registro se actualizo satisfactoriamente";
        }catch(Exception $e){
            // echo "El registro no se actualizó";
        }
    }


    function getActualizar($array){
        $users = new Users();
        
        try{
            $users->Actualizar($array);
            // echo "El registro se inserto satisfactoriamente";
        }catch(Exception $e){
            // echo "El registro no se inserto";
        }
    }


    // Servicio para Eliminar -> Luego crear la pagina php que lo ejecute
    function getEliminar($cod){
        $users = new Users();
        $res = $users->Eliminar($cod);
        echo json_encode($res);
    }


    // Servicio para eliminar varios usuarios
    function getEliminarVarios($ids){
        $users = new Users();
        return $users->EliminarVarios($ids);
    }

    function getLogin($cod){
        $users = new Users();
        $lista = array();
        $res = $users->Login($cod);
        
        if($res->rowCount()==1){
            $row = $res->fetch();
            $r['id'] = $row['id'];
            $r['email'] = $row['email'];
            $r['password'] = $row['password'];
            array_push($lista, $r);
        }else{
            $r['id'] = "";
            $r['email'] = "";
            $r['password'] = "";
            array_push($lista, $r);
        }
        echo json_encode($lista);
    }
}