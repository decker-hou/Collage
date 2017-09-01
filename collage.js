var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");


var width = 500;
var height = 700;

canvas.width = width;
canvas.height = height;

var img = document.getElementById("overlayImg");
ctx.drawImage(img, 0, 0);
var imgd = ctx.getImageData(0, 0, width, height);

var mx = 0;
var my = 0;
var radius = 40;
var mouseDown = false;

function distanceSq(x1, y1, x2, y2) {
    var dx = Math.abs(x1 - x2);
    var dy = Math.abs(y1 - y2);
    return dx * dx + dy * dy;
}

//source: https://stackoverflow.com/questions/5606552/how-to-get-pixel-coordinates-of-a-pixel-inside-an-html5-canvas
function erase() {
    for (var i = 0; i < imgd.data.length; i += 4) {
        var px = i / 4 % width;
        var py = (i/4-px) / width;
    
        if (distanceSq(px, py, mx, my) < (radius * radius) ) {
            imgd.data[i+3] = 0;
        }
    }
}

function down() {
    mouseDown = true;
    erase();
    redraw();
}

function up() {
    mouseDown = false;
    redraw();
}

function moveMouse(event) {
    mx = event.clientX - canvas.offsetLeft;
    my = event.clientY - canvas.offsetTop;
    if (mouseDown) { erase(); }
    redraw();
}

canvas.addEventListener("mousedown", down);
canvas.addEventListener("mouseup", up);
canvas.addEventListener("mousemove", moveMouse);
    
function redraw() {
    ctx.putImageData(imgd,0,0);
    ctx.beginPath();
    ctx.arc(mx, my, radius, 0, 2* Math.PI, false);
    ctx.stroke();
}

redraw();