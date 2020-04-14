	//测试调用
	var ClientAPI = {
		getSubAccount:function(gameId) {
			var game =  ClientAPI.getLoginGame(gameId);
			if(game){
				return game.subAccount;
			}
			return null;
		},
		getLoginGame : function(gameId){
			var gameList = ClientAPI.getLoginGameList();
			if(!gameList){
				return null;
			}
			for (var i = 0, len = gameList.length; i < len; i++) {
				if(gameList[i].gameId == gameId){
					return gameList[i];
				}
			}
			return null;
		},
		switchStartInfo:function(gameId,flag) {
			console.log('login: '+gameId);
		},
		getLoginXingYun:function() {
			return {'userId':'20001', 'nickName':'大家都来撸'};
		},
		getLoginGameList: function() {
			return [
				{gameId: 13216, account:'28839943', subAccount:'2561_28839943', serverId:'2561', serverName:'黑色玫瑰', playerName:'只吃肉的和尚', headId:'15', level:'30',rank:''}, 
				{gameId: 17049, account:'699403830',subAccount:'4865_23232312',serverId:'2561', serverName:'诺克萨斯', playerName:'你妹啊', headId:'15', level:'30',rank:''}
			];
		},
		getBarId:function() {
			return 111;
		},
		finishLoading:function() {
			console.log('ClientApi finishLoad');
		},
		showMainFramePage:function(url) {
			console.log('go to '+url);	
		},
		showMainFramePage:function(page,url) {
			console.log('page: '+page+'--url: '+url);
		},
		isProccessExist:function(id) {
			return false;
		},
		setBeanGift:function(userId, vcParamJson) {
			console.log(userId+'----'+vcParamJson);
		}
	}
	var Proccess = {
		LOL:111
	}
	var ClientPage = {
		Iss :'url-Iss',
		TeamsLeague:'url-TeamsLeague'
	}
	
	var Action = {
		getData:function(id, postData) {
			return {
				'success':false,
				'code':1004,
				'message':'错误哈哈哈',
				'data':{
					'headImgUrl':'a'
				}
			};
		}
	}
	var GameID = {
		//英雄联盟
		LOL : 13216,
		//梦三国
		M3GUO : 17049,
		//炉石传说
		HearthStone : 16302,
		//守望先锋
		Overwatch : 17673,
		//守望先锋免费试玩
		OverwatchTrial : 17674,
		//战舰世界
		WorldOfWarships : 17071,
		//坦克世界
		WorldOfTanks : 14437,
		//魔幻英雄
		Strife : 16482,
		//300英雄
		Hero300 : 17055
	}
	
	var GameName = {
		get : function(gameId){
			if(GameID.LOL == gameId){
				return '英雄联盟';
			}else if(GameID.M3GUO == gameId){
				return '梦三国2';
			}else if(GameID.WorldOfTanks == gameId){
				return '坦克世界';
			}else if(GameID.Overwatch == gameId){
				return '守望先锋';
			}else if(GameID.OverwatchTrial == gameId){
				return '守望先锋免费试玩';
			}else if(GameID.Strife == gameId){
				return '魔幻英雄';
			}else if(GameID.Hero300 == gameId){
				return '300英雄';
			}
			return '';
		}
	}