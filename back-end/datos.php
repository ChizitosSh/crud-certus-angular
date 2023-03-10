<?php

header('Access-Control-Allow-Origin: http://localhost:4227');
header('Access-Control-Allow-Headers:*');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

include_once 'conexion.php';

class Users extends dbcrud {

    // Función para ejecutar el sp_Vista
    function Vista(){
        $cn = $this->Conexion();
        $stm = $cn->prepare('call sp_Vista()');
        $stm->execute();
        return $stm;
    }

    // Función para ejecutar el sp_Buscar
    function Buscar($cod){
        $cn = $this->Conexion();
        $stm = $cn->prepare("call sp_Buscar(:d1)");
        $stm->bindParam(':d1', $cod);
        $stm->execute();
        return $stm;
    }

    // Función para ejecutar sp_Nuevo
    function Nuevo($array){
        $id = $array['id'];
        $title = $array['title'];
        $nom = $array['name'];
        $ape = $array['lastname'];
        $cor = $array['email'];
        $pass = $array['password'];
        $role = $array['role'];
        $image = $array['image'];
        $cn = $this->Conexion();
        $stm = $cn->prepare("call sp_Nuevo(:d1, :d2, :d3, :d4, :d5, :d6, :d7, :d8)");
        $stm->bindParam(':d1', $id);
        $stm->bindParam(':d2', $title);
        $stm->bindParam(':d3', $nom);
        $stm->bindParam(':d4', $ape);
        $stm->bindParam(':d5', $cor);
        $stm->bindParam(':d6', $pass);
        $stm->bindParam(':d7', $role);
        $stm->bindParam(':d8', $image);
        $stm->execute();
        return $stm;
    }

    // Función para ejecutar el sp_Actualizar
    function Actualizar($array) {
        $id = $array['id'];
        $title = $array['title'];
        $nom = $array['name'];
        $ape = $array['lastname'];
        $cor = $array['email'];
        $pass = $array['password'];
        $role = $array['role'];
        $image = $array['image'];
        $cn = $this->Conexion();
        $stm = $cn->prepare("call sp_Actualizar(:d1, :d2,:d3, :d4, :d5, :d6, :d7, :d8)");
        $stm->bindParam(':d1', $id);
        $stm->bindParam(':d2', $title);
        $stm->bindParam(':d3', $nom);
        $stm->bindParam(':d4', $ape);
        $stm->bindParam(':d5', $cor);
        $stm->bindParam(':d6', $pass);
        $stm->bindParam(':d7', $role);
        $stm->bindParam(':d8', $image);
        $stm->execute();
        return $stm;
    }

    // Función para ejecutar el sp_Eliminar
    function Eliminar($cod){
        $cn = $this->Conexion();
        $stm = $cn->prepare("call sp_Eliminar(:d1)");
        $stm->bindParam(':d1', $cod);
        $stm->execute();
        return $stm;
    }

    // Función para ejecutar el sp_Login
    function Login($cod) {
        $cn = $this->Conexion();
        $stm = $cn->prepare("call sp_Login(:d1)");
        $stm->bindParam(':d1', $cod);
        $stm->execute();
        return $stm;
    }

}