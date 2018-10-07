var grid = [];
var w = 100;
var cols, rows;
var z = 0;

var amountBombs = 1;
var amountFlags = 0;
var gameOver = false;
var gameWon = false;


function setup(){
	createCanvas(600, 600);
	cols = height / w;
	rows = width / w;

	for(var y = 0; y < cols; y++){
		for(var x = 0; x < rows; x++){
			var cell = new Cell(x, y, z);
			grid.push(cell);

			z++;
		}
	}

	for(var i = 0; i < amountBombs; i++){
		var rand = int(random(0, grid.length - 1));

		if(!grid[rand].bomb){
			grid[rand].bomb = true;
			grid[rand].number = -1;
		}
		else
			i--;
	}

	for(var i = 0; i < grid.length; i++){
		calcBombsAround(grid[i]);
	}
}

function draw(){
	background(121);

	var hiddenCells = grid.length;

	if(!gameOver){
		for(var i = 0; i < grid.length; i++){
			grid[i].show();
			if(!grid[i].hidden){
				hiddenCells--;
			}
		}
	}else{
		for(var i = 0; i < grid.length; i++){
			grid[i].show();
			if(grid[i].bomb)
				grid[i].hidden = false;
		}
	}

	if(hiddenCells == amountBombs){
		fill(0, 255, 0);
		textSize(80);
		text("YOU WON", width / 2 - 170, height / 2);
		gameWon = true;
	}
}

function mousePressed(){
	if(!gameOver && !gameWon){
		for(var i = 0; i < grid.length; i++){
			var gridX = grid[i].x * w + w;
			var gridY = grid[i].y * w + w;
			var dx = gridX - mouseX;
			var dy = gridY - mouseY;
			if(dx < w && dy < w && dx > grid[i].x && dy > grid[i].y){
				if(mouseButton === LEFT){
					grid[i].hidden = false;
					checkMove(grid[i]);
					if(grid[i].number == "0" && !grid[i].emptyCheck && !grid[i].bomb){
						var emptyArray = checkNeighbours(grid[i]);
						for(var i = 0; i < emptyArray.length; i++){
							console.log(emptyArray[i]);
							emptyArray[i].hidden = false;
						}
					}
				}else if(mouseButton === RIGHT){
					if(grid[i].flag){
						grid[i].flag = false;
						amountFlags--;
					}
					else if(amountFlags < amountBombs){
						grid[i].flag = true;
						amountFlags++;
					}
				}
			}
		}
	}
}

function checkMove(cell){
	if(cell.bomb)
		gameOver = true;

	if(!cell.bomb){
		cell.number = cell.bombsAround;
	}
}

function calcBombsAround(cell){
	if(cell.bomb){
		cell.bombsAround = -1;
		cell.number = - 1
	}

	if(!cell.bomb){
		var bombs = 0;
		var n = cell.z

		//upperLeft
		if(n - rows - 1 >= 0 && floor((n - rows - 1) / rows) == floor((n / rows) - 1) && grid[n - rows - 1].bomb)
			bombs++;

		//upper
		if(n - rows >= 0 && grid[n - rows].bomb)
			bombs++;

		//upperRight
		if(n - rows + 1 >= 0 && floor((n - rows + 1) / rows) != floor((n / rows)) && grid[n - rows + 1].bomb)
			bombs++;

		//left
		if(n - 1 >= 0 && floor((n - 1) / rows) == floor(n / rows) && grid[n - 1].bomb)
			bombs++;

		//right
		if(n + 1 <= grid.length - 1 && floor((n + 1) / rows) == floor(n / rows) && grid[n + 1].bomb)
			bombs++;

		//bottomLeft
		if(n + rows - 1 <= grid.length - 1 && floor((n + rows - 1) / rows) != floor(n / rows) && grid[n + rows - 1].bomb)
			bombs++;

		//bottom
		if(n + rows <= grid.length - 1 && grid[n + rows].bomb)
			bombs++;

		//bottomRight
		if(n + rows + 1 <= grid.length - 1 && floor((n + rows + 1) / rows) == floor((n / rows) + 1) && grid[n + rows + 1].bomb)
			bombs++;

		cell.bombsAround = bombs;
		cell.number = bombs;
	}
}

function checkNeighbours(cell){

		if(cell.number == "0" && !cell.emptyCheck && !cell.bomb){
			var emptyNeighbours = [];
			var n = cell.z
			cell.emptyCheck = true;

			//upperLeft
			if(n - rows - 1 >= 0 && floor((n - rows - 1) / rows) == floor((n / rows) - 1) && !grid[n - rows - 1].emptyCheck){
				emptyNeighbours.push(grid[n - rows - 1]);

				if(grid[n - rows - 1].number == "0"){
					var tempNeighbours = checkNeighbours(grid[n - rows - 1]);
					for(var i = 0; i < tempNeighbours.length; i++){
						emptyNeighbours.push(tempNeighbours[i]);
					}
				}
			}

			//upper
			if(n - rows >= 0 && grid[n - rows].bomb && !grid[n - rows].emptyCheck){
				emptyNeighbours.push(grid[n - rows]);

				if(grid[n - rows].number == "0"){
					var tempNeighbours = checkNeighbours(grid[n - rows]);
					for(var i = 0; i < tempNeighbours.length; i++){
						emptyNeighbours.push(tempNeighbours[i]);
					}
				}
			}

			//upperRight
			if(n - rows + 1 >= 0 && floor((n - rows + 1) / rows) != floor((n / rows)) && !grid[n - rows + 1].emptyCheck){
				emptyNeighbours.push(grid[n - rows + 1]);

				if(grid[n - rows + 1].number == "0"){
					var tempNeighbours = checkNeighbours(grid[n - rows + 1]);
					for(var i = 0; i < tempNeighbours.length; i++){
						emptyNeighbours.push(tempNeighbours[i]);
					}
				}
			}

			//left
			if(n - 1 >= 0 && floor((n - 1) / rows) == floor(n / rows) && !grid[n - 1].emptyCheck){
				emptyNeighbours.push(grid[n - 1]);

				if(grid[n - 1].number == "0"){
					var tempNeighbours = checkNeighbours(grid[n - 1]);
					for(var i = 0; i < tempNeighbours.length; i++){
						emptyNeighbours.push(tempNeighbours[i]);
					}
				}
			}

			//right
			if(n + 1 <= grid.length - 1 && floor((n + 1) / rows) == floor(n / rows) && !grid[n + 1].emptyCheck){
				emptyNeighbours.push(grid[n + 1]);

				if(grid[n + 1].number == "0"){
					var tempNeighbours = checkNeighbours(grid[n + 1]);
					for(var i = 0; i < tempNeighbours.length; i++){
						emptyNeighbours.push(tempNeighbours[i]);
					}
				}
			}

			//bottomLeft
			if(n + rows - 1 <= grid.length - 1 && floor((n + rows - 1) / rows) != floor(n / rows) && !grid[n + rows - 1].emptyCheck){
				emptyNeighbours.push(grid[n + rows - 1]);

				if(grid[n + rows - 1].number == "0"){
					var tempNeighbours = checkNeighbours(grid[n + rows - 1]);
					for(var i = 0; i < tempNeighbours.length; i++){
						emptyNeighbours.push(tempNeighbours[i]);
					}
				}
			}

			//bottom
			if(n + rows <= grid.length - 1 && !grid[n + rows].emptyCheck){
				emptyNeighbours.push(grid[n + rows]);

				if(grid[n + rows].number == "0"){
					var tempNeighbours = checkNeighbours(grid[n + rows]);
					for(var i = 0; i < tempNeighbours.length; i++){
						emptyNeighbours.push(tempNeighbours[i]);
					}
				}
			}

			//bottomRight
			if(n + rows + 1 <= grid.length - 1 && floor((n + rows + 1) / rows) == floor((n / rows) + 1) && !grid[n + rows + 1].emptyCheck){
				emptyNeighbours.push(grid[n + rows + 1]);

				if(grid[n +  rows + 1].number == "0"){
					var tempNeighbours = checkNeighbours(grid[n + rows + 1]);
					for(var i = 0; i < tempNeighbours.length; i++){
						emptyNeighbours.push(tempNeighbours[i]);
					}
				}
			}

			if(emptyNeighbours.length > 0){
				return emptyNeighbours;
			}else{
				return [];
			}
		}
}
