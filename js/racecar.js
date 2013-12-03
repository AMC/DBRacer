function Racecar(id) {
  this.id     = myId;
  
  this.race		= 0;
  this.source	= "";
  this.x		= 950;
  this.y		= 325;
  this.speed	= 0;
  this.angle	= 180;
  this.lap		= 0;
  this.name		= "";
  this.status = 'waiting';
  
  var TO_RADIANS = Math.PI/180;
  
  // sets initial values from the track
  this.init = function(race, x, y, angle) {
    this.race  = race;
    this.x     = x;
    this.y     = y;
    this.angle = angle;
  }
  
  
  // pulls other opponent's current position from database
  // and notifies dbCallback()
  this.getPosition = function() {
    database.getPosition(this.race, this.id, dbCallback);
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
    this.updatePosition(x, y, angle, lap);
    database.setPosition(this.race, this.id, x, y, angle, lap);
  }
  
  this.setStatus = function(status) {
    this.status = status;
  }
  
  // draws the car
  this.draw = function(car_context) {
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

