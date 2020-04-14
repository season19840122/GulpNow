;(function ($) {
  // 初始化轮播
  var guideSwiper = $('.swiper-container').swiper({
    loop : true,
    speed: 0
  });
  // 点击prev
  $('.guide-swiper-prev').on('click', function () {
    guideSwiper.swipePrev();
  });
  // 点击next 
  $('.guide-swiper-next, .btn-next').on('click', function () {
    guideSwiper.swipeNext();
  });
  // 点击文字跳转到相应轮播图
  $('.guide-nav-list').on('click', function () {
    var key = $(this).attr('data-key'); 
    guideSwiper.swipeTo(key, 0, true);
    guideSwiperNav(key);
  });

  guideSwiper.addCallback('SlideChangeStart', function (swiper) {
    guideSwiperNav(swiper.activeLoopIndex);
    if (swiper.activeLoopIndex == 0) {
      $('.guide-swiper-prev').removeClass('active');
      $('.guide-swiper-next').addClass('active');
    } else if (swiper.activeLoopIndex == 4) {
      $('.guide-swiper-prev').addClass('active');
      $('.guide-swiper-next').removeClass('active');
    } else {
      $('.guide-swiper-prev').addClass('active');
      $('.guide-swiper-next').addClass('active');
    }
  });

  // 文字高亮
  function guideSwiperNav(key) {
    $('.guide-nav-list').removeClass('active').eq(key).addClass('active');
  }

})(jQuery)