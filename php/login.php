<?php
    session_start();
    define("DBNAME",'pocketcampus');
    require_once "./api/pdo.php";
    require_once "./api/entryform.php";
    //header('Content-type:text/json;charset=utf8');
    
    $username = $_POST['username'];
    $password = $_POST['password'];

    $form = new entryform($pdo);

    try{
        $re = $form->login_formSystem($username, $password);
        
        if($re['state']) {
            $_SESSION['username'] = $username;
            $_SESSION['user_id'] = $re['user_id'];
            $_SESSION['nickname'] = $re['nickname'];
            $_SESSION['img'] = $re['img'];
            

            echo '<script>
                    alert("登录成功");
                    window.location.href="../indexForm.html";
                </script>';
        } else {
            echo '<script>
                    alert("登录失败，请检查账号或密码是否正确！");
                    window.history.go(-1);
                </script>';
            exit;
        }
    }catch (Exception $e){
        echo $e->getMessage();
        echo $e->getCode();
    }
?>
