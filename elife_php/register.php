<?php
    ini_set("error_reporting","E_ALL & ~E_NOTICE");

    session_start();

    $data = array("ret"=>false, "msg"=>"","username"=>"");
    
    $tel=$_GET['tel'];
    $pwd=$_GET['pwd'];

    $data = get_serve($tel,$pwd);

    echo $_GET['jsoncallback']."(".json_encode($data).")";//解决ajax跨域问题

    function get_serve($tel,$pwd){
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
	        $sql = "insert into `elife_user` (`tel`,`pwd`,`rank`,`createtime`) values ('$tel','$pwd',0,'$timestamp')";
	        $stmt = $conn->prepare($sql);
	        $data['ret']=$stmt->execute();
            $data['username']=$tel;
            $_SESSION['tel']=$tel;
	        if (!$data["ret"]) {
                $data["msg"] = $stmt->errorInfo();
            }

            $sql = "select * from elife_user where tel='$tel' and pwd='$pwd'";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if (count($result)){
                $_SESSION['userid']=$result[0]['_id'];
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