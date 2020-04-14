'use strict';

(function () {
    /**
     * 公共方法
     */

    // 数组删除索引为元素
    Array.prototype.remove = function (from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };

    // 查询对象数组 key 的所在对象的索引
    Array.prototype.findArrayIndex = function (predicateFunction) {
        var length = this == null ? 0 : this.length;
        if (!length) {
            return -1;
        }
        var index = -1;
        for (var i = 0; i < this.length; ++i) {
            if (predicateFunction(this[i])) {
                index = i;
                break;
            }
        }
        return index;
    };

    var commonObj = {
        getUrlParam: function getUrlParam(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);return null; //返回参数值
        },
        ajax: function ajax(options) {
            $.ajax({
                url: options.url,
                data: options.data || {},
                type: options.type || 'get',
                dataType: options.dataType || 'json',
                jsonp: options.jsonp, // 不传默认就是 callback
                jsonpCallback: options.jsonpCallback, //不传默认就是 jQuery 随机名字
                beforeSend: options.beforeSend || function () {
                    // $(".content-wrap").css('background', 'url(../images/minipop/loading.gif) no-repeat center');
                },
                complete: options.complete || function () {
                    // $(".content-wrap").css('background', 'none');
                },
                success: options.success || function (data) {
                    // if (data.code != 200) {
                    //     alert(data.err_msg);
                    // } else {
                    //     // 返回数据不是 200 错误的情况
                    //     successFn(data.data);
                    // }
                },
                error: options.error || function (err) {
                    // 采用 layer 加载层的话可以关闭
                    // layer.closeAll('loading');
                    layer.msg(err);
                    /*  setTimeout(function () {
                         if (data.status == 404) {
                             layer.msg('请求失败，请求未找到');
                         } else if (data.status == 503) {
                             layer.msg('请求失败，服务器内部错误');
                         } else {
                             layer.msg('请求失败，网络连接超时');
                         }
                     }, 500); */
                }
            });
        },
        promise: function promise(options) {
            var deferred = $.Deferred();
            $.ajax({
                url: options.url,
                data: options.data || {},
                type: options.type || 'get',
                dataType: options.dataType || 'json',
                jsonp: options.jsonp, // 不传默认就是 callback
                jsonpCallback: options.jsonpCallback, //不传默认就是 jQuery 随机名字
                beforeSend: options.beforeSend || function () {
                    $(".content-wrap").css('background', 'url(../images/minipop/loading.gif) no-repeat center');
                },
                complete: options.complete || function () {
                    $(".content-wrap").css('background', 'none');
                },
                success: function success(data) {
                    // if (data.code != 200) {
                    //     deferred.reject(data.err_msg);
                    // } else {
                    deferred.resolve(data);
                    // }
                },
                error: function error(err) {
                    // 采用 layer 加载层的话可以关闭
                    // layer.closeAll('loading');
                    deferred.reject(err);
                    /*  setTimeout(function () {
                         if (data.status == 404) {
                             deferred.reject('请求失败，请求未找到');
                         } else if (data.status == 503) {
                             deferred.reject('请求失败，服务器内部错误');
                         } else {
                             deferred.reject('请求失败，网络连接超时');
                         }
                     }, 500); */
                }
            });

            return deferred.promise();
        }
    };
    window.commonObj = commonObj;

    // 业务逻辑
    var app = new Vue({
        el: "#box",
        data: {
            navMenu: [{ name: '常用网站', categroy: 'common' }, { name: '产品中心', categroy: 'pro' }, { name: '游戏业务', categroy: 'game' }, { name: '广告业务', categroy: 'ad' }, { name: '增值业务', categroy: 'inc' }],
            active: 'common',
            commonList: [],
            navList: {}
        },
        mounted: function mounted() {
            // 加载 LocalStorage
            if (localStorage.getItem('commonList') !== 'undefined') {
                this.commonList = JSON.parse(localStorage.getItem('commonList'));
            }

            // 填充 JSON 数据
            commonObj.ajax({
                url: '../mock/nav/navList.json',
                dataType: 'jsonp',
                jsonpCallback: 'nav',
                success: function success(json) {
                    // console.log(json.data);
                    app.navList = json.data;
                }
            });

            // 卸载前操作 LocalStorage
            $(window).on('beforeunload', function () {
                localStorage.setItem('commonList', JSON.stringify(app.commonList));
            });

            // 锚点跳转特效
            $('[href="#nav-common"]').on("click", function (e) {
                e.preventDefault();
                $.scrollTo($("#nav-common").offset().top, 800);
            });
            $('[href="#nav-pro"]').on("click", function (e) {
                e.preventDefault();
                $.scrollTo($("#nav-pro").offset().top, 800);
            });
            $('[href="#nav-game"]').on("click", function (e) {
                e.preventDefault();
                $.scrollTo($("#nav-game").offset().top, 800);
            });
            $('[href="#nav-ad"]').on("click", function (e) {
                e.preventDefault();
                $.scrollTo($("#nav-ad").offset().top, 800);
            });
            $('[href="#nav-inc"]').on("click", function (e) {
                e.preventDefault();
                $.scrollTo($("#nav-inc").offset().top, 800);
            });

            // 滚动监听
            var spy = new ScrollSpy('.nav-ul', {
                nav: 'a',
                className: 'on'
            });
        },
        methods: {
            selected: function selected(categroy) {
                this.active = categroy;
            },
            addCommon: function addCommon(item) {
                var ico = '';
                if (item.id.indexOf('pro') != -1) {
                    ico = 'pro';
                } else if (item.id.indexOf('game') != -1) {
                    ico = 'game';
                } else if (item.id.indexOf('ad') != -1) {
                    ico = 'ad';
                } else if (item.id.indexOf('inc') != -1) {
                    ico = 'inc';
                }
                item['icon'] = ico;
                var common = this.commonList || [];
                // var index = _.findIndex(common, (v) => {
                var index = common.findArrayIndex(function (v) {
                    return v.id == item.id;
                });
                if (index !== -1) {
                    common.remove(index);
                }
                if (common.length > 11) {
                    common.pop();
                }
                common.unshift(item);
                this.commonList = common;
            } /* ,
              filters: {
                 unescape: function (html) {
                     return html
                         .replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
                         .replace(/&lt;/g, "<")
                         .replace(/&gt;/g, ">")
                         .replace(/&quot;/g, "\"")
                         .replace(/&#39;/g, "\'");
                 }
              } */
        } });
    // window.app = app;
})();