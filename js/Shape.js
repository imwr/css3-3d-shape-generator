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
            "transform-style": "preserve-3d",
            position: "absolute"
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
    polyhedral: function () {},
    ladder: function () {}
};
