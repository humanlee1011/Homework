//author: 15331169 lixiaoyun
//last edited: 2016-10-14

var lose = false;
var playing = false;
var inMazeornot = false;

window.onload = function() {
	var Maze = document.getElementById("Maze"),
		S = document.getElementById("Start"),
		E = document.getElementById("End"),
		Wall = document.getElementById("Wall");
	Maze.addEventListener('mouseenter', MazeChange, true); 
	Maze.addEventListener('mouseleave', MazeChange, true);
	S.addEventListener('mouseover', startFunc, false);
	E.addEventListener('mouseover', endFunc, false);
	Wall.addEventListener('mouseover', Lose, false);
	Wall.addEventListener('mouseout', Reset, false);
}

function MazeChange(event) {
	if (event.type === 'mouseenter') {
		inMazeornot = true;
	}
	else if (event.type === 'mouseleave' && event.target.id == "Maze") {
		inMazeornot = false;
	}
} 

function startFunc() {
	if (!inMazeornot) {
		playing = true;
		document.getElementById("output").innerHTML = "";
	}
}

function endFunc() {
	if (inMazeornot == true && playing == true) {
		playing = false;
		document.getElementById("output").innerHTML = "You Win.";
	}
	else if (!inMazeornot) {
		document.getElementById("output").innerHTML = "Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!";
		playing = false;
	}
}

function Lose(event) {
	if (playing) {
		lose = true;
		event.target.id = "lose";
		document.getElementById("output").innerHTML = "You Lose.";
	}
}

function Reset(event) {
	playing = false;
	lose = false;
	event.target.id = "";
}

