// author: lixiaoyun 15331169
// hw: week 10 async js

(function($) {
	var clicked = [0, 0, 0, 0, 0];
	var ajax;
	$(document).ready(function() {
		$('#at-plus-container').mouseenter(reset);
	}); 

	function reset() {
		if (ajax)
			ajax.abort();
		clicked = [0, 0, 0, 0, 0];
		$('.button span').html('...').hide();
		$('#Total').html('');
		enableButton($('.button'), getRandomNumber);
		$('.apb').unbind('click').click(startRobot);
	}

	function startRobot() {
		$('.A').click();
	}

	function enableButton($object, clickFunc){
		$object.css('background-color', '#1F479C');
		$object.bind('click', clickFunc);
	}

	function disableButton($object) {
		$object.css('background-color', '#555555');
		$object.unbind('click');//unbind click, no response being clicked
	}

	function getRandomNumber() {
		var that = this;
		$(this).find('span').show();
		disableButton($('.button').not(this));//disable all buttons except itself
		$.ajax({
			url: '/upload',
			method: 'GET',
			success: function(responseText, textStatus) {
				var index = $(that).index();
				$(that).find('span').html(responseText);
				clicked[index] = parseInt(responseText);
				disableButton($(that));
				enableButton($('.button').filter(function(index) {
					return !clicked[index];
				}), getRandomNumber);
				if (index < 4) {
					setTimeout(function() {
						document.getElementsByClassName('button')[index + 1].click();
					}, 1000);
				}
				checkClicked();				
			}
		});
		$(this).unbind('click');
	}

	function checkClicked() {
		var isAllClicked = clicked.every(function(value) {
			return value != 0;
		});
		console.log(isAllClicked);
		console.log(clicked);
		if (isAllClicked) {
			enableButton($('#info-bar'), getTotal);
			$('#info-bar').click();
		}
	}

	function getTotal() {
		var sum = 0;
		clicked.forEach(function(value) {
			sum += value;
		});
		$('#Total').html(sum);
		disableButton($('#info-bar'));
	}
})(jQuery);