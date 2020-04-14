(function(w){
    // 数组通过 key 去重
    Array.prototype.unique = function (key) {
        var arr = this;
        var n = [arr[0]];
        for (var i = 1; i < arr.length; i++) {
            if (key === undefined) {
                if (n.indexOf(arr[i]) == -1) n.push(arr[i]);
            } else {
                inner: {
                    var has = false;
                    for (var j = 0; j < n.length; j++) {
                        if (arr[i][key] == n[j][key]) {
                            has = true;
                            break inner;
                        }
                    }
                }
                if (!has) {
                    n.push(arr[i]);
                }
            }
        }
        return n;
    }

   /*  Array.prototype.unique = function () {
        let unique = {};
        var arr = this;
        arr.forEach(function (item) {
            unique[JSON.stringify(item)] = item;//键名不会重复
        })
        arr = Object.keys(unique).map(function (u) {
            //Object.keys()返回对象的所有键值组成的数组，map方法是一个遍历方法，返回遍历结果组成的数组.将unique对象的键名还原成对象数组
            return JSON.parse(u);
        })
        return arr;
    } */
    

    var commonObj = {
        getUrlParam: function (name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        },
        ajax: function (options) {
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
                success: options.success || function (data) {
                    if (data.code != 200) {
                        alert(data.err_msg);
                    } else {
                        // 返回数据不是 200 错误的情况
                        // successFn(data.data);
                    }
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
        promise: function (options) {
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
                success: function (data) {
                    // if (data.code != 200) {
                    //     deferred.reject(data.err_msg);
                    // } else {
                    deferred.resolve(data);
                    // }
                },
                error: function (err) {
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
        },
        close: function () {
            function fnIsOurCustomBrowser() {
                if (window.external.CB_IsOurCustomBrowser != null) {
                    return true;
                } else {
                    return false;
                }
            }
            var bIsCustomBrowser = fnIsOurCustomBrowser();
            if (bIsCustomBrowser) {
                window.external.CB_Close();
                // alert(1);
            }
        },
        searchBaidu: {
            el: $('.baidu-search-wrap'),
            bindSearch: function () {
                // console.log(this);
                var _this = this;

                $('body').on('click', '#btn-search', function (e) {
                    var keyword = encodeURI(_this.el.find('.txt-search').val()),
                        pid = '06074089_75_pg',
                        url = '';

                    if (keyword) {
                        window.open('https://www.baidu.com/s?tn=' + pid + '&ie=utf-8&word=' + keyword, '_target');
                    } else {
                        window.open('https://www.baidu.com/?tn=' + pid, '_target');
                    }
                    e.preventDefault();
                    czcObj.getStatistics.title_button_click();
                });
            },
            bind: function () {
                var _this = this;
                this.el.find('.txt-search').on('keyup keydown', function (e) {
                    if (e.keyCode === 13) {
                        e.preventDefault();
                        $('#btn-search').trigger('click');
                    }
                });
            },
            init: function () {
                this.bindSearch();
                this.bind();
                // this.get();
            }
        }
    };
    w.commonObj = commonObj;
    
})(window);