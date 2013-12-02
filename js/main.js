//DECLARE AND ASSIGN GRASS AND TRACK IMAGES
var grass = new Image();
grass.src = "assets/grassTile.jpg";
var track = new Image();
track.src = "assets/trackTiles.png";

//DECLARE REFERENCE TO BACKGROUND CANVAS
var c = document.getElementById("background");
var c_context = c.getContext("2d");

//DECLARE REFERENCE TO CAR CANVAS
var ccar = document.getElementById("carCanvas");
var ccar_context = ccar.getContext("2d");

//DECLARE CAR GLOBAL VARS
var myCar = new Racecar();
var opCar = new Array(1);

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
var trackString = "0,0,0,5,5,5,5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,0,0,0,0,0,0,0,0,19,20,21,1,1,1,1,1,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,19,20,21,22,23,24,0,0,0,25,26,15,13,13,13,13,14,9,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,25,26,27,28,29,30,5,0,5,31,15,17,0,0,0,0,16,14,9,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,31,15,13,14,35,36,5,5,10,8,4,5,0,0,0,0,0,16,14,9,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,2,4,5,2,3,4,5,5,2,15,17,5,5,5,5,5,5,0,16,14,9,1,1,1,1,11,0,0,0,0,10,1,1,1,1,11,0,0,5,0,2,4,5,2,3,4,5,5,2,4,5,0,0,0,0,0,0,5,0,16,14,28,28,28,28,9,1,1,1,1,8,28,28,28,28,9,11,0,5,0,2,4,5,2,3,4,5,5,2,4,5,10,1,1,1,22,23,24,5,0,16,13,13,13,13,13,13,13,13,13,13,13,13,13,14,28,9,11,5,0,2,4,5,2,3,4,5,5,37,9,11,2,15,13,13,14,29,30,0,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,16,14,28,4,5,0,2,4,5,2,3,4,5,0,43,44,9,8,4,0,5,16,14,36,5,19,20,21,1,1,1,1,1,1,1,22,23,24,5,0,0,16,14,4,5,0,2,4,5,2,3,4,5,0,49,50,51,13,17,0,5,0,2,4,5,25,26,27,7,7,7,7,7,7,7,28,29,30,5,0,0,0,2,4,0,5,2,4,5,2,3,4,5,0,0,0,0,0,5,5,5,0,2,4,5,31,32,15,13,13,13,13,13,13,13,14,35,36,5,0,0,0,2,4,0,5,2,4,5,55,56,57,5,0,5,5,5,5,0,0,5,0,2,4,5,2,32,4,5,5,0,0,0,5,5,2,35,4,5,0,0,0,2,4,0,5,2,4,5,2,3,4,5,5,10,1,1,1,11,0,5,0,2,4,5,2,32,4,0,0,0,5,0,0,0,2,35,4,5,0,0,0,2,4,0,5,2,4,5,2,3,4,5,5,2,15,13,14,9,11,5,10,8,4,5,37,38,9,22,23,24,5,19,20,21,8,41,42,5,0,0,0,2,9,11,10,8,4,5,2,3,4,5,5,2,4,5,16,14,9,1,8,28,4,5,43,44,45,28,29,30,5,25,26,27,46,47,48,5,0,0,0,37,38,9,8,41,42,5,2,3,4,5,5,2,4,0,0,16,14,28,28,28,4,5,49,50,51,14,35,36,5,31,32,15,52,53,54,5,0,0,0,43,44,45,46,47,48,5,2,3,4,5,5,2,4,0,0,0,16,13,13,13,17,5,0,0,0,2,35,4,5,2,35,4,0,0,0,0,5,5,0,49,50,51,52,53,54,5,2,3,4,5,5,2,9,11,0,0,5,5,5,5,5,0,0,0,0,16,14,4,5,2,15,17,0,0,0,0,0,0,5,5,5,5,5,5,5,0,2,3,4,5,5,2,45,9,11,0,0,0,0,0,0,0,0,0,0,0,2,4,5,2,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,4,5,5,2,45,45,9,1,1,1,1,1,11,0,0,0,0,0,2,4,5,2,4,0,0,0,0,0,0,0,0,0,10,1,1,1,1,1,8,41,42,5,5,16,13,13,13,13,13,14,45,45,9,1,1,1,1,1,8,4,5,2,9,1,1,1,1,1,1,1,1,1,8,3,3,3,3,3,3,47,48,5,0,0,0,0,0,0,0,16,13,13,13,13,13,13,13,13,13,17,5,16,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,52,53,54,0,0,0,0,0,0,5,5,5,5,5,5,5,5,5,5,5,5,5,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0";
var trackArray = trackString.split(',');
var grassString = "1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,1,0,0,0,1,1,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,0,0,0,1,1,0,0,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,0,0,1,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,1,1,0,0,1,0,0,0,1,1,1,0,0,0,0,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,1,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,1,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,1,1,1,1,1,1,1,0,0,0,1,1,1,1,0,0,1,1,0,0,1,0,0,0,1,1,0,0,0,0,0,1,1,1,0,0,1,0,0,0,1,1,1,1,1,1,1,0,0,0,1,1,1,1,0,0,1,1,0,0,1,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1,0,0,0,1,1,0,0,1,1,1,0,0,0,0,0,1,1,1,1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1";
var grassArray = grassString.split(',');
var barrierString = "0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,1,1,0,0,0,0,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,1,1,1,1,1,1,0,0,1,0,0,0,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1";
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
	if (keyState[65]) {moveLeft();}
	if (keyState[87]) {moveUp();}
	if (keyState[68]) {moveRight();}
	if (keyState[83]) {moveDown();}
	
	//GET CAR'S POSITION ON GRID
	getGridPosition();
	
	//CHECK IF CAR HIT LAP MARKERS OR FINISH LINE AND ADJUST LAP MARKER AND LAPS
	if ((gridx == 8 && gridy == 11) || (gridx == 9 && gridy == 11) || (gridx == 10 && gridy == 11))
	{
		lapMarker = 1;
	}
	if ((gridx == 36 && gridy == 11) || (gridx == 37 && gridy == 11) || (gridx == 38 && gridy == 11))
	{
		if (lapMarker == 1)
		{
			lapMarker = 0;
			myCar.lap += 1;
			document.getElementById("myLaps").innerHTML = myCar.lap;
		}
	}
	
	//CHECKS OBSTACLES (GRASS AND BARRIERS)
	checkObstacles();
	
	//UPDATE CAR'S POSITION BASED ON SPEED AND ANGLE
	speedXY();
	myCar.x += myCar.dx;
	myCar.y += myCar.dy;
	
	//DRAWS LOCATION OF PLAYER'S CAR, AND EVERY CAR IN OPCAR ARRAY
	ccar_context.clearRect(0,0,t.width,t.height);
	drawRotatedImage(ccar_context,myCar.source,myCar.x,myCar.y,myCar.angle);
	for (var i = 0; i < opCar.length; i++)
	{
		drawRotatedImage(ccar_context,opCar[i].source,opCar[i].x,opCar[i].y,opCar[i].angle);
	}
	
	//SENDS CAR INFO TO OTHER MACHINE
	//myCar.setPosition(myCar.x, myCar.x, myCar.angle, myCar.lap);
	
	//CHECKS IF A PLAYER HAS WON. IF SO, THEN END GAME
	checkEnd();
} //end getNewPosition()

//FUNCTION DRAWS THE CAR ON ITS CANVAS
function drawRotatedImage(carImage, image, x, y, angle)
{
    carImage.save();
	//carImage.clearRect(0,0,1000,600);
    carImage.translate(x, y);
    carImage.rotate(angle * TO_RADIANS);
    carImage.drawImage(image, -(image.width/2), -(image.height/2));
    carImage.restore();
}

//CONVERT THE CAR'S SPEED TO A DELTA X AND DELTA y
function speedXY()
{
	myCar.dx = Math.sin(myCar.angle * TO_RADIANS) * myCar.speed;
	myCar.dy = Math.cos(myCar.angle * TO_RADIANS) * myCar.speed * -1;
} //end speedXY()

//GET CURRENT AND PREVIOUS TILE LOCATIONS (TO CHECK FOR LAPPING)
function getGridPosition()
{
	prevx = gridx;
	prevy = gridy;
	gridx = Math.floor((myCar.x+myCar.dx)/t.tileSize);
	gridy = Math.floor((myCar.y+myCar.dy)/t.tileSize);
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

function checkEnd()
{
	//CHECK IF A PLAYER HAS FINISHED
	var isEnd = 0;
	if (myCar.lap >= 1) {isEnd = 1;}
	for (var i = 0; i < opCar.length; i++)
	{
		if (opCar[i].lap >= 1) {isEnd = 2;}
	}
	
	//IF END, THEN SHOW RESULTS
	if (isEnd > 0)
	{
		if (isEnd == 1)
		{
			document.getElementById("myResults").innerHTML = document.getElementById('playerName').value+": 1st";
			document.getElementById("opResults").innerHTML = "Opponent: 2nd";
		}
		else
		{
			document.getElementById("opResults").innerHTML = "Opponent: 1st";
			document.getElementById("myResults").innerHTML = document.getElementById('playerName').value+": 2nd";
		}
		//STOP CAR MOVEMENTS AND SHOW RESULTS SCREEN
		clearInterval(getNewPosition, 20);
		document.getElementById("resultsScreen").style.zindex = 5;
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
	if (document.getElementById('colorGroup_0').checked) {
		myCar.source = carImage1;
	}
	else if (document.getElementById('colorGroup_1').checked) {
		myCar.source = carImage2;
	}
	else if (document.getElementById('colorGroup_2').checked) {
		myCar.source = carImage3;
	}
	else if (document.getElementById('colorGroup_3').checked) {
		myCar.source = carImage4;
	}
	
	//SET PLAYERS' NAMES
	document.getElementById("myLapText").innerHTML = document.getElementById('playerName').value + ": ";
	document.getElementById("opLapText").innerHTML = "Opponent: ";
	
	//REMOVE THE FORM SCREEN FROM PAGE SO PLAYER CAN SEE TRACK
	var element = document.getElementById("selectScreen");
	element.parentNode.removeChild(element);
	
	//GET THE MAP ARRAYS FROM THE DATABASE TO DRAW THE GRASS, TRACK, AND BARRIERS
	/*
	var map = database.getMap();
	trackArray = map.track();
	grassArray = map.grass();
	barrierArray = map.barriers();
	*/
	
	//DRAW THE BACKGROUND GRASS AND TRACK
	drawBG();
	
	//debug:
	myCar.x=950;
	myCar.y=325;
	
	
	//SETS CAR POSITION BASED ON ORDER OF ARRIVAL. IF FIRST, THEN WAIT FOR OTHER
	/*
	database.setState("ready");
	if (database.getState() == "countdown")
	{
		myCar.setPosition(950,325,0,0);
	}
	else
	{
		myCar.setPosition(925,325,0,0);
		while (database.getState() != "countdown") {}
	}
	*/
	
	//GET OTHER CAR(S)' INFO
	//opCar.getPosition();
	
	//debug:
	opCar[0] = new Racecar();
	opCar[0].source = carImage1;
	opCar[0].x = 925;
	opCar[0].y = 325;
	
	//database.setState("run");
	
	//DRAW THE CARS AND START THE TIMER
	getNewPosition();
	intro = setInterval(onTimer,1000);
}

//FUNCTION MOVES CAR LEFT
function moveLeft()
{
	myCar.angle -= myCar.speed*1.4;
	myCar.angle = (myCar.angle+360) % 360;
}

//FUNCTION MOVES CAR UP
function moveUp()
{
	if (myCar.speed >= t.maxSpeed) {myCar.speed = t.maxSpeed;}
	else {myCar.speed += t.speedRate;}
}

//FUNCTION MOVES CAR RIGHT
function moveRight()
{
	myCar.angle += myCar.speed*1.4;
	myCar.angle = (myCar.angle+360) % 360;
}

//FUNCTION MOVES CAR DOWN
function moveDown()
{
	if (myCar.speed <= 0) {myCar.speed = 0;}
	else {myCar.speed -= t.speedRate;}
}

//PAGE'S ONLOAD FUNCTION (DOES NOTHING RIGHT NOW)
function init() {}

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
		setInterval(getNewPosition, 20);
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