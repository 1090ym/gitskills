<?php

    class entryform {
        public function __construct(PDO $db)
        {
            $this->db = $db;
        }

        //获取报名表题目信息的成员函数
        public function get_questionInfo($entryform_id) {                             

            $sql="select * from entryForm where entryForm_id = '$entryform_id'";
            $smt = $this->db->prepare($sql);      

            if(!($smt->execute())){
                throw new Exception("获取报名表信息失败");
            }
    
            if($re = $smt->fetch(PDO::FETCH_ASSOC)) {
                $ret = $re['entryForm_json'];
            } else {
                $ret = [];
            }
            return $ret;
        }

        //获取报名表中用户填写的答案
        public function get_Result($form_id) {
            $form_table = "form".$form_id;
            $sql="select * from ".$form_table." order by answer_id";

            $ret = [];
            $smt = $this->db->prepare($sql);      //获取末页
            $smt->execute();
    
            while($re = $smt->fetch(PDO::FETCH_ASSOC)) {
                array_push($ret, $re);
            }
            return $ret;
        }
        
        //将用户填写的报名表的答案添加到数据库
        //参数：存储答案的数组，用户表id，用户id
        public function insert_answer($answer, $form_id, $user_id) {
            $form_name = "form" .$form_id;
            $sql = "INSERT INTO ".$form_name."(user_id) VALUES('$user_id')";
            
            $smt = $this->db->prepare($sql); 

            if(!($smt->execute())) {
                throw new Exception("添加信息失败");
            }

            $ret = [];
            $count = count($answer);
            if($answer) {
                
                for($i = 0;$i < $count;$i++) {
                    $question_num = "question".$answer[$i][0];       //题号
                    if($answer[$i][1] == 1 || $answer[$i][1] == 2) {
                        $answer_data = $answer[$i][3];                   //答案内容
                    } else {
                        $answer_data = json_encode($answer[$i][4],JSON_UNESCAPED_UNICODE);  //将答案内容转成json数据
                    }
                    //$sql = "update ".$form_name."(".$question_num.") VALUES('$answer_data')";      //插入数据库
                    $sql = "update ".$form_name." set ".$question_num."='$answer_data' where user_id='$user_id'";
                    
                    $smt = $this->db->prepare($sql); 

                    if(!($smt->execute())) {
                        throw new Exception("添加信息失败");
                    }
                    $re = $smt->fetch(PDO::FETCH_ASSOC);
                    //header('Content-Type:application/json');//加上这行,前端那边就不需要var result = $.parseJSON(data);
                    array_push($ret,$re);
                }
            
            }
            return $ret;
        }

        public function login_formSystem($username, $password) {
            $password = md5($password); //md5加密
            $sql = "select * from USERS where User_Phone = '$username' and User_Password = '$password'";

            $smt = $this->db->prepare($sql);
            
            if(!($smt->execute())) {
                throw new Exception("登录失败");
            }
            $re = $smt->fetch(PDO::FETCH_ASSOC);
            if(!$re) {
                $ret = array('state' => false);//密码或账号错误返回state = false
            } else {
                $ret = array('state' => true,'user_id' => $re['User_ID'],'nickname' =>$re['User_Nickname'],'img' => $re['User_AvatarPath']);//登录成功返回state = true
            }
            
            return $ret;
        }

        //获取用户创建的报名表信息
        public function get_myFormInfo($page, $user_id){
            $pageSize = 30;    //每个页面的数据条数
            $sqltot = "select count(*) as columns from entryForm";
            $smt = $this->db->prepare($sqltot);      //获取末页
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
            $sql="select * from entryForm where entryForm_userID = '$user_id' order by entryForm_date desc limit {$offset},{$pageSize}";
            $ret = [];
            $smt = $this->db->prepare($sql);      //获取末页
            $smt->execute();
    
            while($re = $smt->fetch(PDO::FETCH_ASSOC)) {
                $re['write_state'] = $this->get_writestate($re['entryForm_id'], $user_id);
                array_push($ret, $re);
            }
            return $ret;
            //$sql = "select * from FORUM_PUBLISH where Forum_Publish_WriterID = '$userID' order by Forum_Publish_Time desc limit $load_times";
        }

        public function Is_writeForm($user_id, $form_id) {
            $form_name = "form" .$form_id;
            $sql="select * from ".$form_name." where user_id = '$user_id'";
            $smt = $this->db->prepare($sql);      

            if(!($smt->execute())){
                throw new Exception("获取报名表信息失败");
            }
    
            if($re = $smt->fetch(PDO::FETCH_ASSOC)) {
                $result='{state:"true"}';
            } else {
                $result='{state:"false"}';
            }
            return $result;
        }

        public function get_writestate($form_id, $user_id) {
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

        
}