$(function(){
  var socket = io.connect("/");
  window.socket = socket;
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
      var clearX = x*windowHeight - offsetX;
      var clearY = windowHeight - y*windowHeight - offsetY;
      ctx.beginPath();
      ctx.arc(clearX, clearY, 60, 0, Math.PI * 20);
      ctx.fill();
      console.log("画点");

  }

  window.clearSomewhere = clearSomewhere;

  /*socket.on("update location", function(lx, ly) {
    console.log("ON update Location");
    clearSomewhere(lx, ly);
  });*/


  // 画点
  var canvasPoints = document.getElementById("points");
  canvasPoints.width = windowHeight;
  canvasPoints.height = windowHeight;
  var ctx2 = canvasPoints.getContext('2d');
  var offsetX2 = canvasPoints.offsetLeft;
  var offsetY2 = canvasPoints.offsetTop;

  //ctx2.rect(0,0,canvas.width,canvas.height)
  ctx2.beginPath();
  var iceX = 619/2048*windowHeight;
  var iceY = windowHeight - 508/2048*windowHeight;
  var img = new Image();
  img.onload = function() {
    ctx2.drawImage(img, iceX, iceY, 30, 30);
  };
  img.src = "../images/iceCream.png";

  function mouseClick(e){
    ctx2.clearRect(0,0,canvas.width,canvas.height);
    var rect = canvasPoints.getBoundingClientRect();
    var x = e.pageX - rect.left;
    var y = e.pageY - rect.top;

    ctx2.fillStyle = "#FACA00";
    ctx2.beginPath();
    ctx2.arc(x, y, 8, 0, Math.PI * 20);
    ctx2.fill();
    var mapX = x/windowHeight;
    var mapY = 1 - y/windowHeight;
    window.socket.emit("set direction", mapX, mapY);

    //ctx2.fillStyle = "#444";
    ctx2.beginPath();
    var iceX = 619/2048*windowHeight;
    var iceY = windowHeight - 508/2048*windowHeight;
    var img = new Image();
    img.onload = function() {
      ctx2.drawImage(img, iceX, iceY, 40, 40);
    };
    img.src = "../images/iceCream.png";
    //ctx2.arc(iceX, iceY, 20, 0, Math.PI * 20);
    //ctx2.fill();
  }

  canvasPoints.addEventListener("click", mouseClick, false);

  /*socket.on("update status", function(heat, water, hp){
    console.log("O Update Status");
    document.getElementById("hp").style.width = (hp*100).toString() + "%";
    document.getElementById("heat").style.width = (heat*100).toString() + "%";
    document.getElementById("water").style.width = (water*100).toString() + "%";
  })*/

  window.socket.on("update infomation", function(lx, ly, heat, water, hp){
    console.log("On Update Infomation");
    clearSomewhere(lx, ly);
    document.getElementById("hp").style.width = (hp*100).toString() + "%";
    document.getElementById("heat").style.width = (heat*100).toString() + "%";
    document.getElementById("water").style.width = (water*100).toString() + "%";
  });
});
