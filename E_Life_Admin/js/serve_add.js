$('#serve_submit').click(function(){
	var title=$('#servetitle_add').val();
	var content=$('#servecontent_add').val();
	var cost=$('#servecost_add').val();
	var unit=$('#serveunit_add').val();
	var discount=$('#servediscount_add').val();
	var icon=$('#serveicon_add').val();
	var typeidserve=$('#typeid_serve_add').val();
	var options=$('#serveoption_add').val();
	
	if($.trim(title) && $.trim(content) && $.trim(cost)&& $.trim(unit) && $.trim(discount)&& $.trim(icon) && $.trim(typeidserve)&& $.trim(options)){
		$.ajax({
            url: 'http://elife.admin.com/serve_add.php',
		 	type: 'POST',
		 	timeout: 5000,
		 	data: {
		 		"title": title,
		 		"content": content,
		 		"cost": cost,
		 		"unit": unit,
		 		"discount": discount,
		 		"icon": icon,
		 		"typeidserve": typeidserve,
		 		"options": options
		 	},
		 	error: function(res) {
		 		alert("增加失败,请稍后重试!");
		 	},
		 	success: function(data) {
		 		var obj = eval( "(" + data + ")" );
		 		if(obj.ret) {
		 			alert('增加成功!');
		 			location.href='./serve.html';
		 		} else {
		 			alert('增加失败' + data.msg);
		 		}
		 	}
		 });
	}
});
