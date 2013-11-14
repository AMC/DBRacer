// JavaScript Document
// reference the track image
var grass = new Image();
grass.src = "assets/grassTile.jpg";
var track = new Image();
track.src = "assets/trackTiles.png";
var c=document.getElementById("background");
var c_context=c.getContext("2d");

var myCarImage=document.getElementById("carCanvas");
var myCarImage_context=myCarImage.getContext("2d");

var myCar = new Object();
var opCar = new Object();
var start=5;
var TO_RADIANS = Math.PI/180;
var intro;
var trackWidth = 6;
var mapWidth = 40;
var mapHeight = 24;
var tileSize = 25;
var maxSpeed = 2.0;
var speedRate = 0.1;

var trackString = "0,0,0,5,5,5,5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,0,0,0,0,0,0,0,0,19,20,21,1,1,1,1,1,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,19,20,21,22,23,24,0,0,0,25,26,15,13,13,13,13,14,9,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,25,26,27,28,29,30,5,0,5,31,15,17,0,0,0,0,16,14,9,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,31,15,13,14,35,36,5,5,10,8,4,5,0,0,0,0,0,16,14,9,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,2,4,5,2,3,4,5,5,2,15,17,5,5,5,5,5,5,0,16,14,9,1,1,1,1,11,0,0,0,0,10,1,1,1,1,11,0,0,5,0,2,4,5,2,3,4,5,5,2,4,5,0,0,0,0,0,0,5,0,16,14,28,28,28,28,9,1,1,1,1,8,28,28,28,28,9,11,0,5,0,2,4,5,2,3,4,5,5,2,4,5,10,1,1,1,22,23,24,5,0,16,13,13,13,13,13,13,13,13,13,13,13,13,13,14,28,9,11,5,0,2,4,5,2,3,4,5,5,37,9,11,2,15,13,13,14,29,30,0,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,16,14,28,4,5,0,2,4,5,2,3,4,5,0,43,44,9,8,4,0,5,16,14,36,5,19,20,21,1,1,1,1,1,1,1,22,23,24,5,0,0,16,14,4,5,0,2,4,5,2,3,4,5,0,49,50,51,13,17,0,5,0,2,4,5,25,26,27,7,7,7,7,7,7,7,28,29,30,5,0,0,0,2,4,0,5,2,4,5,2,3,4,5,0,0,0,0,0,5,5,5,0,2,4,5,31,32,15,13,13,13,13,13,13,13,14,35,36,5,0,0,0,2,4,0,5,2,4,5,55,56,57,5,0,5,5,5,5,0,0,5,0,2,4,5,2,32,4,5,5,0,0,0,5,5,2,35,4,5,0,0,0,2,4,0,5,2,4,5,2,3,4,5,5,10,1,1,1,11,0,5,0,2,4,5,2,32,4,0,0,0,5,0,0,0,2,35,4,5,0,0,0,2,4,0,5,2,4,5,2,3,4,5,5,2,15,13,14,9,11,5,10,8,4,5,37,38,9,22,23,24,5,19,20,21,8,41,42,5,0,0,0,2,9,11,10,8,4,5,2,3,4,5,5,2,4,5,16,14,9,1,8,28,4,5,43,44,45,28,29,30,5,25,26,27,46,47,48,5,0,0,0,37,38,9,8,41,42,5,2,3,4,5,5,2,4,0,0,16,14,28,28,28,4,5,49,50,51,14,35,36,5,31,32,15,52,53,54,5,0,0,0,43,44,45,46,47,48,5,2,3,4,5,5,2,4,0,0,0,16,13,13,13,17,5,0,0,0,2,35,4,5,2,35,4,0,0,0,0,5,5,0,49,50,51,52,53,54,5,2,3,4,5,5,2,9,11,0,0,5,5,5,5,5,0,0,0,0,16,14,4,5,2,15,17,0,0,0,0,0,0,5,5,5,5,5,5,5,0,2,3,4,5,5,2,45,9,11,0,0,0,0,0,0,0,0,0,0,0,2,4,5,2,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,4,5,5,2,45,45,9,1,1,1,1,1,11,0,0,0,0,0,2,4,5,2,4,0,0,0,0,0,0,0,0,0,10,1,1,1,1,1,8,41,42,5,5,16,13,13,13,13,13,14,45,45,9,1,1,1,1,1,8,4,5,2,9,1,1,1,1,1,1,1,1,1,8,3,3,3,3,3,3,47,48,5,0,0,0,0,0,0,0,16,13,13,13,13,13,13,13,13,13,17,5,16,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,52,53,54,0,0,0,0,0,0,5,5,5,5,5,5,5,5,5,5,5,5,5,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0";
var trackArray = trackString.split(',');
var grassString = "1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,1,0,0,0,1,1,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,0,0,0,1,1,0,0,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,0,0,1,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,1,1,0,0,1,0,0,0,1,1,1,0,0,0,0,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,1,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,1,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,1,1,1,1,1,1,1,0,0,0,1,1,1,1,0,0,1,1,0,0,1,0,0,0,1,1,0,0,0,0,0,1,1,1,0,0,1,0,0,0,1,1,1,1,1,1,1,0,0,0,1,1,1,1,0,0,1,1,0,0,1,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1,0,0,0,1,1,0,0,1,1,1,0,0,0,0,0,1,1,1,1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1";
var grassArray = grassString.split(',');
var barrierString = "0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,1,1,0,0,0,0,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,1,1,1,1,1,1,0,0,1,0,0,0,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1";
var barrierArray = barrierString.split(',');


function drawBG()
{
	//draw grass
	//c_context.clearRect(0,0,1000,700);
	//c_context.drawImage(grass,0,0);
	
	//draw grid
	var i=0;
	var j=0;
	var k=0;
	var xx=0;
	var yy=0;
	for (i=0;i<mapHeight;i++)
	{
		for (j=0;j<mapWidth;j++)
		{
			c_context.drawImage(grass,j*tileSize,i*tileSize);
			xx = (trackArray[j+i*mapWidth]-1)%trackWidth;
			yy = Math.floor((trackArray[j+i*mapWidth]-1)/trackWidth);
			if (trackArray[j+i*mapWidth] != 0)
			{
				c_context.drawImage(track,xx*tileSize,yy*tileSize,tileSize,tileSize,j*tileSize,i*tileSize,tileSize,tileSize);
			}
		}
	}
}

function drawCars()
{
	//drawRotatedImage(myCarImage, myCar.x, myCar.y, myCar.angle);
    myCarImage_context.save();
    myCarImage_context.translate(myCar.x, myCar.y);
    myCarImage_context.rotate(myCar.angle * TO_RADIANS);
    myCarImage_context.restore();
}

function getNewPosition()
{
	if (keyState[65]) {moveLeft();}
	if (keyState[87]) {moveUp();}
	if (keyState[68]) {moveRight();}
	if (keyState[83]) {moveDown();}
	speedXY();
	myCar.x += myCar.dx;
	myCar.y += myCar.dy;
	//drawCars();
	drawRotatedImage(myCar.source,myCar.x,myCar.y,myCar.angle);
}

function speedXY ()
{
	myCar.dx = Math.sin(myCar.angle * TO_RADIANS) * myCar.speed;
	myCar.dy = Math.cos(myCar.angle * TO_RADIANS) * myCar.speed * -1;
}

function moveLeft()
{
	myCar.angle -= myCar.speed*1.4;
}

function moveUp()
{
	if (myCar.speed >= maxSpeed) {myCar.speed = maxSpeed;}
	else {myCar.speed += speedRate;}
}

function moveRight()
{
	myCar.angle += myCar.speed*1.4;
}

function moveDown()
{
	if (myCar.speed <= 0) {myCar.speed = 0;}
	else {myCar.speed -= speedRate;}
}

function drawRotatedImage(image, x, y, angle)
{
    myCarImage_context.save();
	myCarImage_context.clearRect(0,0,1000,600);
    myCarImage_context.translate(x, y);
    myCarImage_context.rotate(angle * TO_RADIANS);
    myCarImage_context.drawImage(image, -(image.width/2), -(image.height/2));
    myCarImage_context.restore();
}

function init()
{
	//init car images
	var carImage1 = new Image();
	carImage1.src = "assets/car1.png";
	var carImage2 = new Image();
	carImage2.src = "assets/car2.png";
	var carImage3 = new Image();
	carImage3.src = "assets/car3.png";
	var carImage4 = new Image();
	carImage4.src = "assets/car4.png";
	
	//store original car data
	myCar.x=950;
	myCar.y=325;
	myCar.dx=0;
	myCar.dy=0;
	myCar.speed=0;
	myCar.angle=0;
	myCar.laps=0;
	myCar.source=carImage1;
	
	//draw initial images
	drawBG();
	getNewPosition();
	
	//start intro timer
	intro = setInterval(onTimer,1000);
}

function onTimer()
{
	start--;
	if (start > 0)
	{
		document.getElementById("startLabel").innerHTML = start;
	}
	else if (start == 0)
	{
		document.getElementById("startLabel").innerHTML = "GO!";
		setInterval(getNewPosition, 10);
	}
	else if (start == -2)
	{
		document.getElementById("startLabel").innerHTML = "";
		clearInterval(intro);
	}
}

//each key pressed is stored in keyState array as true
var keyState = {};    
window.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);
//if a key is released, it is marked false in keyState array
window.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
},true);