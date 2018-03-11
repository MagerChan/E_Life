<?php
    /*include_once("common.php");*/
    /*header("Access-Control-Allow-Origin:*");*/
    $serves = array();
	$serves = get_serve();
	echo json_encode($serves);

    function get_serve(){
    	$hostname = "139.199.198.216";
	    $dbname = "elife";
	    $username = "Administrator";
	    $password = "beautiful@123";

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
    }
    
?>