var n = 0;
var c = 3;

function setup(){
	createCanvas(600, 400);
	angleMode(DEGREES);
	colorMode(HSB);
	background(50);
}

function draw(){
	var a = n * 137.5;
	var r = c * sqrt(n);

	var x = r * cos(a) + width / 2;
	var y = r * sin(a) + height / 2;

	if(n <= 250){
		fill(255, 0, 0);
		noStroke();
		ellipse(x, y, 8, 8);
	}else if(n <= 475){
		fill(60, 100, 100);
		noStroke();
		ellipse(x, y, 8, 8);
	}
	console.log(cos(a));
	n++;
}