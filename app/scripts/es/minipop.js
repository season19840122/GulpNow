(function($){
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
        showDefault: function(name){
            this.initData(name);
            $('.nav-wrap a[name=' + name + ']').attr('already', true).addClass('active')
                .siblings('a').removeClass('active');
            $('.content>div[name='+ name +']').show().siblings('div').hide();
        },
        initEastday: function (url, callbackName, className) {
            commonObj.ajax({
                url: url,
                type: 'get',
                dataType: 'jsonp',
                jsonpCallback: callbackName,
                success: function (json) {
                    let data = json.data;
                    // console.log(data);
                    function list() {
                        let list = '';
                        let list2 = '';
                        let listA = '';
                        let listB = '';
                        let listC = '';
                        let className = '';
                        // for (let [index, value] of data.entries()) {
                        for (var index in data) {
                            // console.log(index + ":" + typeof(index));
                            index = parseInt(index);
                            if ((index + 1) >= 1 && (index + 1) <= 3) {
                                list += `
                                    <li>
                                        <a data-num="${index + 1}" class="pic" target="_blank" href="${data[index].url +'?qid=01616'}" title="${data[index].zw}">
                                            <img src="${data[index].img21}" alt="" />
                                        </a>
                                        <span class="bg">
                                            <a data-num="${index + 1}" target="_blank" class="txt" href="${data[index].url + '?qid=01616'}" title="${data[index].zw}">${data[index].title}</a>
                                        </span>
                                    </li>
                                    `
                            } else if ((index + 1) >= 7 && (index + 1) <= 11) {
                                listA += `
                                    <a data-num="${index + 1}" class="item-b" target="_blank" href="${data[index].url +'?qid=01616'}" title='${data[index].zw}'>
                                        <span class="${index % 2 === 0 ? 'hot' : ''}"><i></i></span>${data[index].title}
                                    </a>
                                    `
                            } else if ((index + 1) >= 12 && (index + 1) <= 16) {
                                listB += `
                                    <a data-num="${index + 1}" class="item-b" target="_blank" href="${data[index].url +'?qid=01616'}" title='${data[index].zw}'>
                                        <span class="${index % 2 === 0 ? 'hot' : ''}"><i></i></span>${data[index].title}
                                    </a>
                                    `
                            } else if ((index + 1) >= 17 && (index + 1) <= 21) {
                                listC += `
                                    <a data-num="${index + 1}" class="item-b" target="_blank" href="${data[index].url +'?qid=01616'}" title='${data[index].zw}'>
                                        <span class="${index % 2 === 0 ? 'hot' : ''}"><i></i></span>${data[index].title}
                                    </a>
                                    `
                            }
                        }
                        list2 = `
                            <li>
                                <div class="item-wrap">
                                    <a data-num="4" class="item-a" target="_blank" href="${data[3].url + '?qid=01616'}" title='${data[3].zw}'>${data[3].title}</a>
                                    ${listA}
                                    <a data-num="5" class="item-a" target="_blank" href="${data[4].url + '?qid=01616'}" title='${data[4].zw}'>${data[4].title}</a>
                                    ${listB}
                                    <a data-num="6" class="item-a" target="_blank" href="${data[5].url + '?qid=01616'}" title='${data[5].zw}'>${data[5].title}</a>
                                    ${listC}
                                </div>
                            </li>
                            `;

                        list = `
                            <div class="headline-left-wrap">
                                <div class="headline-a-wrap">
                                    <ul>
                                        ${list}
                                    </ul>
                                </div>
                            </div>
                            <div class="headline-center-wrap">
                                <div class="headline-b-wrap">
                                    <ul>
                                        ${list2}
                                    </ul>
                                </div>
                            </div>
                            
                            `
                        return list;
                    }

                    $('.' + className).html($.trim(`
                        ${list()}
                    `));

                }
            });
        },
        initData: function(name, flag){
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
                let data = [];
                var request = function (pages, guid, userid) {
                    commonObj.ajax({
                        url: `https://recommend.swjoy.com/recommend/getRecommend?content={"siteid":3,"account":{"guid":"${guid}","userid":"${userid}"},"pageSize":100,"curPage":${pages},"typeIDs":[1,4],"topics": []}`,
                        type: 'get',
                        dataType: 'jsonp',
                        jsonp: 'callback',
                        success: function (json) {
                            data = data.concat(json.res).unique('id');
                            // console.log(data);
                            if (data.length < 21) {
                                request(pages + 1);
                            } else {
                                function list() {
                                    let list = '';
                                    let list2 = '';
                                    let listA = '';
                                    let listB = '';
                                    let listC = '';
                                    // for (let [index, value] of data.entries()) {
                                    for (var index in data) {
                                        index = parseInt(index);
                                        // console.log(index+1);
                                        if ((index + 1) >= 1 && (index + 1) <= 3) {
                                            list += `
                                                <li data-id="${data[index].id}" data-rsrc="${data[index].rsrc}">
                                                    <a data-num="${index + 1}" class="pic" target="_blank" href="${data[index].material.url}" title="${data[index].title}">
                                                        <img src="${data[index].material.purl}" alt="" />
                                                    </a>
                                                    <span class="bg">
                                                        <a data-num="${index + 1}" target="_blank" class="txt" href="${data[index].material.url}" title="${data[index].title}">${data[index].title}</a>
                                                    </span>
                                                </li>
                                                `
                                        } else if ((index + 1) >= 7 && (index + 1) <= 11) {
                                            listA += `
                                                <a data-id="${data[index].id}" data-rsrc="${data[index].rsrc}" data-num="${index + 1}" class="item-b" target="_blank" href="${data[index].material.url}" title='${data[index].title}'>
                                                    <span class="${index % 2 === 0 ? 'hot' : ''}"><i></i></span>${data[index].title}
                                                </a>
                                                `
                                        } else if ((index + 1) >= 12 && (index + 1) <= 16) {
                                            listB += `
                                                <a data-id="${data[index].id}" data-rsrc="${data[index].rsrc}" data-num="${index + 1}" class="item-b" target="_blank" href="${data[index].material.url}" title='${data[index].title}'>
                                                    <span class="${index % 2 === 0 ? 'hot' : ''}"><i></i></span>${data[index].title}
                                                </a>
                                                `
                                        } else if ((index + 1) >= 17 && (index + 1) <= 21) {
                                            listC += `
                                                <a data-id="${data[index].id}" data-rsrc="${data[index].rsrc}" data-num="${index + 1}" class="item-b" target="_blank" href="${data[index].material.url}" title='${data[index].title}'>
                                                    <span class="${index % 2 === 0 ? 'hot' : ''}"><i></i></span>${data[index].title}
                                                </a>
                                                `
                                        }
                                    }
                                    list2 = `
                                        <li>
                                            <div class="item-wrap">
                                                <a data-id="${data[3].id}" data-rsrc="${data[3].rsrc}" data-num="4" class="item-a" target="_blank" href="${data[3].material.url}" title='${data[3].title}'>${data[3].title}</a>
                                                ${listA}
                                                <a data-id="${data[4].id}" data-rsrc="${data[4].rsrc}" data-num="5" class="item-a" target="_blank" href="${data[4].material.url}" title='${data[4].title}'>${data[4].title}</a>
                                                ${listB}
                                                <a data-id="${data[5].id}" data-rsrc="${data[5].rsrc}" data-num="6" class="item-a" target="_blank" href="${data[5].material.url}" title='${data[5].title}'>${data[5].title}</a>
                                                ${listC}
                                            </div>
                                        </li>
                                        `;

                                    list = `
                                        <div class="headline-left-wrap">
                                            <div class="headline-a-wrap">
                                                <ul>
                                                    ${list}
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="headline-center-wrap">
                                            <div class="headline-b-wrap">
                                                <ul>
                                                    ${list2}
                                                </ul>
                                            </div>
                                        </div>
                                        
                                        `
                                    return list;
                                }

                                $('.headline-wrap').html($.trim(`
                                    ${list()}
                                `));
                                listReport(1);
                            }
                        }
                    });
                }
            } else if (name === 'news') {
                this.initEastday('http://mini.eastday.com/apidata/top50jsonp.json', 'top50data', 'news-wrap');
            } else if (name === 'game') {
                commonObj.ajax({
                    url: '../mock/minipop/gameList.json',
                    type: 'get',
                    dataType: 'json',
                    success: function (json) {
                        let data = json.data;
                        function list() {
                            let list = '';
                            let list2 = '';
                            // for (let [index, value] of data.entries()) {
                            for (var index in data) {
                                index = parseInt(index);
                                // console.log(index+1);
                                if ((index + 1) >= 2 && (index + 1) <= 4) {
                                    list += `
                                        <li>
                                            <a data-num="${index + 1}" class="pic" target="_blank" href="${data[index].url}" title="${data[index].info}">
                                                <img src="${data[index].img}" alt="" />
                                            </a>
                                            <a data-num="${index + 1}" class="txt" target="_blank" href="${data[index].url}" title="${data[index].info}">${data[index].info}</a>
                                        </li>
                                        `
                                } else if ((index + 1) > 4) {
                                    list2 += `
                                        <li>
                                            <a data-num="${index + 1}" class="pic" target="_blank" href="${data[index].url}" title="${data[index].title}">
                                                <img src="${data[index].img}" alt="" />
                                            </a>
                                            <span class="bg">
                                                <a data-num="${index + 1}" target="_blank" class="txt" href="${data[index].url}" title="${data[index].title}">${data[index].title}</a>
                                            </span>
                                        </li>
                                        `
                                }
                            }
                            list = `
                                <div class="game-c-wrap">
                                    <ul>
                                        ${list}
                                    </ul>
                                </div>
                            </div>
                                <div class="game-center-wrap">
                                    <div class="game-b-wrap">
                                        <ul>
                                            ${list2}
                                        </ul>
                                    </div>
                                </div>
                            
                                `
                            return list;
                        }

                        $('.game-wrap').html($.trim(`
                            <div class="game-left-wrap">
                                <div class="game-a-wrap">
                                    <a data-num="1" class="pic" target="_blank" href="${data[0].url}" title="${data[0].title}">
                                        <img src="${data[0].img}" alt="" />
                                    </a>
                                    <span class="bg">
                                        <a data-num="1" target="_blank" class="txt" href="${data[0].url}" title="${data[0].title}">${data[0].title}</a>
                                    </span>
                                </div>
                                ${list()}
                        `));

                    }
                });
            } else if (name === 'film') {
                commonObj.ajax({
                    url: '../mock/minipop/filmList.json',
                    type: 'get',
                    dataType: 'jsonp',
                    jsonpCallback: 'film',
                    success: function (json) {
                        let data = json.data;
                        function list() {
                            let list = '';
                            let list2 = '';
                            let className = '';
                            // for (let [index, value] of data.entries()) {
                            for (var index in data) {
                                index = parseInt(index);
                                // console.log(index+1);
                                if ((index + 1) >= 2 && (index + 1) <= 3) {
                                    list += `
                                        <li>
                                            <div class="pic-wrap">
                                                <a data-num="${index + 1}" class="pic" target="_blank" href="${data[index].url}" title="${data[index].title}">
                                                    <img src="${data[index].img}" alt="" />
                                                </a>
                                                <i class="${data[index].mode === 0 ? 'mode' : 'modeplus'}"></i>
                                                <div class="tips">
                                                    <span class="watch"><i></i>${data[index].watchNum}</span>
                                                    <span class="num">${data[index].episodes}</span>
                                                </div>
                                            </div>
                                            <div class="txt-wrap">
                                                <a data-num="${index + 1}" class="caption" target="_blank" href="${data[index].url}" title="${data[index].title}">
                                                    <h3>${data[index].title}</h3>
                                                </a>
                                                <a data-num="${index + 1}" class="txt" target="_blank" href="${data[index].url}" title="${data[index].info}">
                                                    <span>${data[index].info}</span>
                                                </a>
                                            </div>
                                        </li>
                                        `
                                } else if ((index + 1) > 3) {
                                    list2 += `
                                        <li>
                                            <div class="pic-wrap">
                                                <a data-num="${index + 1}" class="pic" target="_blank" href="${data[index].url}" title="${data[index].title}">
                                                    <img src="${data[index].img}" alt="" />
                                                </a>
                                                <i class="${data[index].mode === 0 ? 'mode' : 'modeplus'}"></i>
                                                <div class="tips">
                                                    <span class="watch"><i></i>${data[index].watchNum}</span>
                                                    <span class="num">${data[index].episodes}</span>
                                                </div>
                                            </div>
                                            <div class="txt-wrap">
                                                <a data-num="${index + 1}" class="caption" target="_blank" href="${data[index].url}" title="${data[index].title}">
                                                    <h3>${data[index].title}</h3>
                                                </a>
                                                <a data-num="${index + 1}" class="txt" target="_blank" href="${data[index].url}" title="${data[index].info}">
                                                    <span>${data[index].info}</span>
                                                </a>
                                            </div>
                                        </li>
                                        `
                                }
                            }
                            list = `
                                <div class="film-b-wrap">
                                    <ul>
                                        ${list}
                                    </ul>
                                </div>
                            </div>
                                <div class="film-center-wrap">
                                    <div class="film-b-wrap">
                                        <ul>
                                            ${list2}
                                        </ul>
                                    </div>
                                </div>
                            
                                `
                            return list;
                        }

                        $('.film-wrap').html($.trim(`
                            <div class="film-left-wrap">
                                <div class="film-a-wrap">
                                    <a data-num="1" class="pic" target="_blank" href="${data[0].url}" title="${data[0].title}">
                                        <img src="${data[0].img}" alt="" />
                                    </a>
                                    <span class="bg">
                                        <a data-num="1" target="_blank" class="txt" href="${data[0].url}" title="${data[0].title}">${data[0].title}</a>
                                    </span>
                                </div>
                                ${list()}
                        `));

                    }
                });
            } else if (name === 'beauty') {
                commonObj.ajax({
                    url: 'http://yangba.syoogame.com/interface/live/spreadLiveList',
                    type: 'get',
                    dataType: 'jsonp',
                    success: function(json) {
                        let data = json.data;
                        function list() {
                            let list = '';
                            let className = '';
                            // for (let [index, value] of data.entries()) {
                            for (var index in data) {
                                if(index === "unique") break;
                                index = parseInt(index);
                                // console.log(index+1);
                                if ((index+1) % 3 === 0) {
                                    className = 'mr0';
                                } else {
                                    className = '';
                                }
                                list += `
                                    <li class="${className}">
                                        <div class="beauty-content">
                                            <a data-num="${index + 1}" class="pic" target="_blank" href="${data[index].url.replace('default', 'minipo01')}" title="${data[index].nickname}">
                                                <img src="${data[index].programCover}" alt="" />
                                            </a>
                                            <div class="tips">
                                                <span class="user"><i></i>${data[index].nickname}</span>
                                                <span class="num"><i></i>${data[index].onlineCount}</span>
                                            </div>
                                            <a data-num="${index + 1}" class="btn-play" target="_blank" href="${data[index].url.replace('default', 'minipo01')}" title="${data[index].nickname}"></a>
                                        </div>
                                    </li>
                                    `
                            }
                            return list;
                        }
                       
                        $('.beauty-wrap').html($.trim(`
                            <div class="beauty-content-wrap">
                                <ul>
                                    ${list()}
                                </ul>
                            </div>
                        `));
                        
                    }
                });
            } else if (name === 'live') {
                commonObj.ajax({
                    url: 'http://yangba.syoogame.com/interface/live/spreadGameList',
                    type: 'get',
                    dataType: 'jsonp',
                    success: function (json) {
                        let data = json.data;
                        function list() {
                            let list = '';
                            let className = '';
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
                                list += `
                                    <li class="${className}">
                                        <div class="live-content">
                                            <a data-num="${index + 1}" class="pic" target="_blank" href="${data[index].url.replace('default', 'minipo02')}" title="${data[index].nickname}">
                                                <img src="${data[index].programCover}" alt="" />
                                            </a>
                                            <div class="tips">
                                                <p>
                                                    <span class="info" title="${data[index].title}">${data[index].title}</span>
                                                    <span class="name">${data[index].gameName}</span>
                                                </p>
                                                <p>
                                                    <span class="user"><i></i>${data[index].nickname}</span>
                                                    <span class="num"><i></i>${data[index].onlineCount}</span>
                                                </p>
                                            </div>
                                            <a data-num="${index + 1}" class="btn-play" target="_blank" href="${data[index].url.replace('default', 'minipo02')}" title="${data[index].nickname}"></a>
                                        </div>
                                    </li>
                                    `
                            }
                            return list;
                        }

                        $('.live-wrap').html($.trim(`
                            <div class="live-content-wrap">
                                <ul>
                                    ${list()}
                                </ul>
                            </div>
                        `));

                    }
                });
            } else if (name === 'shopping') {
                commonObj.ajax({
                    url: '../mock/minipop/shoppingList.json',
                    type: 'get',
                    dataType: 'jsonp',
                    jsonpCallback: 'shopping',
                    success: function (json) {
                        let data = json.data;
                        function list() {
                            let list = '';
                            let list2 = '';
                            let className = '';
                            // for (let [index, value] of data.entries()) {
                            for (var index in data) {
                                index = parseInt(index);
                                // console.log(index+1);
                                if ((index + 1) >= 2 && (index + 1) <= 4) {
                                    list += `
                                        <li>
                                            <a data-num="${index + 1}" class="pic" target="_blank" href="${data[index].url}" title="${data[index].info}">
                                                <img src="${data[index].img}" alt="" />
                                            </a>
                                            <a data-num="${index + 1}" class="txt" target="_blank" href="${data[index].url}" title="${data[index].info}">${data[index].info}</a>
                                        </li>
                                        `
                                } else if ((index + 1) > 4) {
                                    list2 += `
                                        <li>
                                            <a data-num="${index + 1}" class="pic" target="_blank" href="${data[index].url}" title="${data[index].info}">
                                                <img src="${data[index].img}" alt="" />
                                            </a>
                                            <a data-num="${index + 1}" class="txt" target="_blank" href="${data[index].url}" title="${data[index].info}">${data[index].info}</a>
                                        </li>
                                        `
                                }
                            }
                            list = `
                                    <div class="shopping-b-wrap">
                                        <ul>
                                            ${list}
                                        </ul>
                                    </div>
                                </div>
                                <div class="shopping-center-wrap">
                                    <div class="shopping-c-wrap">
                                        <ul>
                                            ${list2}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            `
                            return list;
                        }

                        $('.shopping-content-wrap').html($.trim(`
                            <div class="shopping-left-wrap">
                                <div class="shopping-a-wrap">
                                    <a data-num="1" class="pic" target="_blank" href="${data[0].url}" title="${data[0].title}">
                                        <img src="${data[0].img}" alt="" />
                                    </a>
                                    <span class="bg">
                                        <a data-num="1" target="_blank" class="txt" href="${data[0].url}" title="${data[0].title}">${data[0].title}</a>
                                    </span>
                                </div>
                                ${list()}
                        `));

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
                let data = [];
                var request = function (pages, guid, userid) {
                    commonObj.ajax({
                        url: `https://recommend.swjoy.com/recommend/getRecommend?content={"siteid":3,"account":{"guid":"${guid}","userid":"${userid}"},"pageSize":100,"curPage":${pages},"typeIDs":[5],"topics": []}`,
                        // url: `../mock/minipop/xsvipList.json`,
                        // jsonpCallback: 'xs',
                        type: 'get',
                        dataType: 'jsonp',
                        success: function (json) {
                            data = data.concat(json.res).unique('id');
                            // data = data.concat(json.res).unique();
                            // console.log(data);
                            if(data.length < 9) {
                                request(pages + 1);
                            } else {
                                function list() {
                                    let list = '';
                                    for (var index in data) {
                                        index = parseInt(index);
                                        // console.log(index+1);
                                        if ((index + 1) <= 9) {
                                            list += `
                                                    <li data-id="${data[index].id}" data-rsrc="${data[index].rsrc}" class="${(index + 1) % 3 === 0 ? 'mr0' : ''}">
                                                        <div class="shortvideo-content">
                                                            <a data-num="${index + 1}" class="pic" target="_blank" href="${data[index].material.url + '&qid=01665'}" title="${data[index].title}">
                                                                <img src="${data[index].material.purl}" alt="" />
                                                            </a>
                                                            <span class="bg">
                                                                <a data-num="${index + 1}" target="_blank" class="txt" href="${data[index].material.url + '&qid=01665'}" title="${data[index].title}">${data[index].title}</a>
                                                            </span>
                                                            <a data-num="${index + 1}" class="btn-play" target="_blank" href="${data[index].material.url + '&qid=01665'}" title="${data[index].title}"></a>
                                                        </div>
                                                    </li>
                                                    `
                                        }
                                    }
                                    return list;
                                }

                                $('.shortvideo-wrap').html($.trim(`
                                    <div class="shortvideo-content-wrap">
                                        <ul>
                                            ${list()}
                                        </ul>
                                    </div>
                                `));
                                listReport(0);
                            }
                        }
                    })
                    
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
        init: function(){
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
            $('body').on('mouseenter', '.nav-wrap a', function(){
                miniObj.initData($(this).attr('name'), $(this).attr('already')); 
                $(this).attr('already', true);   
                $(this).addClass('active')
                .siblings('a').removeClass('active');
                var index = $(this).index();
                $('.content>div').eq(index).show()
                .siblings('div').hide();
            });

            // 短视频、美女、直播移入效果
            $('body').on('mouseenter', '.shortvideo-content-wrap li, .beauty-content-wrap li, .live-content-wrap li', function () {
                $(this).find('.btn-play').show();
            }).on('mouseleave', '.shortvideo-content-wrap li, .beauty-content-wrap li, .live-content-wrap li', function() {
                $(this).find('.btn-play').hide();
            });

            // 窗体关闭按钮
            $('body').on('click', '#ButtonHtmlClose', function() {
                commonObj.close();
            });
        }
    };

    // 初始化
    miniObj.init();
    
})(jQuery);
