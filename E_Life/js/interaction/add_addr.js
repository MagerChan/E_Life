var addr_n=0;
var addr_t=1;
var addr_a=0
get_user_info();

$('#addr_name').keyup(function(){
	addr_n= $('#addr_name').val() != '' ? 1 : 0;
	if((addr_n+addr_t+addr_a) == 3){
		btn_is_click(true,'#save_serve_addr');
	}else{
		btn_is_click(false,'#save_serve_addr');
	}
});

$('#addr_tel').keyup(function(){
	addr_t= $('#addr_tel').val().length==11 ? 1 : 0;
	if((addr_n+addr_t+addr_a) == 3){
		btn_is_click(true,'#save_serve_addr');
	}else{
		btn_is_click(false,'#save_serve_addr');
	}
});

$('#addr_addr').keyup(function(){
	addr_a= $('#addr_addr').val() != '' ? 1 : 0;
	if((addr_n+addr_t+addr_a) == 3){
		btn_is_click(true,'#save_serve_addr');
	}else{
		btn_is_click(false,'#save_serve_addr');
	}
});

$('#save_serve_addr').click(function(){
	var name=$('#addr_name').val();
	var addr=$('#addr_addr').val();
	var tel=$('#addr_tel').val();
	add_addr_(name,addr,userid,tel);
});

function add_addr_(name_,addr_,userid_,tel_){
	$.ajax({
		type:"get",
		url:'http://elife.com/add_addr.php?name='+name_+'&addr='+addr_+'&tel='+tel_+'',
		dataType : 'jsonp',  
        jsonp:"jsoncallback", 
        timeout:15000,
        success:function(data) { 
            if(data.ret){
            	addaddrsuccess();
            }else{
            	addaddrFail();
            }
        },  
        error:function(XMLHttpRequest, textStatus, errorThrown) {
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

function addaddrsuccess(){
	ELife_UI.Toast.show('添加地址成功');
	window.setTimeout(function(){
		ELife_UI.Toast.hide();
		window.location.back();
	},2000);
}

function addaddrFail(){
	ELife_UI.Toast.show('添加失败，请稍后重试');
	window.setTimeout(function(){
		ELife_UI.Toast.hide();
	},2000);
}

$('#add_addr_back').click(function(){
	history.back();
});

function get_user_info(){
	$.ajax(  
    {  
        type:'get',  
        url : 'http://elife.com/index.php?',  
        dataType : 'jsonp',  
        jsonp:"jsoncallback", 
        timeout:15000,
        success  : function(data) { 
        	$('#addr_tel').val(data.username);
        },  
        error : function(XMLHttpRequest, textStatus, errorThrown) {  
        	
        }  
    }); 
}