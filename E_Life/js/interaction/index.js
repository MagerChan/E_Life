var serve_info=[];

function get_serve_info(){
	/*$.ajax({
		type:"GET",
		url:"elife.com/index.php",
		async:true,
		dataType:"jsonp",    //跨域json请求一定是jsonp
		jsonp: "callbackparam",    //跨域请求的参数名，默认是callback
        jsonpCallback:"successCallback",    //自定义跨域参数值，回调函数名也是一样，默认为jQuery自动生成的字符串
		timeout:15000,
		error:function(){
			console.log('向服务器请求数据出错');
		},
		success:function(data){
			if(data.length > 0){
				serve_info=data;
				//serve_create(data);
			}
		}
	});*/
	$.ajax(  
    {  
        type:'get',  
        url : 'elife.com/index.php?loginuser=lee&loginpass=123456',  
        dataType : 'jsonp',  
        jsonp:"jsoncallback",  
        success  : function(data) {  
            alert("用户名："+ data.user +" 密码："+ data.pass);  
        },  
        error : function(XMLHttpRequest, textStatus, errorThrown) {  
            console.log(XMLHttpRequest.readyState);
            console.log(XMLHttpRequest.status);
            console.log(textStatus);
        }  
    }  
); 
}

/*function serve_create(serve_info){
	$('#serve_info').empty();
	$('#serve_info').html(serve_info);
}*/

function successCallback(data){
	$('#serve_info').empty();
	$('#serve_info').html(data);
}
