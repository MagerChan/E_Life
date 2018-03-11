<?php
    header("Access-Control-Allow-Origin:*");
	header("Access-Control-Allow-Methods:POST,GET,REQUEST");
	
	session_start();
	
	$seq=$_REQUEST["seq"];
    $typetitle=$_REQUEST["typetitle"];
    $typeicon = $_REQUEST["typeicon"];
    $typeoption = $_REQUEST["typeoption"];
    
    $tmpl = array();   
	/*if($_SESSION['tel']){
	    $tmpl = edit_order($seq,$typetitle, $typeicon, $typeoption);
	}*/
	$tmpl = edit_order($seq,$typetitle, $typeicon, $typeoption);
	echo json_encode($tmpl);
    
    function edit_order($seq,$typetitle, $typeicon, $typeoption){
        $hostname = "localhost";
        $dbname = "elife";
        $username = "root";
        $password = "";
        $data = array("ret"=>false, "msg"=>"");

        try {
           $_opts_values = array(PDO::ATTR_PERSISTENT=>true,PDO::ATTR_ERRMODE=>2,PDO::MYSQL_ATTR_INIT_COMMAND=>'SET NAMES utf8');
            $conn = new PDO("mysql:host=$hostname;dbname=$dbname", $username, $password,$_opts_values);
            $conn->setAttribute(PDO::ERRMODE_EXCEPTION, PDO::MYSQL_ATTR_USE_BUFFERED_QUERY);

            $sql = "update `elife_type` set type_title='$typetitle' , icon='$typeicon' , options=$typeoption where _id=$seq";

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