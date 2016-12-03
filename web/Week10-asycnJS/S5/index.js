// author: lixiaoyun 15331169
// hw: week 10 async js

(function($) {
	$(document).ready(function() {
		$('#at-plus-container').mouseenter(reset);
		$('#at-plus-container').mouseleave(stopRobot);
	}); 

	function stopRobot() {
		for (var i = 0; i < 1000; i++) {
			clearTimeout(i);
		}
		aHandler.stop = true;
		bHandler.stop = true;
		cHandler.stop = true;
		dHandler.stop = true;
		eHandler.stop = true;
		bubbleHandler.stop = true;
		callback.stop = true;
	}

	function Robot() {
		// this.clicked = [0, 0, 0, 0, 0];
		// this.order = [1, 2, 3, 4, 5];
		this.haveClicked = 0;
		this.handlers = [aHandler, bHandler, cHandler, dHandler, eHandler];
	}

	function reset() {
		aHandler.stop = false;
		bHandler.stop = false;
		cHandler.stop = false;
		dHandler.stop = false;
		eHandler.stop = false;
		bubbleHandler.stop = false;
		callback.stop = false;
		var curRobot = new Robot();
		$('.button span').html('...').hide();
		$('#Total').html('');
		$('#info-bar p').html('');
		$('.button').css('background-color', '#1F479C');
		$('#info-bar').css('background-color', '#555555');
		$('.apb').unbind('click').click({curRobot}, startRobot);
	}

	
	function startRobot(event) {
		var curRobot = event.data.curRobot;
		console.log(event.data);
		curRobot.handlers.sort(function() {
			return Math.random() > 0.5? true: false;
		});
		for (var i = 0; i < 5; i++) {
			if (i < 4){
				curRobot.handlers[i].nextHandler = curRobot.handlers[i + 1];
			}
			else 
				curRobot.handlers[4].nextHandler = bubbleHandler;
			if (i != 0)
				curRobot.handlers[i].lastHandler = curRobot.handlers[i - 1];
		}
		bubbleHandler.lastHandler = curRobot.handlers[4];
		var currentSum = 0;
		console.log(curRobot);
		curRobot.handlers[0].lastHandler = function() {
			curRobot.handlers[0](currentSum, callback);
		}
		curRobot.handlers[0](currentSum, callback);
	}




	function callback(err, result) {//result{message, currentSum, lastHandler}
		if (!callback.stop) {
			$('#info-bar p').html(result.message);
			if (err) {
				setTimeout(function() {
					result.lastHandler(result.currentSum, callback, err);
				}, 1000);//重新调用caller
			}
		}
	}

	function aHandler(currentSum, callback, err) {
		if (!aHandler.stop) {
			console.log("Calling A");
			if (err) {
				setTimeout(function() {
					aHandler.nextHandler(currentSum, callback);
				}, 1000);//再次调用失败过的callee
			}
			else {
				disableButton($('.button').not('.A'));//disable all buttons except itself
				$('.A').css('background-color', '#1F479C').find('span').show();
				$.ajax({
					url: '/upload',
					method: 'GET',
					success: function(responseText, textStatus) {
						this.lastHandler = aHandler;
						if (randomError()) {
							callback(new Error, {message: "这不是个天大的秘密", currentSum: currentSum, lastHandler: aHandler.lastHandler});
						}
						else {
							$('.A').find('span').html(responseText);
							currentSum += parseInt(responseText);
							$('.A').css('background-color', '#555555');//disabled
							setTimeout(function() {
								aHandler.nextHandler(currentSum, callback);
							}, 1000);
							callback(null, {message: "这是个天大的秘密", currentSum: currentSum});
						}
						
					}
				});
			}
		}
	}

	function bHandler(currentSum, callback, err) {
		if (!bHandler.stop) {
			console.log("Calling B");
			if (err) {
				setTimeout(function() {
					bHandler.nextHandler(currentSum, callback);
				}, 1000);//再次调用失败过的callee
			}
			else {
				disableButton($('.button').not('.B'));//disable all buttons except itself
				$('.B').css('background-color', '#1F479C').find('span').show();
				$.ajax({
					url: '/upload',
					method: 'GET',
					success: function(responseText, textStatus) {
						this.lastHandler = bHandler;
						if (randomError()) {
							callback(new Error, {message: "我知道", currentSum: currentSum, lastHandler: bHandler.lastHandler});
						}
						else {
							$('.B').find('span').html(responseText);
							currentSum += parseInt(responseText);
							$('.B').css('background-color', '#555555');//disabled
							setTimeout(function() {
								bHandler.nextHandler(currentSum, callback);
							}, 1000);
							callback(null, {message: "我不知道", currentSum: currentSum});
						}
						
					}
				});
			}
		}
		
	}

	function cHandler(currentSum, callback, err) {
		if (!cHandler.stop) {
			console.log("Calling C");
			if (err) {
				setTimeout(function() {
					cHandler.nextHandler(currentSum, callback);
				}, 1000);//再次调用失败过的callee
			}
			else {
				disableButton($('.button').not('.C'));//disable all buttons except itself
				$('.C').css('background-color', '#1F479C').find('span').show();
				$.ajax({
					url: '/upload',
					method: 'GET',
					success: function(responseText, textStatus) {
						this.lastHandler = cHandler;
						if (randomError()) {
							callback(new Error, {message: "你知道", currentSum: currentSum, lastHandler: cHandler.lastHandler});
						}
						else {
							$('.C').find('span').html(responseText);
							currentSum += parseInt(responseText);
							$('.C').css('background-color', '#555555');//disabled
							setTimeout(function() {
								cHandler.nextHandler(currentSum, callback)
							}, 1000);
							callback(null, {message: "你不知道", currentSum: currentSum});
						}
						
					}
				});
			}
		}
		
		
	}

	function dHandler(currentSum, callback, err) {
		if (!dHandler.stop) {
			console.log("Calling D");
			if (err) {
				setTimeout(function() {
					dHandler.nextHandler(currentSum, callback);
				}, 1000);//再次调用失败过的callee
			} 
			else {
				disableButton($('.button').not('.D'));//disable all buttons except itselfx
				$('.D').css('background-color', '#1F479C').find('span').show();
				$.ajax({
					url: '/upload',
					method: 'GET',
					success: function(responseText, textStatus) {
						this.lastHandler = dHandler;
						if (randomError()) {
							callback(new Error, {message: "他知道", currentSum: currentSum, lastHandler: dHandler.lastHandler});
						}
						else {
							$('.D').find('span').html(responseText);
							currentSum += parseInt(responseText);
							$('.D').css('background-color', '#555555');//disabled
							setTimeout(function() {
								dHandler.nextHandler(currentSum, callback);
							}, 1000);			
							callback(null, {message: "他不知道", currentSum: currentSum});
						}
						
					}
				});
			}
		}
		
		
	}

	function eHandler(currentSum, callback, err) {
		if (!eHandler.stop) {
			console.log("Calling E");
			if (err) {
				setTimeout(function() {
					eHandler.nextHandler(currentSum, callback);
				}, 1000);//再次调用失败过的callee
			}
			else {
				disableButton($('.button').not('.E'));//disable all buttons except itself
				$('.E').css('background-color', '#1F479C').find('span').show();
				$.ajax({
					url: '/upload',
					method: 'GET',
					success: function(responseText, textStatus) {
						this.lastHandler = eHandler;
						if (randomError()) {
							callback(new Error, {message: "才不怪", currentSum: currentSum, lastHandler: eHandler.lastHandler});
						}
						else {
							$('.E').find('span').html(responseText);
							currentSum += parseInt(responseText);
							$('.E').css('background-color', '#555555');//disabled
							setTimeout(function() {
								eHandler.nextHandler(currentSum, callback);
							}, 1000);
							callback(null, {message: "才怪", currentSum: currentSum});
						}
					}
				});
			}
		}
	}

	function bubbleHandler(currentSum, callback) {
		if (!bubbleHandler.stop) {
			console.log("Calling Bubble");
			$('#info-bar').css('background-color', '#1F479C');
			if (randomError()) {
				callback(new Error, {message: "楼主异步调用战斗力一点都不感人，目测不超过" + currentSum, currentSum: currentSum, lastHandler: bubbleHandler.lastHandler});
			}
			else {
				$('#Total').html(currentSum);
				$('#info-bar').css('background-color', '#555555');
				callback(null, {message: "楼主异步调用战斗力感人，目测不超过" + currentSum, currentSum: currentSum});
			}
		}
	}

	function randomError() {
		return Math.random() > 0.5? true: false;
	}

	function enableButton($object, clickFunc, curRobot){
		$object.css('background-color', '#1F479C');
		$object.bind('click', {curRobot}, clickFunc);
	}

	function disableButton($object) {
		$object.css('background-color', '#555555');
		//$object.unbind('click');//unbind click, no response being clicked
	}

	function getRandomNumber(event) {
		var curRobot = event.data.curRobot;
		var that = this;
		$(this).find('span').show();
		disableButton($('.button').not(this));//disable all buttons except itself
		$.ajax({
			url: '/upload',
			method: 'GET',
			success: function(responseText, textStatus) {
				$(that).find('span').html(responseText);
				curRobot.clicked[$(that).index()] = parseInt(responseText);
				disableButton($(that));
				enableButton($('.button').filter(function(index) {
					return !curRobot.clicked[index];
				}), getRandomNumber, curRobot);
				checkClicked(curRobot);
				console.log(curRobot.order);
				if (curRobot.haveClicked < 4) {
					console.log("ss");
					$('.button:nth-child(' + curRobot.order[++curRobot.haveClicked] + ')').click();
				}
			}
		});
		$(this).unbind('click');
	}

	function checkClicked(curRobot) {
		var isAllClicked = curRobot.clicked.every(function(value) {
			return value != 0;
		});
		console.log(isAllClicked);
		console.log(curRobot.clicked);
		if (isAllClicked) {
			enableButton($('#info-bar'), getTotal, curRobot);
			$('#info-bar').click();
		}
	}

	function getTotal(event) {
		var curRobot = event.data.curRobot;
		var sum = 0;
		curRobot.clicked.forEach(function(value) {
			sum += value;
		});
		$('#Total').html(sum);
		disableButton($('#info-bar'));
	}
})(jQuery);