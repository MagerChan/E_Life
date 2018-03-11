function get_user_info(){
	$.ajax(  
    {  
        type:'get',  
        url : 'http://elife.com/index.php?',  
        dataType : 'jsonp',  
        jsonp:"jsoncallback", 
        timeout:15000,
        success  : function(data) { 
        	if(data.username == ""){
        		not_login();
        	}else{
        		is_login(data.username);
        	}
        },  
        error : function(XMLHttpRequest, textStatus, errorThrown) {  
            //console.log('服务器读取数据出错！');
            console.log(XMLHttpRequest.readyState);
            console.log(XMLHttpRequest.status);
            console.log(textStatus);
        }  
    }); 
}

function is_login(user){
	$('#login_btn').css('display','none');
	$('#loginuser').css('display','block').html(user);
}

function not_login(){
	$('#login_btn').css('display','block');
	$('#loginuser').css('display','none');
}

function get_order_info(){
	$.ajax(  
    {  
        type:'get',  
        url : 'http://elife.com/show_order.php?',  
        dataType : 'jsonp',  
        jsonp:"jsoncallback", 
        timeout:15000,
        success  : function(data) { 
            if(data.ret){
            	for(var i=0;i<data.orderinfo.length;i++){
            		var status=data.orderinfo[i]['status'] == 0 ? '进行中' : '已完成';
            		create_order(data.serveinfo[i][0]['serve_title'],status,data.serveinfo[i][0]['serve_content'],data.orderinfo[i]['cost'],data.serveinfo[i][0]['big_icon']);
            	}
            }
        },  
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.readyState);
            console.log(XMLHttpRequest.status);
            console.log(textStatus);
            ELife_UI.Toast.show('服务器繁忙，请稍后重试！');
			window.setTimeout(function(){
				ELife_UI.Toast.hide();
			},2000);
        }  
    }  
); 
}

function create_order(name,status,desc,money,url){
	var innerhtml='<div class="order_div1">'+
					'<div class="order_name">'+name+'</div>'+
					'<div class="order_status">'+status+'</div>'+
				'</div>'+																								
				'<div class="order_div2">'+
					'<img class="order_img" src=../../debug/images/'+url+' />'+
					'<div class="order_desc">'+desc+'</div>'+
				'</div>'+
				'<div class="order_money">合计：￥'+money+'</div>'+
				'<div class="order_judge">'+
					'<a href="#">评价</a>'+
				'</div>';
	var orderitem=document.createElement('section');
	orderitem.className='orderbox';
	orderitem.innerHTML=innerhtml;
	$('#all_order').append(orderitem);
}
