<?php
    ini_set("error_reporting","E_ALL & ~E_NOTICE");

    $data = array("ret"=>false, "msg"=>"");
    $name=$_GET['name'];
    $addr=$_GET['addr'];
    $id=$_GET['id'];
    $tel=$_GET['tel'];

    $data = insert_addr($name,$addr,$id,$tel);

    echo $_GET['jsoncallback']."(".json_encode($data).")";//解决ajax跨域问题

    function insert_addr($name,$addr,$id,$tel){
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
            $sql = "update `elife_address` set tel='$tel',name='$name',detail_addr='$addr' where _id=$id";
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