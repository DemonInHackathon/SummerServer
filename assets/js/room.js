$(function(){
  var socket = io();
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

  function clearSomewhere(x, y) {
      var clearX = x/2048*windowHeight - offsetX;
      var clearY = windowHeight - y/2048*windowHeight - offsetY;
      ctx.beginPath();
      ctx.arc(clearX, clearY, 20, 0, Math.PI * 20);
      ctx.fill();
  }

  socket.on("update location", function(lx, ly) {
    clearSomewhere(lx, ly);
  });


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
    ctx2.arc(x, y, 8, 0, Math.PI * 20);
    ctx2.fill();
    var mapX = x/windowHeight*2048;
    var mapY = 20048 - y/windowHeight*2048;
    socket.emit("set direction", $x.val(mapX), $y.val(mapY));
  }

  canvasPoints.addEventListener("click", mouseClick, false);

  function getHP(value) {
    document.getElementById("hp").style.width = value;
  }

  function getHeat(value) {
    document.getElementById("heat").style.width = value;
  }

  function getWater(value) {
    document.getElementById("water").style.width = value;
  }
});
