$('#suggestcontent').keyup(function(){
	var content=($('#suggestcontent').val().length >20 && $('#suggestcontent').val().length <50) ? 1 : 0;
	if(content){
		btn_is_click(true,'#suggestbtn');
	}else{
		btn_is_click(false,'#suggestbtn');
	}
});

$('#suggestbtn').click(function(){
	var suggest_content=$('#suggestcontent').val();
	$.ajax({  
        type:'get',  
        url : 'http://elife.com/suggest.php?suggest='+suggest_content+'',  
        dataType : 'jsonp',  
        jsonp:"jsoncallback", 
        timeout:15000,
        success  : function(data) { 
            if(data.ret){
            	commitSuccess();
            }else{
            	commitFail();
            }
        },  
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.readyState);
            console.log(XMLHttpRequest.status);
            console.log(textStatus);
            ELife_UI.Toast.show('服务器繁忙，请稍后重试！');
			window.setTimeout(function(){
				ELife_UI.Toast.hide();
			},2000);
        }  
    }); 
});

function commitSuccess(){
	ELife_UI.Toast.show('提交意见成功，感谢你的支持');
	window.setTimeout(function(){
		ELife_UI.Toast.hide();
		window.location.reload();
	},2000);
}

function commitFail{
	ELife_UI.Toast.show('网络繁忙，请稍后重试');
	window.setTimeout(function(){
		ELife_UI.Toast.hide();
	},2000);
}
