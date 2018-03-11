<?php
	  ini_set("error_reporting","E_ALL & ~E_NOTICE");

    session_start();

    $data = array("ret"=>false, "msg"=>"");

   $hournum=$_GET['h'];
   $auntnum=$_GET['a_n'];
   $servetime=$_GET['t'];
   $cost=$_GET['cost'];
   $timestamp=time();
   $u_id=$_SESSION['userid'];
   $s_id=$_SESSION['serveid'];
   $a_id=$_SESSION['addrid'];

    $data = place_order($hournum,$auntnum,$servetime,$cost,$timestamp,$u_id,$s_id,$a_id);

    echo $_GET['jsoncallback']."(".json_encode($data).")";//解决ajax跨域问题

    function place_order($hournum,$auntnum,$servetime,$cost,$timestamp,$u_id,$s_id,$a_id){
    	/*$hostname = "139.199.198.216";
	    $dbname = "elife";
	    $username = "Administrator";
	    $password = "beautiful@123";*/
        $hostname = "localhost";
        $dbname = "elife";
        $username = "root";
        $password = "";

        $timestamp=time();

	    try {
            $_opts_values = array(PDO::ATTR_PERSISTENT=>true,PDO::ATTR_ERRMODE=>2,PDO::MYSQL_ATTR_INIT_COMMAND=>'SET NAMES utf8');//解决乱码问题
	        $conn = new PDO("mysql:host=$hostname;dbname=$dbname", $username, $password,$_opts_values);
	        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$sql="insert into elife_order (user_id,serve_id,addr_id,serve_hour,aunt_num,serve_time,cost,status,submit_time,is_show) values ($u_id,$s_id,$a_id,'$hournum','$auntnum','$servetime','$cost',0,'$timestamp',1)";
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