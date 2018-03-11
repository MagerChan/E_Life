var serve_info_='';

function get_serve_info(){
	/*$.ajax(  
    {  
        type:'get',  
        url : 'http://elife.com/index.php?',  
        dataType : 'jsonp',  
        jsonp:"jsoncallback", 
        timeout:15000,
        success  : function(data) {  
            serve_create(data);  
        },  
        error : function(XMLHttpRequest, textStatus, errorThrown) {  
            //console.log('服务器读取数据出错！');
            console.log(XMLHttpRequest.readyState);
            console.log(XMLHttpRequest.status);
            console.log(textStatus);
        }  
    }); */
}

function serve_create(serve_info){
	for(var i=0;i<serve_info.length;i++){
		serve_info_+=serve_info[i]['serve_title'];
	}
	/*$('#serve_info').html(serve_info_);*/
}
