<?php
    ini_set("error_reporting","E_ALL & ~E_NOTICE");

    $serves = array();
    $arr = array(  
        "user" => $_GET['loginuser'],  
        "pass" => $_GET['loginpass'],  
        "name" => 'response'  
      
    );
    $serves = get_serve();
    echo $_GET['jsoncallback']."(".json_encode($serves).")";//解决ajax跨域问题

    function get_serve(){
    	/*$hostname = "139.199.198.216";
	    $dbname = "elife";
	    $username = "Administrator";
	    $password = "beautiful@123";*/
        $hostname = "localhost";
        $dbname = "elife";
        $username = "root";
        $password = "";

        $data = array("ret"=>false, "msg"=>"");

    	$serves = array();
	    try {
            $_opts_values = array(PDO::ATTR_PERSISTENT=>true,PDO::ATTR_ERRMODE=>2,PDO::MYSQL_ATTR_INIT_COMMAND=>'SET NAMES utf8');//解决乱码问题
	        $conn = new PDO("mysql:host=$hostname;dbname=$dbname", $username, $password,$_opts_values);
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
    }
?>