<?php
    session_start();
    define("DBNAME",'question');

    require_once "./api/conn.php";
    require_once "./api/entryform.php";

    header('Content-type:text/json;charset=utf8');


    $user_id = $_POST['user_id'];
    //$user_id = 24;
    $form_id = $_POST['form_id'];
    //$form_id = 40;

    $Form = new entryform($pdo);
    try{
        $re = $Form->Is_writeForm($user_id, $form_id);
        echo json_encode($re);
    } catch (Exception $e){
        echo $e->getMessage();
        echo $e->getCode();
    }
?>
    
    