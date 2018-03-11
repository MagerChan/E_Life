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
    $("#tmpl_list").empty();
    var root = document.getElementById("tmpl_list");

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
                <a class="tmpl_change_status" title="点击删除用户信息"><i class="icon-edit"></i></a>\
            </div>\
        </td>';
        $(root).append(tr);

        $(tr).find('.tmpl_change_status').data("tmpl_id",tmpl_info['_id']);
        $(tr).find('.tmpl_change_status').data("tmpl_info_pos",i);
        $(tr).find('.tmpl_change_status').click(function(){onDelete(this);});
    }
}

function onDelete(obj){
	
}
