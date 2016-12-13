var validator = {
  isUsernameValid: function(username) {
    return username.match(/[a-zA-Z]{1}[\w|_]{5,17}/) == username;
  },
  isStudentIdValid: function(id) {
    return id.match(/[1-9]{1}[0-9]{7}/) == id;
  },
  isPhoneNumberValid: function(phone) {
    return phone.match(/[1-9]{1}[0-9]{10}/) == phone;
  },
  isMailValid: function(mail) {
    return mail.match(/.+@.+\.com/) == mail;
  },
  isPasswordValid: function(pwd) {
    return pwd.match(/[\w|_|-]{6,12}/) == pwd;
  },
  isPasswordRepeatCorrect: function(pwd1, pwd2) {
    return pwd1 === pwd2;
  }
}
