// author: 15331169 lixiaoyun
// hw: week8 Optimize

(function($) {
	$(document).ready(function() {
	  new Maze(); });
	function Maze() {
		this.lose = false;
		this.playing = false;
		this.mouseInMazeornot = false;
		bindListeners.call(this);
	}

	function bindListeners() {
		console.log(this);
		var that = this;
		$('#Maze').mouseenter(this.changeCondition.bind(this));
		$('#Maze').mouseleave(this.changeCondition.bind(this));
		$('#Start').mouseover(this.Start.bind(this));
		$('#End').mouseover(this.End.bind(this));
		$('#Wall').mouseover(this.crashWall.bind(this));
		$('#Wall').mouseout(this.leaveWall.bind(this));
	}

	Maze.prototype.Start = function() {
		if (!this.mouseInMazeornot) {
			console.log(this.playing);
			this.playing = true;
			$('#output').html('');
		}
	};

	Maze.prototype.End = function() {
		if (this.mouseInMazeornot == true && this.playing == true) 
			$('#output').html('You Win.');
		else if (!this.mouseInMazeornot) 
			$('#output').html("Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!");
		this.playing = false;
	};

	Maze.prototype.crashWall = function() {
		if (this.playing) {
			this.lose = true;
			$("#output").html("You Lose.");
			event.target.id = "lose";
		}
	};

	Maze.prototype.leaveWall = function() {
		this.playing = false;
		this.lose = false;
		event.target.id = "";
	};

	Maze.prototype.changeCondition = function(event) {
		this.mouseInMazeornot = event.type === "mouseenter"? true: false;
	};
})(jQuery);