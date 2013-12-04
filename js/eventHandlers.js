function connectionsHandler(data) {
  var id = "#btnStatus" + data.id;
  
  //console.log(data);

  $(id).removeClass("btnStatusConnected btnStatusReady btnStatusDropped");
  
  if (data.message == "CONNECTED") {
    window.myId = data.id;
    window.myCar = new Racecar(myId);
    database.getTrack(1);
    connections++;
    
    $(id).addClass("btnStatusCurrentPlayer");
    $("#btnReady").on('click', function() {
      socket.setStatus(myId, "READY")
      myCar.setStatus("READY");
      $("#preGame").hide();
      $("#wrapper").show();

    });
    
    $(id).addClass("btnStatusConnected");
    $(id).text("Player " + data.id + " connected");
  }
  
  if (data.message == "NEW_CONNECTION") {
    $(id).addClass("btnStatusConnected");
    $(id).text("Player " + data.id + " connected");
    window.theirCar = new Racecar(data.id);
    connections++;
  }
      
  if (data.message == "READY") {
    $(id).addClass("btnStatusReady");
    $(id).text("Player " + data.id + " ready");
    ready++;    
      
    checkForReady();
  }
    
  if (data.message == "CLOSED_CONNECTION") {
    $(id).addClass("btnStatusDropped");
    $(id).text("Player " + data.id + " dropped");
    
    theirCar = null;
    ready--;
    connections--;
  }

}


function dbracerHandler(data) {
  //database.setPosition(data.carId, data.x, data.y, data.angle, data.lap);  
  theirCar.updatePosition(data.x, data.y, data.angle, data.lap);

/*  
  for (var i = 0; i < opCar.length; i++)
    if (opCar[i].id == data.carId)  {
      opCar[i].updatePosition(data.x, data.y, data.angle, data.lap);
      
    }
*/
}


// executes on completion of sql query
function dbCallback (data) {
  //console.log("racecar callback");
  //console.log(data);
  /*
  for (var i = 0; i < opCar.length; i++)
    if (opCar[i].id == data.id)
      opCar[data.id].updatePosition(data.x, data.y, data.angle, data.lap);
  */
}


function trackHandler(data) {
  window.track = data;
  database.setTrack(data.id, data.laps, data.width, data.height, data.track, data.grass, data.barrier, data.startX, data.startY);
}

function checkForReady() {
  if (connections == ready) {
    //console.log("start!");
      startGame();
  }
    
}