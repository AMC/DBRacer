function Racecar() {
  this.id     = Math.floor(Math.random()*999999);
  
  this.race		= 0;
  this.source	= "";
  this.x		= 0;
  this.y		= 0;
  this.dx		= 0;
  this.dy		= 0;
  this.speed	= 0;
  this.angle	= 0;
  this.lap		= 0;
  
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
  
  // draws the car
  this.draw = function(car_context) {
	/*
    carImage.save();
	carImage.clearRect(0,0,1000,600);
    carImage.translate(this.x, this.y);
    carImage.rotate(this.angle * TO_RADIANS);
    carImage.drawImage(this.image, -(this.source.width/2), -(this.image.height/2));
    carImage.restore();
	*/
  }
  

  
  
  
  
}

