<?php
    header("Access-Control-Allow-Origin:*");
	header("Access-Control-Allow-Methods:POST,GET,REQUEST");
	
	session_start();
	
    $title=$_REQUEST["title"];
    $content = $_REQUEST["content"];
    $cost=$_REQUEST["cost"];
    $unit = $_REQUEST["unit"];
    $discount=$_REQUEST["discount"];
    $icon = $_REQUEST["icon"];
    $typeidserve=$_REQUEST["typeidserve"];
    $options = $_REQUEST["options"];
    
    $tmpl = array();
    /*if($_SESSION['tel']){
    	$tmpl = edit_order($title, $content,$cost,$unit,$discount,$icon,$typeidserve, $options);
    }*/
   $tmpl = edit_order($title, $content,$cost,$unit,$discount,$icon,$typeidserve, $options);
    echo json_encode($tmpl);
    
    function edit_order($title, $content,$cost,$unit,$discount,$icon,$typeidserve, $options){
        $hostname = "localhost";
        $dbname = "elife";
        $username = "root";
        $password = "";
        $data = array("ret"=>false, "msg"=>"");

        try {
           $_opts_values = array(PDO::ATTR_PERSISTENT=>true,PDO::ATTR_ERRMODE=>2,PDO::MYSQL_ATTR_INIT_COMMAND=>'SET NAMES utf8');
            $conn = new PDO("mysql:host=$hostname;dbname=$dbname", $username, $password,$_opts_values);
            $conn->setAttribute(PDO::ERRMODE_EXCEPTION, PDO::MYSQL_ATTR_USE_BUFFERED_QUERY);

            $sql = "insert into `elife_serve` (serve_title,serve_content,serve_cost,unit,serve_discount,big_icon,type_id,options) values 
            ('$title', '$content','$cost','$unit','$discount','$icon','$typeidserve', '$options')";
			
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