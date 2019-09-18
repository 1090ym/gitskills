<?php
    session_start();
    define("DBNAME",'pocketcampus');
    require_once "./api/pdo.php";
    require_once "./api/entryform.php";
    //header('Content-type:text/json;charset=utf8');

    $user_id = $_SESSION['user_id'];
    $username = $_SESSION['username'];
    $nickname = $_SESSION['nickname'];
    $img = $_SESSION['img'];
    
    $re = array('user_id' => $user_id,
                'username' => $username,
                'nickname' => $nickname,
                'img' => $img);
    echo json_encode($re,JSON_UNESCAPED_UNICODE);

?>