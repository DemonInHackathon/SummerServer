

$(function(){
  var socket = io(),
      $x = $('#wsInputX'),
      $y = $('#wsInputY');
  $('#submit').click(function(){
    socket.emit("update location", $x.val(), $y.val());
  });

  socket.on("update location", function(lx, ly) {
    $("h1").html("X:" + lx + " Y: " + ly);
  });
});