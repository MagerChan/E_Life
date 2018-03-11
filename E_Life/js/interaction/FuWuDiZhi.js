var urlobj = GetQueryString("page");
if(urlobj != null && urlobj.toString().length > 1) {
	urlobj = GetQueryString("page")
}

/*需要传入用户id*/
get_addr(4);

function get_addr(id) {
	$.ajax({
		type: "get",
		url: 'http://elife.com/get_addr.php?userid=' + id + '',
		dataType: 'jsonp',
		jsonp: "jsoncallback",
		timeout: 15000,
		success: function(data) {
			if(data.ret) {
				console.log(data.result);
				for(var i=0;i<data.result.length;i++){
					insert_addr(data.result[i]["name"],data.result[i]["detail_addr"],data.result[i]["tel"]);
				}
			} else {
				getaddrFail();
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest.readyState);
			console.log(XMLHttpRequest.status);
			console.log(textStatus);
			ELife_UI.Toast.show('服务器繁忙，请稍后重试！');
			window.setTimeout(function() {
				ELife_UI.Toast.hide();
			}, 2000);
		}
	});
}

function insert_addr(name, addr, tel) {
	var new_item = document.createElement('a');
	var innerhtml = "<li class='address'>" +
		"<div class='addr_left'>" +
		"<p>" + name + "</p>" +
		"<p>" + addr + "</p>" + "</div>" +
		"<div class='addr_right'>" + tel + "</div>" +
		"<div class='div_btn dis_none'>" +
		"<a class='btn_view btn_edit_item'>选中</a>" +
		"<a class='btn_edit btn_edit_item'>编辑</a>" +
		"<a class='btn_delete btn_edit_item'>删除</a>" +
		"</div></li>";

	new_item.innerHTML = innerhtml;
	/*添加点击事件*/
	$(new_item).click(function() {
		onitemClick(this);
	});

	$(new_item).find(".btn_view").on("click", function() {
		onViewAlbum(this);
	});

	$(new_item).find(".btn_edit").on("click", function() {
		onEditAlbum(this);
	});

	$(new_item).find(".btn_delete").on("click", function() {
		onDeleteAddrClk(this);
	});

	$('.has_address').prepend(new_item);
}

var is_click = 0;
function onitemClick(obj) {
	$(obj).click(function() {
		if(is_click) {
			$(obj).find('.div_btn').addClass('dis_none');
			is_click = 0;
		} else {
			$(obj).find('.div_btn').removeClass('dis_none');
			is_click = 1;
		}
	});
}

function getaddrFail() {
	ELife_UI.Toast.show('网络繁忙，请稍后重试');
	window.setTimeout(function() {
		ELife_UI.Toast.hide();
	}, 2000);
}

$('#add_serve_addr').click(function() {
	location.href = '../../debug/tmpl/add_addr.html';
});

$('#fwdzback').click(function() {
	window.location.back();
});