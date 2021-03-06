/* =========================================================== *
 * @site http://tt-cc.cc
 * @email ttccmvp@gmail.com
 * Copyright 2016 ttcc
 * Licensed under the Apache License, Version 2.0 (the "License")
 * =========================================================== */
;
$(document).ready(function () {
    $.fn.serializeObject = function () {
        var o = {}, a = this.serializeArray();
        $.each(a, function () {
            var value = this.value && this.name != "c" && this.name != "auto" ? Number(this.value) : this.value || null;
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(value);
            } else {
                o[this.name] = value;
            }
        });
        return o;
    };
    var timeout = null, form = $("#commonform"), type;
    var content = $("#content"),
        typediv = $("#type").on("click", ".box-item", function () {
            type = this.getAttribute("data-type");
            if (!type) return;
            var dataForm = this.getAttribute("data-form");
            form = $("#" + (dataForm || type)).show();
            if (form.length == 0) {
                form = $("#commonform").show();
            }
            typediv.addClass("out").find(".shape-demo").removeClass("animate");
            typemenu.addClass("generante").find(".generante").text("【" + type + "】");
            content.addClass("in");
            dopackage();
        }),
        typemenu = $("#typemenu").click(function () {
            if (!typemenu.hasClass("generante")) {
                return typediv.find(".shape-demo").toggleClass("animate");
            }
            typemenu.removeClass("generante");
            content.removeClass("in");
            $("#code").removeClass("open");
            setTimeout(function () {
                typediv.removeClass("out");
            }, 300);
            form.hide();
        });
    // 初始动画
    typemenu.trigger("click");
    setTimeout(function () {
        typediv.find(".shape-demo").removeClass("animate");
    }, 2000);
    $("form").on("input", "input", function () {
        if (this.name != "c") {
            this.value = this.value.replace(/[^\d|\.]/g, '');
            if (!this.value || this.value > 500) return;
        }
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            dopackage();
            clearTimeout(timeout);
        }, 500);
    }).on("click", "input[type=radio]", function () {
        var disable = this.getAttribute('data-disable');
        if (this.value * 1) {
            $(this).parent().find("[name=" + disable + "]").attr("disabled", "disabled")
        } else {
            $(this).parent().find("[name=" + disable + "]").removeAttr("disabled")
        }
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            dopackage();
            clearTimeout(timeout);
        }, 500);
    });
    $(".generate-code").click(function () {
        var code = $("#code");
        if (!code.hasClass("open")) {
            var css = "", p = "\n";
            for (var k in style) {
                css += k + " {" + p;
                var prop = style[k];
                for (var j in prop) {
                    css += "" + j + ": " + prop[j] + ";" + p;
                }
                css += "}" + p
            }
            code.find(".paper-content").empty()
                .append('<pre class="brush: html;class-name: paper-code;title: html"></pre>')
                .append('<pre class="brush: css;toolbar: true;class-name: paper-code;title: css"></pre>')
                .find("pre").eq(0).text(html).end().eq(1).text(css);
            SyntaxHighlighter.highlight();
            var body = $('body');
            body.scrollTop() > 200 && body.animate({
                scrollTop: 200
            }, 300);
        }
        code.toggleClass("open").prev().toggle();
    });
    $('[data-rangeslider]').rangeslider({
        polyfill: false,
        onInit: function () {
        },
        onSlide: function (position, value) {
            this.$element.parent().prev().find("span").text(value);
            var transform = ("rotateX(" + $("#rangex").val() + "deg) rotateY(" + $("#rangey").val() +
            "deg) rotateZ(" + $("#rangez").val() + "deg)");
            style["." + cls]["transform"] = transform;
            boxstyle.next("style").html("." + cls + "{transform:" + transform + ";margin: 0 auto}");
        },
        onSlideEnd: function () {
        }
    });
    var boxdemo = $("#boxdemo"),
        boxstyle = $("#boxstyle"),
        html, style, cls;

    function dopackage() {
        var params = form.serializeObject();
        params.c = $.trim(params.c);
        cls = $.trim(params.c) || ("shape-" + type);
        var pack = Shape[type || "cube"](params, cls);
        if (!pack) {
            return;
        }
        html = pack.html;
        style = pack.style;
        var css = "";
        for (var k in style) {
            css += k + "{";
            var prop = style[k];
            for (var j in prop) {
                css += j + ": " + prop[j] + ";";
            }
            css += "}"
        }
        boxdemo.show().css("padding", (params.v ? params.v : 100) + "px 0").html(html);
        pack.transform = pack.transform || ("rotateX(" + $("#rangex").val() + "deg) rotateY(" + $("#rangey").val() +
            "deg) rotateZ(" + $("#rangez").val() + "deg)");
        boxstyle.html(css);
        boxstyle.next("style").html("." + cls + "{transform:" + pack.transform + ";margin: 0 auto}");
    }
});
