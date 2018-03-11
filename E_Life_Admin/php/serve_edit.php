<?php
    header("Access-Control-Allow-Origin:*");
	header("Access-Control-Allow-Methods:POST,GET,REQUEST");
	
	session_start();
	
	$seq=$_REQUEST["seq"];
    $servetitle=$_REQUEST["servetitle"];
    $servecontent = $_REQUEST["servecontent"];
    $servecost = $_REQUEST["servecost"];
    $serveunit=$_REQUEST["serveunit"];
    $servediscount = $_REQUEST["servediscount"];
    $serveicon = $_REQUEST["serveicon"];
    $typeid_serve=$_REQUEST["typeid_serve"];
    $serveoption=$_REQUEST["serveoption"];
    
    $tmpl = array();
    /*if($_SESSION['tel']){
    	$tmpl = edit_order($seq,$servetitle, $servecontent, $servecost,$serveunit,$servediscount,$serveicon,$typeid_serve,$serveoption);
    }*/
    $tmpl = edit_order($seq,$servetitle, $servecontent, $servecost,$serveunit,$servediscount,$serveicon,$typeid_serve,$serveoption);
    echo json_encode($tmpl);
    
    function edit_order($seq,$servetitle, $servecontent, $servecost,$serveunit,$servediscount,$serveicon,$typeid_serve,$serveoption){
        $hostname = "localhost";
        $dbname = "elife";
        $username = "root";
        $password = "";
        $data = array("ret"=>false, "msg"=>"");

        try {
           $_opts_values = array(PDO::ATTR_PERSISTENT=>true,PDO::ATTR_ERRMODE=>2,PDO::MYSQL_ATTR_INIT_COMMAND=>'SET NAMES utf8');
            $conn = new PDO("mysql:host=$hostname;dbname=$dbname", $username, $password,$_opts_values);
            $conn->setAttribute(PDO::ERRMODE_EXCEPTION, PDO::MYSQL_ATTR_USE_BUFFERED_QUERY);

            $sql = "update `elife_serve` set serve_title='$servetitle' , serve_content='$servecontent' , serve_cost=$servecost,unit='$serveunit',serve_discount=$servediscount,big_icon='$serveicon',options=$serveoption,type_id=$typeid_serve where _id=$seq";
			
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