var l_t=0;
var l_p=0;
var username='';

//获取键盘的keyup事件
$('#input_tel').keyup(function(){
	var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
	if(($('#input_tel').val().length == 11) && myreg.test($("#input_tel").val())){
		l_t=1;
	}else{
		l_t=0;
	}
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
            	username=data.username;
            	user_id=data.user_id;
            	loginSuccess();
            }else{
            	loginFail();
            }
        },  
        error : function(XMLHttpRequest, textStatus, errorThrown) {
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
		
		//页面跳转到首页，并且是登录状态,session
		//location.href='../../debug/tmpl/index.html';
		//location.replace('../../debug/tmpl/index.html');
		history.go(-1); //回退并且刷新
		location.reload();
	},2000);
}

function loginFail(){
	ELife_UI.Toast.show('手机号或者密码错误，请重新填写');
	window.setTimeout(function(){
		ELife_UI.Toast.hide();
			$('#input_pwd').val('');
	},2000);
}

$('#gotoreg').on('click',function(e){
	$('#login_').css('display','none');
	$('#register_').css('display','block');
})

$('#reg_back').on('click',function(e){
	$('#register_').css('display','none');
	$('#login_').css('display','block');
});

$('#loginbacktoindex').click(function (event) {
    /*if (event && event.preventDefault) {
        event.preventDefault();
    }
    fnUrlReplace(this);
    return false;*/
    //location.replace('../../debug/tmpl/index.html');
    history.back();
});
