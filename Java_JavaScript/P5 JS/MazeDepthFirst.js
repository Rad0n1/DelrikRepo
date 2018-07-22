var cols, rows;
var w = 40;
var grid = [];
var mazeBuild = false;

var current;
var previous;
var n = 0;
var z = 0;
var stack = [];

var openSet = [];
var closedSet = [];
var start;
var end;
var gridNumber = 0;
var pathFound = false;
var path = [];


function setup() {
	createCanvas(400, 400);
	cols = floor(width/w);
	rows = floor(height/w);
	// frameRate(50);

	for(var y = 0; y < cols; y++){
		for(var x = 0; x < rows; x++){
			var cell = new Cell(x, y, z);
			grid.push(cell);
			z++;
		}
	}

	current = grid[n];
	start = grid[0];
	openSet.push(start);
	end = grid[grid.length - 1]
}

function draw() {
	background(51);

	for (var i = 0; i < grid.length; i++){
		grid[i].show();
	}

	if(!mazeBuild){
		current.visited = true;
		fill(0, 255, 0);
		noStroke();
		rect(current.x * w, current.y * w, w, w);
	}

	var next = checkNeighbours(n);
	if(next > 0){
		stack.push(n);
		removeWalls(n, next);
		n = next;
		current = grid[n];
	}else if(stack.length > 1){
		stack.pop();
		n = stack[stack.length - 1];
		current = grid[n];
	}else if(stack.length <= 1){
		mazeBuild = true;
	}

	if(mazeBuild && openSet.length > 0 && !pathFound){
		var winner = 0;
		for(var i = 0; i < openSet.length; i++){
			if(openSet[i].f < openSet[winner].f){
				winner = i;
			}
		}

		var current1 = openSet[winner];
		gridNumber = current1.z;

		if (openSet[winner] === end){

			var temp = current1;
			path.push(temp);
			while(temp.previous){
				path.push(temp.previous);
				temp = temp.previous;
			}

			console.log("DONE!");
			pathFound = true;
		}

		var index = openSet.indexOf(current1);
		openSet.splice(index, 1);
		closedSet.push(current1);

		var newNeighbours = checkNeighbours(gridNumber);
		for(var i = 0; i < newNeighbours.length; i++){
			var neighbour = grid[newNeighbours[i]]

			if(closedSet.indexOf(neighbour) >= 0){
				continue;
			}

			var tempG = current1.g + 1;

			if(openSet.indexOf(neighbour) < 0){
				neighbour.g = tempG;
				openSet.push(neighbour);
			}else{
				if(tempG < neighbour.g){
					neighbour.g = tempG;
				}
			}

			neighbour.h = heuristic(neighbour, end);
			neighbour.f = neighbour.g + neighbour.h;
			neighbour.previous = current1;

		}

	}else{
		//No solution
	}

	if(!pathFound && mazeBuild){
		fill(0, 255, 0);
		noStroke();
		rect(current1.x * w, current1.y * w, w, w);
	}

	if(pathFound && mazeBuild){
		for(var i = 0; i < path.length; i++){
			fill(0, 0, 255, 80);
			noStroke();
			rect(path[i].x * w, path[i].y * w, w, w);
		}
	}
}


function checkNeighbours(a){
	var neighbours = [];
	var next;
	if(!mazeBuild){
		if(a - rows >= 0 && a - rows <= grid.length - 1 && !grid[a - rows].visited)
			neighbours.push(a - rows);

		if(floor((a + 1) / rows) <= floor(a / rows) && a + 1 >= 0 && a + 1 <= grid.length - 1 && !grid[a + 1].visited)
			neighbours.push(a + 1);

		if(a + rows >= 0 && a + rows <= grid.length - 1 && !grid[a + rows].visited)
			neighbours.push(a + rows);

		if(floor((a - 1) / rows) >= floor(a / rows) && a - 1 >= 0 && a - 1 <= grid.length - 1 && !grid[a - 1].visited)
			neighbours.push(a - 1);

		if(neighbours.length > 0){
			var rand = round(random(0, neighbours.length - 1));
			next = neighbours[rand];
			return next;
		}
	}else if(mazeBuild){
		if(a - rows >= 0 && a - rows <= grid.length - 1 && !grid[a].walls[0])
			neighbours.push(a - rows);

		if(floor((a + 1) / rows) <= floor(a / rows) && a + 1 >= 0 && a + 1 <= grid.length - 1 && !grid[a].walls[1])
			neighbours.push(a + 1);

		if(a + rows >= 0 && a + rows <= grid.length - 1 && !grid[a].walls[2])
			neighbours.push(a + rows);

		if(floor((a - 1) / rows) >= floor(a / rows) && a - 1 >= 0 && a - 1 <= grid.length - 1 && !grid[a].walls[3])
			neighbours.push(a - 1);

		return neighbours;
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

function heuristic(a, b){
	var d = dist(a.x, a.y, b.x, b.y);
	return d;
}