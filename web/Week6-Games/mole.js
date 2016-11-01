// author: 15331169 lixiaoyun
// last edited: 2016-10-15

var playing = false,
		time = 0, 
		score = 0,
		HighestScore = 0,
		Mouse = [],
		difficulty = "normal";

window.onload = function() {
	timeOutput = document.getElementById('Time'),
	scoreOutput = document.getElementById('Score'),
	statusOutput = document.getElementById('playing'),
	Moles = document.getElementById('Moles'),
	SorS = document.getElementById('SorS');
	createMoles();
	SorS.addEventListener('click', StartorStop, false);
	document.getElementById('easy').onclick = function() {
		difficulty = "easy";
	}
	document.getElementById('normal').onclick = function() {
		difficulty = "normal";
	}
	document.getElementById('difficult').onclick = function() {
		difficulty = "difficult";
	}
}

//create the moles 
function createMoles() {
	for (var i = 0; i < 60; i++) {
		var newMole = document.createElement('div');
		newMole.className = "moleClass";
		Moles.appendChild(newMole);
		newMole.addEventListener('click', clickFunc, false);
	}
}

function StartorStop() {
	if (playing) {
		Stop();
	}
	else 
		Start();
}

//Start the Game
function Start() {
	clock = setInterval(Clock, 1000);
	if (difficulty == "easy")
		random = setInterval(Random, 8000);
	else if (difficulty == "normal")
		random = setInterval(Random, 5000);
	else if (difficulty == "difficult")
		random = setInterval(Random, 2000);
	for (var i = 0; i < 3; i++) {
		document.getElementsByName('difficulty')[i].disabled = "true";
	}
	
	playing = true;
	time = 30;
	score = 0;
	statusOutput.value = "Playing";
	Random();
}

//Stop the Game
function Stop() {
	if (HighestScore < score)
		HighestScore = score;
	statusOutput.value = "Game Over";
	alert("Game Over.\nYourscore is: " + score + "\nThe highest score is: " + HighestScore);
	Reset();
}

//Reset all the parameter
function Reset() {
	clearInterval(clock);
	clearInterval(random);
	playing = false;
	score = 0;
	time = 0;
	scoreOutput.value = 0;
	var len = Mouse.length;
	for (var i = 0; i < len; i++) {
		Mouse[Mouse.length - 1].className = "moleClass";
		Mouse.pop();
	}
	Mouse = [];
	difficulty = "";
	for (var i = 0; i < 3; i++) {
		document.getElementsByName('difficulty')[i].disabled = false;
	}
}

//place the mouse randomly 
function Random() {
	var ran = parseInt(Math.random() * 60);
	var moleClass = document.getElementsByClassName("moleClass");
	moleClass[ran].className = "moleClass Mouse";
	Mouse.push(moleClass[ran]);
}

//hit the mouse
function clickFunc(event) {
	var hit = false;
	for (var i = 0; i < Mouse.length; i++) {
		if (event.target == Mouse[i]) {
			Mouse[i].className = "moleClass";
			Mouse.splice(i, 1);
			score++;
			scoreOutput.value = score;
			hit = true;
			Random();	
			break;
		}
	}
	if (!hit) {
		if (score > 0) {
			score--;
			scoreOutput.value = score;
		}
		// else {
		// 	alert("You lose.");
		// 	Stop();
		// }
	}
}

function Clock() {
	if (time > 0) {
		time--;
		timeOutput.value = time;
	}
	else {
		Stop();
	}
}