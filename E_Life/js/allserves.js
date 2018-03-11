window.onload = function() {
	liTab();
	
	/*切换选项卡*/
	function liTab() {
		var oli = $('#serves_left_ul').find('li');
		for(var i = 0; i < $(oli).length; i++) {
			$($(oli)[i]).click(function() {
				for(var j = 0; j < $(oli).length; j++) {
					$($(oli)[j]).removeClass('active');
				}
				$(this).addClass('active');
			});
		}
	}

	/*function liChange(index) {
		console.log('aaaa');
		var oli = $('#serves_left_ul').find('li');
		for(var j = 0; j < $(oli).length; j++) {
			$($(oli)[j]).removeClass('active');
		}
		$($(oli)[index]).addClass('active');

		console.log('aaaa' + index);
	};*/
}