// author: 15331169 lixiaoyun
// hw: week9 sign up

(function($) {
	var invalid = [1,1,1,1,1,1];
	$(document).ready(function() {
		$('.wrongFormat').hide();
		$('button').attr('disbale', true);
		$('input[name=username]').blur(checkUsername);
		$('input[name=studentId]').blur(checkStudentId);
		$('input[name=password1]').blur(checkPassword1);
		$('input[name=password2]').blur(checkPassword2);
		$('input[name=phone]').blur(checkPhone);
		$('input[name=mail]').blur(checkMail);
	});

	function checkUsername(event) {
		var username = $(event.target).val();
		if (!validator.isUsernameValid(username)) {
			invalid[0] = 1;
			$('.username.wrongFormat').show();
		}
		else {
			invalid[0] = 0;
			$('.username.wrongFormat').hide();
			buttonEnable();
		}
	}

	function checkStudentId(event) {
		var sid = $(event.target).val();
		if (!validator.isStudentIdValid(sid)) {
			invalid[1] = 1;
			$('.studentId.wrongFormat').show();
		}
		else {
			invalid[1] = 0;
			$('.studentId.wrongFormat').hide();
			buttonEnable();
		}
	}

	function checkPassword1(event) {
		var pwd1 = $(event.target).val();
		if (!validator.isPasswordValid(pwd1)) {
			invalid[2] = 1;
			$('.password1.wrongFormat').show();
		}
		else {
			invalid[2] = 0;
			$('.password1.wrongFormat').hide();
			buttonEnable();
		}
	}

	function checkPassword2(event) {
		var pwd1 = $(event.target).val();
		var pwd2 = $('input[name=password1]').val();
		if (!validator.isPasswordRepeatCorrect(pwd1, pwd2)) {
			invalid[3] = 1;
			$('.password2.wrongFormat').show();
		}
		else {
			invalid[3] = 0;
			$('.password2.wrongFormat').hide();
			buttonEnable();
		}
	}

	function checkPhone(event) {
		var phone = $(event.target).val();
		if (!validator.isPhoneNumberValid(phone)) {
			invalid[4] = 1;
			$('.phone.wrongFormat').show();
		}
		else {
			invalid[4] = 0;
			$('.phone.wrongFormat').hide();
			buttonEnable();
		}
	}

	function checkMail(event) {
		var mail = $(event.target).val();
		if (!validator.isMailValid(mail)) {
			invalid[5] = 1;
			$('.mail.wrongFormat').show();
		}
		else {
			invalid[5] = 0;
			$('.mail.wrongFormat').hide();
			buttonEnable();
		}
	}

	function buttonEnable() {
    if (invalid.every(function(ele) {return ele == 0}))
      $('button').removeAttr('disbale');
  }
})(jQuery);