<?php
    session_start();
    define("DBNAME",'pocketcampus');
    require_once "./api/conn.php";
    require_once "./api/entryform.php";
    header('Content-type:text/json;charset=utf8');
    $state=$_POST['request'];
    $page = 1;
    $user_id = $_SESSION['user_id'];
    //$user_id = 24;
    $form = new entryform($pdo);
    $re = $form->get_myFormInfo($page, $user_id);

    //$data='{username:"user",password:"name"}';//组合成json格式数据
    
    echo json_encode($re,JSON_UNESCAPED_UNICODE);//输出json数据


?>

