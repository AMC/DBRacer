function Racecar(id) {
  this.id     = id;
  
  this.source	= "";
  this.x		= 725;
  this.y		= 250;
  this.speed	= 0;
  this.angle	= 0;
  this.lap		= 0;
  this.status = 'waiting';
  
  var TO_RADIANS = Math.PI/180;
  
  // sets initial values from the track
  this.init = function(x, y, angle) {
    this.x     = x;
    this.y     = y;
    this.angle = angle;
  }
  
  
  // pulls other opponent's current position from database
  // and notifies dbCallback()
  this.getPosition = function() {
    //database.getPosition(this.id, dbCallback);
  }
  
  // updates the car from the callback
  this.updatePosition = function(x, y, angle, lap) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.lap = lap;
  }

  
  // pushes current position to database
  this.setPosition = function(x, y, angle, lap) {
    //this.updatePosition(x, y, angle, lap);
    //database.setPosition(this.id, x, y, angle, lap);
    var data = {
      carId     : carId,
      x         : x,
      y         : y,
      angle     : angle,
      lap       : lap,
    }
    
    socket.send("GAME_STATUS", data);
  }
  
  this.setStatus = function(status) {
    this.status = status;
  }
  
  // draws the car
  this.draw = function(car_context) {
    var selector = "#Player" + this.id + "Info";
    $(selector).text("x: " + this.x + " <br>y: " + this.y);
    car_context.save();
    car_context.translate(this.x, this.y);
    car_context.rotate(this.angle * TO_RADIANS);
    car_context.drawImage(this.source, -(this.source.width/2), -(this.source.height/2));
    car_context.restore();
  }
  
  this.getSpeed = function() {
	var dx = Math.sin(this.angle * TO_RADIANS) * this.speed;
	var dy = Math.cos(this.angle * TO_RADIANS) * this.speed * -1;
	this.x += dx;
	this.y += dy;
  }

	//FUNCTION MOVES CAR LEFT
	this.moveLeft = function(t) {
		this.angle -= this.speed*1.4;
		this.angle = (this.angle+360) % 360;
	}
	
	//FUNCTION MOVES CAR UP
	this.moveUp = function(t) {
		if (this.speed >= t.maxSpeed) {this.speed = t.maxSpeed;}
		else {this.speed += t.speedRate;}
	}
	
	//FUNCTION MOVES CAR RIGHT
	this.moveRight = function(t) {
		this.angle += this.speed*1.4;
		this.angle = (this.angle+360) % 360;
	}
	
	//FUNCTION MOVES CAR DOWN
	this.moveDown = function(t) {
		if (this.speed <= 0) {this.speed = 0;}
		else {this.speed -= t.speedRate;}
	}
  
  
  
}

