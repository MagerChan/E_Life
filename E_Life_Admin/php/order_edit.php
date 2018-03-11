<?php
    header("Access-Control-Allow-Origin:*");
	header("Access-Control-Allow-Methods:POST,GET,REQUEST");
	
	session_start();
	
	$seq=$_REQUEST["seq"];
    $serveid_after=$_REQUEST["serveid_after"];
    $addrid_after = $_REQUEST["addrid_after"];
    $hour_after = $_REQUEST["hour_after"];
    $aunt_after = $_REQUEST["aunt_after"];
    $time_after = $_REQUEST["time_after"];
    $cost_after = $_REQUEST["cost_after"];
    $status_after = $_REQUEST["status_after"];
    $isshow_after = $_REQUEST["isshow_after"];
    
    $tmpl = array();
    /*if($_SESSION['tel']){
    	$tmpl = edit_order($seq,$serveid_after, $addrid_after, $hour_after, $aunt_after, $time_after, $cost_after, $status_after, $isshow_after);
    }*/
   $tmpl = edit_order($seq,$serveid_after, $addrid_after, $hour_after, $aunt_after, $time_after, $cost_after, $status_after, $isshow_after);
    echo json_encode($tmpl);
    
    function edit_order($seq,$serveid_after, $addrid_after, $hour_after, $aunt_after, $time_after, $cost_after, $status_after, $isshow_after){
        $hostname = "localhost";
        $dbname = "elife";
        $username = "root";
        $password = "";
        $data = array("ret"=>false, "msg"=>"");

        try {
           $_opts_values = array(PDO::ATTR_PERSISTENT=>true,PDO::ATTR_ERRMODE=>2,PDO::MYSQL_ATTR_INIT_COMMAND=>'SET NAMES utf8');
            $conn = new PDO("mysql:host=$hostname;dbname=$dbname", $username, $password,$_opts_values);
            $conn->setAttribute(PDO::ERRMODE_EXCEPTION, PDO::MYSQL_ATTR_USE_BUFFERED_QUERY);

            $sql = "update `elife_order` set serve_id=$serveid_after , addr_id=$addrid_after , serve_hour=$hour_after , aunt_num=$aunt_after,serve_time='$time_after',cost=$cost_after,status=$status_after,is_show=$isshow_after where _id=$seq";

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