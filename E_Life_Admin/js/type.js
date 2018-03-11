var tmpl_info = [];

function get_type_info(){
    $.ajax({
        url: 'http://elife.admin.com/type.php',
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
                location.href='./login.html';
            }
        }
    });
}


function tmpl_create_table(tmpl_info){
    $("#type_list").empty();
    var root = document.getElementById("type_list");

    for (var i=0; i<tmpl_info.length; i++){
        var tr = document.createElement("tr");
        tr.innerHTML = '\
        <td>\
            <div class="col1" style="width: 100%; height: 100%;text-align:center;">'+tmpl_info[i]["_id"]+'</div>\
        </td>\
        <td>\
            <div style="width: 100%; height: 100%;text-align:center;">'+tmpl_info[i]["type_title"]+'</div>\
        </td>\
        <td>\
            <div style="width: 100%; height: 100%;text-align:center;">'+tmpl_info[i]["icon"]+'</div>\
        </td>\
        <td>\
            <div style="width: 100%; height: 100%;text-align:center;">'+tmpl_info[i]["options"]+'</div>\
        </td>\
        <td>\
            <div style="width: 100%; height: 100%;text-align:center;">\
                <a class="tmpl_change_status" title="点击编辑类型信息"><img class="icon_class" src="./img/edit.png"/></a>\
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
	$('#id_type').val(tmpl_info[$(obj).data('tmpl_info_pos')]['_id']);
	$('#typetitle').val(tmpl_info[$(obj).data('tmpl_info_pos')]['type_title']);
	$('#typeicon').val(tmpl_info[$(obj).data('tmpl_info_pos')]['icon']);
	$('#typeoption').val(tmpl_info[$(obj).data('tmpl_info_pos')]['options']);
	
	$('.confirm').click(function(){
		var typetitle=$('#typetitle').val();
		var typeicon=$('#typeicon').val()
		var typeoption=$('#typeoption').val();
		$.ajax({
            url: 'http://elife.admin.com/type_edit.php',
		 	type: 'POST',
		 	timeout: 5000,
		 	data: {
		 		"seq":tmpl_info[$(obj).data('tmpl_info_pos')]['_id'],
		 		"typetitle": typetitle,
		 		"typeicon": typeicon,
		 		"typeoption": typeoption
		 	},
		 	error: function(res) {
		 		alert("修改失败,请稍后重试!");
		 	},
		 	success: function(data) {
		 		var obj = eval( "(" + data + ")" );
		 		if(obj.ret) {
		 			alert('修改成功!');
		 			get_type_info();
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
