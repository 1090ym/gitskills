<?php
    require_once "./api/pdo.php";
    header('Content-type:text/json;charset=utf8');
    $state=$_POST['request'];
    $page = 1;
    $re = getFormInfo($page, $pdo);

    //$data='{username:"user",password:"name"}';//组合成json格式数据
    
    echo json_encode($re,JSON_UNESCAPED_UNICODE);//输出json数据

    function getFormInfo($page, $pdo){
        $pageSize = 30;    //每个页面的数据条数
        $sqltot = "select count(*) as columns from entryForm";
        $smt = $pdo->prepare($sqltot);      //获取末页
        $smt->execute();
        $cloumns = $smt->fetchColumn();

        $lastPage = ceil($cloumns/$pageSize);  //ceil向上取整

        if($page>=$lastPage){
            $page=$lastPage;
        }

        $nextpage = $page+1;
        if($nextpage>=$lastPage){
        $nextpage=$lastPage;
        }

        $prepage = $page-1;
        if($prepage<=1){
            $prepage=1;
        }

        $offset = ($page-1) * $pageSize;
        $sql="select * from entryForm order by entryForm_date desc limit {$offset},{$pageSize}";
        $ret = [];
        $smt = $pdo->prepare($sql);      //获取末页
        $smt->execute();

        while($re = $smt->fetch(PDO::FETCH_ASSOC)) {
            array_push($ret, $re);
        }
        return $ret;
        //$sql = "select * from FORUM_PUBLISH where Forum_Publish_WriterID = '$userID' order by Forum_Publish_Time desc limit $load_times";
    }