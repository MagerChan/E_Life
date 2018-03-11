var serveid = GetQueryString("id");
if(serveid != null && serveid.toString().length >= 1) {
	serveid = GetQueryString("id");
	var charstr=serveid.substr(serveid.length-1,1)
	if(charstr == '#'){
		serveid=serveid.substr(0,serveid.length-1);
	}
	get_serve_info(serveid);
}

function get_serve_info(serveid){
	$.ajax({
		type: "get",
		url: 'http://139.199.198.216/RiChangBaoJie.php?id='+serveid+'',
		dataType: 'jsonp',
		jsonp: "jsoncallback",
		timeout: 15000,
		success: function(data) {
			if(data.ret) {
				show_serve_info(data.result);
				$('#ordernow').click(function(){
					if(data.username){
						onorderclick(data.result);
					}					
					else{
						location.href="../../debug/tmpl/login.html";
					}
				});
			} else {
				console.log('failfail');
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			ELife_UI.Toast.show('服务器繁忙ha，请稍后重试');
			window.setTimeout(function() {
				ELife_UI.Toast.hide();
			}, 2000);
		}
	});
}

function show_serve_info(result){
	$('#serve_name').html(result.serve_title);
	$('#serve_money').html(result.serve_cost+'元/'+result.unit);
	var discountmoney=parseInt(parseInt(result.serve_cost)*result.serve_discount);
	$('#serve_money_menber').html(discountmoney+'元/'+result.unit);
}

function onorderclick(data){
	//把相关信息传到服务器，用session存起来
	//“服务名称”，“服务费用”，“服务类型id”
	//跳转到place_order页面
	$.ajax({
		type: "get",
		url: 'http://139.199.198.216/save_serve_info.php?serveid='+serveid+'&servename='+data.serve_title+'&cost='+data.serve_cost+'',
		dataType: 'jsonp',
		jsonp: "jsoncallback",
		timeout: 15000,
		success: function(data) {
			console.log(data);
			location.href="../../debug/tmpl/place_order.html";
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			ELife_UI.Toast.show('服务器繁忙，请稍后重试');
			window.setTimeout(function() {
				ELife_UI.Toast.hide();
			}, 2000);
		}
	});
}


$('#rcbj_back').click(function(){
	history.back();
});
