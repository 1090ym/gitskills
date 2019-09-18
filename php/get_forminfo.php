<?php
    session_start();
    require_once "./api/pdo.php";
    header('Content-type:text/json;charset=utf8');
    $state=$_POST['request'];
    $page = 1;
    $user_id = $_SESSION['user_id'];
    $re = getFormInfo($page, $pdo, $user_id);
    
    //$data='{username:"user",password:"name"}';//组合成json格式数据
    
    echo json_encode($re,JSON_UNESCAPED_UNICODE);//输出json数据

    function getFormInfo($page, $pdo, $user_id){
        $pageSize = 20;    //每个页面的数据条数
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
            $re['write_state'] = get_writestate($re['entryForm_id'], $user_id);
            array_push($ret, $re);
        }
        return $ret;
        //$sql = "select * from FORUM_PUBLISH where Forum_Publish_WriterID = '$userID' order by Forum_Publish_Time desc limit $load_times";
    }


    function get_writestate($form_id, $user_id) {
            header("Content-Type:text/html;charset=utf-8");
            $dbms="mysql";
            $dbName = "question";
            $user = "root";
            $pwd = "123456";
            $host = "127.0.0.1";
            $dsn = "$dbms:host=$host;dbname=$dbName";
            try{
                $conn =new PDO($dsn,$user,$pwd);
            }catch (Exception $e){
                echo $e->getMessage()."<br>";
            }
            $conn->query("SET NAMES utf8");        

        
            $form_name = "form" .$form_id;
            $sql="select * from ".$form_name." where user_id = '$user_id'";
            try{
                $smt = $conn->prepare($sql);      

                if(!($smt->execute())){
                    throw new Exception("获取报名表信息失败");
                }
    
                if($re = $smt->fetch(PDO::FETCH_ASSOC)) {
                    $result=true;
                } else {
                    $result=false;
                }
                return $result;
            } catch (Exception $e){
                echo $e->getMessage();
                echo $e->getCode();
            }

    }