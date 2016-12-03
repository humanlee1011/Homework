// author: 15331169 lixiaoyun
// hw: week9 sign up

(function($) {
	$(document).ready(function() {
		$('button').click(function() {
			$('p').html('');
			if (!isValid())
				return false;
			$.ajax({
				type: 'POST',
				data: $('form').serialize(),
				success: function(responseText, statusText) {
					console.log(responseText);
					if (responseText.match(/username/))
						window.location.href += responseText;
					var array = responseText.split(",");
					for (var i = 0; i < array.length; i++) {
						$('input[name=' + array[i] + ']+p').html('Repeat');
					}
				}
			});
		});
	});

	function isValid() {
		var userInfo = {
			"username": $('input[name=username]').val(),
			"idNumber": $('input[name=idNumber]').val(),
			"phoneNumber": $('input[name=phoneNumber]').val(),
			"mail": $('input[name=mail]').val()
		};
		if (userInfo.username.match(/[a-zA-Z]{1}[\w|_]{5,17}/) != userInfo.username) {
			alert("用户名6~18位英文字母、数字或下划线，必须以英文字母开头");
			return false;
		}
		else if (userInfo.idNumber.match(/[1-9]{1}[0-9]{7}/) != userInfo.idNumber) {
			alert("学号8位数字，不能以0开头");
			return false;
		}
		else if (userInfo.phoneNumber.match(/[1-9]{1}[0-9]{10}/) != userInfo.phoneNumber) {
			alert("电话11位数字，不能以0开头");
			return false;
		}
		else if (userInfo.mail.match(/.+@.+\.com/) != userInfo.mail) {
			alert("邮箱地址不正确");
			return false;
		}
		else 
			return true;
	}
})(jQuery);