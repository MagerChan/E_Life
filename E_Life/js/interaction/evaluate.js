$('#evaluatecontent').keyup(function(){
	var content=($('#evaluatecontent').val().length >=10 && $('#evaluatecontent').val().length <100) ? 1 : 0;
	if(content){
		btn_is_click(true,'#evaluatebtn');
	}else{
		btn_is_click(false,'#evaluatebtn');
	}
});

var order_id= decodeURI(GetQueryString("order_id"));
if(order_id != null && order_id.toString().length > 1) {
	order_id= decodeURI(GetQueryString("order_id"));
}

$('#evaluatebtn').click(function(){
	var evaluate_content=$('#evaluatecontent').val();
	$.ajax({  
        type:'get',  
        url : 'http://139.199.198.216/evaluate.php?orderid='+order_id+'&evaluate='+evaluate_content+'',  
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
	ELife_UI.Toast.show('提交订单评价成功，感谢你的支持');
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

$('#evaluateback').click(function(){
	history.back();
});