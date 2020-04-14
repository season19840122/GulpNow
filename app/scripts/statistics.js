(function(w) {
	// var locationObj = window.location; 
    // var contentUrl = locationObj.pathname + locationObj.hash;
    // var refererUrl = '/';
    // var trackPageview = function() {
    // 	return function() {
    // 		try{
    // 			CZC.push(['_trackPageview', contentUrl, refererUrl]);
    // 		}catch(e) {}
    // 	}
    // }
    
    var trackEvent = function(category, label) {
        var action = '点击';
        _czc.push(["_trackEvent", category, action, label]);
    };

    var category = {
    	title: '今日资讯',
        nav: '导航栏',
        ad: '广告'
    };

	var czcObj = {
		getStatistics: {
            title_button_click: function() {
                trackEvent(category.title, '百度');
            },
            title_hot_click: function () {
                trackEvent(category.title, '热词');
            },
            close_click: function () {
                trackEvent(category.title, '关闭窗体');
            },
            nav_click: function(label) {
                trackEvent(category.nav, label);
            },
            content_click: function(category, label) {
                trackEvent(category, label);
            },
            ad_click: function (label) {
                trackEvent(category.ad, label);
            }
		}
	}
	
    w.czcObj = czcObj;

    // 热词统计
    $('body').on('click', '.hotword', function(){
        czcObj.getStatistics.title_hot_click();
    });
    // 关闭窗体
    $('body').on('click', '.btn-close', function () {
        czcObj.getStatistics.close_click();
    });
    // 导航统计
    $('body').on('click', '.nav-wrap a', function () {
        var label = $(this).text() + [];
        czcObj.getStatistics.nav_click(label);
    });
    // 内容统计
    $('body').on('click', '.content .pic, .content .txt, .item-a, .item-b, .content .caption, .btn-play', function () {
        var category = $('.nav-wrap .active').text();
        var label = $(this).data('num') + [];
        czcObj.getStatistics.content_click(category, label);
    });

    // 迅闪 VIP 数据上报
    var xsSetting = {
        opt: {
            list: 1,
            content: 3
        },
        menu: {
            headline: '头条',
            shortvideo: '短视频'
        }
    };

    var xsObj = {
        getStatistics: {
            list_init: function (guid, userid, res, menu) {
                commonObj.promise({
                    url: 'http://crsreport.swjoy.com/minipop/report',
                    data: {
                        opt: xsSetting.opt.list,
                        guid: guid,
                        userid: userid,
                        menu: menu,
                        res: JSON.stringify(res)
                    },
                    dataType: 'jsonp',
                    beforeSend: null,
                    complete: null
                });
            },
            content_click: function (guid, userid, res, menu) {
                commonObj.promise({
                    url: 'http://crsreport.swjoy.com/minipop/report',
                    data: {
                        opt: xsSetting.opt.content,
                        guid: guid,
                        userid: userid,
                        menu: menu,
                        res: JSON.stringify(res)
                    },
                    dataType: 'jsonp',
                    beforeSend: null,
                    complete: null
                });
            }
        }
    };
    w.xsObj = xsObj;


    var getGuid = function (dtd) {
        baseApp.guid(function (guid) {
            var userid = cookie.get('userid') || '';
            dtd.resolve([guid, userid]);
        });
        return dtd;
    };

    // 内容点击上报
    $('body').on('click', '.shortvideo-wrap .pic, .shortvideo-wrap .txt, .shortvideo-wrap .btn-play, .headline-wrap .pic, .headline-wrap .txt, .headline-wrap .item-a, .headline-wrap .item-b', function () {
        var dtd = $.Deferred(),
            guid = cookie.get('guid'),
            userid = cookie.get('userid'),
            res = {},
            menu = null;
        if (!guid) {
            getGuid(dtd).done(function () {
                guid = cookie.get('guid');
                userid = cookie.get('userid');
            });
        }
        if ($(this).is('.item-a') || $(this).is('.item-b')) {
            res[$(this).data('id')] = $(this).data('rsrc');
        } else {
            res[$(this).parents('li').data('id')] = $(this).parents('li').data('rsrc');
        }
        if ($(this).parents('.shortvideo-wrap').length) {
            menu = xsSetting.menu.shortvideo;
        } else {
            menu = xsSetting.menu.headline;
        }
        xsObj.getStatistics.content_click(guid, userid, res, menu);
    });

    // 列表展现上报
    var listReport = function (flag) {
        var dtd = $.Deferred(),
            guid = cookie.get('guid'),
            userid = cookie.get('userid'),
            res = {},
            menu = null;
        if (!guid) {
            getGuid(dtd).done(function () {
                guid = cookie.get('guid');
                userid = cookie.get('userid');
            });
        }
        // flag 为 1 的时候，是“头条”列表展现
        if (flag === 1) {
            $('.headline-wrap .headline-a-wrap li, .item-wrap .item-a, .item-wrap .item-b').each(function(){
                res[$(this).data('id')] = $(this).data('rsrc');
            });
            menu = xsSetting.menu.headline;
        } else {
            $('.shortvideo-content-wrap li').each(function () {
                res[$(this).data('id')] = $(this).data('rsrc');
            });
            menu = xsSetting.menu.shortvideo;
        }
        
        // console.log(res);
        xsObj.getStatistics.list_init(guid, userid, res, menu);
    };
    w.listReport = listReport;

})(window);
