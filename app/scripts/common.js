var cookie = {
    set: function(key, value) {
        $.cookie(key, value || '');
    },
    get: function(key) {
        return $.cookie(key);
    }
};

var base64 = {
    encode: function(val) {
        return $.base64.btoa(val, true)
    },
    decode: function(val) {
        return $.base64.atob(val, true)
    }
}

function logoErr(e) {
    e.src = './images/logo.png';
}
//处理vc端接口
function generateGUID() {
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx-vip'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

//如果不是端里打开使用本地服务查询客户信息
var bApp = (function() {
    var isHttps = false;
    var qq = [],
        passport = [],
        identity = null;
    var userInfoRequestUrl = null;
    //同一个信息如果请求次数超过5次依然无法验证用户信息则不再发起请求直到有信息变更再发起请求
    var requestUserInfoTry = 0;
    var timeout = null;

    //原生js的jsonp请求
    var native_jsonp = function() {
        var that = {};

        that.send = function(src, options) {
            var options = options || {},
                callback_name = options.callbackName || 'callback',
                on_success = options.onSuccess || function() {},
                on_timeout = options.onTimeout || function() {},
                timeout = options.timeout || 10;

            var timeout_trigger = window.setTimeout(function() {
                window[callback_name] = function() {};
                on_timeout();
            }, timeout * 1000);

            window[callback_name] = function(data) {
                window.clearTimeout(timeout_trigger);
                on_success(data);
            };

            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = src;

            document
                .getElementsByTagName('head')[0]
                .appendChild(script);
        };

        return that;
    };

    //验证用户信息获取userid
    var verifyuserInfo = function(reqData) {
        native_jsonp().send(userInfoRequestUrl + '?callback=userInfoCallback&content=' + JSON.stringify(reqData) + '&v=' + new Date().getTime() + Math.random() * 100, {
            callbackName: 'userInfoCallback',
            onSuccess: function(res) {
                if (res.status == 1) {
                    requestUserInfoTry = 0;
                    cookie.set('userid', res.userid);
                } else {
                    requestUserInfoTry++;
                }
            },
            onTimeout: function() {
                requestUserInfoTry++;
            }
        });
    };

    var isArrayEqual = function(arr1, arr2) {
        var union = _.union(arr1, _.uniq(arr2));

        return arr1.length == union.length && arr1.length == arr2.length;
    }

    //从本地服务获取信息
    var getBaseInfo = function() {
        isHttps = window.location.protocol == 'https:';

        var baseInfoUrl = '';

        if (isHttps) {
            baseInfoUrl = 'https://swac.5iss.cn:9189/SWRequestActionInfo?v=' + new Date().getTime() + Math.random() * 100 + '&callback=SWR_LOC_JSONP';
        } else {
            baseInfoUrl = 'http://127.0.0.1:9188/SWRequestActionInfo?v=' + new Date().getTime() + Math.random() * 100 + '&callback=SWR_LOC_JSONP';
        }

        var loadData = function() {
            native_jsonp().send(baseInfoUrl, {
                callbackName: 'SWR_LOC_JSONP',
                timeout: 0.2,
                onTimeout: function() {
                    //超时并且guid不存在cookie的情况下则自动生成一个guid
                    // console.log('run');
                    if (!!!cookie.get('guid')) {
                        cookie.set('guid', generateGUID());
                        return;
                    }

                },
                onSuccess: function(res) {
                    if (!!!cookie.get('guid') && res.account && res.account.guid) {
                        cookie.set('guid', res.account.guid);
                    } else if (!!!cookie.get('guid') && (!res.account || !res.account.guid)) {
                        //如果没有guid返回则自动生成一个guid
                        cookie.set('guid', generateGUID());
                    }

                    if (!res.account || cookie.get('userid'))
                        return;

                    var account = res.account;

                    if (isArrayEqual(qq, account.qq) && identity == account.personinfo && isArrayEqual(passport, account.passportid))
                        return;

                    qq = account.qq;
                    identity = account.personinfo;
                    passport = account.passportid;

                    //通过基本信息获取用户id
                    verifyuserInfo({ guid: cookie.get('guid'), qq: qq, identity: [identity], passport: passport });
                    // count++;
                }
            });
        }

        
        loadData();
        
    };

    //guid && userid 是否都有经存在
    var isInfoExist = function() {
        return cookie.get('userid') && cookie.get('guid');
    };

    return {
        init: function(userRequestUrl) {
            userInfoRequestUrl = userRequestUrl;
            //如果userid和guid有一个不存在则执行本地数据搜索
            if (!isInfoExist())
                getBaseInfo();

            //定时器
            var verifyhandler = null;

            verifyhandler = setInterval(function() {
                if (!isInfoExist() && requestUserInfoTry < 3 /* && count < 10 */) {
                    getBaseInfo();
                } else
                    clearInterval(verifyhandler);
            }, 30000);
        }
    }
})();


var wApp = (function() {
    // 离线上报，已有接口
    //TCHAR *, int len
    var ReportData = function(data, length) {
        try {
            window.external.ReportData(data, length);
        } catch (e) {}
    }

    // //判断是否为客户端打开
    // var isNewClient = function() {
    //     try {
    //         return !!window.external.getWebCltType;
    //     } catch (e) {
    //         return false;
    //     }
    // }

    //判断是否为网维环境
    var isWWClient = function() {
        try {
            return !!window.external.getWebCltType;
        } catch (e) {
            return false;
        }

    }

    // 0-未知，1-内嵌页，2-VC Browse 区分内嵌页还是vc框
    var getWebCltType = function() {
        try {
            return window.external.getWebCltType();
        } catch (e) {
            return 0;
        }
    }

    // 获取guid, 返回字符串
    var getGuid = function() {
        try {
            return window.external.getGuid();
        } catch (e) {
            return generateGUID();
        }
    };

    // 获取精准userid，返回字符串
    var getAccurateUserId = function() {
        try {
            return window.external.getAccurateUserId();
        } catch (e) {
            return null;
        }
    }

    var getUserInfo = function() {
        return {
            guid: getGuid(),
            userid: getAccurateUserId()
        }
    }

    var openIdBrowser = function(href) {
        $('body').append('<a id="barview" style="display:none" href="' + href + '" target="_blank"><span>BarClientView</span></a>');
        document.getElementById('barview').click();
        setTimeout(function() { $('#barview').remove(); }, 500);
    }

    //void openUrlInClt(TCHAR *url, TCHAR *caption, int source_id,int defBrowser)
    //2017-08-28 void openUrlInClt(TCHAR *url, TCHAR *caption, TCHAR *id,  int source_id,int defBrowser);
    var openUrlInClt = function(args) {
        try {
            window.external.openUrlInClt(args.url, base64.encode(args.caption), args.id, 0x03, args.defBrowser);
        } catch (e) {
            openIdBrowser(args.url);
        }
    }

    var startApp = function(appid, srcid) {
        try {
            window.external.startApp(appid, srcid);
        } catch (e) {
            openIdBrowser('BarClientView://-PACKAGE ' + appid);
        }
    }


    var getTheme = function() {
        try {
            return window.external.getSkinStyle();
        } catch (e) {
            return 'default';
        }
    };

    return {
        ReportData: ReportData,
        getGuid: getGuid,
        getAccurateUserId: getAccurateUserId,
        openUrlInClt: openUrlInClt,
        startApp: startApp,
        getUserInfo: getUserInfo,
        getWebCltType: getWebCltType,
        //isNewClient: isNewClient,
        isWWClient: isWWClient,
        getTheme: getTheme
    }
})();

var baseApp = (function() {
    this.isWWClient = false;

    return {
        //迅闪VIP新旧版本判断
        // isNewClient: function() {
        //     return wApp.isNewClient();
        // },
        isClient: function() {
            if (typeof this.isWWClient == 'undefined' ||
                this.isWWClient == null) {
                this.isWWClient = wApp.isWWClient();
            }

            return this.isWWClient;
        },
        init: function(userRequestUrl) {
            if (!wApp.isWWClient()) {
                // 如果是在浏览器打开guid和userid并写到cookie里
                // if (!cookie.get('guid'))
                //     cookie.set("guid", urlInfo.guid);

                // if (!cookie.get('userid'))
                //     cookie.set("userid", urlInfo.userid);

               // if (!urlInfo.guid || !urlInfo.userid) {
                    bApp.init(userRequestUrl);
               // }
            }
        },
        guid: function (callback) {
            if (!cookie.get('guid')) {
                bApp.init('//recommend.swjoy.com/user/match');
            } 
            var _handler = setInterval(function() {
                if (cookie.get('guid')){
                    callback(cookie.get('guid'));
                    clearInterval(_handler);
                }
            }, 100)
        },
        userid: function (callback) {
            var _handler = setInterval(function () {
                if (cookie.get('userid')) {
                    callback(cookie.get('userid'));
                    clearInterval(_handler);
                } else {
                    callback(cookie.get('userid'));
                }     
            }, 100)
        },
        userInfo: function() {
            if (this.isClient()) {
                return wApp.getUserInfo();
            } else {
                return {
                    guid: cookie.get('guid'),
                    userid: cookie.get('userid')
                };
            }
        }
    }
})();