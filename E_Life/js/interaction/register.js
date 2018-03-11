var user_info_='';
var t=0;
var p=0;
var cp=0;

//获取键盘的keyup事件
$('#input_reg_tel').keyup(function(){
	t= $('#input_reg_tel').val().length == 11 ? 1 : 0;
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
		ELife_UI.Toast.show('注册成功！欢迎加入易生活');
		window.setTimeout(function(){
			ELife_UI.Toast.hide();
		},1500);
	}else{
		ELife_UI.Toast.show('密码不一致');
		window.setTimeout(function(){
			ELife_UI.Toast.hide();
			$('#input_reg_cp').val('');
			$('#input_reg_pwd').val('');
		},1500);
	}
});

function up_user_info(tel,pwd,cpwd){
	$.ajax(  
    {  
        type:'get',  
        url : 'http://elife.com/register.php?tel=tel&pwd=pwd&cpwd=cpwd',  
        dataType : 'jsonp',  
        jsonp:"jsoncallback", 
        timeout:15000,
        success  : function(data) {  
            user_create(data);  
        },  
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.readyState);
            console.log(XMLHttpRequest.status);
            console.log(textStatus);
            ELife_UI.Toast.show('服务器繁忙，请稍后重试！');
			window.setTimeout(function(){
				ELife_UI.Toast.hide();
			},1500);
        }  
    }  
); 
}
