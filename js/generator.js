$(document).ready(function () {
    $('[data-rangeslider]').rangeslider({
        polyfill: false,
        onInit: function () {
        },
        onSlide: function (position, value) {
            this.$element.parent().prev().find("span").text(value);
            $("#boxdemo").css("transform", ("rotateX(" + $("#rangex").val() + "deg) rotateY("
            + $("#rangey").val() + "deg) rotateZ(" + $("#rangez").val() + "deg)"))
        },
        onSlideEnd: function () {
        }
    });
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
            content.addClass("in");
            typemenu.addClass("generante").find(".generante").text("Generate 【" + type + "】");
            dopackage();
        }),
        typemenu = $("#typemenu").click(function () {
            if (!typemenu.hasClass("generante")) {
                return typediv.find(".shape-demo").toggleClass("animate");
            }
            typemenu.removeClass("generante");
            content.removeClass("in");
            setTimeout(function () {
                typediv.removeClass("out");
            }, 300);
            form.hide();
        });
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
    }).on("change", "select", function () {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            dopackage();
            clearTimeout(timeout);
        }, 500);
    }).on("click", "[name=auto]", function () {
        if (this.checked) {
            $(this).parent().prev("input").attr("disabled", "disabled")
        } else {
            $(this).parent().prev("input").removeAttr("disabled")
        }
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            dopackage();
            clearTimeout(timeout);
        }, 500);
    });
    var codehtml = $("#codehtml"),
        boxdemo = $("#boxdemo"),
        codecss = $("#codecss"),
        boxstyle = $("#boxstyle");

    function dopackage() {
        var params = form.serializeObject(), cls = params.c || ("shape-" + type);
        var pack = Shape[type || "cube"](params, cls);
        if (!pack) {
            codehtml.empty();
            boxdemo.empty();
            codecss.empty();
            boxstyle.empty();
            return;
        }
        var style = pack.style,
            html = pack.html,
            css = "", p = "<br/>";
        for (var k in style) {
            css += k + " {" + p;
            var prop = style[k];
            for (var j in prop) {
                css += "&nbsp;&nbsp;&nbsp;&nbsp;" + j + ": " + prop[j] + ";" + p;
            }
            css += " }" + p
        }
        codehtml.text(html);
        boxdemo.css({
            "height": (params.h || params.v || 200) + 40,
            "width": (params.w || 200) + 40,
            "transform": ("rotateX(" + $("#rangex").val() + "deg) rotateY(" + $("#rangey").val() +
            "deg) rotateZ(" + $("#rangez").val() + "deg)")
        }).html(html.replace(/&nbsp;/g, "").replace(/<br\/>/g, ""));
        codecss.html(css);
        boxstyle.empty().html(css.replace(/&nbsp;/g, "").replace(/<br\/>/g, ""));
    }
});
