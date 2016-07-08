/* =========================================================== *
 * @site http://tt-cc.cn
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
		if( w > 500 || h > 500 || v > 500) {
			return alert("size max = 500");
		}
        var html = '<div class="' + cls + '">\n' +
            '    <div class="tcface top"></div>\n' +
            '    <div class="tcface left"></div>\n' +
            '    <div class="tcface front"></div>\n' +
            '    <div class="tcface bottom"></div>\n' +
            '    <div class="tcface right"></div>\n' +
            '    <div class="tcface back"></div>\n' +
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
    pyramid: function () {},
    cylinder: function () {},
    prism: function () {},
    sphere: function () {},
    fan: function () {},
    polyhedron: function (params, cls) { // 多面框
        var c = "." + cls,
            w = params.w || 100,
            v = params.v || 100,
            side = params.s || 5;
		if( w > 500 || v > 500) {
			return alert("size max = 500");
		}
		if( params.s > 360 ) {
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
            html += '    <div class="tcface ' + lic + '">' + lic + '</div>\n';
        }
        html += '</div>';
        return {
            style: style,
            html: html
        };
    },
    ladder: function () {}
};
