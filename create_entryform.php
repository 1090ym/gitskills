<?php
    

    header('Content-type:text/json;charset=utf-8');
    $question=$_POST['question'];
    //$password=$_POST['password'];

    $arr = '[
        [1,1,"姓名"],
        [2,1,"姓名"],
        [3,1,"姓名"]
    ]';

    

    $data='{username:"user",password:"name"}';//组合成json格式数据

    if($question){
        echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    }







