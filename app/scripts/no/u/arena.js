	$('body').on('click', '.masklayer, .btn-sure, .btn-cancel, .btn-close', function(event) {
    event.preventDefault();
    GLOBAL.hide($('.dialog-wrap'));
  });
	
	var optionObj = function(options_){
		var this_ = this;
		//公用配置参数
		this.options = {
			hostUrl: [],
			hostImg: '',
			ajaxTimeout: 3000
		}
		
		//通用 ajax 封装
		this.ajax_ = function(obj) {
			$.ajax({
				url: obj.url,
				// type: obj.type || 'POST',
				type: obj.type || 'GET',
				dataType: obj.dataType || 'json',
				data: obj.data || null,
				timeout: this_.options.ajaxTimeout,
				success: obj.success,
				error: function(xhr, errorType, error) {
					console.log('Ajax request error, errorType: ' + errorType +  ', error: ' + error);
					this_.showMsg(obj.name + '调用异常');
				}
			});
		}
		
		//公用弹出框
		this.showMsg = function(msg) {
			$('#alert_box .p1').html(msg);
			GLOBAL.show($('#alert_box'));
		}
		
		this.do_getUserId = function() {
			//校检火马登录
			// var user = ClientAPI.getLoginXingYun();
			// if(!user.hasOwnProperty("userId") || user.userId == 0) {
			// 	//调起登陆窗
			// 	ClientAPI.startLogin('VC_LOGIN');
				return 0;
			// } else {
			// 	return user.userId;
			// }
		}
		
		// 登录判断
		this.do_checkLogin = function(callBack) {
			//校检火马登录
			var user = ClientAPI.getLoginXingYun();
			if(!user.hasOwnProperty('userId') || user.userId == 0) {
				//调起登陆窗
				ClientAPI.startLogin('VC_LOGIN');
				return;
			}
			callBack();
			return;
		}
		
		this.options = $.extend({}, this.options, options_);
	}

	var arenaObj = new optionObj({
		// hostUrl: [
		// 	localPath + "arenaMatch/arenaMatchData",
		// 	localPath + "arenaMatch/teamEnroll",
		// 	localPath + "arenaMatchGuess/toGuessArena",
		// 	localPath + "arenaMatchGuess/support",
		// 	localPath + "arenaMatchGuess/qrcodePayParam",
		// 	localPath + "arenaMatchGuess/payFinished",
		// 	localPath + "combatTeam/toMyCombatTeam"
		// ],
		hostUrl: [
			'./mock/擂台赛/arenaMatchData.json',
			'./mock/擂台赛/teamEnroll.json',
			'./mock/擂台赛/toGuessArena.json',
			'./mock/擂台赛/support.json',
			'./mock/擂台赛/qrcodePayParam.json',
			'./mock/擂台赛/payFinished.json',
			'./mock/擂台赛/noData.json'
		],
		ajaxTimeout: 3000,
		hostImg: './'
	});

	Vue.component('paginate', VuejsPaginate);

	var arenaVM = new Vue({
	  el: '#app',
	  data: {
	  	video: { 
	  		show: true 
	  	},
	  	isEnd: true,
	  	nowData: {},
	  	monthData: [],
	  	allData: {
	  		matchRole:[]
	  	},
	  	swBean: {},
	  	qrcodePay: {},
	  	param: '',
	  	creatTeam: {
	  		show: true
	  	}
	  },
	  computed: {
	    // 仅读取，值只须为函数
	    getBtnClass: function () {
	    	if (this.nowData.couldGuess) {	    		
	    		if (this.allData.isGuessed) {
			    	if (this.allData.guessedTeamId === this.nowData.teamId) {
			    		return ['already', '已支持', 'support disable', '支持该战队'];
			    	} else if(this.allData.guessedTeamId === this.nowData.attackTeamId){
			    		// return ['support disable', '支持该战队', 'already', '已支持'];
			    		return ['support', '支持该战队', 'already', '已支持'];
			    	}
		    	} else {
		    		return ['support', '支持该战队', 'support', '支持该战队']
		    	}
	    	} else {
	    		if (this.allData.guessedTeamId === this.nowData.teamId) {
		    		return ['already', '已支持', 'support disable', '支持该战队'];
		    	} else if(this.allData.guessedTeamId === this.nowData.attackTeamId){
		    		return ['support disable', '支持该战队', 'already', '已支持'];
		    	} else {
		    		return ['support disable', '支持该战队', 'support disable', '支持该战队'];
		    	}
	    	}
	    },
	    getRules: function(){
	    	return this.allData.matchRole.join('<br>');
	    }
	  },
	  mounted: function() {
    	this.getPageInit(this);
    },
    methods: {
	    getPageInit: function(obj){
	    	var vm = this;
	    	// 页面初始化
	    	arenaObj.ajax_({
	    		name: '页面初始化数据',
	    		// url: arenaObj.options.hostUrl[0]  + '?userId=' + arenaObj.do_getUserId(),
	    		url: arenaObj.options.hostUrl[0],
	    		success: function(data) {
	    			if(data.data.isEnd){
	  					$('#isLive').html('观看视频');
	  				}else{
	  					$('#isLive').html('观看直播');
	  				}
		    		if (data.success) {
		    			vm.allData = data.data;
		    			if(vm.allData.arenaMatch) {
		          	if (data.data.guess_live_switch === '1' && data.data.couldLive === true) {
		          		// 由于函数的作用域，这里不能用 this
		          		vm.video = {'show':false, 'url':data.data.live_video_url};
		          	} else {
		          		// vm.$set('nowData', data.data.arenaMatch);
		          		vm.nowData = data.data.arenaMatch;
		          		vm.nowData.count = vm.nowData.arenaCnt/(vm.nowData.arenaCnt + vm.nowData.attackCnt)*100;

		          		vm.monthData = data.data.monthMatchVideos;
		          		for (var i=0; i< vm.monthData.length; i++){
							    	if (vm.monthData[i].couldGuess === 1) {
							    		vm.monthData[i].couldGuess = '正在直播';
							    	} else if (vm.monthData[i].couldGuess === 2) {
							    		vm.monthData[i].couldGuess = '视频';
							    	}
						    	}
			        		var arr = [];
			        		for (var i=0; i<vm.monthData.length; i+=3) {
			        			arr.push(vm.monthData.slice(i, i+3));
			        		}
			        		vm.monthData = arr;
		        		}
		       //  		var param = '?userId=' + arenaObj.do_getUserId() +
		    			// 		'&arenaMatchId=' + vm.nowData.arenaMatchId +
		    			// 		'&barId=' + ClientAPI.getBarId();
									// vm.param = param;
							}
	          } else {
		        	if (data.message) {
		        		arenaObj.showMsg(data.message);
							} else {
								arenaObj.showMsg('数据调用异常！');
							}
						}
					}
				});
	    },
	    clickCallback: function(pageNum) {
	    	$('.guess-wrap>ul').eq(pageNum-1).show().siblings('ul').hide();
	      // console.log(pageNum)
	    },
	    openRule: function(){
	    	GLOBAL.show($('#rules_box'));
	    },
	    teamApply: function(){
	    	var vm = this;
	    	// 战队报名
	    	arenaObj.ajax_({
	    		name: '战队报名',
	    		// url: arenaObj.options.hostUrl[1]  + '?userId=' + arenaObj.do_getUserId(),
	    		url: arenaObj.options.hostUrl[1],
	    		success: function(data) {
	    			if (data.success) {
            	GLOBAL.show($('#team_five'));
            } else {
            	if (data.message) {
		        		if (data.code === 1) {
		    					// vm.creatTeam = {'show':false, 'link':localPath + 'combatTeam/toMyCombatTeam?userId=' + arenaObj.do_getUserId()};
		    					arenaObj.showMsg(data.message);
		    				} else {
									arenaObj.showMsg('数据调用异常！');
								}
							}
						}
	    		}
				});
	    },
	    supportTeam: function(event){
	    	if ($(event.target).attr('class') === 'support') {
	    		$(event.target).attr('name', 'flag');
	    		var vm = this;
	    		// 支持该战队
		    	arenaObj.ajax_({
		    		name: '支持该战队',
		    		// url: arenaObj.options.hostUrl[2] + '?userId=' + arenaObj.do_getUserId(),
		    		url: arenaObj.options.hostUrl[2],
		    		success: function(data) {
		    			if (data.success) {
		    				vm.swBean = data.data;
	            	GLOBAL.show($('#zan_box'));
	            } else {
	            	if (data.message) {
	            		arenaObj.showMsg(data.message);
								} else {
									arenaObj.showMsg('数据调用异常！');
								}
							}
						}
					});
	    	}
	    },
	    swBeanSupport: function(event){
	    	var vm = this;
	    	vm.param += '&teamId=' + $('.flag').data('teamid') +
			'&payValue=' + $('#zan_box .on').data('bean');
	    	
    		// 顺豆支持
	    	arenaObj.ajax_({
	    		name: '顺豆支持',
	    		// url: arenaObj.options.hostUrl[3] + vm.param,
	    		url: arenaObj.options.hostUrl[3],
	    		success: function(data) {
	    			if (data.success) {
	    				GLOBAL.hide($('#zan_box'));
	    				arenaObj.showMsg(data.message);
	    				// window.setTimeout(function(){
	    				// 	location.reload();
	    				// }, 3000)
	    				$('[name="flag"]').attr('class', 'already').html('已支持');
	    				vm.nowData.arenaCnt++;
	    				vm.nowData.count = vm.nowData.arenaCnt/(vm.nowData.arenaCnt + vm.nowData.attackCnt)*100;
            } else {
            	if (data.message) {
            		GLOBAL.hide($('#zan_box'));
            		arenaObj.showMsg(data.message);
							} else {
								arenaObj.showMsg('数据调用异常！');
							}
						}
					}
				});
	    },
	    qrcodeSupport: function(event){
	    	var vm = this;
	    	vm.param += '&teamId=' + $('.flag').data('teamid') +
			'&payValue=' + $('#zan_box .on').data('money');
    		// 扫码支持
	    	arenaObj.ajax_({
	    		name: '扫码支持',
	    		// url: arenaObj.options.hostUrl[4] + vm.param,
	    		url: arenaObj.options.hostUrl[4],
	    		success: function(data) {
	    			if (data.success) {
	    				vm.qrcodePay = data.data;
	    				$('#pay_qrcode').find('.alert_img_qrcode').empty().qrcode({
	    					width: 120,
	    					height: 120,
	    					text: vm.qrcodePay.qrcodeUrl,
	    					render: 'canvas',
	    					correctLevel: 1
	    				});
            	GLOBAL.show($('#pay_qrcode'));
            	vm.flag = window.setInterval(function() {
								vm.payFinished();
							}, 3000);
            } else {
            	GLOBAL.hide($('#zan_box'));
            	if (data.message) {
            		arenaObj.showMsg(data.message);
							} else {
								arenaObj.showMsg('数据调用异常！');
							}
						}
					}
				});
	    },
	    payFinished: function(event){
	    	var vm = this;
	    	arenaObj.ajax_({
	    		name: '定时查询',
	    		// url: arenaObj.options.hostUrl[5] + '?orderId=' + vm.qrcodePay.orderId,
	    		url: arenaObj.options.hostUrl[5],
	    		success: function(data) {
	    			if(data.success && data.code === 0) {
							clearInterval(vm.flag);
							GLOBAL.hide($('#pay_qrcode'));
							GLOBAL.hide($('#zan_box'));
	    				arenaObj.showMsg('支付成功！');
	    				// window.setTimeout(function(){
	    				// 	location.reload();
	    				// }, 3000)
	    				$('[name="flag"]').attr('class', 'already').html('已支持');
	    				vm.nowData.arenaCnt++;
	    				vm.nowData.count = vm.nowData.arenaCnt/(vm.nowData.arenaCnt + vm.nowData.attackCnt)*100;
						} else {
            	if (data.message) {
            		GLOBAL.hide($('#zan_box'));
            		arenaObj.showMsg(data.message);
							} else {
								arenaObj.showMsg('数据调用异常！');
							}
						}
							// arenaObj.ajax_({
							// 	name: '顺豆支持',
							// 	url: arenaObj.options.hostUrl[5] + vm.param,
							// 	success: function(obj) {
									
							// 	}
							// });
            }
				});
	    }
	  }

	});
