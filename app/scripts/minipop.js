'use strict';

(function ($) {
    baseApp.init('//recommend.swjoy.com/user/match');

    // baseApp.guid(function (guid) {
    //     var userid = cookie.get('userid') || '';
    //     request(0, guid, userid);
    // });
    // let data = [];
    // var request = function (pages, guid, userid) {
    //     commonObj.promise({
    //         url: `https://recommend.swjoy.com/recommend/getRecommend?content={"account":{"guid":"${guid}","userid":"${userid}"},"pageSize":100,"curPage":${pages},"typeIDs":[5],"topics": []}`,
    //         // url: `../mock/minipop/xsvipList.json`,
    //         // jsonpCallback: 'xs',
    //         type: 'get',
    //         dataType: 'jsonp',
    //         jsonp: 'callback'
    //     }).done(function (data) {
    //         console.log(data);
    //         data = data.concat(data.res).unique('id');
    //         if (data.length < 9) {
    //             request(pages + 1);
    //         } else {
    //             // console.log(data);
    //             function list() {
    //                 let list = '';
    //                 for (var index in data) {
    //                     index = parseInt(index);
    //                     // console.log(index+1);
    //                     if ((index + 1) <= 9) {
    //                         list += `
    //                             <li class="${(index + 1) % 3 === 0 ? 'mr0' : ''}">
    //                                 <div class="shortvideo-content">
    //                                     <a class="pic" target="_blank" href="${data[index].material.url + '&qid=01665'}" title="${data[index].title}">
    //                                         <img src="${data[index].material.purl}" alt="" />
    //                                     </a>
    //                                     <span class="bg">
    //                                         <a target="_blank" class="txt" href="${data[index].material.url + '&qid=01665'}" title="${data[index].title}">${data[index].title}</a>
    //                                     </span>
    //                                     <a class="btn-play" target="_blank" href="${data[index].material.url + '&qid=01665'}" title="${data[index].title}"></a>
    //                                 </div>
    //                             </li>
    //                             `
    //                     }
    //                 }
    //                 return list;
    //             }

    //             $('.shortvideo-wrap').html($.trim(`
    //                     <div class="shortvideo-content-wrap">
    //                         <ul>
    //                             ${list()}
    //                         </ul>
    //                     </div>
    //                 `));
    //         }
    //     })
    // };

    var miniObj = {
        showDefault: function showDefault(name) {
            this.initData(name);
            $('.nav-wrap a[name=' + name + ']').attr('already', true).addClass('active').siblings('a').removeClass('active');
            $('.content>div[name=' + name + ']').show().siblings('div').hide();
        },
        initEastday: function initEastday(url, callbackName, className) {
            commonObj.ajax({
                url: url,
                type: 'get',
                dataType: 'jsonp',
                jsonpCallback: callbackName,
                success: function success(json) {
                    var data = json.data;
                    // console.log(data);
                    function list() {
                        var list = '';
                        var list2 = '';
                        var listA = '';
                        var listB = '';
                        var listC = '';
                        var className = '';
                        // for (let [index, value] of data.entries()) {
                        for (var index in data) {
                            // console.log(index + ":" + typeof(index));
                            index = parseInt(index);
                            if (index + 1 >= 1 && index + 1 <= 3) {
                                list += '\n                                    <li>\n                                        <a data-num="' + (index + 1) + '" class="pic" target="_blank" href="' + (data[index].url + '?qid=01616') + '" title="' + data[index].zw + '">\n                                            <img src="' + data[index].img21 + '" alt="" />\n                                        </a>\n                                        <span class="bg">\n                                            <a data-num="' + (index + 1) + '" target="_blank" class="txt" href="' + (data[index].url + '?qid=01616') + '" title="' + data[index].zw + '">' + data[index].title + '</a>\n                                        </span>\n                                    </li>\n                                    ';
                            } else if (index + 1 >= 7 && index + 1 <= 11) {
                                listA += '\n                                    <a data-num="' + (index + 1) + '" class="item-b" target="_blank" href="' + (data[index].url + '?qid=01616') + '" title=\'' + data[index].zw + '\'>\n                                        <span class="' + (index % 2 === 0 ? 'hot' : '') + '"><i></i></span>' + data[index].title + '\n                                    </a>\n                                    ';
                            } else if (index + 1 >= 12 && index + 1 <= 16) {
                                listB += '\n                                    <a data-num="' + (index + 1) + '" class="item-b" target="_blank" href="' + (data[index].url + '?qid=01616') + '" title=\'' + data[index].zw + '\'>\n                                        <span class="' + (index % 2 === 0 ? 'hot' : '') + '"><i></i></span>' + data[index].title + '\n                                    </a>\n                                    ';
                            } else if (index + 1 >= 17 && index + 1 <= 21) {
                                listC += '\n                                    <a data-num="' + (index + 1) + '" class="item-b" target="_blank" href="' + (data[index].url + '?qid=01616') + '" title=\'' + data[index].zw + '\'>\n                                        <span class="' + (index % 2 === 0 ? 'hot' : '') + '"><i></i></span>' + data[index].title + '\n                                    </a>\n                                    ';
                            }
                        }
                        list2 = '\n                            <li>\n                                <div class="item-wrap">\n                                    <a data-num="4" class="item-a" target="_blank" href="' + (data[3].url + '?qid=01616') + '" title=\'' + data[3].zw + '\'>' + data[3].title + '</a>\n                                    ' + listA + '\n                                    <a data-num="5" class="item-a" target="_blank" href="' + (data[4].url + '?qid=01616') + '" title=\'' + data[4].zw + '\'>' + data[4].title + '</a>\n                                    ' + listB + '\n                                    <a data-num="6" class="item-a" target="_blank" href="' + (data[5].url + '?qid=01616') + '" title=\'' + data[5].zw + '\'>' + data[5].title + '</a>\n                                    ' + listC + '\n                                </div>\n                            </li>\n                            ';

                        list = '\n                            <div class="headline-left-wrap">\n                                <div class="headline-a-wrap">\n                                    <ul>\n                                        ' + list + '\n                                    </ul>\n                                </div>\n                            </div>\n                            <div class="headline-center-wrap">\n                                <div class="headline-b-wrap">\n                                    <ul>\n                                        ' + list2 + '\n                                    </ul>\n                                </div>\n                            </div>\n                            \n                            ';
                        return list;
                    }

                    $('.' + className).html($.trim('\n                        ' + list() + '\n                    '));
                }
            });
        },
        initData: function initData(name, flag) {
            var user = commonObj.getUser;
            // console.log(commonObj.getUser);
            // 只请求一次
            if (flag) return;
            if (name === 'headline') {
                baseApp.guid(function (guid) {
                    var userid = cookie.get('userid') || '';
                    // console.log(`guid: ${guid}`);
                    // console.log(`userid: ${userid}`);
                    request(0, guid, userid);
                    // baseApp.userid(function (userid) {
                    //     var userid = cookie.get('userid') || '';
                    //     console.log(`guid: ${guid}`);
                    //     console.log(`userid: ${userid}`);
                    //     request(0, guid, userid);
                    // });
                });
                var data = [];
                var request = function request(pages, guid, userid) {
                    commonObj.ajax({
                        url: 'https://recommend.swjoy.com/recommend/getRecommend?content={"siteid":3,"account":{"guid":"' + guid + '","userid":"' + userid + '"},"pageSize":100,"curPage":' + pages + ',"typeIDs":[1,4],"topics": []}',
                        type: 'get',
                        dataType: 'jsonp',
                        jsonp: 'callback',
                        success: function success(json) {
                            data = data.concat(json.res).unique('id');
                            // console.log(data);
                            if (data.length < 21) {
                                request(pages + 1);
                            } else {
                                var list = function list() {
                                    var list = '';
                                    var list2 = '';
                                    var listA = '';
                                    var listB = '';
                                    var listC = '';
                                    // for (let [index, value] of data.entries()) {
                                    for (var index in data) {
                                        index = parseInt(index);
                                        // console.log(index+1);
                                        if (index + 1 >= 1 && index + 1 <= 3) {
                                            list += '\n                                                <li data-id="' + data[index].id + '" data-rsrc="' + data[index].rsrc + '">\n                                                    <a data-num="' + (index + 1) + '" class="pic" target="_blank" href="' + data[index].material.url + '" title="' + data[index].title + '">\n                                                        <img src="' + data[index].material.purl + '" alt="" />\n                                                    </a>\n                                                    <span class="bg">\n                                                        <a data-num="' + (index + 1) + '" target="_blank" class="txt" href="' + data[index].material.url + '" title="' + data[index].title + '">' + data[index].title + '</a>\n                                                    </span>\n                                                </li>\n                                                ';
                                        } else if (index + 1 >= 7 && index + 1 <= 11) {
                                            listA += '\n                                                <a data-id="' + data[index].id + '" data-rsrc="' + data[index].rsrc + '" data-num="' + (index + 1) + '" class="item-b" target="_blank" href="' + data[index].material.url + '" title=\'' + data[index].title + '\'>\n                                                    <span class="' + (index % 2 === 0 ? 'hot' : '') + '"><i></i></span>' + data[index].title + '\n                                                </a>\n                                                ';
                                        } else if (index + 1 >= 12 && index + 1 <= 16) {
                                            listB += '\n                                                <a data-id="' + data[index].id + '" data-rsrc="' + data[index].rsrc + '" data-num="' + (index + 1) + '" class="item-b" target="_blank" href="' + data[index].material.url + '" title=\'' + data[index].title + '\'>\n                                                    <span class="' + (index % 2 === 0 ? 'hot' : '') + '"><i></i></span>' + data[index].title + '\n                                                </a>\n                                                ';
                                        } else if (index + 1 >= 17 && index + 1 <= 21) {
                                            listC += '\n                                                <a data-id="' + data[index].id + '" data-rsrc="' + data[index].rsrc + '" data-num="' + (index + 1) + '" class="item-b" target="_blank" href="' + data[index].material.url + '" title=\'' + data[index].title + '\'>\n                                                    <span class="' + (index % 2 === 0 ? 'hot' : '') + '"><i></i></span>' + data[index].title + '\n                                                </a>\n                                                ';
                                        }
                                    }
                                    list2 = '\n                                        <li>\n                                            <div class="item-wrap">\n                                                <a data-id="' + data[3].id + '" data-rsrc="' + data[3].rsrc + '" data-num="4" class="item-a" target="_blank" href="' + data[3].material.url + '" title=\'' + data[3].title + '\'>' + data[3].title + '</a>\n                                                ' + listA + '\n                                                <a data-id="' + data[4].id + '" data-rsrc="' + data[4].rsrc + '" data-num="5" class="item-a" target="_blank" href="' + data[4].material.url + '" title=\'' + data[4].title + '\'>' + data[4].title + '</a>\n                                                ' + listB + '\n                                                <a data-id="' + data[5].id + '" data-rsrc="' + data[5].rsrc + '" data-num="6" class="item-a" target="_blank" href="' + data[5].material.url + '" title=\'' + data[5].title + '\'>' + data[5].title + '</a>\n                                                ' + listC + '\n                                            </div>\n                                        </li>\n                                        ';

                                    list = '\n                                        <div class="headline-left-wrap">\n                                            <div class="headline-a-wrap">\n                                                <ul>\n                                                    ' + list + '\n                                                </ul>\n                                            </div>\n                                        </div>\n                                        <div class="headline-center-wrap">\n                                            <div class="headline-b-wrap">\n                                                <ul>\n                                                    ' + list2 + '\n                                                </ul>\n                                            </div>\n                                        </div>\n                                        \n                                        ';
                                    return list;
                                };

                                $('.headline-wrap').html($.trim('\n                                    ' + list() + '\n                                '));
                                listReport(1);
                            }
                        }
                    });
                };
            } else if (name === 'news') {
                this.initEastday('http://mini.eastday.com/apidata/top50jsonp.json', 'top50data', 'news-wrap');
            } else if (name === 'game') {
                commonObj.ajax({
                    url: '../mock/minipop/gameList.json',
                    type: 'get',
                    dataType: 'json',
                    success: function success(json) {
                        var data = json.data;
                        function list() {
                            var list = '';
                            var list2 = '';
                            // for (let [index, value] of data.entries()) {
                            for (var index in data) {
                                index = parseInt(index);
                                // console.log(index+1);
                                if (index + 1 >= 2 && index + 1 <= 4) {
                                    list += '\n                                        <li>\n                                            <a data-num="' + (index + 1) + '" class="pic" target="_blank" href="' + data[index].url + '" title="' + data[index].info + '">\n                                                <img src="' + data[index].img + '" alt="" />\n                                            </a>\n                                            <a data-num="' + (index + 1) + '" class="txt" target="_blank" href="' + data[index].url + '" title="' + data[index].info + '">' + data[index].info + '</a>\n                                        </li>\n                                        ';
                                } else if (index + 1 > 4) {
                                    list2 += '\n                                        <li>\n                                            <a data-num="' + (index + 1) + '" class="pic" target="_blank" href="' + data[index].url + '" title="' + data[index].title + '">\n                                                <img src="' + data[index].img + '" alt="" />\n                                            </a>\n                                            <span class="bg">\n                                                <a data-num="' + (index + 1) + '" target="_blank" class="txt" href="' + data[index].url + '" title="' + data[index].title + '">' + data[index].title + '</a>\n                                            </span>\n                                        </li>\n                                        ';
                                }
                            }
                            list = '\n                                <div class="game-c-wrap">\n                                    <ul>\n                                        ' + list + '\n                                    </ul>\n                                </div>\n                            </div>\n                                <div class="game-center-wrap">\n                                    <div class="game-b-wrap">\n                                        <ul>\n                                            ' + list2 + '\n                                        </ul>\n                                    </div>\n                                </div>\n                            \n                                ';
                            return list;
                        }

                        $('.game-wrap').html($.trim('\n                            <div class="game-left-wrap">\n                                <div class="game-a-wrap">\n                                    <a data-num="1" class="pic" target="_blank" href="' + data[0].url + '" title="' + data[0].title + '">\n                                        <img src="' + data[0].img + '" alt="" />\n                                    </a>\n                                    <span class="bg">\n                                        <a data-num="1" target="_blank" class="txt" href="' + data[0].url + '" title="' + data[0].title + '">' + data[0].title + '</a>\n                                    </span>\n                                </div>\n                                ' + list() + '\n                        '));
                    }
                });
            } else if (name === 'film') {
                commonObj.ajax({
                    url: '../mock/minipop/filmList.json',
                    type: 'get',
                    dataType: 'jsonp',
                    jsonpCallback: 'film',
                    success: function success(json) {
                        var data = json.data;
                        function list() {
                            var list = '';
                            var list2 = '';
                            var className = '';
                            // for (let [index, value] of data.entries()) {
                            for (var index in data) {
                                index = parseInt(index);
                                // console.log(index+1);
                                if (index + 1 >= 2 && index + 1 <= 3) {
                                    list += '\n                                        <li>\n                                            <div class="pic-wrap">\n                                                <a data-num="' + (index + 1) + '" class="pic" target="_blank" href="' + data[index].url + '" title="' + data[index].title + '">\n                                                    <img src="' + data[index].img + '" alt="" />\n                                                </a>\n                                                <i class="' + (data[index].mode === 0 ? 'mode' : 'modeplus') + '"></i>\n                                                <div class="tips">\n                                                    <span class="watch"><i></i>' + data[index].watchNum + '</span>\n                                                    <span class="num">' + data[index].episodes + '</span>\n                                                </div>\n                                            </div>\n                                            <div class="txt-wrap">\n                                                <a data-num="' + (index + 1) + '" class="caption" target="_blank" href="' + data[index].url + '" title="' + data[index].title + '">\n                                                    <h3>' + data[index].title + '</h3>\n                                                </a>\n                                                <a data-num="' + (index + 1) + '" class="txt" target="_blank" href="' + data[index].url + '" title="' + data[index].info + '">\n                                                    <span>' + data[index].info + '</span>\n                                                </a>\n                                            </div>\n                                        </li>\n                                        ';
                                } else if (index + 1 > 3) {
                                    list2 += '\n                                        <li>\n                                            <div class="pic-wrap">\n                                                <a data-num="' + (index + 1) + '" class="pic" target="_blank" href="' + data[index].url + '" title="' + data[index].title + '">\n                                                    <img src="' + data[index].img + '" alt="" />\n                                                </a>\n                                                <i class="' + (data[index].mode === 0 ? 'mode' : 'modeplus') + '"></i>\n                                                <div class="tips">\n                                                    <span class="watch"><i></i>' + data[index].watchNum + '</span>\n                                                    <span class="num">' + data[index].episodes + '</span>\n                                                </div>\n                                            </div>\n                                            <div class="txt-wrap">\n                                                <a data-num="' + (index + 1) + '" class="caption" target="_blank" href="' + data[index].url + '" title="' + data[index].title + '">\n                                                    <h3>' + data[index].title + '</h3>\n                                                </a>\n                                                <a data-num="' + (index + 1) + '" class="txt" target="_blank" href="' + data[index].url + '" title="' + data[index].info + '">\n                                                    <span>' + data[index].info + '</span>\n                                                </a>\n                                            </div>\n                                        </li>\n                                        ';
                                }
                            }
                            list = '\n                                <div class="film-b-wrap">\n                                    <ul>\n                                        ' + list + '\n                                    </ul>\n                                </div>\n                            </div>\n                                <div class="film-center-wrap">\n                                    <div class="film-b-wrap">\n                                        <ul>\n                                            ' + list2 + '\n                                        </ul>\n                                    </div>\n                                </div>\n                            \n                                ';
                            return list;
                        }

                        $('.film-wrap').html($.trim('\n                            <div class="film-left-wrap">\n                                <div class="film-a-wrap">\n                                    <a data-num="1" class="pic" target="_blank" href="' + data[0].url + '" title="' + data[0].title + '">\n                                        <img src="' + data[0].img + '" alt="" />\n                                    </a>\n                                    <span class="bg">\n                                        <a data-num="1" target="_blank" class="txt" href="' + data[0].url + '" title="' + data[0].title + '">' + data[0].title + '</a>\n                                    </span>\n                                </div>\n                                ' + list() + '\n                        '));
                    }
                });
            } else if (name === 'beauty') {
                commonObj.ajax({
                    url: 'http://yangba.syoogame.com/interface/live/spreadLiveList',
                    type: 'get',
                    dataType: 'jsonp',
                    success: function success(json) {
                        var data = json.data;
                        function list() {
                            var list = '';
                            var className = '';
                            // for (let [index, value] of data.entries()) {
                            for (var index in data) {
                                if (index === "unique") break;
                                index = parseInt(index);
                                // console.log(index+1);
                                if ((index + 1) % 3 === 0) {
                                    className = 'mr0';
                                } else {
                                    className = '';
                                }
                                list += '\n                                    <li class="' + className + '">\n                                        <div class="beauty-content">\n                                            <a data-num="' + (index + 1) + '" class="pic" target="_blank" href="' + data[index].url.replace('default', 'minipo01') + '" title="' + data[index].nickname + '">\n                                                <img src="' + data[index].programCover + '" alt="" />\n                                            </a>\n                                            <div class="tips">\n                                                <span class="user"><i></i>' + data[index].nickname + '</span>\n                                                <span class="num"><i></i>' + data[index].onlineCount + '</span>\n                                            </div>\n                                            <a data-num="' + (index + 1) + '" class="btn-play" target="_blank" href="' + data[index].url.replace('default', 'minipo01') + '" title="' + data[index].nickname + '"></a>\n                                        </div>\n                                    </li>\n                                    ';
                            }
                            return list;
                        }

                        $('.beauty-wrap').html($.trim('\n                            <div class="beauty-content-wrap">\n                                <ul>\n                                    ' + list() + '\n                                </ul>\n                            </div>\n                        '));
                    }
                });
            } else if (name === 'live') {
                commonObj.ajax({
                    url: 'http://yangba.syoogame.com/interface/live/spreadGameList',
                    type: 'get',
                    dataType: 'jsonp',
                    success: function success(json) {
                        var data = json.data;
                        function list() {
                            var list = '';
                            var className = '';
                            // for (let [index, value] of data.entries()) {
                            for (var index in data) {
                                if (index === "unique") break;
                                index = parseInt(index);
                                // console.log(index + 1);
                                if ((index + 1) % 3 === 0) {
                                    className = 'mr0';
                                } else {
                                    className = '';
                                }
                                list += '\n                                    <li class="' + className + '">\n                                        <div class="live-content">\n                                            <a data-num="' + (index + 1) + '" class="pic" target="_blank" href="' + data[index].url.replace('default', 'minipo02') + '" title="' + data[index].nickname + '">\n                                                <img src="' + data[index].programCover + '" alt="" />\n                                            </a>\n                                            <div class="tips">\n                                                <p>\n                                                    <span class="info" title="' + data[index].title + '">' + data[index].title + '</span>\n                                                    <span class="name">' + data[index].gameName + '</span>\n                                                </p>\n                                                <p>\n                                                    <span class="user"><i></i>' + data[index].nickname + '</span>\n                                                    <span class="num"><i></i>' + data[index].onlineCount + '</span>\n                                                </p>\n                                            </div>\n                                            <a data-num="' + (index + 1) + '" class="btn-play" target="_blank" href="' + data[index].url.replace('default', 'minipo02') + '" title="' + data[index].nickname + '"></a>\n                                        </div>\n                                    </li>\n                                    ';
                            }
                            return list;
                        }

                        $('.live-wrap').html($.trim('\n                            <div class="live-content-wrap">\n                                <ul>\n                                    ' + list() + '\n                                </ul>\n                            </div>\n                        '));
                    }
                });
            } else if (name === 'shopping') {
                commonObj.ajax({
                    url: '../mock/minipop/shoppingList.json',
                    type: 'get',
                    dataType: 'jsonp',
                    jsonpCallback: 'shopping',
                    success: function success(json) {
                        var data = json.data;
                        function list() {
                            var list = '';
                            var list2 = '';
                            var className = '';
                            // for (let [index, value] of data.entries()) {
                            for (var index in data) {
                                index = parseInt(index);
                                // console.log(index+1);
                                if (index + 1 >= 2 && index + 1 <= 4) {
                                    list += '\n                                        <li>\n                                            <a data-num="' + (index + 1) + '" class="pic" target="_blank" href="' + data[index].url + '" title="' + data[index].info + '">\n                                                <img src="' + data[index].img + '" alt="" />\n                                            </a>\n                                            <a data-num="' + (index + 1) + '" class="txt" target="_blank" href="' + data[index].url + '" title="' + data[index].info + '">' + data[index].info + '</a>\n                                        </li>\n                                        ';
                                } else if (index + 1 > 4) {
                                    list2 += '\n                                        <li>\n                                            <a data-num="' + (index + 1) + '" class="pic" target="_blank" href="' + data[index].url + '" title="' + data[index].info + '">\n                                                <img src="' + data[index].img + '" alt="" />\n                                            </a>\n                                            <a data-num="' + (index + 1) + '" class="txt" target="_blank" href="' + data[index].url + '" title="' + data[index].info + '">' + data[index].info + '</a>\n                                        </li>\n                                        ';
                                }
                            }
                            list = '\n                                    <div class="shopping-b-wrap">\n                                        <ul>\n                                            ' + list + '\n                                        </ul>\n                                    </div>\n                                </div>\n                                <div class="shopping-center-wrap">\n                                    <div class="shopping-c-wrap">\n                                        <ul>\n                                            ' + list2 + '\n                                        </ul>\n                                    </div>\n                                </div>\n                            </div>\n                            \n                            ';
                            return list;
                        }

                        $('.shopping-content-wrap').html($.trim('\n                            <div class="shopping-left-wrap">\n                                <div class="shopping-a-wrap">\n                                    <a data-num="1" class="pic" target="_blank" href="' + data[0].url + '" title="' + data[0].title + '">\n                                        <img src="' + data[0].img + '" alt="" />\n                                    </a>\n                                    <span class="bg">\n                                        <a data-num="1" target="_blank" class="txt" href="' + data[0].url + '" title="' + data[0].title + '">' + data[0].title + '</a>\n                                    </span>\n                                </div>\n                                ' + list() + '\n                        '));
                    }
                });
            } else if (name === 'shortvideo') {
                baseApp.guid(function (guid) {
                    var userid = cookie.get('userid') || '';
                    // console.log(`guid: ${guid}`);
                    // console.log(`userid: ${userid}`);
                    request(0, guid, userid);
                    // baseApp.userid(function (userid) {
                    //     var userid = cookie.get('userid') || '';
                    //     console.log(`guid: ${guid}`);
                    //     console.log(`userid: ${userid}`);
                    //     request(0, guid, userid);
                    // });
                });
                var _data = [];
                var request = function request(pages, guid, userid) {
                    commonObj.ajax({
                        url: 'https://recommend.swjoy.com/recommend/getRecommend?content={"siteid":3,"account":{"guid":"' + guid + '","userid":"' + userid + '"},"pageSize":100,"curPage":' + pages + ',"typeIDs":[5],"topics": []}',
                        // url: `../mock/minipop/xsvipList.json`,
                        // jsonpCallback: 'xs',
                        type: 'get',
                        dataType: 'jsonp',
                        success: function success(json) {
                            _data = _data.concat(json.res).unique('id');
                            // data = data.concat(json.res).unique();
                            // console.log(data);
                            if (_data.length < 9) {
                                request(pages + 1);
                            } else {
                                var list = function list() {
                                    var list = '';
                                    for (var index in _data) {
                                        index = parseInt(index);
                                        // console.log(index+1);
                                        if (index + 1 <= 9) {
                                            list += '\n                                                    <li data-id="' + _data[index].id + '" data-rsrc="' + _data[index].rsrc + '" class="' + ((index + 1) % 3 === 0 ? 'mr0' : '') + '">\n                                                        <div class="shortvideo-content">\n                                                            <a data-num="' + (index + 1) + '" class="pic" target="_blank" href="' + (_data[index].material.url + '&qid=01665') + '" title="' + _data[index].title + '">\n                                                                <img src="' + _data[index].material.purl + '" alt="" />\n                                                            </a>\n                                                            <span class="bg">\n                                                                <a data-num="' + (index + 1) + '" target="_blank" class="txt" href="' + (_data[index].material.url + '&qid=01665') + '" title="' + _data[index].title + '">' + _data[index].title + '</a>\n                                                            </span>\n                                                            <a data-num="' + (index + 1) + '" class="btn-play" target="_blank" href="' + (_data[index].material.url + '&qid=01665') + '" title="' + _data[index].title + '"></a>\n                                                        </div>\n                                                    </li>\n                                                    ';
                                        }
                                    }
                                    return list;
                                };

                                $('.shortvideo-wrap').html($.trim('\n                                    <div class="shortvideo-content-wrap">\n                                        <ul>\n                                            ' + list() + '\n                                        </ul>\n                                    </div>\n                                '));
                                listReport(0);
                            }
                        }
                    });
                };
            } else if (name === 'entertainment') {
                this.initEastday('http://mini.eastday.com/apidata/top20yulejsonp.json', 'yule', 'entertainment-wrap');
            } else if (name === 'military') {
                this.initEastday('http://mini.eastday.com/apidata/top20junshijsonp.json', 'junshi', 'military-wrap');
            } else if (name === 'sports') {
                this.initEastday('http://mini.eastday.com/apidata/top20tiyujsonp.json', 'tiyu', 'sports-wrap');
            } else if (name === 'joke') {
                this.initEastday('http://mini.eastday.com/apidata/top20xiaohuajsonp.json', 'xiaohua', 'joke-wrap');
            }
        },
        init: function init() {
            // 初始化获取 user 对象
            var user = commonObj.getUser;
            // 初始化百度搜索
            commonObj.searchBaidu.init();
            // console.log(user.guid);
            // 判断默认页
            var name = commonObj.getUrlParam('name');
            // console.log(name);
            switch (name) {
                case 'headline':
                    this.showDefault('headline');
                    break;
                case 'news':
                    this.showDefault('news');
                    break;
                case 'game':
                    this.showDefault('game');
                    break;
                case 'film':
                    this.showDefault('film');
                    break;
                case 'beauty':
                    this.showDefault('beauty');
                    break;
                case 'live':
                    this.showDefault('live');
                    break;
                case 'shopping':
                    this.showDefault('shopping');
                    break;
                case 'shortvideo':
                    this.showDefault('shortvideo');
                    break;
                case 'entertainment':
                    this.showDefault('entertainment');
                    break;
                case 'military':
                    this.showDefault('military');
                    break;
                case 'sports':
                    this.showDefault('sports');
                    break;
                case 'joke':
                    this.showDefault('joke');
                    break;
                default:
                    // 默认初始化加载 headline，现在暂时不用迅闪 VIP 接口
                    // this.initData('headline');
                    // $('.nav-wrap a[name=headline]').attr('already', true);
                    // 默认初始化加载 news
                    this.initData('news');
                    $('.nav-wrap a[name=news]').attr('already', true);
                    break;
            }

            // Menu 移入效果
            $('body').on('mouseenter', '.nav-wrap a', function () {
                miniObj.initData($(this).attr('name'), $(this).attr('already'));
                $(this).attr('already', true);
                $(this).addClass('active').siblings('a').removeClass('active');
                var index = $(this).index();
                $('.content>div').eq(index).show().siblings('div').hide();
            });

            // 短视频、美女、直播移入效果
            $('body').on('mouseenter', '.shortvideo-content-wrap li, .beauty-content-wrap li, .live-content-wrap li', function () {
                $(this).find('.btn-play').show();
            }).on('mouseleave', '.shortvideo-content-wrap li, .beauty-content-wrap li, .live-content-wrap li', function () {
                $(this).find('.btn-play').hide();
            });

            // 窗体关闭按钮
            $('body').on('click', '#ButtonHtmlClose', function () {
                commonObj.close();
            });
        }
    };

    // 初始化
    miniObj.init();
})(jQuery);