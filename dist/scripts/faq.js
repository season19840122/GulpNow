"use strict";!function(i){var a=i(".swiper-container").swiper({loop:!0,speed:0});function s(e){i(".guide-nav-list").removeClass("active").eq(e).addClass("active")}i(".guide-swiper-prev").on("click",function(){a.swipePrev()}),i(".guide-swiper-next, .btn-next").on("click",function(){a.swipeNext()}),i(".guide-nav-list").on("click",function(){var e=i(this).attr("data-key");a.swipeTo(e,0,!0),s(e)}),a.addCallback("SlideChangeStart",function(e){s(e.activeLoopIndex),0==e.activeLoopIndex?(i(".guide-swiper-prev").removeClass("active"),i(".guide-swiper-next").addClass("active")):4==e.activeLoopIndex?(i(".guide-swiper-prev").addClass("active"),i(".guide-swiper-next").removeClass("active")):(i(".guide-swiper-prev").addClass("active"),i(".guide-swiper-next").addClass("active"))})}(jQuery);