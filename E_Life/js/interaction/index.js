function get_serve_info(flag){
	$.ajax(  
    {  
        type:'get',  
        url : 'http://elife.com/index.php?',  
        dataType : 'jsonp',  
        jsonp:"jsoncallback", 
        timeout:15000,
        success  : function(data) { 
        	if(flag){
        		is_login(data.username); 
        	}else{
        		getUserInfo(data.username,data.user_id);
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


function getUserInfo(username,user_id){
	return {
		username:username,
		user_id:user_id
	};
}
