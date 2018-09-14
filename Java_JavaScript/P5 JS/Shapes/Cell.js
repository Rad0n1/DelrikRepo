function Cell(x, y, z) {
	
	//General
	this.x = x;
	this.y = y;
	this.z = z;

	//MazeBuilding
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.previous;
	this.walls = [true, true, true, true]
	this.visited = false;

	//MineSweeper
	this.bomb = false;
	this.hidden = true;
	this.bombsAround = 0;
	this.number = "";
	this.emptyCheck = false;
	this.flag = false;

	this.show = function(){
		var x = this.x * w;
		var y = this.y * w;

		stroke(0);

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

		if(this.bomb && !this.hidden){
			noStroke();
			fill(255, 0, 0, 100);
			rect(x, y, w, w);
		}

		if(!this.bomb && !this.hidden && this.number == ""){
			noStroke();
			fill(211, 211, 211, 100);
			rect(x, y, w, w);
		}

		if(!this.bomb && !this.hidden && this.number != ""){
			noStroke();
			fill(211, 211, 211, 100);
			rect(x, y, w, w);
			textSize(20);
			fill(255, 0, 0);
			text(this.number, x + w / 2 , y + w / 2);
		}

		if(this.flag){
			noStroke();
			fill(0, 255, 0, 100);
			rect(x, y, w, w);
		}
	}
}