// author: 15331169 lixiaoyun
// last edited: 2016-10-15

(function($) {
	$(document).ready(function() { new Mole(); });

	function Mole() {
		this.HighestScore = 0;
		createMoles();
		this.reset();
		bindClickListeners.call(this);
	}

	function bindClickListeners() {
		$('#SorS').click(this.startOrStop.bind(this));
		$('#Moles').click(hitMole.bind(this));
	}

	function createMoles() {
		for (var i = 0; i < 60; i++) {
			var newMole = document.createElement('div');
			$(newMole).addClass('moleClass');
			$('#Moles').append(newMole);
		}
	}

	function hitMole(event) {
		if (this.isSuccess(event.target)) {
			this.score++;
			this.setMole();
		}
		else 
			this.score--;
		this.refresh();
	}

	function difficultyChooseButton(condition) {
		$('input[name=difficulty]').each(function() {
			$(this).attr('disabled', condition);
		});
	}

	Mole.prototype = {
		isSuccess: function(dom) {
						console.log(dom);
						if ($(dom).hasClass('Mouse')) {
							$(dom).removeClass("Mouse");
							return true;
						}
						return false;
					},
		setMole: function() {
					var ran = Math.floor(Math.random() * 60);
					$("#Moles div:nth-child(" + ran++ + ")").addClass('Mouse');
				},
		refresh: function() {
					$('#Score').attr('value', this.score);
					$('#Time').attr('value', this.time);
					$('#playing').attr('value', this.playing? 'Playing': 'Game Over');
				},
		startOrStop: function() {
						this.playing? this.stop(): this.start();
					},
		start: function() {
					this.score = 0;
					this.time = 30;
					this.playing = true;
					this.difficulty = $('input[name=difficulty]').attr('value');
					difficultyChooseButton(true);
					this.setClock();
					this.setMole();
					this.refresh();
			},
		stop: function() {
				this.playing = false;
				this.HighestScore = this.score > this.HighestScore? this.score: this.HighestScore;
				this.refresh();
				alert("Game Over.\nYourscore is: " + this.score + "\nThe highest score is: " + this.HighestScore);
				this.reset();
			},
		reset: function() {
				this.resetParameter();
				this.clearClocks();
			},
		resetParameter: function() {
							this.playing = false;
							this.time = 0;
							this.score = 0;
							$('.Mouse').each(function() {
								$(this).removeClass('Mouse');
							});
							difficultyChooseButton(false);
						},
		setClock: function() {
					var showTime = 0;
					if (this.difficulty  === "Easy") 
						showTime = 8000;
					else if (this.difficulty === "Normal") 
						showTime = 5000;
					else 
						showTime = 3000;
					this.timeClock = setInterval(this.clock.bind(this), 1000);
					this.moleClock = setInterval(this.setMole.bind(this), showTime);
				},
		clock: function() {
					this.time > 0? this.time--: this.stop();
					this.refresh();
				},
		clearClocks: function() {
			clearInterval(this.timeClock);
			clearInterval(this.moleClock);
		}
	};
})(jQuery);