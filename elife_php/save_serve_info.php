<?php
    ini_set("error_reporting","E_ALL & ~E_NOTICE");

    session_start();

    $data = ["ret"=>true];

    $_SESSION['servename']=$_GET['servename'];
    $_SESSION['serveid']=$_GET['serveid'];
    $_SESSION['servecost']=$_GET['cost'];

    echo $_GET['jsoncallback']."(".json_encode($data).")";//解决ajax跨域问题
?>