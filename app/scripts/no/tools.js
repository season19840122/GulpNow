(function ($) {
	$.fn.select = function(options, param){
		if (typeof options == 'string'){
			var method = $.fn.select.methods[options];
			if (method){
				return method(this, param);
			} else {
				return this;
			}
		}
		options = options || {};
		var self_options = {};
		$.extend(self_options, $.fn.select.defaults, options);
		$(this).data('options', self_options);
		create(this, self_options);
	}
	
	$.fn.select.methods = {
		setValue : function(ctrl, param){
			var oldValue = getValue(ctrl);
			
			$(ctrl).find('ul li a').each(function(index, link){
				var $item = $(link);
				var value = $item.attr('rel');
				if(param == value){
					$(ctrl).find('input').val($item.text());
					$(ctrl).find('input:hidden').val(value);
				}
			});
		},
		
		getValue : function(ctrl){
			return getValue(ctrl);
		},
		
		getData : function(ctrl){
			var value = getValue(ctrl);
			var data = null;
			$(ctrl).find('ul li').each(function(index, li){
				var $li = $(li);
				var itemValue = $li.find('a').attr('rel');
				if(itemValue == value){
					data = $li.data('data');
				}
			});
			return data;
		}
	}
	
	$.fn.select.defaults = $.extend({}, {
		name : 'name',
		value : null,
		valueField : 'value',
		textField : 'text',
        showDefault : true,
        defaultValue:'',
        defaultText : '全部',
        data : [],
        onChange: function(val, data){
        	
        }
	});
	
	function create(ctrl, options){
		var $self =$(ctrl),$ul;
		if(options.data.length > 0) {
			$self.empty();
			$self.append('<input type="text" readonly="readonly" value="' + options.defaultText + '"/>');
			$self.append('<input type="hidden" name="' + options.name + '"/>');
			$self.append('<ul class="smallScroll smallScroll2"></ul>');
			$ul = $self.find('ul');
			if(options.showDefault){
				var $li = $('<li><a href="javascript:void(0);" rel="'+options.defaultValue+'">' + options.defaultText + '</a></li>');
				$li.data('data', {});
				$ul.append($li);
			}
			
			var defaultValue = '';
			var defaultText = '';
			var defaultData = [];
			
			for (var i = 0, len = options.data.length; i < len; i++) {
				var $li = $('<li><a href="javascript:void(0);" rel="' + options.data[i][options.valueField] + '">' + options.data[i][options.textField] + '</a></li>');
				$li.data('data', options.data[i]);
				$ul.append($li);
				
				if(options.data[i][options.valueField] == options.value){
					defaultValue = options.data[i][options.valueField];
					defaultText = options.data[i][options.textField];
					defaultData = options.data[i];
				}
			}
			
			if(!defaultValue){
				defaultValue = $ul.find('li:eq(0) a').attr('rel');
				defaultText = $ul.find('li:eq(0) a').text();
				defaultData = $ul.find('li:eq(0)').data('data');
			}
			setValue(ctrl, defaultValue, defaultText, defaultData);
		} else {
			$ul = $self.find('ul');
			setValue(ctrl, '', options.defaultText, {});
		}
		
		
		//下拉框div绑定事件
		$self.on('click', function(e){
			var tagName = e.target.tagName;
			var target = e.target;
			$ul.slideToggle('fast');
			$self.toggleClass('open');
			//开启一个下拉框，关闭另一个下拉框
			if('INPUT' == tagName || 'DIV' == tagName) {
				var selectId = '#'+(e.target.className.indexOf('type_select')!=-1?e.target.id:e.target.parentElement.id);
				$('.type_select:not('+selectId+')').removeClass('open');
				$('.type_select:not('+selectId+') ul').hide();
			}
			
			if('A' == tagName) {
				var value = $(target).attr('rel');
				var text = $(target).text();
				setValue(ctrl, value, text, $(target).parent().data('data'));
				$ul.hide();
				$self.removeClass('open');
			}
			return false;
		});
	}
	
	$(document).on('click', function(e) {
		$('.type_select').removeClass('open');
		$('.type_select ul').hide();
	})
	
	function change(ctrl, data){
		data = (data) ? data : {};
		var options =  $(ctrl).data('options');
        options.onChange(getValue(ctrl), data);
	}
	
	function getValue(ctrl){
		return $(ctrl).find('input:hidden').val();
	}
	
	function setValue(ctrl, value, text, data){
		var oldValue = getValue(ctrl);
		
		$(ctrl).find('input:hidden').val(value);
		$(ctrl).find(':text').val(text);
		
		if(value != oldValue){
			change(ctrl, data);
		}
	}
	
	
	//禁止页面拖动蓝色
	document.onselectstart = function() {
		return false;
	}
	//弹框的相关方法
	$.fn.show_ = function() {
		$('.alert_box').hide();
		$(this).show();
		$('.alert_bg').show();
	}
	$.fn.hide_ = function() {
		$(this).hide();
		$('.alert_bg').hide();
	}
	$('.alert_box i').on('click',function() {
		$(this).parent('.alert_box').hide_();
	})
	$('.alert_box .confirm').on('click',function() {
		$(this).parent('.alert_box').hide_();
	})
	//关闭按钮
	$.fn.close_ = function(callBack) {
		$(this).find('i').off('click').on('click',function() {
			$(this).parent('.alert_box').hide_();
			if(typeof callBack === 'function') {
				callBack.call();
			}
		})
	}
	//点击确定按钮
	$.fn.confirm_ = function(flag,callBack) {
		$(this).find('.confirm').off('click').on('click',function() {
			if(typeof flag === 'boolean' && flag || typeof flag === 'function') {
				$(this).parent('.alert_box').hide_();
			}
			if(typeof callBack === 'function') {
				callBack.call();
			} else if(typeof flag === 'function') {
				flag.call();
			}
		})
	}
	
	//点击确定或者关闭按钮
	$.fn.closeAll_ = function(callBack) {
		$(this).find('.confirm').off('click').on('click',function() {
			$(this).parent('.alert_box').hide_();
			if(typeof callBack === 'function') callBack.call();
		})
		$(this).find('i').off('click').on('click',function() {
			$(this).parent('.alert_box').hide_();
			if(typeof callBack === 'function') callBack.call();
		})
	}
	
	
})(jQuery);
