<?php
    ini_set("error_reporting","E_ALL & ~E_NOTICE");

    session_start();

    $_SESSION['tel']='';
    $_SESSION['userid']='';
    $_SESSION['servename']='';
    $_SESSION['servecost']='';
    $_SESSION['addrinfo']='';
    $_SESSION['serveid']='';
    $_SESSION['addrid']='';
    $data = ["ret"=>true];

    echo $_GET['jsoncallback']."(".json_encode($data).")";//解决ajax跨域问题
?>