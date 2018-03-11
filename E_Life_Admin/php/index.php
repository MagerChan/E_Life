<?php
	header("Access-Control-Allow-Origin:*");
	header("Access-Control-Allow-Methods:POST,GET");
    $tmpl = array();
    $tmpl = get_template();
    echo json_encode($tmpl);
    
    function get_template(){
        $hostname = "localhost";
        $dbname = "elife";
        $username = "root";
        $password = "";
        $data = array();

        try {
            $conn = new PDO("mysql:host=$hostname;dbname=$dbname", $username, $password);
            $conn->setAttribute(PDO::ERRMODE_EXCEPTION, PDO::MYSQL_ATTR_USE_BUFFERED_QUERY);
            $sql = "SELECT * FROM elife_user";
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