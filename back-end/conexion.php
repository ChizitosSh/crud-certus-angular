<?php

class dbcrud{
    public function __construct(){

    }

    function Conexion(){
        $cn = new PDO('mysql:host=localhost; dbname=crud', 'root', '');
    return $cn;
    }

}