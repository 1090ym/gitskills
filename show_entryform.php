<?php
    require_once "./api/pdo.php";
    require_once "./api/entryform.php";
    header('Content-type:text/json;charset=utf8');
    $entryform_id=$_POST['entryform_id'];

    $get_ques = new entryform($pdo);

    try{
        $re = $get_ques->get_questionInfo($entryform_id);
        echo $re;
    }catch (Exception $e){
        echo $e->getMessage();
        echo $e->getCode();
    }
?>
