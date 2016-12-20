(function($) {
  var invalid = [1,1];
  $(document).ready(function() {
    $('button').attr('disbale', true);
    $('.wrongFormat').hide();
    $('input[name=username]').blur(checkUsername);
    $('input[name=password]').blur(checkPassword1);
    var rsa_n = "C34E069415AC02FC4EA5F45779B7568506713E9210789D527BB89EE462662A1D0E94285E1A764F111D553ADD7C65673161E69298A8BE2212DF8016787E2F4859CD599516880D79EE5130FC5F8B7F69476938557CD3B8A79A612F1DDACCADAA5B6953ECC4716091E7C5E9F045B28004D33548EC89ED5C6B2C64D6C3697C5B9DD3";

    $("#submit").click(function(){
        if (invalid.some(function(ele) {return ele == 1;}))
          return false;
        setMaxDigits(131); //131 => n的十六进制位数/2+3
        var key = new RSAKeyPair("10001", '', rsa_n); //10001 => e的十六进制
        var password = $("input[name=password]").val();
        password = encryptedString(key, password);//美中不足，不支持汉字~
        $("input[name=password]").val(password);
        $("form").submit();
    });
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
    }
  }

  function checkPassword1(event) {
    var pwd1 = $(event.target).val();
    if (!validator.isPasswordValid(pwd1)) {
      invalid[1] = 1;
      $('.password1.wrongFormat').show();
    }
    else {
      invalid[1] = 0;
      $('.password1.wrongFormat').hide();
    }
  }

  function buttonEnable() {
    if (invalid.every(function(ele) {return ele == 0}))
      $('button').removeAttr('disbale');
  }
})(jQuery);