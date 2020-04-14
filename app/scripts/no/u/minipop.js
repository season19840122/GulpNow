(function($){
    baseApp.init('//recommend.swjoy.com/user/match');
    var a ;
    var b = baseApp.guid(function (guid) {
        a =  guid;
        return a;
        
    })
    console.log(b);

    var commonObj = {
        getUrlParam: function (name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        },
        close: function(){
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
                alert(1);
            }
        },
        getUser: {
            guid: baseApp.guid(function (guid) {
                return guid;
            }),
            userid: baseApp.userid(function (userid) {
                return userid;
            })
        }
    };

    var miniObj = {
        showDefault: function(name){
            this.initData(name);
            $('.nav-wrap a[name=' + name + ']').attr('already', true).addClass('active')
                .siblings('a').removeClass('active');
            $('.content>div[name='+ name +']').show().siblings('div').hide();
        },
        initEastday: function (url, callbackName, className) {
            $.ajax({
                url: url,
                type: 'get',
                dataType: 'jsonp',
                jsonp: 'callback',
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
                        for (let [index, value] of data.entries()) {
                            // console.log(index+1);
                            if ((index + 1) >= 1 && (index + 1) <= 3) {
                                list += `
                                    <li>
                                        <a class="pic" target="_blank" href="${value.url +'?qid=01616'}" title="${value.zw}">
                                            <img src="${value.img21}" alt="" />
                                        </a>
                                        <span class="bg">
                                            <a target="_blank" class="txt" href="${value.url + '?qid=01616'}" title="${value.zw}">${value.title}</a>
                                        </span>
                                    </li>
                                    `
                            } else if ((index + 1) >= 7 && (index + 1) <= 11) {
                                listA += `
                                    <a class="item-b" target="_blank" href="${value.url +'?qid=01616'}" title='${value.zw}'>
                                        <span class="${index % 2 === 0 ? 'hot' : ''}"><i></i></span>${value.title}
                                    </a>
                                    `
                            } else if ((index + 1) >= 12 && (index + 1) <= 16) {
                                listB += `
                                    <a class="item-b" target="_blank" href="${value.url +'?qid=01616'}" title='${value.zw}'>
                                        <span class="${index % 2 === 0 ? 'hot' : ''}"><i></i></span>${value.title}
                                    </a>
                                    `
                            } else if ((index + 1) >= 17 && (index + 1) <= 21) {
                                listC += `
                                    <a class="item-b" target="_blank" href="${value.url +'?qid=01616'}" title='${value.zw}'>
                                        <span class="${index % 2 === 0 ? 'hot' : ''}"><i></i></span>${value.title}
                                    </a>
                                    `
                            }
                        }
                        list2 = `
                            <li>
                                <div class="item-wrap">
                                    <a class="item-a" target="_blank" href="${data[3].url}" title='${data[3].zw}'>${data[3].title}</a>
                                    ${listA}
                                    <a class="item-a" target="_blank" href="${data[4].url}" title='${data[4].zw}'>${data[4].title}</a>
                                    ${listB}
                                    <a class="item-a" target="_blank" href="${data[5].url}" title='${data[5].zw}'>${data[5].title}</a>
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

                    $('.' + className).html(`
                        ${list()}
                    `.trim());

                }
            });
        },
        initData: function(name, flag){
            var user = commonObj.getUser;
            // console.log(commonObj.getUser);
            // 只请求一次
            if (flag) return;
            if (name === 'headline') {
                $.ajax({
                    url: `https://recommend.swjoy.com/recommend/getRecommend?content={"account":{"guid":"${user.userid}","userid":"${user.guid}"},"pageSize":100,"curPage":0,"typeIDs":[1,4],"topics": []}`,
                    type: 'get',
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    success: function (json) {
                        let data = json.res;
                        // console.log(data);
                        function list() {
                            let list = '';
                            let list2 = '';
                            let listA = '';
                            let listB = '';
                            let listC = '';
                            for (let [index, value] of data.entries()) {
                                // console.log(index+1);
                                if ((index + 1) >= 1 && (index + 1) <= 3) {
                                    list += `
                                        <li>
                                            <a class="pic" target="_blank" href="${value.material.url}" title="${value.title}">
                                                <img src="${value.material.purl}" alt="" />
                                            </a>
                                            <span class="bg">
                                                <a target="_blank" class="txt" href="${value.material.url}" title="${value.title}">${value.title}</a>
                                            </span>
                                        </li>
                                        `
                                } else if ((index + 1) >= 7 && (index + 1) <= 11) {
                                    listA += `
                                        <a class="item-b" target="_blank" href="${value.material.url}" title='${value.title}'>
                                            <span class="${index % 2 === 0 ? 'hot' : ''}"><i></i></span>${value.title}
                                        </a>
                                        `
                                } else if ((index + 1) >= 12 && (index + 1) <= 16) {
                                    listB += `
                                        <a class="item-b" target="_blank" href="${value.material.url}" title='${value.title}'>
                                            <span class="${index % 2 === 0 ? 'hot' : ''}"><i></i></span>${value.title}
                                        </a>
                                        `
                                } else if ((index + 1) >= 17 && (index + 1) <= 21) {
                                    listC += `
                                        <a class="item-b" target="_blank" href="${value.material.url}" title='${value.title}'>
                                            <span class="${index % 2 === 0 ? 'hot' : ''}"><i></i></span>${value.title}
                                        </a>
                                        `
                                }
                            }
                            list2 = `
                                <li>
                                    <div class="item-wrap">
                                        <a class="item-a" target="_blank" href="${data[3].material.url}" title='${data[3].title}'>${data[3].title}</a>
                                        ${listA}
                                        <a class="item-a" target="_blank" href="${data[4].material.url}" title='${data[4].title}'>${data[4].title}</a>
                                        ${listB}
                                        <a class="item-a" target="_blank" href="${data[5].material.url}" title='${data[5].title}'>${data[5].title}</a>
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

                        $('.headline-wrap').html(`
                            ${list()}
                        `.trim());

                    }
                });
            } else if (name === 'news') {
                this.initEastday('http://mini.eastday.com/apidata/top50jsonp.json', 'top50data', 'news-wrap');
            } else if (name === 'game') {
                $.ajax({
                    url: '../mock/minipop/gameList.json',
                    type: 'get',
                    dataType: 'json',
                    success: function (json) {
                        let data = json.data;
                        function list() {
                            let list = '';
                            let list2 = '';
                            for (let [index, value] of data.entries()) {
                                // console.log(index+1);
                                if ((index + 1) >= 2 && (index + 1) <= 4) {
                                    list += `
                                        <li>
                                            <a class="pic" target="_blank" href="#" title="${value.info}">
                                                <img src="${value.img}" alt="" />
                                            </a>
                                            <a class="txt" target="_blank" href="#" title="${value.info}">${value.info}</a>
                                        </li>
                                        `
                                } else if ((index + 1) > 4) {
                                    list2 += `
                                        <li>
                                            <a class="pic" target="_blank" href="#" title="${value.title}">
                                                <img src="${value.img}" alt="" />
                                            </a>
                                            <span class="bg">
                                                <a target="_blank" class="txt" href="#" title="${value.title}">${value.title}</a>
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

                        $('.game-wrap').html(`
                            <div class="game-left-wrap">
                                <div class="game-a-wrap">
                                    <a class="pic" target="_blank" href="#" title="${data[0].title}">
                                        <img src="${data[0].img}" alt="" />
                                    </a>
                                    <span class="bg">
                                        <a target="_blank" class="txt" href="#" title="${data[0].title}">${data[0].title}</a>
                                    </span>
                                </div>
                                ${list()}
                        `.trim());

                    }
                });
            } else if (name === 'film') {
                $.ajax({
                    url: '../mock/minipop/filmList.json',
                    type: 'get',
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    jsonpCallback: 'film',
                    success: function (json) {
                        let data = json.data;
                        function list() {
                            let list = '';
                            let list2 = '';
                            let className = '';
                            for (let [index, value] of data.entries()) {
                                // console.log(index+1);
                                if ((index + 1) >= 2 && (index + 1) <= 3) {
                                    list += `
                                        <li>
                                            <div class="pic-wrap">
                                                <a class="pic" target="_blank" href="${value.url}" title="${value.title}">
                                                    <img src="${value.img}" alt="" />
                                                </a>
                                                <i class="${value.mode === 0 ? 'mode' : 'modeplus'}"></i>
                                                <div class="tips">
                                                    <span class="watch"><i></i>${value.watchNum}</span>
                                                    <span class="num">${value.episodes}</span>
                                                </div>
                                            </div>
                                            <div class="txt-wrap">
                                                <a class="caption" target="_blank" href="${value.url}" title="${value.title}">
                                                    <h3>${value.title}</h3>
                                                </a>
                                                <a class="txt" target="_blank" href="${value.url}" title="${value.info}">
                                                    <span>${value.info}</span>
                                                </a>
                                            </div>
                                        </li>
                                        `
                                } else if ((index + 1) > 3) {
                                    list2 += `
                                        <li>
                                            <div class="pic-wrap">
                                                <a class="pic" target="_blank" href="${value.url}" title="${value.title}">
                                                    <img src="${value.img}" alt="" />
                                                </a>
                                                <i class="${value.mode === 0 ? 'mode' : 'modeplus'}"></i>
                                                <div class="tips">
                                                    <span class="watch"><i></i>${value.watchNum}</span>
                                                    <span class="num">${value.episodes}</span>
                                                </div>
                                            </div>
                                            <div class="txt-wrap">
                                                <a class="caption" target="_blank" href="${value.url}" title="${value.title}">
                                                    <h3>${value.title}</h3>
                                                </a>
                                                <a class="txt" target="_blank" href="${value.url}" title="${value.info}">
                                                    <span>${value.info}</span>
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

                        $('.film-wrap').html(`
                            <div class="film-left-wrap">
                                <div class="film-a-wrap">
                                    <a class="pic" target="_blank" href="#" title="${data[0].title}">
                                        <img src="${data[0].img}" alt="" />
                                    </a>
                                    <span class="bg">
                                        <a target="_blank" class="txt" href="#" title="${data[0].title}">${data[0].title}</a>
                                    </span>
                                </div>
                                ${list()}
                        `.trim());

                    }
                });
            } else if (name === 'beauty') {
                $.ajax({
                    url: 'http://yangba.syoogame.com/interface/live/spreadLiveList',
                    type: 'get',
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    success: function(json) {
                        let data = json.data;
                        function list() {
                            let list = '';
                            let className = '';
                            for (let [index, value] of data.entries()) {
                                // console.log(index+1);
                                if ((index+1) % 3 === 0) {
                                    className = 'mr0';
                                } else {
                                    className = '';
                                }
                                list += `
                                    <li class="${className}">
                                        <div class="beauty-content">
                                            <a class="pic" target="_blank" href="${value.url.replace('default', 'minipo01')}" title="${value.nickname}">
                                                <img src="${value.programCover}" alt="" />
                                            </a>
                                            <div class="tips">
                                                <span class="user"><i></i>${value.nickname}</span>
                                                <span class="num"><i></i>${value.onlineCount}</span>
                                            </div>
                                            <a class="btn-play" target="_blank" href="${value.url.replace('default', 'minipo01')}" title="${value.nickname}"></a>
                                        </div>
                                    </li>
                                    `
                            }
                            return list;
                        }
                       
                        $('.beauty-wrap').html(`
                            <div class="beauty-content-wrap">
                                <ul>
                                    ${list()}
                                </ul>
                            </div>
                        `.trim());
                        
                    }
                });
            } else if (name === 'live') {
                $.ajax({
                    url: 'http://yangba.syoogame.com/interface/live/spreadGameList',
                    type: 'get',
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    success: function (json) {
                        let data = json.data;
                        function list() {
                            let list = '';
                            let className = '';
                            for (let [index, value] of data.entries()) {
                                // console.log(index + 1);
                                if ((index + 1) % 3 === 0) {
                                    className = 'mr0';
                                } else {
                                    className = '';
                                }
                                list += `
                                    <li class="${className}">
                                        <div class="live-content">
                                            <a class="pic" target="_blank" href="${value.url.replace('default', 'minipo02')}" title="${value.nickname}">
                                                <img src="${value.programCover}" alt="" />
                                            </a>
                                            <div class="tips">
                                                <p>
                                                    <span class="info" title="${value.title}">${value.title}</span>
                                                    <span class="name">${value.gameName}</span>
                                                </p>
                                                <p>
                                                    <span class="user"><i></i>${value.nickname}</span>
                                                    <span class="num"><i></i>${value.onlineCount}</span>
                                                </p>
                                            </div>
                                            <a class="btn-play" target="_blank" href="${value.url.replace('default', 'minipo02')}" title="${value.nickname}"></a>
                                        </div>
                                    </li>
                                    `
                            }
                            return list;
                        }

                        $('.live-wrap').html(`
                            <div class="live-content-wrap">
                                <ul>
                                    ${list()}
                                </ul>
                            </div>
                        `.trim());

                    }
                });
            } else if (name === 'shopping') {
                $.ajax({
                    url: '../mock/minipop/shoppingList.json',
                    type: 'get',
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    jsonpCallback: 'shopping',
                    success: function (json) {
                        let data = json.data;
                        function list() {
                            let list = '';
                            let list2 = '';
                            let className = '';
                            for (let [index, value] of data.entries()) {
                                // console.log(index+1);
                                if ((index + 1) >= 2 && (index + 1) <= 3) {
                                    list += `
                                        <li>
                                            <a class="pic" target="_blank" href="${value.url}" title="${value.info}">
                                                <img src="${value.img}" alt="" />
                                            </a>
                                            <a class="txt" target="_blank" href="${value.url}" title="${value.info}">${value.info}</a>
                                        </li>
                                        `
                                } else if ((index + 1) > 3) {
                                    list2 += `
                                        <li>
                                            <a class="pic" target="_blank" href="${value.url}" title="${value.info}">
                                                <img src="${value.img}" alt="" />
                                            </a>
                                            <a class="txt" target="_blank" href="${value.url}" title="${value.info}">${value.info}</a>
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

                        $('.shopping-content-wrap').html(`
                            <div class="shopping-left-wrap">
                                <div class="shopping-a-wrap">
                                    <a class="pic" target="_blank" href="${data[0].url}" title="${data[0].title}">
                                        <img src="${data[0].img}" alt="" />
                                    </a>
                                    <span class="bg">
                                        <a target="_blank" class="txt" href="${data[0].url}" title="${data[0].title}">${data[0].title}</a>
                                    </span>
                                </div>
                                ${list()}
                        `.trim());

                    }
                });
            } else if (name === 'shortvideo') {
                $.ajax({
                    url: 'https://recommend.swjoy.com/recommend/getRecommend?content={"account":{"guid":"9b4927bb00003812000043c01af070b7","userid":"112233445566"},"pageSize":100,"curPage":0,"typeIDs":[5],"topics": []}',
                    type: 'get',
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    success: function (json) {
                        let data = json.res;
                        // console.log(data);
                        function list() {
                            let list = '';
                            for (let [index, value] of data.entries()) {
                                // console.log(index+1);
                                if ((index + 1) <= 9) {
                                    list += `
                                        <li>
                                            <div class="shortvideo-content">
                                                <a class="pic" target="_blank" href="${value.material.url}" title="${value.title}">
                                                    <img src="${value.material.purl}" alt="" />
                                                </a>
                                                <span class="bg">
                                                    <a target="_blank" class="txt" href="${value.material.url}" title="${value.title}">${value.title}</a>
                                                </span>
                                                <a class="btn-play" target="_blank" href="${value.material.url}" title="${value.title}"></a>
                                            </div>
                                        </li>
                                        `
                                }
                            }
                            return list;
                        }

                        $('.shortvideo-wrap').html(`
                            <div class="shortvideo-content-wrap">
                                <ul>
                                    ${list()}
                                </ul>
                            </div>
                        `.trim());
                    }
                });
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
                    // 默认初始化加载 headline 和 news 数据
                    // this.initData('headline');
                    // $('.nav-wrap a[name=headline]').attr('already', true);
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
            $('body').on('click', '.btn-close', function() {
                commonObj.close();
            });
        }
    };

    // 初始化
    miniObj.init();
    

})(jQuery);