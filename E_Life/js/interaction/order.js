var serve_weekday_ = '';
var serve_time_ = '';
var cost='';

$('#addservetime').click(function() {
	$('#serveday').css('display', 'block');
	insert_serveday(5);
	$('#servedayitem_tag_0').addClass('selectitem');
})

function insert_serveday(appid_tag) {
	$('#serveday').empty();
	var nowtime = getNowTime();
	for(var i = 0; i < appid_tag; i++) {
		var appid = document.createElement('div');
		appid.className = "servedayitem";
		appid.id = "servedayitem_tag_" + i;

		var weekday = weekday_(i, nowtime.week);

		var mm = nowtime.month;
		var dd = nowtime.date_;
		var wholemonthday = monthday(nowtime.month, nowtime.year);
		if((nowtime.date_ + i) > wholemonthday) {
			mm++;
			dd = (dd + i) % wholemonthday;
		} else {
			dd = dd + i;
		}

		if(i == 0) {
			serve_weekday_ = mm + '月' + dd + '日' + '(' + weekday + ')';
		}

		mm = (mm < 10) ? ('0' + mm) : mm;
		dd = (dd < 10) ? ('0' + dd) : dd;

		var timedate = mm + "/" + dd;

		appid.innerHTML = '<p>' + weekday + '</p><p>' + timedate + '</p>';

		$(appid).data('pos', i);
		$(appid).click(function() {
			onTagClick(this);
		});
		$('#serveday').append(appid);

		var wrap = document.createElement('div');
		wrap.id = "servetime" + i;
		wrap.className = "servetime";
		$('#all_servetime').append(wrap);
		insert_servetime(21, i)
	}
}

function insert_servetime(appid_tag, flag) {
	var hh=0;
	var mm=0;
	$('#servetime' + flag).empty();
	var hour = 8;
	for(var i = 0; i < appid_tag; i++) {
		var appid = document.createElement('div');
		appid.className = "servetimeitem";
		appid.id = "servetimeitem_tag_" + flag + '_' + i;

		if(i % 2 == 0 && i > 0) {
			hour++;
		}
		var h_ = hour;
		hour = (hour < 10) ? '0' + hour : hour;
		var min = (i % 2 == 0) ? "00" : "30";

		appid.innerHTML = '<p>' + hour + ':' + min + '</p><p>￥70</p>';
		hour = h_;

		$(appid).data('pos', i);
		
		if(flag == 0){
			var getnowtime=getNowTime();
			hh=getnowtime.hour;
			mm=getnowtime.min;
			if(h_ <= (hh+1)){
				$(appid).addClass('servetimeitem_over');
			}else{
				$(appid).click(function() {
					onServeTimeClick(this, flag);
				});
			}
		}else{
			$(appid).click(function() {
				onServeTimeClick(this, flag);
			});
		}
		
		$('#servetime' + flag).append(appid);
	}
}

function onTagClick(obj) {
	/*先全部display:none,然后this的display:block*/
	var obj_ = obj;
	var pos = $(obj_).data('pos');
	$('.servetimeitem').removeClass('selectitem');
	for(var i = 0; i < 5; i++) {
		$('#servedayitem_tag_' + i).removeClass('selectitem');
		$('#servetime' + i).css('display', 'none');
	}
	$('#servedayitem_tag_' + pos).addClass('selectitem');
	$('#servetime' + pos).css('display', 'block');

	/*获取星期的数据*/
	var zhouji = $(obj_).find('p:first-child').html();
	var riqi = $(obj_).find('p:last-child').html();
	var yue = riqi.substring(0, 1) == '0' ? riqi.substring(1, 2) : riqi.substring(0, 3);
	var ri = riqi.substring(3, 5);
	serve_weekday_ = yue + '月' + ri + '日' + '(' + zhouji + ')';
}

function onServeTimeClick(obj, flag) {
	/*获取时间信息，价格信息*/
	var obj_ = obj;
	var pos = $(obj_).data('pos');
	for(var i = 0; i < 21; i++) {
		$('#servetimeitem_tag_' + flag + '_' + i).removeClass('selectitem');
	}
	$('#servetimeitem_tag_' + flag + '_' + pos).addClass('selectitem');

	/*获取时间是数据*/
	serve_time_ = $(obj_).find('p:first-child').html();

	orderclick();
}

/*判断是星期几*/
function weekday_(i, nowweek) {
	var weekday = '';
	if(i == 0) {
		weekday = "今天";
	} else if(i == 1) {
		weekday = "明天";
	} else {
		var whichdate = (nowweek + i) % 7;
		switch(whichdate) {
			case 0:
				weekday = "周日";
				break;
			case 1:
				weekday = "周一";
				break;
			case 2:
				weekday = "周二";
				break;
			case 3:
				weekday = "周三";
				break;
			case 4:
				weekday = "周四";
				break;
			case 5:
				weekday = "周五";
				break;
			case 6:
				weekday = "周六";
				break;
		}
	}
	return weekday;
}

/*判断获取的当前月有几天*/
function monthday(mm, yy) {
	var wholemonthday = 0;
	switch(mm) {
		case 1:
			wholemonthday = 31;
			break;
		case 2:
			wholemonthday = ((yy % 4 == 0) && (yy % 100 != 0 || yy % 400 == 0)) ? 29 : 28;
			break;
		case 3:
			wholemonthday = 31;
			break;
		case 4:
			wholemonthday = 30;
			break;
		case 5:
			wholemonthday = 31;
			break;
		case 6:
			wholemonthday = 30;
			break;
		case 7:
			wholemonthday = 31;
			break;
		case 8:
			wholemonthday = 31;
			break;
		case 9:
			wholemonthday = 30;
			break;
		case 10:
			wholemonthday = 31;
			break;
		case 11:
			wholemonthday = 10;
			break;
		case 12:
			wholemonthday = 31;
			break;
	}
	return wholemonthday;
}

/*获取当前时间戳*/
function getNowTime() {
	var timestamp = Date.parse(new Date());
	timestamp = timestamp / 1000;
	var nowtime = getLocalTime(timestamp);
	return nowtime;
}

$('#houradd').click(function() {
	$('#hoursub').removeClass('nouse');
	var num = parseInt($('#hournum').html());
	num++;
	if(num < 6) {
		$('#hournum').html(num);
		if(num == 5)
			$('#houradd').addClass('nouse');
	} else {
		$('#houradd').addClass('nouse');
	}
});

$('#hoursub').click(function() {
	$('#houradd').removeClass('nouse');
	var num = parseInt($('#hournum').html());
	num--;
	if(num > 1) {
		$('#hournum').html(num);
		if(num == 2)
			$('#hoursub').addClass('nouse');
	} else {
		$('#hoursub').addClass('nouse');
	}
});

$('#auntadd').click(function() {
	$('#auntsub').removeClass('nouse');
	var num = parseInt($('#auntnum').html());
	num++;
	if(num < 4) {
		$('#auntnum').html(num);
		if(num == 3)
			$('#auntadd').addClass('nouse');
	} else {
		$('#auntadd').addClass('nouse');
	}
});

$('#auntsub').click(function() {
	$('#auntadd').removeClass('nouse');
	var num = parseInt($('#auntnum').html());
	num--;
	if(num > 0) {
		$('#auntnum').html(num);
		if(num == 1)
			$('#auntsub').addClass('nouse');
	} else {
		$('#auntsub').addClass('nouse');
	}
});

$('#palceorderback').click(function() {
	history.back();
});

getaddrinfo();

function getaddrinfo() {
	$.ajax({
		url: 'http://elife.com/get_serve_addr.php?',
		type: 'GET',
		dataType: 'jsonp',
		jsonp: "jsoncallback",
		timeout: 15000,
		success: function(data) {
			if(data.ret) {
				$('#addr_info_').html(data.addr_info);
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

$('#confirmorderback').click(function() {
	$('#placeorder_page').css('display', 'block');
	$('#confirmorder_page').css('display', 'none');
});

/*获取各种数据，进行提交订单
 直接获取服务时间和阿姨数量的数据
 获取服务地址的数据，需要地址页面的返回
 获取上门时间的数据
 * */

$('#serveaddr').click(function() {
	orderclick();
});

function orderclick() {
	if($('#addr_info_').html() != '' && serve_weekday_ != '' && serve_time_ != '') {
		btn_is_click(true, '#place_order');
	} else {
		btn_is_click(false, '#place_order');
	}
};

$('#place_order').click(function() {
	var addr = $('#addr_info_').html(); //地址信息
	var hournum_ = $('#hournum').html(); //服务时长
	var auntnum_ = $('#auntnum').html(); //阿姨数量
	
	//把所有信息显示在确认订单页面
	$('#c_order_addr').html(addr);
	$('#c_order_aunt').html(auntnum_ + '位阿姨');
	$('#c_order_duration').html(hournum_ + '小时');
	$('#c_order_time').html(serve_weekday_ + ' ' + serve_time_);

	$('#placeorder_page').css('display', 'none');
	$('#confirmorder_page').css('display', 'block');

	$.ajax({
		type: "get",
		url: 'http://elife.com/get_order_info.php?',
		dataType: 'jsonp',
		jsonp: "jsoncallback",
		timeout: 15000,
		success: function(data) {
			$('#c_order_type').html(data.servename);
			$('#c_order_cost').html(data.servecost + '元x' + hournum_);
			var money = parseInt(data.servecost) * parseInt(hournum_);
			cost=money;
			$('#totalmoney').html(money + '元');
			$('#confirm_money').html('￥' + money);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			ELife_UI.Toast.show('服务器繁忙，请稍后重试');
			window.setTimeout(function() {
				ELife_UI.Toast.hide();
			}, 2000);
		}
	});
});

$('#confirm_order').click(function() {
	var addr = $('#addr_info_').html(); //地址信息
	var hournum_ = $('#hournum').html(); //服务时长
	var auntnum_ = $('#auntnum').html(); //阿姨数量
	
	$.ajax({
		type: "get",
		url: 'http://elife.com/place_order.php?h='+hournum_+'&a_n='+auntnum_+'&t='+serve_weekday_+' '+serve_time_+'&cost='+cost+'',
		dataType: 'jsonp',
		jsonp: "jsoncallback",
		timeout: 15000,
		success: function(data) {
			if(data.ret) {
				addorderSuccess();
			} else {
				addorderFail();
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
});

function addorderSuccess(){
	ELife_UI.Toast.show('添加订单成功，我们将为你提供优质服务');
	window.setTimeout(function() {
		ELife_UI.Toast.hide();
		location.replace("../../debug/tmpl/index.html");
	}, 2000);
}

function addorderFail(){
	ELife_UI.Toast.show('网络繁忙，请稍后重试');
	window.setTimeout(function() {
		ELife_UI.Toast.hide();
	}, 2000);
}