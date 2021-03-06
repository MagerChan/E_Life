<?php
    ini_set("error_reporting","E_ALL & ~E_NOTICE");
    session_start();

    $data = ["ret"=>false,"islogin"=>false ,"msg"=>"","result"=>""];
    $userid=$_SESSION['userid'];

    if($userid){
        $data = get_addr($userid);
        $data['islogin']=true;
    }else
        $data['islogin']=false;

    echo $_GET['jsoncallback']."(".json_encode($data).")";//解决ajax跨域问题

    function get_addr($userid){
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
            $sql = "select * from elife_address where user_id='$userid'";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if (count($result)){
                $data['ret']=true;
                $data['islogin']=true;
                $data['result']=$result;
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