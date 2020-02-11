String.prototype.toKHCase = function () {
  var a, d, f = [];
  for (a = this.length - 1; 0 <= a; a--) d = this.charCodeAt(a), f[a] = 12449 <= d && 12534 >= d ? d - 96 : d;
  return String.fromCharCode.apply(null, f)
};
(function (a) {
  a.fn.extend({
    ocm: function () {
      var b = a(this),
        c = b.children("article"),
        b = b.children().children(".ocm-btn");
      b.hasClass("ocm-close") ? (c.css("display", "none"), b.hasClass("rotate") && b.hasClass("rotate-active") && b.trigger("click")) : (c.css("display", ""), b.hasClass("rotate") && !b.hasClass("rotate-active") && b.trigger("click"));
      b.click(function () {
        c.slideToggle(500, "easeOutBounce", function () {
          a(window).resize()
        })
      })
    },
    rotate: function () {
      a(this).click(function () {
        a(this).hasClass("rotate-active") ? a(this).removeClass("rotate-active") : a(this).addClass("rotate-active")
      })
    }
  });
  a(document).on("click", "input:radio:checked + label", function (b) {
    a("#" + a(this).attr("for")).prop("checked", !1);
    b.preventDefault();
    b.stopPropagation()
  });
  a(".rotate").rotate();
  a(".ocm").each(function () {
    a(this).ocm()
  });
  a.slidebars();
  a("img").lazyload({
    effect: "fadeIn",
    effectspeed: 200
  });
  a(".va_musicbox").on("click", function () {
    var b = a(this).attr("data-get-music-inf-url").split("/").pop();
    a(this).hasClass("sl") ? (a(this).removeClass("sl"), a("#music_inf").html(""), a("input:hidden[name=music_id]").val("")) : (a(".va_musicbox").removeClass("sl"), a(this).addClass("sl"), a.ajax({
      url: a(this).attr("data-get-music-inf-url"),
      type: "GET",
      dataType: "json",
      timeout: 1E4
    }).done(function (b) {
      "undefined" != typeof b.html && (a("#music_inf").html(b.html), a("#music_inf .rotate").rotate(), a("#music_inf .ocm").each(function () {
        a(this).ocm()
      }))
    }), a("input:hidden[name=music_id]").val(b))
  });
  a(".fav").on("click", function () {
    var b = a(this);
    a.ajax({
      url: a(this).data("fav-url"),
      type: "GET",
      dataType: "json",
      timeout: 1E4
    }).done(function (a) {
      "undefined" != typeof a.fc && b.find(".fc").text(a.fc)
    })
  });
  var d = function (b) {
    b.preventDefault();
    b = a(this).parents("form");
    a.ajax({
      url: b.attr("action"),
      type: b.attr("method"),
      data: b.serialize(),
      dataType: "json",
      context: b,
      timeout: 1E4
    }).done(function (b) {
      var p = a(this).data("result"),
        e = a(p);
      e.fadeOut("fast", function () {
        e.html(b.html);
        e.fadeIn("fast")
      })
    })
  };
  a(".search-form-a select.search").on("change", d);
  a(".search-form-a input.search").on("change", d);
  a(".search-form-a input.search").on("search", d);
  a(".search-form-a").submit(function () {
    event.preventDefault()
  });
  a(".add-data").on("click", function (b) {
    var c = a(this);
    if ("undefined" != typeof c.data("loaded")) return !1;
    c.data("loaded", !0);
    event.preventDefault();
    a.ajax({
      url: c.attr("href"),
      type: "GET",
      data: {},
      dataType: "json",
      timeout: 1E4
    }).done(function (b) {
      var e = c.data("result"),
        h = a(e);
      h.fadeOut("fast", function () {
        h.html(b.html);
        h.fadeIn("fast")
      })
    });
    return !1
  });
  a(".add-gacha-sim").on("click", function (b) {
    var c = a(this);
    if (c.hasClass("loading")) return !1;
    c.addClass("loading");
    b.preventDefault();
    a.ajax({
      url: c.attr("href"),
      type: "GET",
      data: {},
      dataType: "json",
      timeout: 1E4
    }).done(function (b) {
      var e = c.data("result"),
        e = a(e),
        h = a(b.html);
      h.find("img").each(function () {
        a(this).attr("src", a(this).data("original"))
      });
      e.append(h);
      for (var d in b.cc) e = b.cc[d], a(d).text(parseInt(a(d).text()) + e);
      c.removeClass("loading")
    });
    return !1
  });
  if (0 < a(".jewel_table").size()) {
    var f = a(".jewel_table").data("jewel-table"),
      d = a("<table>").css({
        width: "auto"
      }),
      m;
    for (m in f) d.append(a("<tr>").append(a("<th>").text("スタージュエル：" + f[m].jewel_num + "個")).append(a("<td>").css({
      "text-align": "right"
    }).text(f[m].price + "円")));
    a(".jewel_table").append(d);
    a(".yen").on("change", function () {
      var b = a(this),
        b = parseInt(b.val());
      if (!isNaN(b)) {
        var c = 3E3;
        3E5 < b && (c = 6E5);
        p_jewel_num = 0;
        for (var d = f.length - 1; 0 <= d; d--) {
          var e = Math.floor(b / f[d].price);
          p_jewel_num += e * f[d].jewel_num;
          b -= e * f[d].price
        }
        var h = p_jewel_num,
          n = {
            m: 0,
            s: 0
          },
          k = "",
          l = a(".jewel_cost").data("jewel-cost");
        a.each(["m", "s"], function (a, b) {
          if (0 == l[b].c) return !0;
          var c = Math.floor(h / l[b].c);
          n[b] = c;
          h -= c * l[b].c;
          k += l[b].t + "×" + c + "回　"
        });
        a(".yen-jewel").html("購入可能ジュエル：" + p_jewel_num + "個　<br>" + k + " &raquo; <a class='yen-sim' data-m='" + n.m + "' data-s='" + n.s + "' style='cursor:pointer;'>この内容でシミュレートする</a><br>※" + c / 1E3 + "秒間隔でシミュレートします。");
        a(".yen-jewel").find(".yen-sim").on("click", function () {
          function b(c) {
            var d = a.Deferred();
            a(".gacha-sim-" + c).trigger("click");
            d.resolve();
            return d.promise()
          }
          var d = a(this);
          if (d.hasClass("loading")) return !1;
          d.addClass("loading");
          var l = function (b) {
              var c = a.Deferred();
              setTimeout(function () {
                c.resolve()
              }, b);
              return c.promise()
            },
            e = new a.Deferred;
          e.resolve();
          for (var k = 0; k < a(this).data("m"); k++) e = e.then(function () {
            return b("m")
          }).then(function () {
            return l(c)
          });
          for (k = 0; k < a(this).data("s"); k++) e = e.then(function () {
            return b("s")
          }).then(function () {
            return l(c)
          });
          e.done(function () {
            d.removeClass("loading")
          })
        })
      }
    })
  }
var coucou = 0;
var yoko = 0;
var jun;
0 < a("#chara-stand").length && (a(window).on("resize", function () {
	a("#chara-stand li").each(function () {
		liw = a(this).width();
		ow = a(this).data("ow");
		ol = a(this).data("ol");
		ot = a(this).data("ot");
		ofw = a(this).data("ofw");
		imw = a(this).find("img").eq(0).width();
		r = imw / ow;
		$fi = a(this).find("img").eq(jun);
		$fi.width(ofw * r);
		$fi.zIndex(jun);
		alert(jun);
		$fi.css({
			position: "absolute",
			top: ot * r + "px",
			left: ol * r + (liw - imw) / 2 + "px",
		})
		coucou++;
//		alert(a(this).find("img").eq(jun).attr('src'));
	})
}), a("#chara-stand .face-btn").on("click", function () {
	$fb = a(this);
	jun = a(this).index()+1;
	alert(jun);
	$fb.hasClass("checked") ?
	 (alert("abe1")
	,$fb.parents("li").find("a img").eq(jun).attr("src", "").hide(),
	$fb.removeClass("checked")) : 
	
	(alert("abe2"),

//	$fb.parent().find(".shadow-btn").removeClass("checked"), 
	$fb.addClass("checked"), 
	fu = $fb.data("face-url"), 

	$fb.parents("li").find("a img").eq(jun).attr("src", fu).show(), 

	a(window).trigger("resize"))

}));


  0 < a(".rep-btn").length && (a(".rep-filter").on("keyup", function () {
    var b = a(this).val(),
      c = a(this).data("filter-group");
    a('.rep-btn[data-group="' + c + '"]').each(function () {
      -1 != a(this).data("filter").indexOf(b) ? a(this).show() : a(this).hide()
    })
  }), a(".rep-btn").on("click", function () {
    var b = a(this),
      c = b.data("group");
    b.hasClass("checked") ? b.removeClass("checked") : (a('.rep-btn[data-group="' + c + '"]').removeClass("checked"), b.addClass("checked"))
  }), a(".replace").on("click", function () {
    for (var b = a(this).data("group-num"), c = [], d = 1; d <= b; d++) 0 < a('.rep-btn.checked[data-group="' + d + '"]').length ? c.push(a('.rep-btn.checked[data-group="' + d + '"]').data("val")) : c.push("-");
    b = c.join("/");
    c = a(this).data("viewer-url") + "/r" + b;
    a(this).next().val(b);
    location.href = c
  }), "" != a(".replace").next().val() && (m = a(".replace").next().val().split("/"), a.each(m, function (b, c) {
    "-" != c && a('.rep-btn[data-group="' + (b + 1) + '"][data-val="' + c + '"]').addClass("checked")
  })));
  0 < a(".countdown").length && a(".countdown").each(function () {
    var b = a(this).attr("data-countdown").split(" "),
      c = b[0].split("-"),
      b = b[1].split(":"),
      c = new Date(c[0], c[1] - 1, c[2], b[0], b[1], b[2]);
    a(this).countdown({
      until: c,
      compact: !0
    })
  });
  0 < a(".filter_group").size() && a(".filter_group").each(function () {
    var b = function () {
      var b = a(this).attr("g"),
        d = a("#" + b),
        e = a("#" + d.attr("t"));
      e.fadeOut("fast", function () {
        e.find("ul li.s").each(function () {
          var e = a(this),
            f = !0;
          d.find("." + b).each(function () {
            var b = "",
              c = a(this).attr("dc");
            "select" == a(this).get(0).tagName.toLowerCase() ? b = a(this).find("option:selected").val() : "radio" == a(this).attr("type") || "checkbox" == a(this).attr("type") ? a(this).prop("checked") && (b = a(this).val()) : b = a(this).val();
            if ("undefined" != typeof b && "" != b) {
              var d = a(this).attr("ft");
              if ("match" == d) b != e.attr(c) && (f = !1);
              else if ("range" == d) {
                d = b;
                b = !0;
                c = e.attr(c);
                if (-1 == d.indexOf("-")) c != d && (b = !1);
                else {
                  var g = d.split("-");
                  if ("" != g[0] && "" != g[1]) {
                    if (d = parseInt(g[0]), g = parseInt(g[1]), c = parseInt(c), c < d || c > g) b = !1
                  } else "" != g[0] ? (d = parseInt(g[0]), c = parseInt(c), c < d && (b = !1)) : "" != g[1] && (g = parseInt(g[1]), c = parseInt(c), c > g && (b = !1))
                }
                0 == b && (f = !1)
              } else "part" == d ? -1 == e.attr(c).toKHCase().indexOf(b) && (f = !1) : console.log("unknown type: " + d)
            }
          });
          f ? a(this).show() : a(this).hide()
        });
        e.fadeIn("fast", function () {
          a(window).trigger("resize")
        })
      })
    };
    a(this).find("select").on("change", b);
    a(this).find("input[type=radio]").on("click", b);
    a(this).find("input.search").on("keyup", b);
    a(this).find("input.search").on("search", b)
  })
})(jQuery);