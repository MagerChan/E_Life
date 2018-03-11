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
	$.ajax({  
        type:'get',  
        url : 'http://elife.com/show_order.php?',  
        dataType : 'jsonp',  
        jsonp:"jsoncallback", 
        timeout:15000,
        success  : function(data) { 
            if(data.ret){
            	$('.no_order').css('display','none');
            	for(var i=0;i<data.orderinfo.length;i++){
            		var status;
            		if(data.orderinfo[i]['status'] == 0){status='进行中';}
            		else if(data.orderinfo[i]['status'] == 1){status='已完成';}
            		else{status='已取消';}
            		create_order(data.orderinfo[i]['_id'],data.serveinfo[i][0]['serve_title'],status,data.serveinfo[i][0]['serve_content'],data.orderinfo[i]['cost'],data.serveinfo[i][0]['big_icon']);
            	}
            }else{
            	$('.no_order').css('display','block');
            }
        },  
        error : function(XMLHttpRequest, textStatus, errorThrown) {
        	$('.no_order').css('display','block');
        }  
    }  
);}

function create_order(id,name,status,desc,money,url){
	var innerhtml='<div class="order_div1">'+
					'<div class="order_name">'+name+'</div>'+
					'<div class="order_status">'+status+'</div>'+
				'</div>'+																								
				'<div class="order_div2">'+
					'<img class="order_img" src=../../debug/images/'+url+' />'+
					'<div class="order_desc">'+desc+'</div>'+
				'</div>'+
				'<div class="order_judge">'+
					'<div class="order_money">合计：￥'+money+'</div>'+
					'<a href="#">评价</a>'+
				'</div>';
	var orderitem=document.createElement('section');
	orderitem.className='orderbox';
	$(orderitem).data('order_id',id);
	orderitem.innerHTML=innerhtml;
	$(orderitem).click(function(){
		orderitemclick(this);
	})
	$('#all_order').append(orderitem);
}

var city_= decodeURI(GetQueryString("city"));
if(city_ != null && city_.toString().length > 1) {
	city_= decodeURI(GetQueryString("city"));
	$('.city').html(city_);
	if(city_ == 'null'){
		$('.city').html('深圳');
	}
}else{
	$('.city').html('深圳');
}

function orderitemclick(obj){
	var id=$(obj).data('order_id');
	location.href='../../debug/tmpl/show_order.html?order_id='+id+'';
}
