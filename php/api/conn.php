<?php
    header("Content-Type:text/html;charset=utf-8");
	$dbms="mysql";
	$dbName = DBNAME;
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
?>