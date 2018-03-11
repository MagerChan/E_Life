function get_serve_info(){
	$.ajax({
		type: "get",
		url: 'http://elife.com/RiChangBaoJie.php?',
		dataType: 'jsonp',
		jsonp: "jsoncallback",
		timeout: 15000,
		success: function(data) {
			if(data.ret) {
				
			} else {
				
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest.readyState);
			console.log(XMLHttpRequest.status);
			console.log(textStatus);
			ELife_UI.Toast.show('服务器繁忙，请稍后重试');
			window.setTimeout(function() {
				ELife_UI.Toast.hide();
			}, 2000);
		}
	});
}



//$('#ordernow').click(function() {
//	//是否登录
//	var logininfo = get_serve_info(false);
//	if(logininfo.username == ""){
//		location.href="../../debug/tmpl/login.html";
//	}else{
//		//获取当前的服务类型，服务费用，
//		
//		
//		
//		location.href="../../debug/tmpl/place_order.html";
//	}
//});