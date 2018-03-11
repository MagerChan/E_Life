<?php

    ini_set("error_reporting","E_ALL & ~E_NOTICE");
    include_once("common.php");

    /*$serves = array();
	$serves = get_serve();
	echo json_encode($serves);*/

    /*function get_serve(){
    	$hostname = "139.199.198.216";
	    $dbname = "elife";
	    $username = "Administrator";
	    $password = "beautiful@123";
        $hostname = "localhost";
        $dbname = "elife";
        $username = "root";
        $password = "";

    	$serves = array();
	    try {
	        $conn = new PDO("mysql:host=$hostname;dbname=$dbname", $username, $password);
	        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	        $sql = "SELECT * FROM elife_serve";
	        $stmt = $conn->prepare($sql);
	        $stmt->execute();
	        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
	        if (count($result)){
	            $serves = $result;
	        }
	    }
	    catch(PDOException $e)
	    {
	        echo $e->getMessage();
	    }

	    $conn = null;

	    return $serves;
    }*/

    /*$sql=mysql_query("select * from elife_serve");

    while($row = mysql_fetch_array($sql,MYSQL_ASSOC)){
        //var_dump($row['serve_title']);
        //var_dump($row);
        echo $_GET['callbackparam']."(".json_encode($row).")";
    }*/

    $arr = array(  
        "user" => $_GET['loginuser'],  
        "pass" => $_GET['loginpass'],  
        "name" => 'response'  
      
    );  
    echo $_GET['jsoncallback'] . "(".json_encode($arr).")"; 
?>