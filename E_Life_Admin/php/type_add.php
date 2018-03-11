<?php
    header("Access-Control-Allow-Origin:*");
	header("Access-Control-Allow-Methods:POST,GET,REQUEST");
	
	session_start();
	
    $title=$_REQUEST["title"];
    $icon = $_REQUEST["icon"];
    $options = $_REQUEST["options"];
    
    $tmpl = array();
    /*if($_SESSION['tel']){
    	$tmpl = edit_order($title, $icon, $options);
    }*/
    $tmpl = edit_order($title, $icon, $options);
    echo json_encode($tmpl);
    
    function edit_order($title, $icon, $options){
        $hostname = "localhost";
        $dbname = "elife";
        $username = "root";
        $password = "";
        $data = array("ret"=>false, "msg"=>"");

        try {
           $_opts_values = array(PDO::ATTR_PERSISTENT=>true,PDO::ATTR_ERRMODE=>2,PDO::MYSQL_ATTR_INIT_COMMAND=>'SET NAMES utf8');
            $conn = new PDO("mysql:host=$hostname;dbname=$dbname", $username, $password,$_opts_values);
            $conn->setAttribute(PDO::ERRMODE_EXCEPTION, PDO::MYSQL_ATTR_USE_BUFFERED_QUERY);

            $sql = "insert into `elife_type` (type_title,icon,options) values ('$title','$icon','$options')";

            $stmt = $conn->prepare($sql);
            $data['ret']=$stmt->execute();
            if (!$data["ret"]) {
                $data["msg"] = $stmt->errorInfo();
            }
        }
        catch(PDOException $e)
        {
            $data["msg"] = $e->getMessage();
        }
        $conn = null;

        return $data;
    }
?>