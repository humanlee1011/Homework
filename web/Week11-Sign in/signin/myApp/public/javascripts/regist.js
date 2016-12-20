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

		$("#submit").click(Submit);
	});

	function Submit() {
		if (invalid.some(function(ele) {return ele == 1;}))
			return false;
		var rsa_n = "C34E069415AC02FC4EA5F45779B7568506713E9210789D527BB89EE462662A1D0E94285E1A764F111D553ADD7C65673161E69298A8BE2212DF8016787E2F4859CD599516880D79EE5130FC5F8B7F69476938557CD3B8A79A612F1DDACCADAA5B6953ECC4716091E7C5E9F045B28004D33548EC89ED5C6B2C64D6C3697C5B9DD3";

		setMaxDigits(131); //131 => n的十六进制位数/2+3
    var key = new RSAKeyPair("10001", '', rsa_n); //10001 => e的十六进制
    var password = $("input[name=password1]").val();
    password = encryptedString(key, password);
    $("input[name=password1], input[name=password2]").val(password);
    $("form").submit();
	}

	function checkUsername(event) {
		var username = $(event.target).val();
		if (!validator.isUsernameValid(username)) {
			invalid[0] = 1;
			$('.username.wrongFormat').show();
		}
		else {
			invalid[0] = 0;
			$('.username.wrongFormat').hide();
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
		}
	}

	function buttonEnable() {
    if (invalid.every(function(ele) {return ele == 0}))
      $('button').removeAttr('disbale');
  }
})(jQuery);