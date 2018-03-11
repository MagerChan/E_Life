<?php
	ini_set("error_reporting","E_ALL & ~E_NOTICE");

    session_start();

    $data = ["ret"=>false, "addr_info"=>''];

    if($_SESSION['addrinfo']){
    	$data['ret']=true;
    	$data["addr_info"]=$_SESSION['addrinfo'];
    }
    
    echo $_GET['jsoncallback']."(".json_encode($data).")";//解决ajax跨域问题

?>