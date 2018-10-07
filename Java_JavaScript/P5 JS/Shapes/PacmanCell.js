function Cell(x, y, z, ct, w) {

	const TYPES = [
		"WALL",
		"OPEN",
		"COIN",
		"CHERRY",
		"PACMAN",
		"GHOST",
	]
	//General
	this.x = x;
	this.y = y;
	this.z = z;

	//Pacman
	this.cellType = TYPES[ct];
	colorMode(HSB);

	this.show = function(){
		var x = this.x * w;
		var y = this.y * w;

		if(this.cellType === "WALL"){
			noStroke();
			fill(240, 100, 35);
			rect(x, y, w, w);
		}

		if(this.cellType === "OPEN"){
			noStroke();
			fill(0);
			rect(x, y, w, w);
		}

		if(this.cellType === "COIN"){
			noStroke();
			fill(0);
			rect(x, y, w, w);
			fill(255);
			ellipse(x + w/2, y + w/2, w/3.5, w/3.5);
		}

		if(this.cellType === "CHERRY"){
			noStroke();
			fill(0);
			rect(x, y, w, w);
			fill(0, 155, 155);
			ellipse(x + w/2, y + w/2, w/1.7, w/1.7);
		}

		if(this.cellType === "PACMAN"){
			noStroke();
			fill(0);
			rect(x, y, w, w);
		}

		if(this.cellType === "GHOST"){
			noStroke();
			fill(0);
			rect(x, y, w, w);
			fill(25, 255, 255);
			ellipse(x + w/2, y + w/2, w/1.4, w/1.4)
		}
	}
}
