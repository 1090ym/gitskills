<?php
    define("DBNAME",'question');

    require_once "./api/conn.php";
    require_once "./api/entryform.php";

    header('Content-type:text/json;charset=utf8');
    $entryform_id = $_POST['form_id'];
    $answer = $_POST['answer_data'];
    $user_id = $_POST['user_id'];
    //$user_id = 1;
    //$entryform_id = 14;
    /*$answer = [
                [1,1,"姓名","尹卯"],
                [2,1,"年级","大三"],
                [3,3,"性别",["男","女","","","",""],["男"]],
                [4,4,"爱好",["篮球","网球","乒乓球","羽毛球","",""],["篮球","羽毛球"]],
                [5,2,"其他","喜欢运动"]
            ];*/
    $sub_answer = new entryform($pdo);

    try{
        $re = $sub_answer->insert_answer($answer,$entryform_id,$user_id);
        echo json_encode($re,JSON_UNESCAPED_UNICODE);//输出json数据
    }catch (Exception $e){
        echo $e->getMessage();
        echo $e->getCode();
    }

?>