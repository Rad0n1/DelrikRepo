var cols, rows;
var w = 20;
var grid = [];

var current;
var previous;
var n = 0;
var stack = [];

function setup() {
	createCanvas(400, 400);
	cols = floor(width/w);
	rows = floor(height/w);
	// frameRate(5);

	for(var y = 0; y < cols; y++){
		for(var x = 0; x < rows; x++){
			var cell = new Cell(x, y);
			grid.push(cell);
		}
	}

	current = grid[n];
}

function draw() {
	background(51);

	for (var i = 0; i < grid.length; i++){
		grid[i].show();
	}

	current.visited = true;
	fill(0, 255, 0);
	noStroke();
	rect(current.x * w, current.y * w, w, w)

	var next = checkNeighbours();
	if(next > 0){
		stack.push(n);
		removeWalls(n, next);
		n = next;
		current = grid[n];
	}else if(stack.length > 1){
		stack.pop();
		n = stack[stack.length - 1];
		current = grid[n];
	}



}

function Cell(x, y) {
	this.x = x;
	this.y = y;
	this.walls = [true, true, true, true]
	this.visited = false;

	this.show = function(){
		var x = this.x * w;
		var y = this.y * w;
		stroke(255);

		if(this.walls[0]){
			line(x, y, x + w, y);
		}

		if(this.walls[1]){
			line(x + w, y, x + w, y + w);
		}

		if(this.walls[2]){
			line(x + w, y + w, x, y + w);
		}

		if(this.walls[3]){
			line(x, y, x, y + w);
		}

		if(this.visited){
			noStroke();
			fill(185, 0 , 151, 100);
			rect(x, y, w, w);
		}
	}
}


function checkNeighbours(){
	var neighbours = [];
	var next;

	if(n - rows >= 0 && n - rows <= grid.length - 1 && !grid[n - rows].visited)
		neighbours.push(n - rows);

	if(floor((n + 1) / rows) <= floor(n / rows) && n + 1 >= 0 && n + 1 <= grid.length - 1 && !grid[n + 1].visited)
		neighbours.push(n + 1);

	if(n + rows >= 0 && n + rows <= grid.length - 1 && !grid[n + rows].visited)
		neighbours.push(n + rows);

	if(floor((n - 1) / rows) >= floor(n / rows) && n - 1 >= 0 && n - 1 <= grid.length - 1 && !grid[n - 1].visited)
		neighbours.push(n - 1);

	if(neighbours.length > 0){
		var rand = round(random(0, neighbours.length - 1));
		next = neighbours[rand];
		return next;
	}
}

function removeWalls(a, b){
	var dir = b - a;
	switch(dir){
		case 1:
		grid[a].walls[1] = false;
		grid[b].walls[3] = false;
		break;

		case -1:
		grid[a].walls[3] = false;
		grid[b].walls[1] = false;
		break;

		case rows:
		grid[a].walls[2] = false;
		grid[b].walls[0] = false;
		break;

		case -rows:
		grid[a].walls[0] = false;
		grid[b].walls[2] = false;
		break;
	}
}