$('#type_submit').click(function(){
	var title=$('#typetitle_add').val();
	var icon=$('#typeicon_add').val();
	var options=$('#typeoption_add').val();
	
	if($.trim(title) && $.trim(icon) && $.trim(options)){
		$.ajax({
            url: 'http://elife.admin.com/type_add.php',
		 	type: 'POST',
		 	timeout: 5000,
		 	data: {
		 		"title": title,
		 		"icon": icon,
		 		"options": options
		 	},
		 	error: function(res) {
		 		alert("增加失败,请稍后重试!");
		 	},
		 	success: function(data) {
		 		var obj = eval( "(" + data + ")" );
		 		if(obj.ret) {
		 			alert('增加成功!');
		 			location.href='./type.html';
		 		} else {
		 			alert('增加失败' + data.msg);
		 		}
		 	}
		 });
	}
});
