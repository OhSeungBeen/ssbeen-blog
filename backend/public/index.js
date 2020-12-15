$(document).ready(function () {
  $.get('auth/status', function (status) {
    if ((status = 'login')) {
      $('#kakao-login-btn').hide();
    }
  });
});

$('#login-btn').click(() => {});

$('#kakao-login-btn').click(() => {
  location.href = './auth/kakao';
});
