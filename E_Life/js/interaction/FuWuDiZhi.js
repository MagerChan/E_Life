var curExtendItem = null;
var chooseContent = '';

/*需要传入用户id*/
var userid=4;

/*判断从那个页面进入到服务地址的页面，已显示不同的选择*/
var urlobj = GetQueryString("page");
if(urlobj != null && urlobj.toString().length > 1) {
	urlobj = GetQueryString("page")
}

get_addr(userid);

function get_addr(id) {
	$.ajax({
		type: "get",
		url: 'http://elife.com/get_addr.php?userid=' + id + '',
		dataType: 'jsonp',
		jsonp: "jsoncallback",
		timeout: 15000,
		success: function(data) {
			if(data.ret) {
				for(var i = 0; i < data.result.length; i++) {
					insert_addr(data.result[i]["name"], data.result[i]["detail_addr"], data.result[i]["tel"],data.result[i]['_id']);
				}
			} else {
				editaddrFail();
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

function insert_addr(name, addr, tel,id) {
	var new_item = document.createElement('a');
	
	var innerhtml='';
	if(urlobj == 'index'){
		var a_width=document.body.offsetWidth*0.45;
		
		innerhtml = "<li class='address'>" +
		"<div class='addr_left'>" +
		"<p>" + name + "</p>" +
		"<p>" + addr + "</p>" + "</div>" +
		"<div class='addr_right'>" + tel + "</div>" +
		"<div class='div_btn'>" +
		"<a class='btn_edit btn_edit_item' style='width:"+a_width+"px'>编辑</a>" +
		"<a class='btn_delete btn_edit_item' style='width:"+a_width+"px'>删除</a>" +
		"</div></li>";
		
	}else if(urlobj == 'order'){
		var a_width=document.body.offsetWidth*0.3;
		
		innerhtml = "<li class='address'>" +
		"<div class='addr_left'>" +
		"<p>" + name + "</p>" +
		"<p>" + addr + "</p>" + "</div>" +
		"<div class='addr_right'>" + tel + "</div>" +
		"<div class='div_btn'>" +
		"<a class='btn_view btn_edit_item' style='width:"+a_width+"px'>选中</a>" +
		"<a class='btn_edit btn_edit_item' style='width:"+a_width+"px'>编辑</a>" +
		"<a class='btn_delete btn_edit_item' style='width:"+a_width+"px'>删除</a>" +
		"</div></li>";
	}

	new_item.innerHTML = innerhtml;
	$(new_item).data('addr_id',id);
	/*添加点击事件*/
	$(new_item).find('.address').click(function() {
		onitemClick(this);
	});

	$(new_item).find(".btn_view").on("click", function() {
		onChooseAlbum(this);
	});

	$(new_item).find(".btn_edit").on("click", function() {
		onEditAlbum(this,id);
	});

	$(new_item).find(".btn_delete").on("click", function() {
		onDeleteAddrClk(this);
	});

	$('#ul_addr_list').prepend(new_item);
}

function onitemClick(obj) {
	var formalHeight = 60;
	var fullHeight = 105;
	var root = obj;
	if(root.offsetHeight == formalHeight) {
		if(curExtendItem != null) {
			curExtendItem.style.height = formalHeight + "px";
		}
		root.style.height = fullHeight + "px";
		curExtendItem = root;
	} else {
		root.style.height = formalHeight + "px";
		curExtendItem = null;
	}
}

function onChooseAlbum(obj) {
	chooseContent = $(obj).parent().parent().find('.addr_left').find('p:last-child').html();
	/*把参数传回去*/
	order_addr_info=chooseContent;
	
	console.log(order_addr_info);
	
	window.history.back();
}

function onEditAlbum(obj,id) {
	/*把数据传到编辑页面*/
	var name = $(obj).parent().parent().find('.addr_left').find('p:first-child').html();
	var addr = $(obj).parent().parent().find('.addr_left').find('p:last-child').html();
	var tel = $(obj).parent().parent().find('.addr_right').html();
	
	$('#show_addr').addClass('dis_none');
	$('#edit_addr').removeClass('dis_none');
	
	$('#edit_name_change').val(name);
	$('#edit_tel_change').val(tel);
	$('#edit_addr_change').val(addr);
	$('#id_hidden').val(id);
}

function onDeleteAddrClk(obj) {
	ELife_UI.Message.show({
		title: '',
		message: '确定要删除地址吗?',
		ok: function() {
			var root=$(obj).parent().parent().parent();
			var addr_id=root.data('addr_id');

			$.ajax({
				url: 'http://elife.com/delete_addr.php?addr_id='+addr_id+'',
				type: 'GET',
				dataType: 'jsonp',
				jsonp: "jsoncallback",
				timeout: 15000,
				success: function(data) {
					if(data.ret) {
						console.log('delete success');
					} else {
						console.log('delete fail');
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

			//删除当前节点
			var ul = $("#ul_addr_list");
			var addrChildren = ul.children();
			
			for(var i=0;i<addrChildren.length;i++){
				if($(addrChildren[i]).data('addr_id') == addr_id) {
					$(addrChildren[i]).remove();
					break;
				}
			}
		},
		cancel: function() {}
	});
}

function editaddrFail() {
	ELife_UI.Toast.show('网络繁忙，请稍后重试');
	window.setTimeout(function() {
		ELife_UI.Toast.hide();
	}, 2000);
}

function editaddrsuccess(){
	ELife_UI.Toast.show('修改地址成功');
	window.setTimeout(function(){
		ELife_UI.Toast.hide();
		location.reload();
	},2000);
}

$('#edit_name_change').keyup(function(){
	if($('#edit_name_change').val() != ''){
		btn_is_click(true,'#save_change_addr');
	}else{
		btn_is_click(false,'#save_change_addr');
	}
});

$('#edit_tel_change').keyup(function(){
	if($('#edit_tel_change').val().length == 11){
		btn_is_click(true,'#save_change_addr');
	}else{
		btn_is_click(false,'#save_change_addr');
	}
});

$('#edit_addr_change').keyup(function(){
	if($('#edit_addr_change').val() != ''){
		btn_is_click(true,'#save_change_addr');
	}else{
		btn_is_click(false,'#save_change_addr');
	}
});


$('#save_change_addr').click(function(){
	var name=$('#edit_name_change').val();
	var tel=$('#edit_tel_change').val();
	var addr=$('#edit_addr_change').val();
	var user_id=$('#id_hidden').val();
	
	$.ajax({
		type: "get",
		url: 'http://elife.com/edit_addr.php?name=' + name + '&addr=' + addr + '&tel=' + tel + '&id='+user_id+'',
		dataType: 'jsonp',
		jsonp: "jsoncallback",
		timeout: 15000,
		success: function(data) {
			if(data.ret) {
				editaddrsuccess();
			} else {
				editaddrFail();
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

$('#edit_addr_back').click(function(){
	$('#show_addr').removeClass('dis_none');
	$('#edit_addr').addClass('dis_none');
});

$('#add_serve_addr').click(function() {
	location.href = '../../debug/tmpl/add_addr.html';
});

$('#fwdzback').click(function() {
	window.location.back();
});