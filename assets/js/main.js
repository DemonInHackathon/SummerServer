$(document).ready(function(){
  $("#inputTag").focus();
  $("#inputTag").keydown(function(ev){
    var ev=ev||window.event;
    if(ev.keyCode==13) {
       window.location.href = "./room";
    }
  })
})