<?php
	ini_set("error_reporting","E_ALL & ~E_NOTICE");

    session_start();

    $data = ["ret"=>true,"servename"=>$_SESSION['servename'],"servecost"=>$_SESSION['servecost']];

    echo $_GET['jsoncallback']."(".json_encode($data).")";//解决ajax跨域问题
?>