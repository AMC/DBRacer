function Socket(host, port, file) {
  
  this.host = host;
  this.port = port;
  this.file = file;
  this.uri = "ws://" + host + ":" + port + "/" + file;
  this.connection = null;
  
  
  this.connect = function() {
    this.connection = new WebSocket(this.uri);
    
    this.connection.onopen = function(event) {
      console.log("Socket connected.");
    }
    
    this.connection.onclose = function(event) {
      console.log("Connection closed.");
    }
    
    this.connection.onerror = function(error) {
      console.log("A socket error occurred.");
    }
     
    this.connection.onmessage = function(messageEvent) {
      var frame = JSON.parse(messageEvent.data);
      console.log("receieved frame:\n" + JSON.stringify(frame));
      
      if (frame.channel == "CONNECTION_STATUS")
        connectionsHandler(frame.data);
        
      if (frame.channel == "GAME_STATUS")
        dbracerHandler(frame.data);
        
      if (frame.channel == "TRACK_DATA")
        trackHanlder(frame.data);
        
    }
    
  }
  
  this.send = function(channel, data) {
    var frame;
    frame = {
      channel: channel,
      data: data
    }
    
    this.connection.send(JSON.stringify(frame));
  }
  
  this.close = function() {
    this.connection.close();
  }

  
  this.testSocket = function() {
    var data = {
      message : "work dammit!",
    };

    this.send("TEST", data);
  }
  
  this.setStatus = function(id, status) {
    var data = {
      message : status,
      id      : id,
    };
    
    this.send("CONNECTION_STATUS", data);
    connectionsHandler(data);
  }
  
}
