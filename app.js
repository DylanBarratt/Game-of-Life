//Created by Dylan Barratt
//Visit dylanbarratt.com or github.com/dylanbarratt

var tileWidth, autoPlayBtn, playing;

function setup() {
	tileWidth = 5;
	canvas = createCanvas(document.documentElement.clientWidth / 2, document.documentElement.clientHeight / 2);
	canvas.position(document.documentElement.clientWidth / 2 - width / 2, document.documentElement.clientHeight / 2 - height / 2);
	createGrid(width / tileWidth, height / tileWidth);

	resetBtn = createButton("RESET");
	resetBtn.mousePressed(reset);

	autoPlayBtn = createButton("PLAY/PAUSE");
	autoPlayBtn.mousePressed(play);

	link = createA("www.dylanbarratt.com", "DylanBarratt");
	link.position(document.documentElement.clientWidth / 2 - width / 2 + 220, document.documentElement.clientHeight / 2 - height / 2 - 34.5);

	title = createP("CONWAY'S GAME OF LIFE by");
	title.position(document.documentElement.clientWidth / 2 - width / 2, document.documentElement.clientHeight / 2 - height / 2 - 50);

	drawGrid();
	background(0);

	noLoop();
	playing = false;
}

var grid, generation, xLength, yLength;

function draw() {
	drawGrid();
}

function createGrid(rowsX, colsY) {
	grid = [];
	generation = 0;
	xLength = 0;
	yLength = 0;

	generation += 1;
	for (y = 0; y < colsY; y++) {
		yLength += 1;
		for (x = 0; x < rowsX; x++) {
			xLength += 1;
			grid.push([x, y, tileWidth, stateChoice()]);
		}
	}
	xLength = xLength / yLength;
}

function drawGrid() {
	noStroke();
	noSmooth();

	for (i = 0; i < grid.length; i++) {
		if (grid[i][3] == 0) {
			fill(0);
		} else if (grid[i][3] == 1) {
			fill(255);
		}
		square(grid[i][0] * grid[i][2], grid[i][1] * grid[i][2], grid[i][2]);
		checkSurrondingTiles(i);
	}
}

function stateChoice() {
	var state;

	if (random(100) <= 5) {
		state = 1;
	} else {
		state = 0;
	}
	return state;
}

function checkSurrondingTiles(index) {
	var neighbourScore;
	var x, y, currentStatus;
	var checkingLocation;

	neighbourScore = 0;
	x = grid[index][0];
	y = grid[index][1];
	currentStatus = grid[index][3];

	//GETTING A NEIGHBOURSCORE
	//TOP LEFT
	checkingLocation = index - xLength - 1;
	if (checkingLocation >= 0 && checkingLocation < xLength * yLength) {
		neighbourScore += grid[checkingLocation][3];
	}

	//TOP MIDDLE
	checkingLocation = index - xLength;
	if (checkingLocation >= 0 && checkingLocation < xLength * yLength) {
		neighbourScore += grid[checkingLocation][3];
	}

	//TOP RIGHT
	checkingLocation = index - xLength + 1;
	if (checkingLocation >= 0 && checkingLocation < xLength * yLength) {
		neighbourScore += grid[checkingLocation][3];
	}

	//MIDDLE LEFT
	checkingLocation = index - 1;
	if (checkingLocation >= 0 && checkingLocation < xLength * yLength) {
		neighbourScore += grid[checkingLocation][3];
	}

	//MIDDLE RIGHT
	checkingLocation = index + 1;
	if (checkingLocation >= 0 && checkingLocation < xLength * yLength) {
		neighbourScore += grid[checkingLocation][3];
	}

	//BOTTOM LEFT
	checkingLocation = index + xLength - 1;
	if (checkingLocation >= 0 && checkingLocation < xLength * yLength) {
		neighbourScore += grid[checkingLocation][3];
	}

	//BOTTOM MIDDLE
	checkingLocation = index + xLength;
	if (checkingLocation >= 0 && checkingLocation < xLength * yLength) {
		neighbourScore += grid[checkingLocation][3];
	}

	//BOTTOM RIGHT
	checkingLocation = index + xLength + 1;
	if (checkingLocation >= 0 && checkingLocation < xLength * yLength) {
		neighbourScore += grid[checkingLocation][3];
	}

	//APPLYING RULES DEPEPENDENT ON NEIGHBOUR SCORE
	if (neighbourScore < 2 && currentStatus == 1) {
		grid[index][3] = 0; //RULE 1
	} else if (neighbourScore > 3 && currentStatus == 1) {
		grid[index][3] = 0; //RULE 3
	} else if (neighbourScore == 3 && currentStatus == 0) {
		grid[index][3] = 1; //RULE 4
	} else {
	}
}

function reset() {
	createGrid(width / tileWidth, height / tileWidth);
	drawGrid();
	background(0);
	drawGrid();
}

function windowResized() {
	tileWidth = 5;

	canvas = createCanvas(document.documentElement.clientWidth / 2, document.documentElement.clientHeight / 2);
	canvas.position(document.documentElement.clientWidth / 2 - width / 2, document.documentElement.clientHeight / 2 - height / 2);

	createGrid(width / tileWidth, height / tileWidth);

	title.position(document.documentElement.clientWidth / 2 - width / 2, document.documentElement.clientHeight / 2 - height / 2 - 50);
	link.position(document.documentElement.clientWidth / 2 - width / 2 + 220, document.documentElement.clientHeight / 2 - height / 2 - 34.5);

	drawGrid();
	background(0);
	drawGrid();
}

function play() {
	if (playing == false) {
		playing = true;
		loop();
	} else {
		playing = false;
		noLoop();
	}
}
