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
var t = new Track();

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
var trackString = "0,5,5,5,5,5,5,5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,5,5,5,5,5,0,5,19,20,21,1,1,1,1,1,22,23,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,1,1,1,22,23,24,5,5,25,26,27,3,3,3,35,35,28,29,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,8,3,3,3,28,29,30,5,5,31,32,15,13,13,14,35,35,35,35,36,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,8,3,15,13,13,14,35,36,5,5,2,3,4,0,0,16,13,14,35,35,9,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,8,3,15,17,0,0,2,3,4,5,5,2,3,4,0,0,0,0,16,14,35,35,9,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,8,3,15,17,0,0,0,2,3,4,5,5,2,3,4,0,0,0,0,0,37,38,35,35,9,11,0,0,0,0,0,0,0,0,0,0,0,10,1,8,3,15,17,0,0,0,0,2,3,4,5,5,2,3,4,0,0,0,0,0,43,44,45,35,35,9,11,0,0,0,0,0,0,0,0,10,1,8,3,3,15,17,0,5,5,0,0,2,3,4,5,5,2,3,4,0,0,5,5,0,49,50,51,14,3,3,9,11,0,0,0,0,0,10,1,8,3,3,15,13,17,0,0,5,5,0,0,2,3,4,5,5,2,3,4,0,0,5,5,0,0,0,0,16,14,3,3,9,1,1,1,1,1,8,3,3,15,13,17,0,0,0,5,5,5,0,0,2,3,4,5,5,2,3,4,0,0,5,5,5,0,0,0,0,16,14,3,3,3,3,3,3,3,3,15,13,17,0,0,0,5,5,5,0,5,0,0,2,3,4,5,5,2,3,4,0,0,5,0,5,5,0,0,0,0,16,13,13,13,13,13,13,13,13,17,0,0,0,0,5,5,0,0,0,5,0,0,55,56,57,5,5,2,3,4,0,0,5,0,0,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,0,0,0,0,5,0,0,2,3,4,5,5,2,3,4,0,0,5,0,0,0,5,5,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,0,0,0,0,0,0,5,0,0,2,3,4,5,5,2,3,4,0,0,5,0,0,0,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,0,0,0,0,0,0,5,0,0,2,3,4,5,5,2,3,4,0,0,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,2,3,4,5,5,2,3,4,0,0,0,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,0,0,2,3,4,5,5,2,3,4,0,0,0,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,0,2,3,4,5,5,2,3,9,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,4,5,5,2,3,3,9,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,4,5,5,37,38,3,3,9,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,8,41,42,5,5,43,44,45,45,45,45,45,45,45,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,47,48,5,5,49,50,51,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,52,53,54,5,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0";
var trackArray = trackString.split(',');
var grassString = "0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0";
var grassArray = grassString.split(',');
var barrierString = "1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,0,0,0,0,0,1,1,0,0,0,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1";
var barrierArray = barrierString.split(',');

//FUNCTION DRAWS THE BACKGROUND GRASS AND TRACK
function drawBG()
{
	var i=0, j=0, k=0, xx=0, yy=0;
	for (i=0;i<t.mapHeight;i++)
	{
		for (j=0;j<t.mapWidth;j++)
		{
			c_context.drawImage(grass,j*t.tileSize,i*t.tileSize);
			xx = (trackArray[j+i*t.mapWidth]-1)%t.trackWidth;
			yy = Math.floor((trackArray[j+i*t.mapWidth]-1)/t.trackWidth);
			if (trackArray[j+i*t.mapWidth] != 0)
			{
				c_context.drawImage(track,xx*t.tileSize,yy*t.tileSize,t.tileSize,t.tileSize,j*t.tileSize,i*t.tileSize,t.tileSize,t.tileSize);
			}
		}
	}
}//end drawBG

function getNewPosition()
{
	//GET OTHER CAR(S)' INFO
	//opCar.getPosition();
	
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
	if ((gridx == 1 && gridy == 13) || (gridx == 2 && gridy == 13) || (gridx == 3 && gridy == 13) || (gridx == 4 && gridy == 13) || (gridx == 5 && gridy == 13))
	{
		lapMarker = 1;
	}
	if ((gridx == 34 && gridy == 11) || (gridx == 35 && gridy == 11) || (gridx == 36 && gridy == 11) || (gridx == 37 && gridy == 11) || (gridx == 38 && gridy == 11))
	{
		if (lapMarker == 1)
		{
			lapMarker = 0;
			myCar.lap += 1;
			document.getElementById("myLaps").innerHTML = myCar.lap;
		}
	}
	
	//DRAWS LOCATION OF PLAYER'S CAR, AND EVERY CAR IN OPCAR ARRAY
	ccar_context.clearRect(0,0,t.width,t.height);
	myCar.draw(ccar_context);
	for (var i = 0; i < opCar.length; i++)
	{
		opCar[i].draw(ccar_context);
	}
	
	//SENDS CAR INFO TO OTHER MACHINE
	//myCar.setPosition(myCar.x, myCar.x, myCar.angle, myCar.lap);
	
	//CHECKS IF A PLAYER HAS WON. IF SO, THEN END GAME
	checkEnd();
} //end getNewPosition()

//GET CURRENT AND PREVIOUS TILE LOCATIONS (TO CHECK FOR LAPPING)
function getGridPosition()
{
	prevx = gridx;
	prevy = gridy;
	gridx = Math.floor(myCar.x/t.tileSize);
	gridy = Math.floor(myCar.y/t.tileSize);
} //end getGridPosition()

//CHECKS GRID FOR GRASS OR BARRIER AND EITHER SLOW OR DEFLECT CAR
function checkObstacles()
{
	//CHECK IF ON GRASS AND REDUCE SPEED IF TRUE
	if (grassArray[gridx+gridy*t.mapWidth] == 1)
	{
		if (myCar.speed >= t.maxGrass) {myCar.speed = t.maxGrass;}
	}
	//CHECK IF HIT CAR AND DEFLECT
	if (barrierArray[gridx+gridy*t.mapWidth] == 1)
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
} //end checkObstacles()

//FUNCTION CHECKS TO SEE IF SOMEONE FINISHED RACE, AND SHOWS RESULTS SCREEN
function checkEnd()
{
	//CHECK IF A PLAYER HAS FINISHED
	var isEnd = 0;
	if (myCar.lap >= t.maxLaps) {isEnd = 1;}
	for (var i = 0; i < opCar.length; i++)
	{
		if (opCar[i].lap >= t.maxLaps) {isEnd = 2;}
	}
	
	//IF END, THEN STOP CAR MOVEMENTS AND SHOW RESULTS
	if (isEnd > 0)
	{
		//STOPS GAME LOOP
		clearInterval(mainloop);
		
		//STORES THE PLACES OF THE CARS TO SHOW IN RESULTS
		if (isEnd == 1)
		{
			document.getElementById("myResults").innerHTML = myCar.name+": 1st";
			document.getElementById("opResults").innerHTML = "Opponent: 2nd";
		}
		else
		{
			document.getElementById("opResults").innerHTML = "Opponent: 1st";
			document.getElementById("myResults").innerHTML = myCar.name+": 2nd";
		}
		
		//REMOVES TRACK TO SHOW RESULTS
		var element = document.getElementById("wrapper");
		element.parentNode.removeChild(element);
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
	myCar.source = carImage1;

	
	
	//GET THE MAP ARRAYS FROM THE DATABASE TO DRAW THE GRASS, TRACK, AND BARRIERS
	/*
	trackArray = myTrack.track.split(,);  
	grassArray = myTrack.grass.split(,);
	barrierArray = myTrack.barriers.split(,);
	*/
	
	//DRAW THE BACKGROUND GRASS AND TRACK
	drawBG();
	
	
	//SETS CAR POSITION BASED ON ORDER OF ARRIVAL. IF FIRST, THEN WAIT FOR OTHER
	
	
	//GET OTHER CAR(S)' INFO
	//opCar.getPosition();
	
	//database.setState("run");
	
	//DRAW THE CARS AND START THE TIMER
	
	while (myCar.status != "READY");
	
	var ready; 
	while (ready != opCar.length) {
    ready = 0;
    for (i = 0; i < opCar.length; i++)
      if (opCar[i].status == "READY")
        ready++;
	}
	
	init();
}

//PAGE'S ONLOAD FUNCTION (DOES NOTHING RIGHT NOW)
function init() {

  
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