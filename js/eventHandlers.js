function connectionsHandler(data) {
  var id = "#btnStatus" + data.id;
  
  window.temp = data;
  
  console.log("connection handler for: " + id);
  console.log(data);

  $(id).removeClass("btnStatusConnected btnStatusReady btnStatusDropped");
  
  if (data.message == "CONNECTED") {
    window.myId = data.id;
    $("#btnReady").on('click', function() {
      socket.setStatus(myId, "READY")
      $("#preGame").hide();
      $("#game").show();
    });
    
    $(id).addClass("btnStatusConnected");
    $(id).text("Player " + data.id + " connected");
  }
  
  if (data.message == "NEW_CONNECTION") {
    $(id).addClass("btnStatusConnected");
    $(id).text("Player " + data.id + " connected");
  }
      
  if (data.message == "READY") {
    $(id).addClass("btnStatusReady");
    $(id).text("Player " + data.id + " ready");
    
    // TODO: when all connected players are ready, start countdown

  }
    
  if (data.message == "CLOSED_CONNECTION") {
    $(id).addClass("btnStatusDropped");
    $(id).text("Player " + data.id + " dropped");
  }

}


function dbracerHandler(data) {
  
}