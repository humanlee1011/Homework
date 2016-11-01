// author: 15331169 lixiaoyun
// last edited: 2016-10-23

//要使随机排序有解，

(function() {
	'user strict';

	var win = false;
	var randomPos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	var empty = 0;
	var Frags = [];
	var playing = false;
	var difficult = "normal";

	window.onload = function() {
		Start();
		document.getElementsByTagName("button")[0].addEventListener('click', StartAgain, false);
		document.getElementsByTagName("input")[0].onclick = function() {
			difficult = "easy";
		};
		document.getElementsByTagName("input")[1].onclick = function() {
			difficult = "normal";
		};
		document.getElementsByTagName("input")[2].onclick = function() {
			difficult = "difficult";
		};
		document.getElementById("Tip").onclick = function() {
			document.getElementById("Tip-image").className = "Tip-image";
			setTimeout(function() {
				document.getElementById("Tip-image").className = "";
			}, 3000); 
		};
	};

	function Start() {
		var frag = document.createDocumentFragment();
		for (var i = 0; i < 16; i++) {
			if (randomPos[i] != 15) {
				var Frag = new Fragment(randomPos[i], i);
				Frags[randomPos[i]] = Frag;
				var div = document.createElement('div');
				div.className = "image " + "Fragment" + randomPos[i] + " CurPos" + i;
				div.addEventListener('click', clickFunc, false);
				frag.appendChild(div);
			}
		}
		document.getElementById('Game-container').appendChild(frag);
	}

	function StartAgain() {
		var div = document.getElementById('Game-container');
	    // while(div.hasChildNodes()) //当div下还存在子节点时 循环继续
	    // {
	    //     div.removeChild(div.firstChild);
	    // }
	    playing = true;
		document.getElementById("output").innerHTML = "";
		randomPos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
		empty = 15;
		Random();
		win = false;
	    for (var i = 0; i < 15; i++) {
	    	//i 记录顺序，j 记录位置
	    	for (var j = 0; j < 16; j++) {
	    		if (randomPos[j] == i) {
	    			document.getElementsByClassName("Fragment" + i)[0].className = "image " + "Fragment" + i + " CurPos" + j;
	    			Frags[i].pos = j;
	    			break;
	    		}
	    	}
	    }
	}

	function clickFunc(event) {
		var getIndex = parseInt(event.target.className.substring(14, 16));
		Frags[getIndex].move();
	}

	function Random() {
		function swap(a, b) {
			var temp = randomPos[a];
			randomPos[a] = randomPos[b];
			randomPos[b] = temp;
		}
		if (difficult == "normal") {
			swapTimes = 100;
		}
		else if (difficult == "easy") {
			swapTimes = 50;
		}
		else if (difficult == "difficult") {
			swapTimes = 1000;
		}
		for (var i = 0; i < swapTimes; i++) {
			//0 top, 1 right, 2 bottom, 3 left
			var ran = parseInt(Math.random() * 4);
			if ((!ran && empty - 4 >= 0) || (ran == 1 && (empty + 1) % 4) ||
			 (ran == 3 && empty % 4) || (ran == 2 && empty + 4 <= 15)) {
				switch(ran) {
					case 0: swap(empty, empty - 4);
							empty -= 4;
							break;
					case 1: swap(empty, empty + 1);
							empty += 1;
							break;
					case 2: swap(empty, empty + 4);
							empty += 4;
							break;
					case 3: swap(empty, empty - 1);
							empty -= 1;
							break;
				}
			}
		}
	}
	//Fragment constructor
	function Fragment() {
		var that = this;
		this.index = arguments[0];
		this.pos = arguments[1];
		this.move = function() {
			console.log("pos" + this.pos);	
			return moveFrag.apply(that);
		};
		this.check = function() {
			return this.index == this.pos? true: false;
		};
	}
	
	function moveFrag() {
		if (playing) {
			var getPos = this.pos;
			if ((getPos - 1 == empty && getPos % 4) || (getPos + 1 == empty && (getPos + 1) % 4 ) ||
			 getPos + 4 == empty || getPos - 4 == empty) {
				var ele = document.getElementsByClassName("CurPos" + this.pos)[0];
				ele.className = "image " + "Fragment" + this.index + " CurPos" + empty;
				var temp = empty;
				empty = this.pos;
				this.pos = temp;
			}
			Check.apply(this, arguments);
		}
	}

	function Check() {
		var flag = false;
		for (var i = 0; i < 15; i++) {
			var t = Frags[i].check();
			if (!t) {
				flag = true;
				break;
			}
		}
		if (!flag) {
			win = true;
			playing = false;
			document.getElementById("output").innerHTML = "Congratulations!";
		}
	}
})();