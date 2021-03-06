<?php
	header("Access-Control-Allow-Origin:*");
	header("Access-Control-Allow-Methods:POST,GET");
	session_start();
    $tmpl = array();
    
    $addr_id=$_GET['addr_id'];
    /*if($_SESSION['tel']){
    	$tmpl = get_template($addr_id);
    }*/
	$tmpl = get_template($addr_id);
    echo json_encode($tmpl);
    
    function get_template($addr_id){
        $hostname = "localhost";
        $dbname = "elife";
        $username = "root";
        $password = "";
        $data = array("ret"=>false, "msg"=>"");

        try {
            $_opts_values = array(PDO::ATTR_PERSISTENT=>true,PDO::ATTR_ERRMODE=>2,PDO::MYSQL_ATTR_INIT_COMMAND=>'SET NAMES utf8');
            $conn = new PDO("mysql:host=$hostname;dbname=$dbname", $username, $password,$_opts_values);
            $conn->setAttribute(PDO::ERRMODE_EXCEPTION, PDO::MYSQL_ATTR_USE_BUFFERED_QUERY);
            $sql = "delete FROM elife_address where _id=$addr_id";
            $stmt = $conn->prepare($sql);
            $data['ret']=$stmt->execute();
            if (!$data["ret"]) {
                $data["msg"] = $stmt->errorInfo();
            }            
        }
        catch(PDOException $e)
        {
            echo $e->getMessage();
        }
        $conn = null;
        return $data;
    }
?>