function Database() {
  
  this.connection = null;
  
  this.supported = function() {
    if (!window.openDatabase)
      return false;
    return true;
  }
  
  this.connect = function() {
    var name        = 'DBRacer';
    var version     = '1.0';
    var description = 'Car and Track information';
    
    this.connection = openDatabase(name, version, description, 2*1024*1024);
    
    if (!this.connection) {
      console.log("A database error occured.");
      return false;
    }
    
    console.log("Database connected.");
    
    this.createTables();      
  }
  
  this.createTables = function() {
    var query, query2;
    query  = "CREATE TABLE IF NOT EXISTS track ( "
           + "  id      UNIQUE, "
           + "  laps    INTEGER, "
           + "  width   INTEGER, "
           + "  height  INTEGER, "
           + "  track   TEXT, "
           + "  grass   TEXT, "
           + "  barrier TEXT, "
           + "  startX  INTEGER, "
           + "  startY  INTEGER "
           + ")";
    
    console.log("creating table: " + query);
    
    this.connection.transaction(function(tx) {
      tx.executeSql(query, [], function(tx, results){
        console.log("table created.");
      }, function (tx, err) {
        console.log("query failed.");
        console.log(err);
      });
    });
    
    query2 = "CREATE TABLE IF NOT EXISTS cars ( "
           + "  timestamp INTEGER PRIMARY KEY AUTOINCREMENT, "
           + "  carId     INTEGER, "
           + "  x         INTEGER, "
           + "  y         INTEGER, "
           + "  angle     INTEGER, "
           + "  lap       INTEGER "
           + ")";
    
    console.log("creating table: " + query2);
    
    this.connection.transaction(function(tx) {
      tx.executeSql(query2, [], function(tx, results){
        console.log("table created.");
      }, function (tx, err) {
        console.log("query failed.");
        console.log(err);
      });
    });
    
  }
  
  this.dropTables = function() {
    this.query("DROP TABLE track");
    this.query("DROP TABLE cars");    
  }
  
  
  this.getPosition = function (carId, callBack) {
    var query;
    var car;
    
    query = "SELECT carId, x, y, angle, lap FROM cars "
          + "WHERE carId = ? "
          + "AND timestamp = (SELECT MAX(timestamp) FROM cars "
          + "  WHERE carId = ?) ";
        
    console.log("executing query: " + query);  
    this.connection.transaction(function(tx) {
      tx.executeSql(query, [carId, carId], function(tx, results) {
        console.log("query ok");
        callBack(results.rows.item(0));
      }, function(tx, err) {
        console.log(err);
      });
    });
       
  }
  
  this.setPosition = function(carId, x, y, angle, lap) {
    var query;
    
    query = "INSERT INTO cars (carId, x, y, angle, lap)  "
          + "VALUES ( " 
          +   carId + ", " 
          +   x + ", " 
          +   y + ", "
          +   angle + ", "
          +   lap
          + ")";
    
    console.log("setting position of car " + carId);
    this.connection.transaction(function(tx) {
      tx.executeSql(query, [], function(tx, results){
        console.log("record inserted");
        
        if (carId == myId) {
          var data = {
            carId     : carId,
            x         : x,
            y         : y,
            angle     : angle,
            lap       : lap,
          }

          socket.send("GAME_STATUS", data);
        }
      });
    });    
  }


  // removes position data  
  this.endRace = function () {
    
    query = "DELETE FROM cars ";
        
    console.log("executing query: " + query);  
    this.connection.transaction(function(tx) {
      tx.executeSql(query, [], function(tx, results) {
        console.log("query ok");
        callBack(results.rows.item(0));
      }, function(tx, err) {
        console.log(err);
      });
    });
       
  }
  
  
  this.removeTrack = function(id) {
    var query;
    
    query = "DELETE FROM tracks "
          + "WHERE id = ? ";
    
    console.log("executing query: " + query);  
    this.connection.transaction(function(tx) {
      tx.executeSql(query, [id], function(tx, results) {
        console.log("query ok");
      }, function(tx, err) {
        console.log(err);
        
      });
    });     
  }
  
  this.setTrack = function(id, laps, width, height, track, grass, barrier, startX, startY) {
    var query;
    
    query = "INSERT INTO track (id, laps, width, height, track, grass, barrier, startX, startY) "
          + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    console.log("executing query: " + query);  
    this.connection.transaction(function(tx) {
      tx.executeSql(query, [id, laps, width, height, track, grass, barrier, startX, startY], function(tx, results) {
        console.log("query ok");
      }, function(tx, err) {
        console.log(err);

      });
    });
  }
  
  this.getTrack = function(id) {
    var query;
    
    // There is only one track
    id = 1;
    
    query = "SELECT * FROM track " 
          + "WHERE id = ?";
          
    console.log("executing query: " + query);  
    this.connection.transaction(function(tx) {
      tx.executeSql(query, [id], function(tx, results) {
        if (results.rows.length > 0) {
          console.log("loading track from database");
          window.myTrack = results.rows.item(0);
        } else {
          console.log("loading track from server");
          database.refreshTrack(id);  
        }
      }, function(tx, err) {
        console.log(err);
        
      });
    });


  }
  
  this.refreshTrack = function(id) {
    var data = {
      id : 1
    };
    
    socket.send("TRACK_DATA", data);
  }
  
  this.query = function(query) {
    console.log("executing query: ");
    console.log(query);
    this.connection.transaction(function(tx){
      tx.executeSql(query, [], function(tx, results) {
        console.log("query ok");
        
        for (var i = 0; i < results.rows.length; i++) {
          console.log(results.rows.item(i));
        }
      }, function(tx, err){
        console.log("query failed");
        console.log(err);
      });
    });
  }
  
  this.removeBarriers = function () {
    var query;
    query = "UPDATE track "
          + "SET barrier = "
          + "'0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0'";
          
    this.query(query);
  }

  
}