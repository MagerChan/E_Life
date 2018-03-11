<?php
	ini_set("error_reporting","E_ALL & ~E_NOTICE");
	//session_start();
	header("Access-Control-Allow-Origin:*");
	header("Access-Control-Allow-Methods:POST,GET");
	
    //$tmpl = array('ret'=>false,'list'=>'');
    
    /*if($_SESSION['admin']){
    	$tmpl['ret']=true;
    	$tmpl['list'] = get_template();
    }*/
   	$tmpl=array();
   	$tmpl=get_template();
    echo json_encode($tmpl);
    
    function get_template(){
        $hostname = "localhost";
        $dbname = "elife";
        $username = "root";
        $password = "";
        //$data = array('ret'=>false,'list'=>'');
        $data=array();

        try {
            $_opts_values = array(PDO::ATTR_PERSISTENT=>true,PDO::ATTR_ERRMODE=>2,PDO::MYSQL_ATTR_INIT_COMMAND=>'SET NAMES utf8');
            $conn = new PDO("mysql:host=$hostname;dbname=$dbname", $username, $password,$_opts_values);
            $conn->setAttribute(PDO::ERRMODE_EXCEPTION, PDO::MYSQL_ATTR_USE_BUFFERED_QUERY);
            $sql = "SELECT * FROM elife_user";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if (count($result)){
            	//$data['ret']=true;
                //$data['list'] = $result; 
                $data=$result;
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