<?php
    ini_set("error_reporting","E_ALL & ~E_NOTICE");

    session_start();

    $userid=$_SESSION['userid'];
    $orderid=$_GET['orderid'];

    $data = ["ret"=>false, "msg"=>"","orderinfo"=>'',"serveinfo"=>'',"addrinfo"=>''];

    $data = get_order_detail($userid,$orderid);

    echo $_GET['jsoncallback']."(".json_encode($data).")";//解决ajax跨域问题

    function get_order_detail($userid,$orderid){
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
	        $sql = "select * from elife_order where user_id=$userid and _id=$orderid";
	        $stmt = $conn->prepare($sql);
	        $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if (count($result)){
                $data['orderinfo']=$result;
                foreach($result as $key=>$value){
                    $s_id=$value['serve_id'];
                    $sql = "select * from elife_serve where _id=$s_id";
                    $stmt = $conn->prepare($sql);
                    $stmt->execute();
                    $jieguo = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    $data['serveinfo'][$key]=$jieguo;

                    $a_id=$value['addr_id'];
                    $sql = "select * from elife_address where _id=$a_id";
                    $stmt = $conn->prepare($sql);
                    $stmt->execute();
                    $addr_result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    $data['addrinfo'][$key]=$addr_result;
                }
                $data['ret']=true;
            }else{
                $data['ret']=false;
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