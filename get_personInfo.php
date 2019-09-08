<?php
    session_start();
    define("DBNAME",'pocketcampus');
    require_once "./api/pdo.php";
    require_once "./api/entryform.php";
    //header('Content-type:text/json;charset=utf8');

    
    $username = $_SESSION['username'];
    $nickname = $_SESSION['nickname'];
    $img = $_SESSION['img'];
    
    $re = array('username' => $username,
                'nickname' => $nickname,
                'img' => $img);
    echo json_encode($re,JSON_UNESCAPED_UNICODE);

?>