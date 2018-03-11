<?php
	session_start();
    header("Access-Control-Allow-Origin:*");
	header("Access-Control-Allow-Methods:POST,GET");

    $data = ["ret"=>false, "msg"=>"",'username'=>''];
    $tel=$_REQUEST['username'];
    $pwd=$_REQUEST['userpass'];

    $tmpl = array();
    $tmpl = checkadmin($tel,$pwd);
    echo json_encode($tmpl);

    function checkadmin($tel,$pwd){
        $hostname = "localhost";
        $dbname = "elife";
        $username = "root";
        $password = "";

        $timestamp=time();

	    try {
            $_opts_values = array(PDO::ATTR_PERSISTENT=>true,PDO::ATTR_ERRMODE=>2,PDO::MYSQL_ATTR_INIT_COMMAND=>'SET NAMES utf8');//解决乱码问题
	        $conn = new PDO("mysql:host=$hostname;dbname=$dbname", $username, $password,$_opts_values);
	        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	        $sql = "select * from elife_user where tel='$tel' and pwd='$pwd' and rank=5";
	        $stmt = $conn->prepare($sql);
	        $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if (count($result)){
                $data['ret']=true;
                $data['username']=$tel;

                $_SESSION['admin']=$tel;           
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