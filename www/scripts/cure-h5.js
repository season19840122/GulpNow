    "use strict";

    !function(r) {
      Handlebars.registerHelper("judge", function(t) {
        return (t = t + 1) % 3 != 0 || 0 === t;
      }), Handlebars.registerHelper("judgeSelect", function(t) {
        var n = s.getRandomArray(12, 15);
        for (var a in n) if (t == n[a]) return !0;
        return !1;
      });
      var s = {
        init: function() {
          var t, n, a, e, i, o = {};
          function l(t, n, a) {
            this.caption = t, this.content = n, this.name = a;
          }
          o.con = s.shuffle(data.con).slice(0, 18), t = "conTemplate", n = o, a = r(".content"), 
          e = r("#" + t).html(), i = (t = Handlebars.compile(e))(n), a.html(i), r("body").on("click", ".i-close, .btn-sure", function() {
            if (r(this).is(".btn-sure") && r(this).parents("#dialog-dark").length) {
              var t = r(this).parents(".contents"), n = t.find(".caption").val(), a = t.find(".txt").val(), e = t.find(".p1").val();
              s.checkNull(n) && s.checkNull(a) && s.checkNull(e) ? (r(".active").data({
                caption: n,
                content: a,
                name: e
              }).addClass("on").removeClass("active").find(".name").html(e), s.hide(r(".dialog-wrap"))) : t.find(".error").show();
            } else s.hide(r(".dialog-wrap"));
          }), r("body").on("click", ".content-wrap li", function() {
            if (r(this).is(".on")) {
              s.show(r("#dialog-light"));
              var t = r("#dialog-light"), n = new l(r(this).data("caption"), r(this).data("content"), r(this).data("name"));
              t.find(".caption").val(n.caption).attr("title", n.caption), t.find(".txt").val(n.content).attr("title", n.content), 
              t.find(".p1").val(n.name).attr("title", n.name);
            } else r(this).addClass("active"), r("#dialog-dark").html('<i class="i-close"></i>\n            <div class="contents">\n              <input type="text" class="caption" placeholder="标题">\n              <textarea class="txt" id="" cols="30" rows="5" placeholder="内容......"></textarea>\n              <input type="text" class="p1" value="" placeholder="姓名"/>\n              <span class="error">标题、内容、姓名不能为空，请重填!</span>\n              <div class="btn-wrap">\n                <button class="btn-sure ti">发布</button>\n              </div>\n            </div>'), 
            s.show(r("#dialog-dark"));
          });
        },
        show: function(t) {
          t.fadeIn(200), r(".masklayer").fadeIn(200);
        },
        hide: function(t) {
          t.fadeOut(200), r(".masklayer").fadeOut(200);
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