define(['jquery'],function($) {
	var initObj = function() {
		this.options = {
			ajaxTimeout:3000,
			contentType:'application/x-www-form-urlencoded',
			hostImg:'../../',
			globalData:{},
			baseUrl:{
				dev:'./',
				pub:'./'
			},
			useOn:'dev'
		};
		
		var RETURN_MSG = {
			ERROR:'接口出错',
			EX:'接口异常',
			SUCCESS:'接口成功'
		};
		var this_ = this;
		this.init = function(options_) {
			this.options = $.extend({}, this.options, options_ || {});
		};
		
		/**
		 * newData：每个接口的json参数
		 * des：获取接口的全部参数，通过每个接口不同的参数合并公用参数值
		 */
		this.getData = function(obj) {
			if(typeof obj.data == 'object') {//是否是post方法的参数
				var data = $.extend('', this.options.globalData, obj.data || {});
				return this.options.contentType === 'application/json' && obj.type == 'POST'?JSON.stringify(obj.data) : obj.data;
			} else if(obj.data){//是否是get方法的参数
				return obj.data;
			} else {
				return '';
			}
		}
		
		//js小数相乘
		this.accMul = function(arg1,arg2) {
			var m=0,s1=arg1.toString(),s2=arg2.toString();
			try{m+=s1.split('.')[1].length}catch(e){}
			try{m+=s2.split('.')[1].length}catch(e){}
			return Number(s1.replace('.',''))*Number(s2.replace('.',''))/Math.pow(10,m);
		}
		
		/**
		 * obj：每个接口的ajax参数
		 * des：获取接口的全部调用地址
		 */
		this.getUrl = function(obj) {
			if(obj.other) {
				return obj.other;
			} else {
				return this.options.baseUrl[this.options.useOn]+obj[this.options.useOn];
			}
		}
		
		this.checkLogin = function() {
			//校检火马登录
			var user = ClientAPI.getLoginXingYun();
			if(!user.hasOwnProperty('userId') || user.userId == 0) {
				//调起登陆窗
				return false;
			}
			return true;
		}
		
		this.do_Login = function(callBack) {
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
		
		/**
		 * obj：每个接口的信息
		 * des：封装公共ajax
		 */
		this.ajax = function(obj) {
			$.ajax({
				type: obj.type || 'GET',
				url: this_.getUrl(obj.url),
				dataType: obj.dataType || 'json',
				contentType: this.options.contentType,
				data:this_.getData(obj),
				timeout: this.options.ajaxTimeout,
				success: obj.success,
				error: obj.error || function(e) {
					obj.urlObj.again = false;
					this_.alertMsg('友情提示',obj.name+'：'+JSON.stringify(e));
				}
			});
		};
		
		this.checkName = function checkName(name) {
			var endName = name;
			name = String(name);
			var nameL = name.length;
			var replaceNum = 1/3;
			var middleNum = parseInt(nameL/2);//字符串中间位置
			var middleLong = nameL==4?2:Math.round(nameL*replaceNum);//字符串需要截取的字符数量
			var middleLongT = parseInt(middleLong/2);//字符串需要截取的字符数量
			var leftNum = nameL==3?1:(middleNum-middleLongT-(middleLong%2==0?0:1));
			var rightNum = nameL==3?2:(middleNum+middleLongT);
			var leftStr = name.substring(0,leftNum);
			var rightStr = name.substring(rightNum);
			var lll = rightNum - leftNum - 1;
			if(nameL >= 3) {
				var start = '*';
				for(var i=0;i<lll;i++) {
					start+='*';
				}
				endName = leftStr+start+rightStr;
			} else if(nameL == 2) {
				endName = name.substring(0,1)+'*';
			}
			return endName;
		}
		
		
		this.alertMsg = function(msg) {
			console.log(msg);
		}
	}
	
	return new initObj();
})
