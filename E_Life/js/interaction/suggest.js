//get_serve_info(false);

$('#suggestcontent').keyup(function(){
	var content=($('#suggestcontent').val().length >20 && $('#suggestcontent').val().length <100) ? 1 : 0;
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
        url : 'http://139.199.198.216/suggest.php?suggest='+suggest_content+'',  
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

function commitFail(){
	ELife_UI.Toast.show('请登录');
	window.setTimeout(function(){
		ELife_UI.Toast.hide();
		location.href='../../debug/tmpl/login.html';
	},1500);
}

$('#suggestback').click(function(){
	location.replace('../../debug/tmpl/index.html');
});
