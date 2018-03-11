var subtime='';
$('#ddxqback').click(function(){
	history.back();
});

var order_id= decodeURI(GetQueryString("order_id"));
if(order_id != null && order_id.toString().length > 1) {
	order_id= decodeURI(GetQueryString("order_id"));
}

get_order_detail_info(order_id);

function get_order_detail_info(){
	$.ajax({
		type: "get",
		url: 'http://139.199.198.216/get_order_detail_info.php?orderid='+order_id+'',
		dataType: 'jsonp',
		jsonp: "jsoncallback",
		timeout: 15000,
		success: function(data) {
			if(data.ret){
            	$('.no_order').css('display','none');
            	for(var i=0;i<data.orderinfo.length;i++){
            		var status;
            		if(data.orderinfo[i]['status'] == 0){
            			status='进行中';
            		}else if(data.orderinfo[i]['status'] == 1){
            			status='已完成';
            		}else{
            			status='已取消';
            		}
            		show_order(data.serveinfo[i][0]['serve_title'],data.addrinfo[i][0]['detail_addr'],
            		data.orderinfo[i]['aunt_num'],data.orderinfo[i]['serve_hour'],
            		data.orderinfo[i]['serve_time'],data.orderinfo[i]['cost'],status,
            		data.orderinfo[i]['submit_time']);
            		subtime=data.orderinfo[i]['submit_time'];
            	}
            }
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			ELife_UI.Toast.show('服务器繁忙，请稍后重试');
			window.setTimeout(function() {
				ELife_UI.Toast.hide();
			}, 2000);
		}
	});
}


function show_order(type,addr,aunt,duration,time,cost,status,submittime){
	$('#c_order_type_show').html(type);
	$('#c_order_addr_show').html(addr);
	$('#c_order_aunt_show').html(aunt+'位');
	$('#c_order_duration_show').html(duration+'小时');
	$('#c_order_time_show').html(time);
	$('#c_order_cost_show').html(cost+'元');
	$('#c_order_status_show').html(status);
	var submittime=getLocalTime(submittime);
	var yy = submittime.year;
	var mm = submittime.month;
	var dd = submittime.date_;
	submittime = yy + '年' + mm + '月' + dd + '日';
	$('#c_order_submittime_show').html(submittime);
}

$('#evaluate').click(function(){
	location.href='../../debug/tmpl/evaluate.html?order_id='+order_id+'';
});

$('#cancel').click(function(){
	var timestamp = Date.parse(new Date())/1000;
	var time=timestamp-subtime;
	var tian=time / 60 / 60 / 24;
	var shi=time / 60 / 60;
	if(tian > 1 || shi > 2){
		ELife_UI.Toast.show('距离预约服务已过去超过2小时，不能取消订单，如有疑问，请联系客服');
		window.setTimeout(function() {
			ELife_UI.Toast.hide();
		}, 2000);
	}else{
		ELife_UI.Message.show({
		title: '',
		message: '确定要取消服务吗?',
		ok: function() {
			$.ajax({
				url: 'http://139.199.198.216/cancel_order.php?order_id='+order_id+'',
				type: 'GET',
				dataType: 'jsonp',
				jsonp: "jsoncallback",
				timeout: 15000,
				success: function(data) {
					if(data.ret) {
						history.back();
					} else {
						console.log('cancel fail');
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					ELife_UI.Toast.show('服务器繁忙，请稍后重试');
					window.setTimeout(function() {
						ELife_UI.Toast.hide();
					}, 2000);
				}
			});
		},
		cancel: function() {}
	});
	}
});


$('#delete_order').click(function(){
	ELife_UI.Message.show({
		title: '',
		message: '确定要取消订单在列表中显示吗?',
		ok: function() {
			$.ajax({
				url: 'http://139.199.198.216/delete_order.php?order_id='+order_id+'',
				type: 'GET',
				dataType: 'jsonp',
				jsonp: "jsoncallback",
				timeout: 15000,
				success: function(data) {
					if(data.ret) {
						history.back();
					} else {
						console.log('delete fail');
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					ELife_UI.Toast.show('服务器繁忙，请稍后重试');
					window.setTimeout(function() {
						ELife_UI.Toast.hide();
					}, 2000);
				}
			});
		},
		cancel: function() {}
	});
});
