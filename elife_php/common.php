<?php 
	$conn=mysql_connect("localhost","root","") or die("数据库服务器连接失败".mysql_error());
    /*$conn=mysql_connect("139.199.198.216","Administrator","beautiful@123") or die("数据库服务器连接失败".mysql_error());*/
	mysql_select_db("elife",$conn) or die("数据库连接失败".mysql_error);
	mysql_query("set names utf8");

    /*$hostname = "localhost";
    $dbname = "elife";
    $username = "root";
    $password = "";

    $conn = new PDO("mysql:host=$hostname;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);*/

    /*$mysqli=new mysqli("localhost",'root','','elife');
    mysqli_query("set names utf8");*/
?>