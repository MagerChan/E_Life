var user_info_='';

function up_user_info(){
	$.ajax(  
    {  
        type:'get',  
        url : 'http://elife.com/register.php?',  
        dataType : 'jsonp',  
        jsonp:"jsoncallback", 
        timeout:15000,
        success  : function(data) {  
            user_create(data);  
        },  
        error : function(XMLHttpRequest, textStatus, errorThrown) {  
            //console.log('服务器读取数据出错！');
            console.log(XMLHttpRequest.readyState);
            console.log(XMLHttpRequest.status);
            console.log(textStatus);
        }  
    }  
); 
}

function user_create(user_info){
	for(var i=0;i<user_info.length;i++){
		user_info_+=user_info[i]['user_title'];
	}
	/*$('#user_info').html(user_info_);*/
}
