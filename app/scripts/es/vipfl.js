/*tab切换*/
function tab(p, t, d) {
  var parent = $(p),
      tabTitle = parent.find(t);
  tabTitle.click(function(e) {
      e.stopPropagation();
      var n = tabTitle.index($(this));
      $(this).addClass("curr").siblings().removeClass("curr");
      parent.find(d).eq(n).show().siblings().hide();
  });
}
//显示错误消息
function toolTipMsgShow(id,msg){
  toolTipMsgDestroy(id);
  $(id).show();
  $(id).tooltip({
      title: msg,
      trigger: '',
  }).tooltip('show');
}

//销毁错误消息
function toolTipMsgDestroy(id){
  $(id).tooltip({
      title: ""
  }).tooltip('destroy');
}
$(function(){
  $("input").placeholder();

  /*登录注册框切换*/
  $('#btn_login_sw').click(function(){
      $('#loginDialog').modal('show');
  })
  $("#loginDialog .swGame-modal-title").on("click", function () {
      var i = $(this).index();
      $(this).addClass("swGame-curr").siblings().removeClass("swGame-curr");
      $("#loginDialog .swGame-modal-bd").eq(i).show().siblings().hide();
  });

  /*点击选择游戏弹出全部游戏列表*/
  $('.sel-game').on('click',function () {
     var $this=$(this),
         $filter=$this.find('.select-game'),
         $qf=$('#selServe'),
         $roleName=$('.roleName'),
         isServeHide=$qf.hasClass('hide'),
         isHide=$filter.hasClass('hide');
      $this.addClass('on');
      !isServeHide && $qf.addClass('hide'),
      !isServeHide && $roleName.addClass('hide');
      !isServeHide && $('.sel-roleName').addClass('hide');
      $filter.removeClass('hide');
      return false;
  });

  //切换游戏列表
  tab(".sel-game",".heads li", ".bodys");
  //切换区服列表
  tab(".sel-serve",".heads li", ".bodys");

  //选中摸个游戏后，显示区服
  $('.sel-game .select-dropMenu').on('click', '.bodys li', function(e) {
      var $this = $(this),
          $parent = $('.sel-game'),
          $input = $parent.find('input'),
          $filter = $parent.find('.select-dropMenu'),
          _val = $this.find('.name').text(),
          $qf = $('.sel-serve'),
          $qfFilter = $qf.find('.select-dropMenu'),
          isHidden = $qf.hasClass('hide');
      //选择游戏加载效果
      //$('#serverLoading').removeClass('hide');
      $input.val(_val);
      if (isHidden) {
          $filter.addClass('hide');
          $qf.removeClass('hide');
          $qfFilter.removeClass('hide');
          $parent.removeClass('on');
          $qf.addClass('on')
      } else {
          $qfFilter.addClass('hide');
      }
      return false;
  });

  //点击区服，显示全部区服列表
  $('.sel-serve').on('click', function(e) {
      var $this = $(this),
          $filterKeys = $this.find('.select-dropMenu'),
          $roleName=$('.roleName');
      $filterKeys.removeClass('hide');
      $roleName.addClass('hide');
      $this.addClass('on');
      $('.sel-roleName').addClass('hide');
      e.stopPropagation();
  });

  //选中某个区服后，显示角色名
  $('.sel-serve .select-dropMenu').on('click', '.bodys li', function(e) {
      //显示filter-keys
      var $this = $(this),
          $parent = $('.sel-serve'),
          $filterKeys = $parent.find('.select-dropMenu'),
          _val = $this.find('.name').text(),
          $input = $parent.find('input'),
          $isRoleMul = true,
          $roleNameSingle = $('.roleName'),
          $roleNameMul = $('.sel-roleName'),
          $roleInput = $roleNameMul.find('input');
      $input.val(_val);
      $filterKeys.addClass('hide');
      $parent.removeClass('on');
      if($isRoleMul){
          $roleNameSingle.addClass('hide');
          $roleNameMul.removeClass('hide');
          $roleInput.val('角色1')
      }else{
          $roleNameSingle.removeClass('hide');
          $roleNameMul.addClass('hide');
      }
      return false;
  });

  //选择充值金额
  $('.money-wrap li').on('click',function () {
      $(this).addClass('on').siblings().removeClass('on');
  });

  /*下拉框*/
  $('.input-filter').on('click',function(e){
      $(this).addClass('on').siblings().removeClass('on').find('.filter-wrap').addClass('hide');
      $(this).find('.filter-wrap').removeClass('hide');
      e.stopPropagation();
  });

  $('.filter-wrap').on('click', '.filter-list li', function(e) {
      e.stopPropagation();
      var $this = $(this),
          $wrap=$this.parents('.filter-wrap'),
          $parent = $wrap.parent('.select-wrap'),
          _val = $this.text(),
          $input = $parent.find('input');
      $this.addClass('on').siblings().removeClass('on');
      $input.val(_val);
      $wrap.addClass('hide');
      $parent.removeClass('on');
      return false;
  });
  $('.filter-list li').hover(function () {
      $(this).addClass('on').siblings().removeClass('on');
  })

  // 点击空白处隐藏下拉框
  $(document).click(function() {
      $('.select-dropMenu').addClass('hide');
      $('.filter-wrap').addClass('hide').parent('.select-wrap').removeClass('on');
  });

  //提示
  var $val = $('.sel-game input').val();
  if($val==''){
      toolTipMsgShow('#selGame','请选择游戏')
  }else{
      toolTipMsgDestroy('#selGame')
  }
})



$(function () {
  //modal 调用
  var GLOBAL = {
    show: function($obj) {
        // $obj.fadeIn(200);
        // $('.masklayer').fadeIn(200);
        $obj.show();
        $('.masklayer').show();
    },
    hide: function($obj) {
        // $obj.fadeOut(200);
        // $('.masklayer').fadeOut(200);
        $obj.hide();
        $('.masklayer').hide();
    }
  }

  $("body").on("click", ".masklayer, .btn-back, .btn-close", function(event) {
    event.preventDefault();
    GLOBAL.hide($(".dialog-wrap, .modal"));
  });
  
  $("body").on("click", ".button-wrap button", function(event) {
    event.preventDefault();
    var index = $(this).index();
    GLOBAL.show($(".dialog-wrap").eq(index));
  });

  $("body").on("click", "#ljcz", function(event) {
    event.preventDefault();
    GLOBAL.show($(".dialog2"));
  });

  $("body").on("click", "#record", function(event) {
    event.preventDefault();
    GLOBAL.show($(".dialog1"));
  });

  $("body").on("click", "#confirm", function(event) {
    event.preventDefault();
    GLOBAL.show($(".dialog3"));
  });

  /*
   * 头部登录注册
   */
  $("#loginDialog .swGame-modal-title").on("click", function () {
      var i = $(this).index();
      $(this).addClass("swGame-curr").siblings().removeClass("swGame-curr");
      $("#loginDialog .swGame-modal-bd").eq(i).show().siblings().hide();
  });

  if($('#loginDialog').length>0){
      $('#btn_reg,#pageRegBtn').click(function () {
          $('#loginDialog').modal('show');
          $("#loginDialog .swGame-modal-title").eq(1).trigger("click");
      })
      $('#btn_login_sw, #pageLoginBtn, .warn').click(function () {
          $('#loginDialog').modal('show');
          $("#loginDialog .swGame-modal-title").eq(0).trigger("click");
      })
  }else{
      $('#btn_reg').click(function () {
          $("#btn_reg").attr("href","http://passport.kedou.com/front/noLogin/goRegist2_front.htm?memberType=1&amp;amp;returnCode=emailOrMobile&amp;amp;site_id=game_web");
          $("#btn_reg").attr("target","_blank");
      })
  }
  $('#btn-login_qq').on('click', function() {
      $('#btn_login_sw').trigger('click');
  })
  
  // 微信登录弹窗
  $('#showWxModalBtn').on('click', function() {
      var iframeUrl = "https://sso.swjoy.com/front/sso/youxi_page_t1/weixinLogin?width=600&height=400&top=0&left=0";
      var modal = $('#loginWxModal');
      
      showOtherModal(modal, iframeUrl);
  })
  
  // QQ登录弹窗
  $('#showQqModalBtn').on('click', function() {
      var iframeUrl = "https://sso.swjoy.com/front/sso/youxi_page_t1/qqLogin?width=600&height=460&top=0&left=0";
      var modal = $('#loginQqModal');
      
      showOtherModal(modal, iframeUrl);
  })
  
  // 微博登录弹窗
  $('#showWbModalBtn').on('click', function() {
      var iframeUrl = "https://sso.swjoy.com/front/sso/youxi_page_t1/weiboLogin?width=600&height=460&top=0&left=0";
      var modal = $('#loginWbModal');
      
      showOtherModal(modal, iframeUrl);
  })
  
  /****
   * 当弹出多个弹窗时，后面弹出的modal和遮罩层要将上一个盖住
   * 除头部以外的弹窗对用户可见时触发
   **/
  $(document).on('shown.bs.modal', '.modal', function (event) {  
      var initZIndex = 1050;              //modal层的初始z-index
      var initMaskZIndex = 1040;          //遮罩层modal-backdrop的初始z-index
      var visibleLen = $('.modal:visible').length;        //已显示的modal层个数
      if(visibleLen > 1) {
          var zIndex = initZIndex + (10 * (visibleLen - 1));
          var zIndexMask = initMaskZIndex + 1 + (10 * (visibleLen - 1));
          $(this).css('z-index', zIndex);
          var mask = $('.modal-backdrop.in');
          var len = $('.modal.in').length;
          mask.eq(len-1).css('z-index', zIndexMask);
      } else {
          $('.modal.in').css('z-index', initZIndex);
          $('.modal-backdrop.in').css('z-index', initMaskZIndex);
      }
  });
  

  // 弹出第三方登录弹窗
  function showOtherModal(modal, iframeUrl) {
    if(!modal.find('iframe').attr('src') || modal.find('iframe').attr('src') == '') {
        modal.find('iframe').attr('src', iframeUrl);
    }
    modal.modal('show');
  }

  $('.qrcode').qrcode({
    width: 246,
    height: 246,
    text: "http://mall.swgamelife.com/payExchange/qrcode?id=GLPBGUKEY20180313090749302MHQXIH",
    render: 'canvas',
    correctLevel: 1
  });
})