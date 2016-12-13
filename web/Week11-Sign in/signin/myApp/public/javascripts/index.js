(function($) {
  var invalid = [1,1];
  $(document).ready(function() {
    $('button').attr('disbale', true);
    $('.wrongFormat').hide();
    $('input[name=username]').blur(checkUsername);
    $('input[name=password]').blur(checkPassword1);
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

  function checkPassword1(event) {
    var pwd1 = $(event.target).val();
    if (!validator.isPasswordValid(pwd1)) {
      invalid[1] = 1;
      $('.password1.wrongFormat').show();
    }
    else {
      invalid[1] = 0;
      $('.password1.wrongFormat').hide();
      buttonEnable();
    }
  }

  function buttonEnable() {
    if (invalid.every(function(ele) {return ele == 0}))
      $('button').removeAttr('disbale');
  }
})(jQuery);