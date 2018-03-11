function get_serve_info(){
	$.ajax(  
    {  
        type:'get',  
        url : 'http://elife.com/index.php?',  
        dataType : 'jsonp',  
        jsonp:"jsoncallback", 
        timeout:15000,
        success  : function(data) { 
        	if(data.username == ""){
        		not_login();
        	}else{
        		is_login(data.username);
        	}
        },  
        error : function(XMLHttpRequest, textStatus, errorThrown) {  
            //console.log('服务器读取数据出错！');
            console.log(XMLHttpRequest.readyState);
            console.log(XMLHttpRequest.status);
            console.log(textStatus);
        }  
    }); 
}

function is_login(user){
	$('#login_btn').css('display','none');
	$('#loginuser').css('display','block').html(user);
}

function not_login(){
	$('#login_btn').css('display','block');
	$('#loginuser').css('display','none');
}