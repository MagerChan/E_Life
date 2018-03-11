<?php
    ini_set("error_reporting","E_ALL & ~E_NOTICE");

    session_start();

    $data = ["ret"=>false, "msg"=>"" ,"username"=>"","user_id"=>"", "result"=>""];
    $id=$_GET['id'];

    $data = get_serve($id);

    echo $_GET['jsoncallback']."(".json_encode($data).")";//解决ajax跨域问题

    function get_serve($id){
    	/*$hostname = "139.199.198.216";
	    $dbname = "elife";
	    $username = "Administrator";
	    $password = "beautiful@123";*/
        $hostname = "localhost";
        $dbname = "elife";
        $username = "root";
        $password = "";

	    try {
            $_opts_values = array(PDO::ATTR_PERSISTENT=>true,PDO::ATTR_ERRMODE=>2,PDO::MYSQL_ATTR_INIT_COMMAND=>'SET NAMES utf8');//解决乱码问题
	        $conn = new PDO("mysql:host=$hostname;dbname=$dbname", $username, $password,$_opts_values);
	        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	        $sql = "select * from elife_serve where _id=$id";
	        $stmt = $conn->prepare($sql);
	        $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if (count($result)){
                $data['ret']=true;
                /*把session传回去*/
                if($_SESSION['tel']){
                    $data['username']=$_SESSION['tel'];
                    $data['user_id']=$_SESSION['userid'];
                }else{
                    $data['username']='';
                    $data['user_id']='';
                }
                $data['result']=$result[0];
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