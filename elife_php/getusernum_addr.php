<?php
	ini_set("error_reporting","E_ALL & ~E_NOTICE");

    session_start();

    $data = ["ret"=>false, "tel"=>''];

    if($_SESSION['tel']){
    	$data['ret']=true;
    	$data["tel"]=$_SESSION['tel'];
    }
    
    echo $_GET['jsoncallback']."(".json_encode($data).")";//解决ajax跨域问题

?>