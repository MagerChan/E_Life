ELife_UI=new(function(){
	this.Message=new(function(){
		var root_id="elife_msg_box";
		this.show=function(params){
			var innerHtml='<div class="elife_messagebox_content messagebg">\
                    <div class="elife_messagebox_title"><strong>弹窗标题</strong></div>\
                    <div class="elife_messagebox_info contentcolor">自定义弹窗内容<br></div>\
                    <div class="elife_messagebox_ft">\
                        <a href="javascript:;" class="elife_msg_box_btn_cancel">取消</a>\
                        <a href="javascript:;" class="elife_msg_box_btn_ok">确定</a>\
                    </div>\
                </div>';
            var $root = $("#"+root_id);

            if (!$root.length) {
                var dlg_root = document.createElement('div');
                $(dlg_root).addClass('elife_messagebox')
                    .css('display','none')
                    .css('z-index',99999)
                    .attr('id', root_id)
                    .html(innerHtml);
                $('body').append(dlg_root);
                $root = $("#"+root_id);
            }

            if (params&&params.title!=null && params.title!=undefined) {
                $root.find('.elife_messagebox_title strong').text(params.title);
            }

            if (params&&params.message) {
                $root.find('.elife_messagebox_info').html(params.message);
            }

            $root.find('.elife_msg_box_btn_ok').on('click', function () {            
                if (params && params.ok) {
                    params.ok();
                }

                $root.hide();
                $root.remove();
            });

            $root.find('.elife_msg_box_btn_cancel').on('click', function () {            
                if (params && params.cancel) {
                    params.cancel();
                }
                $root.hide();
                $root.remove();
            });

            $root.show();
		}
		
		this.hide = function(){
            var $root = $("#"+root_id);

            if ($root.length) {
                $root.hide();
                $root.remove();
            }
        };
	});
	
	this.Toast=new(function(){
		var root_id="toast_msg_box";
		this.show=function(params){
			var innerHtml='<div class="elife_messagebox_content">\
                    <div class="elife_messagebox_info">自定义弹窗内容<br></div>\
                </div>';
            var $root = $("#"+root_id);

            if (!$root.length) {
                var dlg_root = document.createElement('div');
                $(dlg_root).addClass('elife_messagebox')
                    .css('display','none')
                    .css('z-index',99999)
                    .attr('id', root_id)
                    .html(innerHtml);
                $('body').append(dlg_root);
                $root = $("#"+root_id);
            }
            
            if (params) {
                $root.find('.elife_messagebox_info').html(params);
            }
            $root.show();
		}
		
		this.hide = function(){
            var $root = $("#"+root_id);

            if ($root.length) {
                $root.hide();
                $root.remove();
            }
        };
	});
});