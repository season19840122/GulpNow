
!function ($) {
    "use strict"

    // Slider对象
    $.Slider = function (el, options) {
        this.el = el = $(el)
        this.settings = $.extend({}, $.Slider.defaults, options)

        this.initalize();

        el.data('slider', this);
    }

    $.Slider.fn =  $.Slider.prototype = {
        initalize: function() {
            var el = this.el
            this.el.outer = el.find('[data-ui="jquery-sliderCont"]');
            this.el.items = el.outer.find('li');
			this.slList = el.find('ul');
            this.count = this.el.items.length;		//取得所有个数
			
			
			this.el.prev = el.find('.prev');
			this.el.next = el.find('.next');

			
			if(this.count===1){
				this.el.prev.hide();
				this.el.next.hide();
				
				this.slList.css({textAlign:'center',position:'static'})
				this.slList.find('li').css({marginRight:'0'})
				
				return false;	
			}else if(this.count===2){
				this.el.prev.hide();
				this.el.next.hide();
				
				return false;	
			}
			
			
				
			this.oneWidth = this.settings.oneWidth;
			this.curIdx = this.settings.curIdx || 0;			//这里设置一下可以设置初始页
			this.curIndex = this.settings.curIndex;
			this.idxLength = Math.ceil(this.count/this.curIndex)-1;		//取得翻动页数
			this.lastWidth = this.count%this.curIndex || this.curIndex;			//取得最后一组的余数
			
			

            this.initStyle();
			
			

        },
        initStyle: function() {		
			 var that = this
			 that.el.prev.click(function(){that.prev()});
			 that.el.next.click(function(){that.next()});
			 that.select(that.curIdx);
        },
        // 上一组
        prev: function() {
			var idx = this.curIdx;
			if (idx == 0) {
                return false;
			}
			idx = idx - 1
            this.select(idx)
        },
        // 下一组
        next: function() {
			var idx = this.curIdx;
			if (idx === this.idxLength) {
                return false;
			}
			idx = idx + 1
            this.select(idx)
        },
		select: function(idx){
			
			
			
			
			if(idx==this.idxLength&&this.count>this.curIndex){
				
				this.el.next.addClass('next-dis');
				
				if(!this.slList.is(":animated")){
					this.slList.animate({left:-(idx*this.curIndex*this.oneWidth - ((this.curIndex-this.lastWidth)*this.oneWidth))});
				}
			}else if(idx==0){
				this.el.prev.addClass('prev-dis');

				if(!this.slList.is(":animated")){
					this.slList.animate({left:-(idx*this.curIndex*this.oneWidth)});	
				}	
			}else{
				if(!this.slList.is(":animated")){
					this.slList.animate({left:-(idx*this.curIndex*this.oneWidth)});	
				}
			}
			
			this.setCurIdx(idx);
		},
		 setCurIdx: function(idx) {
            
			if(idx>0){
				this.el.prev.removeClass('prev-dis');	
			}
			
			if(idx<this.idxLength){
				this.el.next.removeClass('next-dis');	
			}
            this.curIdx = idx
        }
       
    }

    // 默认设置
    $.Slider.defaults = {
		  "curIdx" : 0,	//初始翻页
      "curIndex": 6,	//一组翻页个数
		  "oneWidth": 100	//单元长度
    }

    // 公共方法
    $.fn.Slider = function (options) {
        this.each(function() {
            var elem = $(this),
                slider = elem.data('slider')

            if (!slider) {
                elem.data('slider', (slider = new $.Slider(elem, options || elem.data('config') || {})))
            }

            if (typeof options === 'string' && options in slider) {
                slider[options].call(slider)
            }
        })
        return this
    }

}(jQuery);





