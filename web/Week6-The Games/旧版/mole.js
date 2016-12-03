// author: 15331169 lixiaoyun
// last edited: 2016-10-15

var playing = false;
var score = 0;
var restOfTime = 0;
var pause = false;
var HighestScore = 0;
var MoleNow = null;
var difficulty = "";

window.onload = function () {
	var moles = document.getElementById('Moles'),
		SorS = document.getElementById('SorS');
	moles.addEventListener('click', moleFunc, false);
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

function StartorStop() {
	if (!playing && !pause) {
		score = 0;
		restOfTime = 30;
		playing = true;
		document.getElementById('playing').value = "Playing";
		Random();
	}
	else if (playing && !pause) {
		pause = true;
		document.getElementById('playing').value = "Pause";
	}
	else if (playing && pause) {
		document.getElementById('playing').value = "Playing";
		pause = false;
	}
	document.getElementById('Score').value = score;
}

function moleFunc(event) {
	if (playing) {
		if (event.target.parentNode == MoleNow) {
			score++;
			event.target.parentNode.id = "";
			document.getElementById('Score').value = score;
			Random();
		}
		else if (score > 0 && event.target.class == "moleClass") {
			score--;
			document.getElementById('Score').value = score;
		}
	}
}

function Random() {
	var ran = Math.floor(Math.random() * 60);
	var moles = document.getElementsByClassName('moleClass');
	MoleNow = moles[ran].parentNode;
	moles[ran].parentNode.id = "checked";
}

setInterval(function() {
	if (playing && !pause) {
		if(restOfTime > 0) {
			restOfTime--;
			document.getElementById('Time').value = restOfTime.toString();
		}
		else {
			document.getElementById('playing').value = "Game Over";
			MoleNow.id = "";
			if (score > HighestScore)
				HighestScore = score;
			alert("Game Over.\nYourscore is: " + score + "\nThe highest score is: " + HighestScore);
			playing = false;
		}
	}
}, 1000);

