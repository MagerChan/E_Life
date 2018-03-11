<?php
	header("Access-Control-Allow-Origin:*");
	header("Access-Control-Allow-Methods:POST,GET");
	header("Content-Type:text/html;charset=utf-8");
	session_start();
    $tmpl = array();
    /*if($_SESSION['tel']){
    	$tmpl = get_template();
    }*/
    $tmpl = get_template();
    echo json_encode($tmpl);
    
    function get_template(){
        $hostname = "localhost";
        $dbname = "elife";
        $username = "root";
        $password = "";
        $data = array();

        try {
        	$_opts_values = array(PDO::ATTR_PERSISTENT=>true,PDO::ATTR_ERRMODE=>2,PDO::MYSQL_ATTR_INIT_COMMAND=>'SET NAMES utf8');
            $conn = new PDO("mysql:host=$hostname;dbname=$dbname", $username, $password,$_opts_values);
            $conn->setAttribute(PDO::ERRMODE_EXCEPTION, PDO::MYSQL_ATTR_USE_BUFFERED_QUERY);
            $sql = "SELECT * FROM elife_serve";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if (count($result)){
                $data = $result; 
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