$('#loginbtn').click(function(){
	var username=$('#usertel').val();
	var userpass=$('#userpass').val();
	
	if($.trim(username) && $.trim(userpass)){
		$.ajax({
            url: 'http://elife.admin.com/login.php',
		 	type: 'POST',
		 	timeout: 5000,
		 	data: {
		 		"username": username,
		 		"userpass": userpass
		 	},
		 	error: function(res) {
		 		alert("登入失败,请稍后重试!");
		 	},
		 	success: function(data) {
		 		var obj = eval( "(" + data + ")" );
		 		if(obj.ret) {
		 			location.href='./index.html';
		 		} else {
		 			alert('登入失败' + data.msg);
		 		}
		 	}
		 });
	}
});
