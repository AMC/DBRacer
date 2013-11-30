function Socket(host, port, file) {
  
  this.host = host;
  this.port = port;
  this.file = file;
  this.uri = "ws://" + host + ":" + port + "/" + file;
  this.connection = null;
  
  
  this.connect = function() {
    this.connection = new WebSocket(this.uri);
    
    this.connection.onopen = function(event) {
      console.log("Connection established.");
    }
    
    this.connection.onclose = function(event) {
      console.log("Connection closed.");
    }
    
    this.connection.onerror = function(error) {
      console.log("An error occurred.");
    }
     
    this.connection.onmessage = function(messageEvent) {
      var data = JSON.parse(messageEvent.data).data;
      console.log("receieved frame:\n" + messageEvent.data);
      
      if (messageEvent.channel = "CONNECTIONS")
        connectionsHandler(data);
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

    this.connection.send("TEST", data);
  }
  
  this.setStatus = function(status) {
    var data = {
      message : status,
      id      : myId,
    };
    
    this.connection.send("CONNECTIONS", data);
  }
  
}
