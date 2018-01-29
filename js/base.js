$(document).ready(function ($) {
  $('#mega-menu-1').dcMegaMenu({
    rowItems: '3',
    speed: 'fast',
    effect: 'fade'
  });
});

function check_name() {
  var name = $.trim($('#id-name').val());
  if (name == '' || name == $('#id-name').attr('placeholder')) {
    $('#name-tip').text('姓名是必填项');
    return false;
  };
  $('#name-tip').text('');
  return true;
};

function check_phone() {
  var phone = $.trim($('#id-phone').val());
  if (phone == ''|| phone == $('#id-phone').attr('placeholder')) {
    $('#phone-tip').text('手机是必填项');
    return false;
  } else if (!/^\d{11}$/.test(phone)) {
    $('#phone-tip').text('请输入十一位的手机号码')
    return false;
  };
  $('#phone-tip').text('');
  return true;
};

function check_message() {
  var message = $('#appointment-textarea').val();
  if (message.length > 200) {
    $('#message-tip').text('备注应在200字以内');
    return false;
  } else if (message == $('#appointment-textarea').attr('placeholder')){
    $('#appointment-textarea').val('');
  };

  $('#message-tip').text('');
  return true;
};

function appointment_form_submit() {

  if (check_name() && check_phone() && check_message()) {
    _hmt.push(['_trackEvent', 'reservation-designer', 'click']);
    $.ajax({
      url: "/accounts/reserve-designer/",
      type: "POST",
      data: $('form.appointment-form').serialize(),
      dataType: "text",
      success: function (data) {
        if (data != 'ok') {
          $('#appointment-form-msg').text('遇到错误：' + data);
        } else {
          $('#appointment-form-msg').text('预约成功，我们的客服人员会尽快和您联系。');
          $('form.appointment-form .tip').text('');
          $('#appointment-textarea').val('');
        }
        $('.appointment-form').hide();
      }
    });
  };
};

function init_appointment_form() {
  $('#appointment-form-msg').text('请您留下姓名和电话，我们的客服人员会尽快和您联系并为您预约附近的门店。');
  $('.appointment-form').show();
};

$(function () {
  if (!placeholderSupport()) {   // 判断浏览器是否支持 placeholder
    $('[placeholder]').focus(function () {
      var input = $(this);
      if (input.val() == input.attr('placeholder')) {
        input.val('');
        input.removeClass('placeholder');
      };
    }).blur(function () {
      var input = $(this);
      if (input.val() == '' || input.val() == input.attr('placeholder')) {
        input.addClass('placeholder');
        input.val(input.attr('placeholder'));
      };
    }).blur();
  };
});

function placeholderSupport() {
  return 'placeholder' in document.createElement('input');
};

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++){
    var c = $.trim(ca[i]);
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}

function is_login(){
  var logged_user = eval(decodeURI(eval(getCookie('logged_user')))); 
  if (logged_user){
    $('.have_login').show();
    $('#user_nickname').html(logged_user[1]);
    $('#id-name').val(logged_user[0]);
    $('.no_login').hide();
  }
};

is_login();

function show_qr_code() {
  _hmt.push(['_trackEvent', 'weixin', 'click', 'footer']);
  if ($("#qr_code").is(":hidden")) {
    $('#qr_code').show();
  }
  else {
    $('#qr_code').hide()
  };
};

$('.touch .category_2').click(function(e) {
  e.preventDefault();
  if ($(this).parent().find('.sub:visible').length > 0) {
    window.location.href = $(this).attr('href');
  } else {
    $(this).trigger('mouseover');
  };
});

function call_base(phoneNum) {
  try {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      window.location.href = "tel:"+phoneNum;
    } else {

    };
  } catch (e) {
  }
};

$("img.lazy").lazyload({
    threshold : 200,
    skip_invisible : false
});