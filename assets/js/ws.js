

$(function(){
  var socket = io(),
      $x = $('#wsInputX'),
      $y = $('#wsInputY');
  $('#submit').click(function(){
    socket.emit("location update",{x: $x.val(), y: $y.val()});
  });

  socket.on("location update", function(message) {
    $("h1").html("X:" + message.x + " Y: " + message.y);
  });
});