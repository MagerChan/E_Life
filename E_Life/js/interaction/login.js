var l_t=0;
var l_p=0;

//获取键盘的keyup事件
$('#input_tel').keyup(function(){
	l_t = $('#input_tel').val().length == 11 ? 1 : 0;
	if((l_t+l_p) == 2){
		btn_is_click(true,'#loginbtn');
	}else{
		btn_is_click(false,'#loginbtn');
	}
});

$('#input_pwd').keyup(function(){
	l_p = $('#input_pwd').val().length >= 4 ? 1 :0;
	if((l_t+l_p) == 2){
		btn_is_click(true,'#loginbtn');
	}else{
		btn_is_click(false,'#loginbtn');
	}
});


//点击按钮触发事件
$('#loginbtn').click(function(){
	var tt=$('#input_tel').val();
	var pp=$('#input_pwd').val();
	check_user_info(tt,pp);
});

function check_user_info(tel_,pwd_){
	$.ajax(  
    {  
        type:'get',  
        url : 'http://elife.com/login.php?tel='+tel_+'&pwd='+pwd_+'',  
        dataType : 'jsonp',  
        jsonp:"jsoncallback", 
        timeout:15000,
        success  : function(data) { 
            if(data.ret){
            	loginSuccess();
            }else{
            	loginFail();
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
    }  
); 
}

function loginSuccess(){
	ELife_UI.Toast.show('登录成功');
	window.setTimeout(function(){
		ELife_UI.Toast.hide();
	},2000);

	//页面跳转到首页，并且是登录状态,session
	
}

function loginFail(){
	ELife_UI.Toast.show('手机号或者密码错误，请重新填写');
	window.setTimeout(function(){
		ELife_UI.Toast.hide();
			$('#input_pwd').val('');
	},2000);
}