//DECLARE AND ASSIGN GRASS AND TRACK IMAGES
var grass = new Image();
grass.src = "assets/grassTile.jpg";
var track = new Image();
track.src = "assets/trackTiles.png";

//DECLARE REFERENCE TO BACKGROUND CANVAS
var c = document.getElementById("canvasBackground");
var c_context = c.getContext("2d");

//DECLARE REFERENCE TO CAR CANVAS
var ccar = document.getElementById("carCanvas");
var ccar_context = ccar.getContext("2d");

//DECLARE CAR GLOBAL VARS
//var myCar = new Racecar();
var opCar = new Array();

//TRACK INSTANCE: STORES MAP'S DIMENSIONS AND # TILES, AND SPEED LIMITS
var dTrack = new TrackData();

//DECLARE AND INITIALIZE GLOBAL VARS
var start = 5;
var TO_RADIANS = Math.PI/180;
var intro;
var gridx = 0;
var gridy = 0;
var prevx = 0;
var prevy = 0;
var lapMarker = 0;

//DECLARE THE 2D ARRAYS THAT HOLD THE GRASS AND TRACK TILE IDS
/**########GET RID OF THE STRINGS HERE ONCE THE DATABASE ARRAYS WORK#########**/
var trackString = "0,5,5,5,5,5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,5,5,5,0,5,19,20,21,1,1,1,1,22,23,24,0,0,0,0,0,0,0,0,0,0,0,0,0,10,1,1,1,22,23,24,5,5,25,26,27,7,7,7,7,28,29,30,0,0,0,0,0,0,0,0,0,0,0,0,10,8,7,7,7,28,29,30,5,5,31,32,15,13,13,13,13,14,35,36,0,0,0,0,0,0,0,0,0,0,0,10,8,7,15,13,13,14,35,36,5,5,2,3,4,5,5,5,0,2,3,4,0,0,0,0,0,0,0,0,0,0,10,8,7,15,17,0,0,2,3,4,5,5,16,14,9,11,5,5,0,37,38,9,1,1,1,1,1,1,1,1,1,1,8,7,15,17,5,5,0,2,3,4,5,5,0,2,3,4,5,5,0,43,44,45,7,7,7,7,7,7,7,7,7,7,7,15,17,0,5,5,0,2,3,4,5,5,0,2,3,4,5,5,0,49,50,51,13,13,13,13,13,13,13,13,13,13,13,17,0,0,5,5,0,2,3,4,5,5,0,2,3,4,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,5,0,2,3,4,5,5,10,8,15,17,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,55,56,57,5,5,2,3,4,0,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,2,3,4,5,5,2,3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,4,5,5,37,38,9,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,8,41,42,5,5,43,44,45,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,46,47,48,5,5,49,50,51,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,52,53,54,5,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0";
var trackArray = trackString.split(',');
var grassString = "1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1";
var grassArray = grassString.split(',');
var barrierString = "1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1";
var barrierArray = barrierString.split(',');

//FUNCTION DRAWS THE BACKGROUND GRASS AND TRACK
function drawBG()
{
	var i=0, j=0, k=0, xx=0, yy=0;
	for (i=0;i<dTrack.mapHeight;i++)
	{
		for (j=0;j<dTrack.mapWidth;j++)
		{
			c_context.drawImage(grass,j*dTrack.tileSize,i*dTrack.tileSize);
			xx = (trackArray[j+i*dTrack.mapWidth]-1)%dTrack.trackWidth;
			yy = Math.floor((trackArray[j+i*dTrack.mapWidth]-1)/dTrack.trackWidth);
			if (trackArray[j+i*dTrack.mapWidth] != 0)
			{
				c_context.drawImage(track,xx*dTrack.tileSize,yy*dTrack.tileSize,dTrack.tileSize,dTrack.tileSize,j*dTrack.tileSize,i*dTrack.tileSize,dTrack.tileSize,dTrack.tileSize);
			}
		}
	}
}//end drawBG

function getNewPosition()
{
	//MOVE CAR BASED ON CURRENT KEY DOWN STATES
	if (keyState[65]) {myCar.moveLeft(t);}
	if (keyState[87]) {myCar.moveUp(t);}
	if (keyState[68]) {myCar.moveRight(t);}
	if (keyState[83]) {myCar.moveDown(t);}
	
	//CHECKS OBSTACLES (GRASS AND BARRIERS)
	checkObstacles();
	
	//UPDATE CAR'S POSITION BASED ON SPEED AND ANGLE
	myCar.getSpeed();
	
	//GET CAR'S POSITION ON GRID
	getGridPosition();
	
	//CHECK IF CAR HIT LAP MARKERS OR FINISH LINE AND ADJUST LAP MARKER AND LAPS
	if ((gridx == 1 && gridy == 9) || (gridx == 2 && gridy == 9) || (gridx == 3 && gridy == 9) || (gridx == 4 && gridy == 9))
	{
		lapMarker = 1;
	}
	if ((gridx == 27 && gridy == 9) || (gridx == 28 && gridy == 9) || (gridx == 29 && gridy == 9) || (gridx == 30 && gridy == 9))
	{
		if (lapMarker == 1)
		{
			lapMarker = 0;
			myCar.lap += 1;
			document.getElementById("myLaps").innerHTML = myCar.lap;
		}
	}
	
	//DRAWS LOCATION OF PLAYER'S CAR, AND EVERY CAR IN OPCAR ARRAY
	ccar_context.clearRect(0,0,dTrack.width,dTrack.height);
	myCar.draw(ccar_context);
	for (var i = 0; i < opCar.length; i++)
	{
		opCar[i].draw(ccar_context);
	}
	
	//CHECKS IF A PLAYER HAS WON. IF SO, THEN END GAME
	checkEnd();
} //end getNewPosition()

//GET CURRENT AND PREVIOUS TILE LOCATIONS (TO CHECK FOR LAPPING)
function getGridPosition()
{
	prevx = gridx;
	prevy = gridy;
	gridx = Math.floor(myCar.x/dTrack.tileSize);
	gridy = Math.floor(myCar.y/dTrack.tileSize);
} //end getGridPosition()

//CHECKS GRID FOR GRASS OR BARRIER AND EITHER SLOW OR DEFLECT CAR
function checkObstacles()
{
	//CHECK IF ON GRASS AND REDUCE SPEED IF TRUE
	if (gridx == prevx && gridy == prevy) {}
	else
	{
		if (grassArray[gridx+gridy*dTrack.mapWidth] == 1)
		{
			if (myCar.speed >= dTrack.maxGrass) {myCar.speed = dTrack.maxGrass;}
		}
		//CHECK IF HIT CAR AND DEFLECT
		if (barrierArray[gridx+gridy*dTrack.mapWidth] == 1)
		{
			if (gridx-prevx == 0)
			{
				//CAR HIT A BARRIER VERTICALLY
				myCar.angle = (180+360) - myCar.angle;
			}
			else
			{
				//CAR HIT A BARRIER HORIZONTALLY
				myCar.angle = 360 - myCar.angle;
			}
		}
	}
} //end checkObstacles()

//FUNCTION CHECKS TO SEE IF SOMEONE FINISHED RACE, AND SHOWS RESULTS SCREEN
function checkEnd()
{
	//CHECK IF A PLAYER HAS FINISHED
	var isEnd = 0;
	if (myCar.lap >= dTrack.maxLaps) {isEnd = 1;}
	for (var i = 0; i < opCar.length; i++)
	{
		if (opCar[i].lap >= dTrack.maxLaps) {isEnd = 2;}
	}
	
	//IF END, THEN STOP CAR MOVEMENTS AND SHOW RESULTS
	if (isEnd > 0)
	{
		//STOPS GAME LOOP
		clearInterval(mainloop);
		
		//STORES THE PLACES OF THE CARS TO SHOW IN RESULTS
		if (isEnd == 1)
		{
			document.getElementById("youWin").style.display = inherit;
		}
		else
		{
			document.getElementById("youLose").style.display = inherit;
		}
	}
} //end checkEnd()





//this function waits until the other racer is ready to go
function waitForOther()
{
	//INIT CAR IMAGES
	var carImage1 = new Image();
	carImage1.src = "assets/car1.png";
	var carImage2 = new Image();
	carImage2.src = "assets/car2.png";
	var carImage3 = new Image();
	carImage3.src = "assets/car3.png";
	var carImage4 = new Image();
	carImage4.src = "assets/car4.png";
	
	//GET SELECTED CAR IMAGE AND SET THE CAR TO THAT IMAGE
	//myCar.source = carImage1;
	
	
	//GET THE MAP ARRAYS FROM THE DATABASE TO DRAW THE GRASS, TRACK, AND BARRIERS
	/*
	trackArray = myTrack.track.split(",");  
	grassArray = myTrack.grass.split(",");
	barrierArray = myTrack.barriers.split(",");
	*/
	
	//DRAW THE BACKGROUND GRASS AND TRACK
	drawBG();
	
	//BUSY WAIT UNTIL ALL CARS ARE READY
	while (myCar.status != "READY");
	
	var ready; 
	while (ready != opCar.length) {
    ready = 0;
    for (i = 0; i < opCar.length; i++)
      if (opCar[i].status == "READY")
        ready++;
	}
	
	
	
	if (myCar.id == 1 || myCar.id == 5)			{myCar.source = carImage1;}
	else if (myCar.id == 2 || myCar.id == 6)	{myCar.source = carImage2;}
	else if (myCar.id == 3)						{myCar.source = carImage3;}
	else if (myCar.id == 4)						{myCar.source = carImage4;}
	//CHANGE THE OTHER CARS' COLORS
	for (var i = 0; i < opCar.length; i++)
	{
		if (opCar[i].id == 1 || opCar[i].id == 5)		{opCar[i].source = carImage1;}
		else if (opCar[i].id == 2 || opCar[i].id == 6)	{opCar[i].source = carImage2;}
		else if (opCar[i].id == 3)						{opCar[i].source = carImage3;}
		else if (opCar[i].id == 4)						{opCar[i].source = carImage4;}
	}
	
	init();
}

function startGame()
{
	//DRAW THE BACKGROUND GRASS AND TRACK
	drawBG();
	
	//INIT CAR IMAGES
	var carImage1 = new Image();
	carImage1.src = "assets/car1.png";
	var carImage2 = new Image();
	carImage2.src = "assets/car2.png";
	var carImage3 = new Image();
	carImage3.src = "assets/car3.png";
	var carImage4 = new Image();
	carImage4.src = "assets/car4.png";
	
	if (myCar.id == 1 || myCar.id == 5)			{myCar.source = carImage1;}
	else if (myCar.id == 2 || myCar.id == 6)	{myCar.source = carImage2;}
	else if (myCar.id == 3)						{myCar.source = carImage3;}
	else if (myCar.id == 4)						{myCar.source = carImage4;}
	//CHANGE THE OTHER CARS' COLORS
	for (var i = 0; i < opCar.length; i++)
	{
		if (opCar[i].id == 1 || opCar[i].id == 5)		{opCar[i].source = carImage1;}
		else if (opCar[i].id == 2 || opCar[i].id == 6)	{opCar[i].source = carImage2;}
		else if (opCar[i].id == 3)						{opCar[i].source = carImage3;}
		else if (opCar[i].id == 4)						{opCar[i].source = carImage4;}
	}
	
	getNewPosition();
	intro = setInterval(onTimer,1000);
}

//PAGE'S ONLOAD FUNCTION (DOES NOTHING RIGHT NOW)
function init()
{
	getNewPosition();
	intro = setInterval(onTimer,1000);
}

//FUNCTION COUNTS DOWN THE TIMER AND SETS THE INTERVAL TO getNewPosition
function onTimer()
{
	getNewPosition();
	start--;
	if (start > 0)
	{
		document.getElementById("startLabel").innerHTML = start;
	}
	else if (start == 0)
	{
		document.getElementById("startLabel").innerHTML = "GO!";
		mainloop = setInterval(getNewPosition, 20);
	}
	else if (start == -2)
	{
		document.getElementById("startLabel").innerHTML = "";
		clearInterval(intro);
	}
}

//STORES THE KEY STATES PRESSED AND RELEASED IN ARRAYS
//each key pressed is stored in keyState array as true
var keyState = {};    
window.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);
//if a key is released, it is marked false in keyState array
window.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
},true);