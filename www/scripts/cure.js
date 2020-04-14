    "use strict";

    !function(l) {
      Handlebars.registerHelper("judge", function(t) {
        return (t = t + 1) % 6 != 0 || 0 === t;
      }), Handlebars.registerHelper("judgeSelect", function(t) {
        var n = s.getRandomArray(12, 15);
        for (var a in n) if (t == n[a]) return !0;
        return !1;
      });
      var s = {
        init: function() {
          var t, n, a, e, i, o = {};
          function r(t, n, a) {
            this.caption = t, this.content = n, this.name = a;
          }
          o.con = s.shuffle(data.con).slice(0, 18), t = "conTemplate", n = o, a = l(".content-wrap"), 
          e = l("#" + t).html(), i = (t = Handlebars.compile(e))(n), a.html(i), l("body").on("click", ".i-close, .btn-sure", function() {
            if (l(this).is(".btn-sure") && l(this).parents("#dialog-dark").length) {
              var t = l(this).parents(".contents"), n = t.find(".caption").val(), a = t.find(".txt").val(), e = t.find(".p1").val();
              s.checkNull(n) && s.checkNull(a) && s.checkNull(e) ? (l(".active").data({
                caption: n,
                content: a,
                name: e
              }).addClass("on").removeClass("active").find(".name").html(e), s.hide(l(".dialog-wrap"))) : t.find(".error").show();
            } else s.hide(l(".dialog-wrap"));
          }), l("body").on("click", ".content-wrap li", function() {
            if (l(this).is(".on")) {
              s.show(l("#dialog-light"));
              var t = l("#dialog-light"), n = new r(l(this).data("caption"), l(this).data("content"), l(this).data("name"));
              t.find(".caption").val(n.caption).attr("title", n.caption), t.find(".txt").val(n.content).attr("title", n.content), 
              t.find(".p1").val(n.name).attr("title", n.name);
            } else l(this).addClass("active"), l("#dialog-dark").html('<i class="i-close"></i>\n            <div class="contents">\n              <input type="text" class="caption" placeholder="标题">\n              <textarea class="txt" id="" cols="30" rows="5" placeholder="内容......"></textarea>\n              <input type="text" class="p1" value="" placeholder="姓名"/>\n              <span class="error">标题、内容、姓名不能为空，请重填!</span>\n              <div class="btn-wrap">\n                <button class="btn-sure ti">发布</button>\n              </div>\n            </div>'), 
            s.show(l("#dialog-dark"));
          });
        },
        show: function(t) {
          t.fadeIn(200), l(".masklayer").fadeIn(200);
        },
        hide: function(t) {
          t.fadeOut(200), l(".masklayer").fadeOut(200);
        },
        checkNull: function(t) {
          return !/^\s*$/.test(t);
        },
        shuffle: function(t) {
          for (var n, a, e = t.length; 0 !== e; ) a = Math.floor(Math.random() * e), n = t[e -= 1], 
          t[e] = t[a], t[a] = n;
          return t;
        },
        getRandomInt: function(t, n) {
          return Math.floor(Math.random() * (n - t + 1)) + t;
        },
        getRandomArray: function(t, n) {
          for (var a = [], e = 0; e < 18; e++) a.push(e);
          a = s.shuffle(a);
          var i = s.getRandomInt(t, n);
          return a = a.slice(0, i);
        }
      };
      s.init();
    }(jQuery);