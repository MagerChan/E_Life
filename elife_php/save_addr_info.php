<?php
    ini_set("error_reporting","E_ALL & ~E_NOTICE");

    session_start();

    $data = ["ret"=>true];

    $_SESSION['addrinfo']=$_GET['addr_info'];

    echo $_GET['jsoncallback']."(".json_encode($data).")";//解决ajax跨域问题
?>