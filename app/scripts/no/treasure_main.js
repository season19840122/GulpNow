
$('body').on('click', '.masklayer, .btn-sure, .btn-cancel, .btn-close', function(event) {
  event.preventDefault();
  GLOBAL.hide($('.dialog-wrap'));
});

var optionObj = function(options_){
	var this_ = this;
	//公用配置参数
	this.options = {
		hostUrl: '',
		hostImg: '',
		ajaxTimeout: 3000
	}
	
	//通用ajax封装
	this.ajax_ = function(obj) {
		$.ajax({
			type: obj.type || 'POST',
			url: obj.url,
			dataType: obj.dataType || 'json',
			timeout: this_.options.ajaxTimeout,
			success: obj.success,
			error: obj.error || function() {//如果不传递error，调用公用异常提示
				this_.alertMsg(obj.name+'调用异常');
			}
		});
	}
	
	//公用弹出框
	this.alertMsg = function(msg) {
		$('#alert_box .p1').html(msg);
		GLOBAL.show($('#alert_box'));
	}
	
	/**
	 * 校检登录
	 */
	this.do_challengeValidate = function() {
		var gameId = GameID.LOL;
		//校检火马登录
		var user = ClientAPI.getLoginXingYun();
		if(!user.hasOwnProperty('userId') || user.userId == 0) {
			//调起登陆窗
			ClientAPI.startLogin('VC_LOGIN');
			return;
		}
		return user.userId;
	}
	
	this.options = $.extend({}, this.options, options_);
}

//init
var initObj = new optionObj({
	hostUrl: 'http://10.149.4.5:80',
	ajaxTimeout: 3000,
	hostImg: './'
});

//右边推荐与抽奖动画action
var actionFun1 = new ACTIONFUN1(initObj);
//绑定打开宝箱dom事件
actionFun1.dom();


// 我的宝箱
;(function($){

	var chestObj = new optionObj({
		// hostUrl: "http://10.149.4.5/chest/myPackage",
		hostUrl: '../mock/chest.json',
		ajaxTimeout: 3000,
		hostImg: './'
	});

	var chestVM = new Vue({
	  el: '.myPackage',
	  data: {
	  	num: 0,
	  	pieces: [],
	    chests: []
	  },
	 	methods: {
	    addPieceClass: function(){
	    	for(var i=0; i<this.chests.length; i++){
					switch (this.chests[i].chestName) {
	    			case '新手箱':
	    				this.chests[i].imgName = 'tb1';
	    				break;
	    			case '初级补给箱':
	    				this.chests[i].imgName = 'tb2';
	    				break;
	    			case '中级补给箱':
	    				this.chests[i].imgName = 'tb3';
	    				break;
	    			case '高级补给箱':
	    				this.chests[i].imgName = 'tb4';
	    				break;
	    			case '神秘宝箱':
	    				this.chests[i].imgName = 'tb5';
	    				break;
	    			default:
	    				this.chests[i].imgName = '';
	    				break;
	    		}
					for(var j=0; j<this.chests[i].pieces.length; j++){
						var obj = this.chests[i].pieces[j].price;
						if(obj < 10){
							this.chests[i].pieces[j].class = 'p1';
						}else if(obj >= 10 && obj< 100){
							this.chests[i].pieces[j].class = 'p2';
						}else if(obj >= 100 && obj< 499){
							this.chests[i].pieces[j].class = 'p3';
						}else if(obj >= 500 && obj< 999){
							this.chests[i].pieces[j].class = 'p4';
						}else if(obj >= 1000){
							this.chests[i].pieces[j].class = 'p5';
						};
					}
				}   
	    },
	    openChest: function(chestName){
				//打开宝箱
				actionFun1.do_open({'userChestId':0, 'chestName':chestName});
				window.setTimeout(fresh, 1000);	
	    },
	    openPiece: function(goodsId){
	    	//绑定打开宝箱dom事件
	    	chestObj.ajax_({
	    		name: '兑换奖品',
					// url: 'http://10.149.4.5/chest/exchange?goodsId=' + goodsId,
					url: '../mock/exchange.json',
					type: 'get',
					success: function(json) {
						if(json.success){
							chestObj.alertMsg(json.data.goodsName + '已发放到你的奖品中，请到“我的－我的奖品”下填写领奖信息来领取！');
						}else{
							if(json.message){
								chestObj.alertMsg(json.message);
							}else{
								chestObj.alertMsg('数据调用异常！');
							}
						}
						window.setTimeout(fresh, 1000);	
					}
	    	});

	    }
	  }
	});

	// 登录校验
	// chestObj.do_challengeValidate();
	 
	// 异步刷新数据
	var fresh = function(){
		chestObj.ajax_({
			type: 'get',
			name: '宝箱数据',
			url: chestObj.options.hostUrl,
			success: function(json) {
				chestVM.num = 48 - (json.data.pieces.length + json.data.chests.length);
				chestVM.pieces = json.data.pieces;
				chestVM.chests = json.data.chests;
				chestVM.addPieceClass();
			}
		});
	};
	fresh();

	var initSmall = function(){
		var userChestId = $('#userChestId').val();
		if(userChestId){
			//打开宝箱
			actionFun1.do_open({'userChestId':userChestId, 'chestName':''});
		}
	}();

	$('body').on('click', '.left_box li:eq(0), #myChest', function(){
	  fresh();
	});

})(jQuery);