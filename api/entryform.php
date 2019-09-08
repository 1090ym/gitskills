<?php

    class entryform {
        public function __construct(PDO $db)
        {
            $this->db = $db;
        }

        //获取报名表题目信息的成员函数
        public function get_questionInfo($entryform_id) {                             

            $sql="select * from entryForm where enrtyForm_id = '$entryform_id'";
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




    }