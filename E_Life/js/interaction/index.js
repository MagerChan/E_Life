function get_serve_info(){
	$.ajax(  
    {  
        type:'get',  
        url : 'http://elife.com/index.php?',  
        dataType : 'jsonp',  
        jsonp:"jsoncallback", 
        timeout:15000,
        success  : function(data) { 
        	console.log(data);
        	is_login(data.username);
            /*serve_create(data); */ 
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
