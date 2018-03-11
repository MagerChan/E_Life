var tmpl_info = [];
var appid_tag = [];

function get_user_info(){
    $.ajax({
        url: 'http://elife.admin.com/index.php',
        type: 'GET',
        dataType: 'json',
        timeout: 15000,
        error: function(){
            console.log("向服务器请求数据出错!");
        },
        success: function(data){
        	//console.log(data);
            if(data.length>0) {
                tmpl_info=data;
                tmpl_create_table(data);
            }else {
                console.log('没有模板数据');
            }

			/*if(data.ret) {
				if(data.list.ret){
					tmpl_info=data.list;
                	tmpl_create_table(data.list.list);
				}else{
					console.log('没有模板数据');
				} 
            }else {
                location.href='./login.html';
            }*/
        }
    });
}


function tmpl_create_table(tmpl_info){
    $("#index_list").empty();
    var root = document.getElementById("index_list");

    for (var i=0; i<tmpl_info.length; i++){
        var tr = document.createElement("tr");
        tr.innerHTML = '\
        <td>\
            <div class="col1" style="width: 100%; height: 100%;text-align:center;">'+tmpl_info[i]["_id"]+'</div>\
        </td>\
        <td>\
            <div style="width: 100%; height: 100%;text-align:center;">'+tmpl_info[i]["tel"]+'</div>\
        </td>\
        <td>\
            <div style="width: 100%; height: 100%;text-align:center;">'+tmpl_info[i]["rank"]+'</div>\
        </td>\
        <td>\
            <div style="width: 100%; height: 100%;text-align:center;">'+tmpl_info[i]["createtime"]+'</div>\
        </td>\
        <td>\
            <div style="width: 100%; height: 100%;text-align:center;">\
                <a class="tmpl_change_status" title="点击删除用户信息"><img class="icon_class" src="./img/delete.png"/> </a>\
            </div>\
        </td>';
        $(root).append(tr);

        $(tr).find('.tmpl_change_status').data("tmpl_id",tmpl_info['_id']);
        $(tr).find('.tmpl_change_status').data("tmpl_info_pos",i);
        $(tr).find('.tmpl_change_status').click(function(){onDelete(this);});
    }
}

function onDelete(obj){
	var user_id=tmpl_info[$(obj).data('tmpl_info_pos')]['_id'];
	ELife_UI.Message.show({
		title: '',
		message: '确定要删除该用户吗?',
		ok: function() {
			$.ajax({
				url: 'http://elife.admin.com/index_del.php?user_id='+user_id+'',
				type: 'GET',
				dataType: 'json',
				timeout: 15000,
				success: function(data) {
					if(data.ret) {
						get_user_info();
					} else {
						ELife_UI.Toast.show('网络繁忙,稍后重试');
						window.setTimeout(function() {
							ELife_UI.Toast.hide();
						}, 2000);
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
