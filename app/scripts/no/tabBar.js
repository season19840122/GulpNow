$(function() {
	$(document).on('click','.menu li',function(e) {
		$(this).siblings('li').removeClass('active');
		$(this).addClass('active');
		var actionName = $(this).attr('data-id');
		typeof actionObj[actionName] == 'function' && actionObj[actionName]();
	})
	var actionObj = {
		vip:function() {
			location.href = 'http://hao123.com';
			console.log('vip');
		},
		game:function() {
			console.log('game');
		},
		prize:function() {
			console.log('prize');
		}
	}
})
