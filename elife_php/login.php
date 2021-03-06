<?php
    ini_set("error_reporting","E_ALL & ~E_NOTICE");
    /*header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Headers:X-Requested-With');
    header('Access-Control-Allow-Methods:GET,POST,OPTIONS,DELETE');*/

    session_start();

    $data = ["ret"=>false, "msg"=>"", "username"=>"","user_id"=>""];
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
	        $sql = "select * from elife_user where tel='$tel' and pwd='$pwd'";
	        $stmt = $conn->prepare($sql);
	        $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if (count($result)){
                $data['ret']=true;
                $data['username']=$tel;
                $data['user_id']=$result[0]['_id'];

                $_SESSION['tel']=$tel;
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