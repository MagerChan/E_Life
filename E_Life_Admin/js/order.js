var tmpl_info = [];

function get_order_info(){
    $.ajax({
        url: 'http://elife.admin.com/order.php',
        type: 'GET',
        dataType: 'json',
        timeout: 15000,
        error: function(){
            console.log("向服务器请求数据出错!");
        },
        success: function(data){
            if(data.length>0) {
                tmpl_info=data;
                //console.log(data);
                tmpl_create_table(data);
            }else {
                console.log('没有模板数据');
            }
        }
    });
}


function tmpl_create_table(tmpl_info){
    $("#order_list").empty();
    var root = document.getElementById("order_list");

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
            <div style="width: 100%; height: 100%;text-align:center;">'+tmpl_info[i]["serve_id"]+'</div>\
        </td>\
        <td>\
            <div style="width: 100%; height: 100%;text-align:center;">'+tmpl_info[i]["addr_id"]+'</div>\
        </td>\
        <td>\
            <div style="width: 100%; height: 100%;text-align:center;">'+tmpl_info[i]["serve_hour"]+'</div>\
        </td>\
         <td>\
            <div class="col1" style="width: 100%; height: 100%;text-align:center;">'+tmpl_info[i]["aunt_num"]+'</div>\
        </td>\
        <td>\
            <div style="width: 100%; height: 100%;text-align:center;">'+tmpl_info[i]["serve_time"]+'</div>\
        </td>\
        <td>\
            <div style="width: 100%; height: 100%;text-align:center;">'+tmpl_info[i]["cost"]+'</div>\
        </td>\
        <td>\
            <div style="width: 100%; height: 100%;text-align:center;">'+tmpl_info[i]["status"]+'</div>\
        </td>\
        <td>\
            <div style="width: 100%; height: 100%;text-align:center;">'+tmpl_info[i]["submit_time"]+'</div>\
        </td>\
        <td>\
            <div style="width: 100%; height: 100%;text-align:center;">'+tmpl_info[i]["is_show"]+'</div>\
        </td>\
        <td>\
            <div style="width: 100%; height: 100%;text-align:center;">\
                <a class="tmpl_change_status" title="点击编辑订单信息"><img class="icon_class" src="./img/edit.png"/></a>\
            </div>\
        </td>';
        $(root).append(tr);

        $(tr).find('.tmpl_change_status').data("tmpl_id",tmpl_info['_id']);
        $(tr).find('.tmpl_change_status').data("tmpl_info_pos",i);
        $(tr).find('.tmpl_change_status').click(function(){onEditOrder(this);});
    }
}



function onEditOrder(obj){
	$('.dialog_ui').css('display','block');
	$('#serveid_order').val(tmpl_info[$(obj).data('tmpl_info_pos')]['serve_id']);
	$('#addrid_order').val(tmpl_info[$(obj).data('tmpl_info_pos')]['addr_id']);
	$('#order_hour').val(tmpl_info[$(obj).data('tmpl_info_pos')]['serve_hour']);
	$('#order_aunt').val(tmpl_info[$(obj).data('tmpl_info_pos')]['aunt_num']);
	$('#order_time').val(tmpl_info[$(obj).data('tmpl_info_pos')]['serve_time']);
	$('#order_cost').val(tmpl_info[$(obj).data('tmpl_info_pos')]['cost']);
	$('#order_status').val(tmpl_info[$(obj).data('tmpl_info_pos')]['status']);
	$('#order_isshow').val(tmpl_info[$(obj).data('tmpl_info_pos')]['is_show']);
	
	$('.confirm').click(function(){
		var serveid_after=$('#serveid_order').val();
		var addrid_after=$('#addrid_order').val();
		var hour_after=$('#order_hour').val()
		var aunt_after=$('#order_aunt').val();
		var time_after=$('#order_time').val();
		var cost_after=$('#order_cost').val();
		var status_after=$('#order_status').val();
		var isshow_after=$('#order_isshow').val();
		$.ajax({
            url: 'http://elife.admin.com/order_edit.php',
		 	type: 'POST',
		 	timeout: 5000,
		 	data: {
		 		"seq":tmpl_info[$(obj).data('tmpl_info_pos')]['_id'],
		 		"serveid_after": serveid_after,
		 		"addrid_after": addrid_after,
		 		"hour_after": hour_after,
		 		"aunt_after": aunt_after,
		 		"time_after": time_after,
		 		"cost_after": cost_after,
		 		"status_after": status_after,
		 		"isshow_after":isshow_after
		 	},
		 	error: function(res) {
		 		alert("修改失败,请稍后重试!");
		 	},
		 	success: function(data) {
		 		var obj = eval( "(" + data + ")" );
		 		if(obj.ret) {
		 			alert('修改成功!');
		 			get_order_info();
		 		} else {
		 			alert('修改失败' + data.msg);
		 		}
		 	}
		 });
		 $('.dialog_ui').css('display','none');
	});
}

$('.closedialog').click(function(){
	$('.dialog_ui').css('display','none');
});
