function connectionsHandler(data) {
  var id = "#btnStatus" + data.id;
  
  console.log(data);
  console.log("connection handler for: " + id);

  $(id).removeClass("btnStatus btnStatusConnected btnStatusReady btnStatusDropped");
  
  if (data.message == "CONNECTED" || data.message == "NEW_CONNECTION")
    $(id).addClass("btnStatusConnected");
    
  if (data.message == "READY")
    $(id).addClass("btnStatusReady");
    
  if (data.message == "CLOSED_CONNECTION")
    $(id).addClass("btnStatusDropped");

}