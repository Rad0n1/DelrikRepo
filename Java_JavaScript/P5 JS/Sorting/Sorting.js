var lines = [];
var number = 0;

function setup(){
	createCanvas(400,400);

	for(var i = 1; i <= 400; i++){
		var line = new Line(i, height, i);
		lines.push(line);
	}


	lines = fisherShuffle(lines);
	// frameRate(25);
}

function draw(){
	background(151);
	for(var i = 0; i < lines.length; i++){
		lines[i].show();
	}

	lines = bubbleSort(lines);


}

function fisherShuffle(arr){
	for(var i = 0; i < arr.length; i++){
		var j = int(random(0, arr.length - 1));
		var temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
		arr[i].x = i;
		arr[j].x = j;
	}

	return arr;
}

function bubbleSort(arr){
	for(var i = 0; i < arr.length; i++){
		if(i + 1 < arr.length && compareNumbers(arr[i].len, arr[i + 1].len, 'b')){
			var temp = arr[i + 1];
			arr[i + 1] = arr[i];
			arr[i] = temp;
			arr[i].x = i;
			arr[i + 1].x = i + 1;
		}
	}

	return arr;
}



function compareNumbers(num1, num2, mode){
	if(mode == 's'){
		if(num1 < num2)
			return true;
	}else if(mode == 'b'){
		if(num1 > num2)
			return true;
	}
}