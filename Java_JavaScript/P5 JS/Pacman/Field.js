const FIELD = [
  "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
  "0,2,2,2,2,2,2,2,2,0,2,2,2,2,2,2,2,2,0,0",
  "0,3,0,0,2,0,0,0,2,0,2,0,0,0,2,0,0,3,0,0",
  "0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0",
  "0,2,0,0,2,0,2,0,0,0,0,0,2,0,2,0,0,2,0,0",
  "0,2,2,2,2,0,2,2,2,0,2,2,2,0,2,2,2,2,0,0",
  "0,0,0,0,2,0,0,0,1,0,1,0,0,0,2,0,0,0,0,0",
  "0,0,0,0,2,0,1,1,1,5,1,1,1,0,2,0,0,0,0,0",
  "0,0,0,0,2,0,1,0,0,1,0,0,1,0,2,0,0,0,0,0",
  "1,1,1,1,2,1,1,0,5,5,5,0,1,1,2,1,1,1,1,1",
  "0,0,0,0,2,0,1,0,0,0,0,0,1,0,2,0,0,0,0,0",
  "0,0,0,0,2,0,2,0,2,2,2,0,2,0,2,0,0,0,0,0",
  "0,2,2,2,2,2,2,2,2,0,2,2,2,2,2,2,2,2,0,0",
  "0,2,0,0,2,0,0,0,2,0,2,0,0,0,2,0,0,2,0,0",
  "0,3,2,0,2,2,2,2,2,4,2,2,2,2,2,0,2,3,0,0",
  "0,0,2,0,2,0,2,0,0,0,0,0,2,0,2,0,2,0,0,0",
  "0,2,2,2,2,0,2,2,2,0,2,2,2,0,2,2,2,2,0,0",
  "0,2,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,2,0,0",
  "0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0",
  "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"
]

var rows, cols;
var w = 20;
var grid = [];
var z = 0;
var direction = "";
var pacMan;

function setup(){
  createCanvas(400, 400);
  colorMode(HSB);
  cols = height / w;
  rows = height / w;

  for(var y = 0; y < cols; y++){
    var fieldRow = FIELD[y].split(",");
    for(var x = 0; x < rows; x++){
      var cell = new Cell(x,y,z, fieldRow[x], w);
      grid.push(cell);
      z++;
    }
  }

}

function draw(){
  background(0);

  for(var i = 0; i < grid.length; i++){
    grid[i].show();
    if(grid[i].cellType === "PACMAN" && pacMan === undefined)
      pacMan = new Pacman(grid[i].x, grid[i].y, w)


    if(direction === "left" && grid[i].x + 1 == ceil(pacMan.x) && grid[i].y == ceil(pacMan.y)){
      if(grid[i].cellType === "WALL")
        direction = undefined;
    }
  }
  if(pacMan != undefined){
    pacMan.move();
    pacMan.show();
  }

}

function keyPressed(){
  if(keyCode === LEFT_ARROW){
    direction = "left";
  }
  if(keyCode === RIGHT_ARROW){
    direction = "right";
  }
  if(keyCode === UP_ARROW){
    direction = "up";
  }
  if(keyCode === DOWN_ARROW){
    direction = "down";
  }
}

function Pacman(x, y, w){
  this.x = x;
  this.y = y;
  this.w = w;

  this.show = function(){
		var x = this.x * w;
		var y = this.y * w;
    fill(58, 100, 255);
    ellipse(x + w/2, y + w/2, w/1.4, w/1.4)
  }

  this.move = function(){
    if(direction === "left")
      this.x -= 0.1;

    if(direction === "right")
      this.x += 0.1;

    if(direction === "up")
      this.y -= 0.1;

    if(direction === "down")
      this.y += 0.1;
  }
}
