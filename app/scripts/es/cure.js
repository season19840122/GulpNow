// handlebars jQuery 插件
/* $.fn.handlebars = function(template, data) {
  var compiled = {};
  if (template instanceof jQuery) {
    template = $(template).html();
  }
  compiled[template] = Handlebars.compile(template);
  this.html(compiled[template](data));
};
$('#content').handlebars($('#template'), { name: "Alan" }); */

;(function($) {
  var rendor = function(template, obj, $rendor){
    var source = $('#' + template).html();
    var template = Handlebars.compile(source);
    var context = obj;
    var html = template(context);
    // console.log(context)
    $rendor.html(html);
  }

  Handlebars.registerHelper('judge', function(index) {
    var index = index + 1;
    // console.log(index)；
    if(index%6 === 0 && index !== 0) return false;
    return true;
  });

  Handlebars.registerHelper('judgeSelect', function(index) {
    // console.log(index);
    var arr = app.getRandomArray(12, 15);
    for(var key in arr) { 
      // console.log('arr'+arr[key]);
      if(index == arr[key]) {
        // console.log('arr'+arr[key]);
        return true;
      }
    }
    return false;
  });

  var app = {
    init() {
      var obj = {};
      obj['con'] = app.shuffle(data.con).slice(0, 18);
      // console.log(obj);

      rendor('conTemplate', obj, $('.content-wrap'));

      function getDataObj(caption, content, name){
        this.caption = caption;
        this.content = content;
        this.name = name;
        return;
      }

      $('body').on('click', '.i-close, .btn-sure', function () {
        if($(this).is('.btn-sure') && $(this).parents('#dialog-dark').length) {
          var $content = $(this).parents('.contents'),
            caption = $content.find('.caption').val(),
            txt = $content.find('.txt').val(),
            p1 = $content.find('.p1').val();

          if(app.checkNull(caption) && app.checkNull(txt) && app.checkNull(p1)) {
            $('.active')
              .data({
                caption: caption,
                content: txt,
                name: p1
              })
              .addClass('on')
              .removeClass('active')
              .find('.name').html(p1);
            app.hide($('.dialog-wrap'));
          } else {
            $content.find('.error').show();
          }
        } else {
          app.hide($('.dialog-wrap'));
        }
        
      });

      $('body').on('click', '.content-wrap li', function () {
        if($(this).is('.on')) {
          app.show($('#dialog-light'));
          var $modal = $('#dialog-light'),
            caption = $(this).data('caption'),
            content = $(this).data('content'),
            name = $(this).data('name');

          var obj = new getDataObj(caption, content, name);
          $modal.find('.caption').val(obj.caption).attr('title', obj.caption);
          $modal.find('.txt').val(obj.content).attr('title', obj.content);
          $modal.find('.p1').val(obj.name).attr('title', obj.name);
        } else {
          $(this).addClass('active');
          $('#dialog-dark').html(
            `<i class="i-close"></i>
            <div class="contents">
              <input type="text" class="caption" placeholder="标题">
              <textarea class="txt" id="" cols="30" rows="5" placeholder="内容......"></textarea>
              <input type="text" class="p1" value="" placeholder="姓名"/>
              <span class="error">标题、内容、姓名不能为空，请重填!</span>
              <div class="btn-wrap">
                <button class="btn-sure ti">发布</button>
              </div>
            </div>`
          )
          app.show($('#dialog-dark'));
        }
      });
    },
    show: function($obj) {
      $obj.fadeIn(200);
      $('.masklayer').fadeIn(200);
      // $obj.show(200);
      // $('.masklayer').show();
    },
    hide: function($obj) {
      $obj.fadeOut(200);
      $('.masklayer').fadeOut(200);
      // $obj.hide(200);
      // $('.masklayer').hide();
    },
    checkNull(str) {
      if (/^\s*$/.test(str)) {
        return false;
      } else {
        return true;
      }
    },
    shuffle(array){
      var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomArray(start, end) {
      // Used like so
      var arr = [];
      for(var i=0; i<18; i++){
        arr.push(i);
      }
      // console.log(arr)
      arr = app.shuffle(arr);
      var random = app.getRandomInt(start, end);
      // console.log(random);
      arr = arr.slice(0, random);
      // console.log(arr);
      return arr;
    }
  }
  
  app.init();

})(jQuery)