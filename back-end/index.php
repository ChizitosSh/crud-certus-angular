<?php

header('Access-Control-Allow-Origin: http://localhost:4227');
header('Access-Control-Allow-Headers:*');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

include_once 'servicios.php';
$servicios = new Servicios();
$var = explode("/", $_GET['url']);


if($_SERVER['REQUEST_METHOD'] == 'GET'){

    if($var[0] == 'vista'){
        $servicios->getVista();
    }else if($var[0] == 'buscar'){
        if(isset($var[1])){
            $id = $var[1];
            $res = $servicios->getBuscar($var[1]);
        }
    }else if($var[0] == 'login'){
        if(isset($var[1])){
            $email = $var[1];
            $res = $servicios->getLogin($var[1]);
        }
    }else{
        echo('Request method not allowed');
    }

}else if($_SERVER['REQUEST_METHOD'] == 'POST'){

    if($var[0] == 'nuevo'){
        $body = file_get_contents('php://input');
        $array = json_decode($body, true);

        $servicios->getNuevo($array); // Antes decía $json
    }
} else if($_SERVER['REQUEST_METHOD'] == 'PUT'){

    if($var[0] == 'actualizar'){
        $body = file_get_contents('php://input');
        $array = json_decode($body, true);

        $servicios->getActualizar($array);
    }
} else if($_SERVER['REQUEST_METHOD'] == 'DELETE'){
    if($var[0] == 'eliminar'){
        if(isset($var[1])){
            $id = $var[1];
            $servicios->getEliminar($var[1]);
        }
    } else if($var[0] == 'eliminar-varios'){
        $body = json_decode(file_get_contents("php://input"), true);
        if(isset($body['ids'])){
            $idArray = $body['ids'];
            foreach ($idArray as $id) {
                $servicios->getEliminar($id);
            }
        }
    }
}