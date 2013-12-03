function connectionsHandler(data) {
  var id = "#btnStatus" + data.id;
  
  console.log(data);

  $(id).removeClass("btnStatusConnected btnStatusReady btnStatusDropped");
  
  if (data.message == "CONNECTED") {
    window.myId = data.id;
    window.myCar = new Racecar(myId);
    database.getTrack(1);
    
    $(id).addClass("btnStatusCurrentPlayer");
    $("#btnReady").on('click', function() {
      socket.setStatus(myId, "READY")
      myCar.setStatus("READY");
      $("#preGame").hide();
      $("#wrapper").show();
      waitForOther();
    });
    
    $(id).addClass("btnStatusConnected");
    $(id).text("Player " + data.id + " connected");
  }
  
  if (data.message == "NEW_CONNECTION") {
    $(id).addClass("btnStatusConnected");
    $(id).text("Player " + data.id + " connected");
    var tCar = new Racecar(data.id);
    opCar.push(tCar);
  }
      
  if (data.message == "READY") {
    $(id).addClass("btnStatusReady");
    $(id).text("Player " + data.id + " ready");
    

    if (data.id != myCar.id) {
      for (var i = 0; i < opCar.length; i++)
        if (opCar[i].id == data.id)
          opCar[i].status = "READY";
    }
    


      
  }
    
  if (data.message == "CLOSED_CONNECTION") {
    $(id).addClass("btnStatusDropped");
    $(id).text("Player " + data.id + " dropped");
  }

}


function dbracerHandler(data) {
  
}


// executes on completion of sql query
function dbCallback (data) {
  console.log("racecar callback");
  console.log(data);
  
  // we should probably use an array of racecards indexed by id
  // we can then do something like cars[data.id].updatePosition(x, y, z, angle, lap)
}


function trackHandler(data) {
  window.track = data;
  database.setTrack(data.id, data.width, data.height, data.track, data.grass, data.barrier, data.startX, data.startY);
}

