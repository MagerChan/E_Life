var t=0;
var p=0;
var cp=0;

//获取键盘的keyup事件
$('#input_reg_tel').keyup(function(){
	var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
	if(($('#input_reg_tel').val().length == 11) && myreg.test($("#input_reg_tel").val())){
		t=1;
	}else{
		t=0;
	}
	if((t+p+cp) == 3){
		btn_is_click(true,'#regiterbtn');
	}else{
		btn_is_click(false,'#regiterbtn');
	}
});

$('#input_reg_pwd').keyup(function(){
	p = $('#input_reg_pwd').val().length >= 4 ? 1 :0;
	if((t+p+cp) == 3){
		btn_is_click(true,'#regiterbtn');
	}else{
		btn_is_click(false,'#regiterbtn');
	}
});

$('#input_reg_cp').keyup(function(){
	cp = $('#input_reg_cp').val().length >= 4 ? 1 : 0;
	if((t+p+cp) == 3){
		btn_is_click(true,'#regiterbtn');
	}else{
		btn_is_click(false,'#regiterbtn');
	}
});

//点击按钮触发事件
$('#regiterbtn').click(function(){
	var tt=$('#input_reg_tel').val();
	var pp=$('#input_reg_pwd').val();
	var cpp=$('#input_reg_cp').val();
	if(pp == cpp){
		up_user_info(tt,pp,cpp);
	}else{
		ELife_UI.Toast.show('密码不一致');
		window.setTimeout(function(){
			ELife_UI.Toast.hide();
			$('#input_reg_cp').val('');
			$('#input_reg_pwd').val('');
		},2000);
	}
});

function up_user_info(tel_,pwd_){
	$.ajax(  
    {  
        type:'get',  
        url : 'http://elife.com/register.php?tel='+tel_+'&pwd='+pwd_+'',  
        dataType : 'jsonp',  
        jsonp:"jsoncallback", 
        timeout:15000,
        success  : function(data) { 
            if(data.ret){
            	insertSuccess();
            }else{
            	console.log(data.msg);
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
}

function insertSuccess(){
	ELife_UI.Toast.show('注册成功！欢迎加入易生活');
	window.setTimeout(function(){
		ELife_UI.Toast.hide();
		
		//页面跳转到首页，并且是登录状态
		history.go(-1); //回退并且刷新
		location.reload();
	},2000);
}
