/* =========================================================== *
 * @site http://tt-cc.cc
 * @email ttccmvp@gmail.com
 * Copyright 2016 ttcc
 * Licensed under the Apache License, Version 2.0 (the "License")
 * =========================================================== */
;
var randomColor = function () {
    return '#' + (function (color) {
            return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
            && (color.length == 6) ? color : arguments.callee(color);
        })('');
};
var Shape = {
    cube: function (params, cls) {
        var c = "." + cls,
            w = params.w || 100,
            h = params.h || 100,
            v = params.v || 100;
        if (w > 500 || h > 500 || v > 500) {
            return alert("size max = 500");
        }
        var html = '<div class="' + cls + '">\n' +
            '<div class="tcface top"></div>\n' +
            '<div class="tcface left"></div>\n' +
            '<div class="tcface front"></div>\n' +
            '<div class="tcface bottom"></div>\n' +
            '<div class="tcface right"></div>\n' +
            '<div class="tcface back"></div>\n' +
            '</div>';
        var style = {};
        style[c] = {
            width: w + "px",
            height: h + "px",
            "transform-style": "preserve-3d"
        };
        style[c + " .tcface"] = {
            width: "100%",
            height: "100%",
            position: "absolute"
        };
        style[c + " .top"] = {
            background: randomColor(),
            transform: "rotateX(0deg) translateZ(" + v + "px)"
        };
        style[c + " .bottom"] = {
            background: randomColor()
        };
        style[c + " .right"] = {
            background: randomColor(),
            transform: "rotateY(90deg) rotatez(-90deg) translateZ(" + w + "px) translateX(" + (v - h) + "px)",
            "transform-origin": "0 100%",
            width: h + "px",
            height: v + "px"
        };
        style[c + " .left"] = {
            background: randomColor(),
            transform: "rotateY(-90deg) rotateZ(90deg) translateY(-" + v + "px)",
            "transform-origin": "0 0",
            width: h + "px",
            height: v + "px"
        };
        style[c + " .back"] = {
            background: randomColor(),
            transform: "rotateX(90deg) rotatez(180deg) translateY(-" + v / 2 + "px) translateZ(" + v / 2 + "px)",
            height: v + "px"
        };
        style[c + " .front"] = {
            background: randomColor(),
            transform: "rotateX(-90deg) translateY(-" + v / 2 + "px) translateZ(" + (h - v / 2) + "px)",
            height: v + "px"
        };
        return {
            style: style,
            html: html
        };
    },
    pyramid: function (params, cls) { // 金字塔
        params.w = params.w || 100;
        params.v = params.v || 100;
        params.s = params.s || 4;
        params.auto = 1;
        var pack = this.fan(params, cls);
        pack.transform = "rotateY(" + 360 / params.s + "deg)";
        return pack;
    },
    cylinder: function (params, cls) {
        var c = "." + cls,
            w = params.w || 100,
            sw = params.sw || 75,
            side = params.s || 80;
        if (sw > w) {
            return alert("diameter inner < outer");
        }
        var html = '<div class="' + cls + '">\n';
        for (var i = 0; i < side; i++) {
            var lic = "s" + i;
            html += '<div class="tcface ' + lic + '"></div>\n';
        }
        html += '</div>';
        var style = {};
        style[c] = {
            width: w + "px",
            height: w + "px",
            "transform-style": "preserve-3d"
        };
        style[c + " .tcface"] = {
            width: sw + "px",
            height: sw + "px",
            "box-sizing": "content-box",
            border: (w - sw ) + "px solid red",
            "border-radius": "50%",
            position: "absolute"
        };
        for (var i = 0; side > i; i++) {
            style[c + " .s" + i] = {
                "transform": "translateZ(" + i + "px)"
            };
            if (i == 0 || i == side - 1) {
                style[c + " .s" + i]["border-color"] = "blue"
            }
        }
        return {
            style: style,
            html: html
        };
    },
    prism: function (params, cls) {
        var html = '<div class="' + cls + '">\n' +
            '<div class="tcface sbottom"></div>\n' +
            '<div class="tcface sfront"></div>\n' +
            '    <div class="tcface sback"></div>\n' +
            '   <div class="tcface sleft"></div>\n' +
            '\t<div class="tcface sright"></div>\n' +
            '</div>';
        var c = "." + cls,
            w = params.w || 100,
            h = params.h || 100,
            v = params.v || 100;
        var angle = Math.atan(h / v / 2) * 180 / Math.PI, sidev = Math.sqrt(h * h / 4 + v * v);
        var style = {};
        style[c] = {
            width: w + "px",
            height: h + "px",
            "transform-style": "preserve-3d"
        };
        style[c + " .tcface"] = {
            width: "100%",
            height: "100%",
            position: "absolute"
        };
        style[c + " .sfront"] = {
            height: sidev + "px",
            "transform-origin": "50% 0",
            background: randomColor(),
            "transform": "rotateX(-" + angle + "deg)"
        };
        style[c + " .sback"] = {
            height: sidev + "px",
            "transform-origin": "50% 0",
            background: randomColor(),
            "transform": "rotateX(" + angle + "deg)"
        };
        style[c + " .sleft"] = {
            width: 0,
            height: 0,
            "border-left": h / 2 + "px solid transparent",
            "border-right": h / 2 + "px solid transparent",
            "border-bottom": v + "px solid " + randomColor(),
            transform: "rotateY(-90deg)",
            left: -h / 2 + "px"
        };
        style[c + " .sright"] = {
            width: 0,
            height: 0,
            "border-left": h / 2 + "px solid transparent",
            "border-right": h / 2 + "px solid transparent",
            "border-bottom": v + "px solid " + randomColor(),
            transform: "rotateY(-90deg)",
            left: (w - h / 2 ) + "px"
        };
        style[c + " .sbottom"] = {
            transform: "rotateX(90deg)",
            background: randomColor(),
            top: (v - h / 2) + "px"
        };
        return {
            style: style,
            html: html
        };
    },
    sphere: function (params, cls) {
        var c = "." + cls,
            w = params.w || 100,
            color = params.rc,
            side = params.s && params.s < 360 ? params.s : 180;
        var html = '<div class="' + cls + '">\n';
        for (var i = 0; i < side; i++) {
            var lic = "s" + i;
            html += '<div class="tcface ' + lic + '"></div>\n';
        }
        html += '</div>';
        var style = {};
        style[c] = {
            width: w + "px",
            height: w + "px",
            "transform-style": "preserve-3d"
        };
        style[c + " .tcface"] = {
            width: "100%",
            height: "100%",
            "border-radius": "50%",
            position: "absolute"
        };
        if (!color) {
            style[c + " .tcface"]['background'] = randomColor()
        }
        for (var i = 0; side > i; i++) {
            style[c + " .s" + i] = {
                "transform": "rotateY(" + 180 / side * (i + 1) + "deg)"
            };
            if (color) {
                style[c + " .s" + i]['background'] = randomColor()
            }
        }
        return {
            style: style,
            html: html
        };
    },
    fan: function (params, cls) {
        var c = "." + cls,
            w = params.w || 100,
            v = params.v || 100,
            side = params.s || 5,
            a = params.a || 60;
        if (params.auto == 1) {
            var perangle = (side - 2) * 180 / side / 2,
                radius = w / 2 * Math.tan(perangle / 180 * Math.PI);
            a = Math.asin(radius / v) * 180 / Math.PI;
        }
        if (!a) {
            alert("invalid size, can't make a pyramid");
            return
        }
        var style = {};
        style[c] = {
            width: w + "px",
            height: v + "px",
            "transform-style": "preserve-3d"
        };
        style[c + " .tcface"] = {
            "transform-origin": "0 0",
            "width": 0,
            "height": 0,
            "border-left": w / 2 + "px solid transparent",
            "border-right": w / 2 + "px solid transparent",
            "position": "absolute"
        };
        for (var i = 0; side > i; i++) {
            style[c + " .s" + i] = {
                "border-bottom": v + "px solid " + randomColor(),
                "transform": "rotateY(" + (i * 360 / side + 180 / side) + "deg) " +
                ( a ? "rotateX(" + a + "deg)" : "") + " translate3D(-50%,0,0)"
            };
        }
        var html = '<div class="' + cls + '">\n';
        for (var i = 0; i < side; i++) {
            var lic = "s" + i;
            html += '<div class="tcface ' + lic + '"></div>\n';
        }
        html += '</div>';
        return {
            style: style,
            html: html,
            transform: "rotateX(90deg)"
        };
    },
    polyhedron: function (params, cls) { // 多面框
        var c = "." + cls,
            w = params.w || 100,
            v = params.v || 100,
            side = params.s || 5;
        if (w > 500 || v > 500) {
            return alert("size max = 500");
        }
        if (params.s > 360) {
            return alert("face max = 360");
        }
        var style = {};
        style[c] = {
            width: w + "px",
            height: v + "px",
            "transform-style": "preserve-3d",
            position: "relative"
        };
        style[c + " .tcface"] = {
            "transform-origin": "0 0",
            "width": (w * Math.tan(Math.PI / side)) + "px",
            "height": v + "px",
            position: "absolute"
        };
        for (var i = 0; side > i; i++) {
            style[c + " .f" + i] = {
                "background-color": randomColor(),
                "transform": "rotateY(" + (i * 360 / side + 180 / side) + "deg) " +
                " translate3D(-50%,0," + w / 2 + "px)"
            };
        }
        var html = '<div class="' + cls + '">\n';
        for (var i = 0; i < side; i++) {
            var lic = "f" + i;
            html += '<div class="tcface ' + lic + '"></div>\n';
        }
        html += '</div>';
        return {
            style: style,
            html: html
        };
    },
    ladder: function () {}
};
