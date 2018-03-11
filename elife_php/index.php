<?php
    ini_set("error_reporting","E_ALL & ~E_NOTICE");
    session_start();

    $data = ["ret"=>false, "username"=>"","user_id"=>""];

    /*把session传回去*/
    if($_SESSION['tel']){
    	$data['ret']=true;
    	$data['username']=$_SESSION['tel'];
    	$data['user_id']=$_SESSION['userid'];
    }else{
        $data['ret']=false;
        $data['username']='';
    	$data['user_id']='';
    }
    
    echo $_GET['jsoncallback']."(".json_encode($data).")";
?>