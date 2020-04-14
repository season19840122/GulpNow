// 输入框提示信息
$(function() {
    if (!('placeholder' in document.createElement('input'))) {
        $('.placeholder input[type=text][placeholder], .placeholder textarea[placeholder]').each(function(k, v) {
            var $obj = $(v),
                val = $obj.val(),
                placeholder = $obj.attr('placeholder');
            
            if (val == '') {
                $obj.val(placeholder);                   
            }
            
            $obj.focus(function() {
                if ($obj.val() === placeholder) {
                    $obj.val('');
                }
            }).blur(function() {
                val = $obj.val();
                if (val == '' || val == placeholder) {
                    $obj.val(placeholder);
                }
            });
        });
        $(".placeholder input[type=password][placeholder]").each(function() {
            var $input = $(this), fauxId = $input.attr('id') + '-faux';
            $input.after('<input id="' + fauxId + '" style="display:none;" type="text" value="'
                + $input.attr('placeholder') + '" tabindex="' + $input.attr('tabindex') + '"/>');
            var $faux = $('#' + fauxId);

            $faux.show().attr('class', $input.attr('class')).attr('style', $input.attr('style'));
            $input.hide();

            $faux.focus(function() {
                $faux.hide();
                $input.show().focus();
            });

            $input.blur(function() {
                if($input.val() === '') {
                    $input.hide();
                    $faux.show();
                }
            });
        });
    }
});

/**
 * IE 11中不能再以document.all判断是否为IE
 * @returns {number} IE版本
 */
function getInternetExplorerVersion() {
    var rv = -1, ua , re;
    if (navigator.appName == 'Microsoft Internet Explorer') {
        ua = navigator.userAgent;
        re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null) {
            rv = parseFloat( RegExp.$1 );
        }
    } else if (navigator.appName == 'Netscape') {
        ua = navigator.userAgent;
        re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null) {
            rv = parseFloat( RegExp.$1 );
        }
    }
    return rv;
}

$.browser = {};
$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
