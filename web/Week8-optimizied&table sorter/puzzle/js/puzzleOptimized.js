// author: 15331159 lixiaoyun


(function($) {
	'user strict';

	var win = false,
		randomPos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
		empty = 15,
		Frags = [],
		difficulty = "normal",
		isShuffle = false,
		backgroundIndex = 0;

	$(document).ready(function() {
		createFragments();
		$('#Game-container').click(function(event) {
			console.log(event.target.className.substring(14, 16));
			Frags[parseInt(event.target.className.substring(14, 16))].move();
		});
		$('#Tip p').click(showTipImage);
		$('#Start').click(startGame);
		$('#changeImage').click(changeImage);
	});

	function Fragment(dom, pos) {
		var that = this;
		this.dom = dom;
		this.pos = pos;
		this.move = function() {
			return moveFrag.apply(that);
		};
		this.check = function(index) {
			return index == this.pos? true: false;
		};
	}

	function createFragments() {
		$('#Game-container div').each(function(index) {
			var Frag = new Fragment($(this), index);
			Frags[index] = Frag;
		});
	}

	function showTipImage() {
		$('#Tip div').addClass('Tip-image');
		$('.Tip-image').each(function(){
			$(this).css('background-image', "url('img/image" + backgroundIndex + ".png')");
		});
		setTimeout(function() {
			$('#Tip div').removeClass('Tip-image');
		}, 3000);
	}

	function changeImage() {
		backgroundIndex = Math.floor(Math.random() * 15);
		$('.image').each(function() {
			$(this).css("background-image", "url('img/image" + backgroundIndex + ".png')");
		});
	}

	function startGame() {
		win = false;
		difficulty  = $('input[name=difficulty]').attr('name');
		shuffleFragment(difficulty);
		changeClassName();
	}

	function changeClassName() {
		for (var i = 0; i < Frags.length; i++) {
			Frags[i].dom.removeClass('CurPos' + Frags[i].pos).addClass('CurPos' + randomPos[i]);
		}
	}

	function shuffleFragment(difficulty) {
		isShuffle = true;
		for (var i = 0; i < difficulty.length * 50; i++)
			$('#Game-container div')[Math.floor(Math.random() * 15)].click();
		setPosition();
		isShuffle = false;
	}

	function setPosition() {
		for (var i = 0; i < Frags.length; i++) {
			randomPos[i] = Frags[i].pos;
		}
	}

	function moveFrag() {
		var getPos = this.pos;
		if ((getPos - 1 == empty && getPos % 4) || (getPos + 1 == empty && (getPos + 1) % 4 ) ||
		 getPos + 4 == empty || getPos - 4 == empty) {
		 	this.dom.removeClass('CurPos' + this.pos).addClass('CurPos' + empty);
			var temp = empty;
			empty = this.pos;
			this.pos = temp;
		}
		if (!isShuffle)
			isWin.apply(this);
	}

	function isWin() {
		var flag = true;
		for (var i = 0; i < Frags.length; i++) {
			if (!Frags[i].check(i))
				flag = false;
		}
		if (flag) {
			win = true;
			alert('You Finished it!');
		}
	}

})(jQuery);