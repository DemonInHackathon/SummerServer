var windowHeight = document.body.clientHeight;

var canvas = document.getElementById("canvas");
canvas.width = windowHeight;
canvas.height = windowHeight;
var ctx = canvas.getContext('2d');
var offsetX = canvas.offsetLeft;
var offsetY = canvas.offsetTop;

ctx.rect(0,0,canvas.width,canvas.height);
ctx.fill();
ctx.globalCompositeOperation = 'destination-out';
var x = 10, y = 10;

function clearSomewhere() {
    console.log(x,y);
    var clearX = x - offsetX || 0;
    var clearY = y - offsetY || 0;
    ctx.beginPath();
    ctx.arc(clearX, clearY, 20, 0, Math.PI * 20);
    ctx.fill();
    x += 0.01;
    y += 0.01;
}

var x = 10, y = 10;
clearSomewhere(30, 40);
clearSomewhere(50, 60);

//setInterval(clearSomewhere, 100);

// 画点
var canvasPoints = document.getElementById("points");
canvasPoints.width = windowHeight;
canvasPoints.height = windowHeight;
var ctx2 = canvasPoints.getContext('2d');
var offsetX2 = canvasPoints.offsetLeft;
var offsetY2 = canvasPoints.offsetTop;

ctx2.rect(0,0,canvas.width,canvas.height);

function mouseClick(e){
  var rect = canvasPoints.getBoundingClientRect()
  var x = e.pageX - rect.left;
  var y = e.pageY - rect.top;
  ctx2.fillStyle = "#FACA00"
  ctx2.beginPath();
  ctx2.arc(x, y, 10, 0, Math.PI * 20);
  ctx2.fill();
}

canvasPoints.addEventListener("click", mouseClick, false);

$(".hp .color").width = 80%;