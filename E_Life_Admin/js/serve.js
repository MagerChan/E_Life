var tmpl_info = [];

function get_serve_info(){
    $.ajax({
        url: 'http://elife.admin.com/serve.php',
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
    $("#serve_list").empty();
    var root = document.getElementById("serve_list");

    for (var i=0; i<tmpl_info.length; i++){
        var tr = document.createElement("tr");
        tr.innerHTML = '\
        <td>\
            <div class="col1" style="width: 100%; height: 100%;text-align:center;">'+tmpl_info[i]["_id"]+'</div>\
        </td>\
        <td>\
            <div style="width: 100%; height: 100%;text-align:center;">'+tmpl_info[i]["serve_title"]+'</div>\
        </td>\
        <td>\
            <div style="width: 100%; height: 100%;text-align:center;">'+tmpl_info[i]["serve_content"]+'</div>\
        </td>\
        <td>\
            <div style="width: 100%; height: 100%;text-align:center;">'+tmpl_info[i]["serve_cost"]+'</div>\
        </td>\
        <td>\
            <div class="col1" style="width: 100%; height: 100%;text-align:center;">'+tmpl_info[i]["unit"]+'</div>\
        </td>\
        <td>\
            <div style="width: 100%; height: 100%;text-align:center;">'+tmpl_info[i]["serve_discount"]+'</div>\
        </td>\
        <td>\
            <div style="width: 100%; height: 100%;text-align:center;">'+tmpl_info[i]["big_icon"]+'</div>\
        </td>\
        <td>\
            <div style="width: 100%; height: 100%;text-align:center;">'+tmpl_info[i]["type_id"]+'</div>\
        </td>\
        <td>\
            <div style="width: 100%; height: 100%;text-align:center;">'+tmpl_info[i]["options"]+'</div>\
        </td>\
        <td>\
            <div style="width: 100%; height: 100%;text-align:center;">\
                <a class="tmpl_change_status" title="点击编辑服务信息"><img class="icon_class" src="./img/edit.png"/></a>\
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
	$('#servetitle').val(tmpl_info[$(obj).data('tmpl_info_pos')]['serve_title']);
	$('#servecontent').val(tmpl_info[$(obj).data('tmpl_info_pos')]['serve_content']);
	$('#servecost').val(tmpl_info[$(obj).data('tmpl_info_pos')]['serve_cost']);
	$('#serveunit').val(tmpl_info[$(obj).data('tmpl_info_pos')]['unit']);
	$('#servediscount').val(tmpl_info[$(obj).data('tmpl_info_pos')]['serve_discount']);
	$('#serveicon').val(tmpl_info[$(obj).data('tmpl_info_pos')]['big_icon']);
	$('#typeid_serve').val(tmpl_info[$(obj).data('tmpl_info_pos')]['type_id']);
	$('#serveoption').val(tmpl_info[$(obj).data('tmpl_info_pos')]['options']);
	
	$('.confirm').click(function(){
		var servetitle=$('#servetitle').val();
		var servecontent=$('#servecontent').val()
		var servecost=$('#servecost').val();
		var serveunit=$('#serveunit').val();
		var servediscount=$('#servediscount').val()
		var serveicon=$('#serveicon').val();
		var typeid_serve=$('#typeid_serve').val();
		var serveoption=$('#serveoption').val();
		$.ajax({
            url: 'http://elife.admin.com/serve_edit.php',
		 	type: 'POST',
		 	timeout: 5000,
		 	data: {
		 		"seq":tmpl_info[$(obj).data('tmpl_info_pos')]['_id'],
		 		"servetitle": servetitle,
		 		"servecontent": servecontent,
		 		"servecost": servecost,
		 		"serveunit": serveunit,
		 		"servediscount": servediscount,
		 		"serveicon": serveicon,
		 		"typeid_serve": typeid_serve,
		 		"serveoption": serveoption
		 	},
		 	error: function(res) {
		 		alert("修改失败,请稍后重试!");
		 	},
		 	success: function(data) {
		 		var obj = eval( "(" + data + ")" );
		 		if(obj.ret) {
		 			alert('修改成功!');
		 			get_serve_info();
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