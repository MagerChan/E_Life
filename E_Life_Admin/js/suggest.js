var tmpl_info = [];

function get_suggest_info(){
    $.ajax({
        url: 'http://elife.admin.com/suggest.php',
        type: 'GET',
        dataType: 'json',
        timeout: 15000,
        error: function(){
            console.log("向服务器请求数据出错!");
        },
        success: function(data){
            if(data.length>0) {
                tmpl_info=data;
                tmpl_create_table(data);
            }else {
                console.log('没有模板数据');
            }
        }
    });
}


function tmpl_create_table(tmpl_info){
    $("#suggest_list").empty();
    var root = document.getElementById("suggest_list");

    for (var i=0; i<tmpl_info.length; i++){
        var tr = document.createElement("tr");
        tr.innerHTML = '\
        <td>\
            <div class="col1" style="width: 100%; height: 100%;text-align:center;">'+tmpl_info[i]["_id"]+'</div>\
        </td>\
        <td>\
            <div style="width: 100%; height: 100%;text-align:center;">'+tmpl_info[i]["user_id"]+'</div>\
        </td>\
        <td>\
            <div style="width: 100%; height: 100%;text-align:center;">'+tmpl_info[i]["content"]+'</div>\
        </td>\
        <td>\
            <div style="width: 100%; height: 100%;text-align:center;">'+tmpl_info[i]["time"]+'</div>\
        </td>\
        <td>\
            <div style="width: 100%; height: 100%;text-align:center;">\
                <a class="tmpl_change_status" title="点击删除用户意见信息"><img class="icon_class" src="./img/delete.png"/></a>\
            </div>\
        </td>';
        $(root).append(tr);

        $(tr).find('.tmpl_change_status').data("tmpl_id",tmpl_info['_id']);
        $(tr).find('.tmpl_change_status').data("tmpl_info_pos",i);
        $(tr).find('.tmpl_change_status').click(function(){onDelete(this);});
    }
}

function onDelete(obj){
	var suggest_id=tmpl_info[$(obj).data('tmpl_info_pos')]['_id'];
	ELife_UI.Message.show({
		title: '',
		message: '确定要删除该订单评价吗?',
		ok: function() {
			$.ajax({
				url: 'http://elife.admin.com/suggest_del.php?suggest_id='+suggest_id+'',
				type: 'GET',
				dataType: 'json',
				timeout: 15000,
				success: function(data) {
					if(data.ret) {
						get_suggest_info();
						console.log('delete success');
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