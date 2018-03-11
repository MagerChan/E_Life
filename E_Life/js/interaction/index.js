var serve_info=[];

function get_serve_info(){
	$.ajax({
		type:"GET",
		url:"elife.com/index.php",
		async:true,
		dataType:'json',
		timeout:15000,
		error:function(){
			console.log('向服务器请求数据出错');
		},
		success:function(data){
			if(data.length > 0){
				serve_info=data;
				serve_create(data);
			}
		}
	});
}

function serve_create(serve_info){
	$('#serve_info').empty();
	$('#serve_info').html(serve_info);
}
