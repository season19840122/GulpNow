var ACTIONFUN1  = function(optionObj) {
	var this_ = this;
	//dom事件
	this.dom = function() {
		$(function () {
			if($('.dg-wrapper a').length == 2) {
				var aHtml = $('.dg-wrapper a').eq(0)[0].outerHTML;
				$('.dg-wrapper').append(aHtml);
			}
			$('#dg-container').gallery({
				// autoplay: false,
				interval: 3000
			});
		})
	}
	
	//显示抽奖动画
	var showChesure = function(flag, arr) {
		if(flag) {
			$('.animate_box').show();
			$('.flash_pic').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function() {
				$('.rotate_pic').show();
				$('.line_left').show();
				$('.line_right').show();
				$('.tresure_word').show();
				$('.tresure_content').show();
				$('.confirm').show();
				
				var liArr = new Array();
				for(var i = 0;i<arr.length;i++) {
					var goodsType = arr[i].goodsType;
					var pic = arr[i].pic || optionObj.options.hostImg+'images/my/treasure_no.png';
					//是顺豆，用固定的配置图片
					if(goodsType == 6) pic = optionObj.options.hostImg+'images/my/treasureSD.png';
					
					var pieceName = arr[i].pieceName;
					liArr.push('<li><div><img src=\''+pic+'\'><p>'+pieceName+'</p></div></li>')
				}
				$('.animate_box ul').html(liArr.join(''));
				
				$('.animate_box ul li').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function() {
					$('.animate_box ul li div').addClass('liFlash');
				})
				
				function showLi(num) {
					$('.animate_box ul li').eq(num).addClass('visible rotateAndTranIn');
					setTimeout(function() {
						if(num == arr.length) return;
						num++;
						showLi(num);
					},500)
				}
				setTimeout(function() {showLi(0);},500)
			})
		} else {
			$('.animate_box').hide();
			$('.rotate_pic').hide();
			$('.line_left').hide();
			$('.line_right').hide();
			$('.tresure_word').hide();
			$('.tresure_content').hide();
			$('.confirm').hide();
			$('.animate_box ul').empty();
		}
		$('.confirm').one('click',function() {
			showChesure(false);
		});		
	}
	showChesure(true,[{goodsType:111,pic:222,pieceName:111},{goodsType:111,pic:222,pieceName:2222}]);
	var urlList = {
		//图片轮播url
		url_open :function(obj) {
			return initObj.options.hostUrl+'/chest/open?userChestId='+obj.userChestId+'&chestName='+obj.chestName;
		}
	}
	
	//抽奖
	this.do_open = function(obj) {
		optionObj.ajax_({
			name:'打开宝箱',
			url: urlList.url_open(obj),
			success: function(obj) {
				if(obj['success'] && obj['code'] == 0 && obj['data']) {
					var tresureArr = obj['data'];
					showChesure(true,tresureArr);
				} else if(!obj['success']) {
					optionObj.alertMsg(obj['message'] || '打开宝箱调用失败');
				}
			}
		});
	}

}