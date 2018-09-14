
function Line(x, y, len){
	this.x = x;
	this.y = y;
	this.len = len;

	this.show = function(){
		stroke(0);
		line(this.x, this.y, this.x, this.y - this.len);
	}
}