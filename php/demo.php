<?php
    session_start();
    header('Content-type:text/json;charset=utf8');
    $question=$_POST['question'];
    /*$question=[                                     
        [1,1,"姓名"],
        [2,1,"年级"],
        [3,3,"性别",["男", "女", "", "", "", ""],],
        [4,4,"爱好",["篮球", "网球", "乒乓球", "羽毛球", "", ""],],
        [5,2,"其他"]
    ];*/

    $count = count($question);

    $form_name = $_POST['form_name'];
    //$form_name = "test";
    
    $form_info = $_POST['form_info'];
    //$form_info = "test";

    
    
    $user_id = $_SESSION['user_id'];
    $user_nickname = $_SESSION['nickname'];
    //$user_id = 1;
    //$user_nickname = "尹卯";
    
    $dbName = "PocketCampus";

    $organization_name = $_POST['organization_name'];
    //$organization_name = "报名";
    $organizationID = 1;

    date_default_timezone_set('PRC');
    $Time = date('Y-m-d H:i:s',time());
    $question_json = json_encode($question,JSON_UNESCAPED_UNICODE);

    $sql = "INSERT INTO entryForm(entryForm_name, entryForm_info, entryForm_userID, entryForm_userNickname, entryForm_date, entryForm_json, entryForm_organizationID, entryForm_organization_name ) VALUES('$form_name', '$form_info', '$user_id', '$user_nickname', '$Time', '$question_json', '$organizationID', '$organization_name')";

    

    $pdo = pdo($dbName);
    $create = new form($pdo);
    $re = $create->mysql($sql);
    
    InsertQuestion($question, $pdo->lastInsertId());

    if(!$re) {
        $result='{state:"true"}';
    } else {
        $result='{state:"false"}';
    }

    //$resu = $question;

    //$data='{username:"user",password:"name"}';//组合成json格式数据
    
    echo json_encode($result,JSON_UNESCAPED_UNICODE);//输出json数据



    function pdo($dbname){
        header("Content-Type:text/html;charset=utf-8");
        $dbms="mysql";
        $dbName = $dbname;
        $user = "root";
        $pwd = "123456";
        $host = "127.0.0.1";
        $dsn = "$dbms:host=$host;dbname=$dbName";
        try{
            $pdo =new PDO($dsn,$user,$pwd);
        }catch (Exception $e){
            echo $e->getMessage()."<br>";
        }
        $pdo->query("SET NAMES utf8");
        return $pdo;
    }

    class form{

        private $_db;
    
        public function __construct(PDO $_db)
        {
            $this->_db = $_db;
        }
    
        public function mysql($sql)
        {
            
            $stmt = $this->_db->prepare($sql);
            
            if(!($stmt->execute())){
                throw new Exception("执行失败");
            }
            
            $re = $stmt->fetch(PDO::FETCH_ASSOC);
            //header('Content-Type:application/json');//加上这行,前端那边就不需要var result = $.parseJSON(data);
            return $re;
        }
    
    }


    function InsertQuestion($data, $form_id) {               //创建报名表的数据表
        $db = "question";           //数据库名字
        $pdo = pdo($db);
        $create = new form($pdo);
        $count = count($data);
        if($data) {
            $form_name = "form" .$form_id;
            $sql = "CREATE TABLE IF NOT EXISTS ".$form_name."(
                   answer_id int(11) NOT NULL AUTO_INCREMENT,
                   user_id int(11),
                   primary key(answer_id)
                    ) ENGINE=InnoDB  DEFAULT CHARSET=utf8";
            $create->mysql($sql);
            
            for($i = 1;$i <= $count;$i++) {
                $question = "question".$i;
                $sql = "alter table ".$form_name." add ".$question." varchar(500)";
                $create->mysql($sql);
            }
        }
    }
