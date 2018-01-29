  (function(){
    var $backTop = $('#backTop'),
        $pageBody = $('html,body'),
        $to = $('.shop-box .tit');
    $('.historyNav li').each(function(i){
      var o = $to.eq(i),
          _t = o.position().top;
      $(this).on('click',function(){
        $pageBody.animate({
          scrollTop: _t
        },500);
        $(this).addClass('cur').siblings().removeClass('cur');
      }) 

    });

    $backTop.on('click',function(){
      $pageBody.animate({
        scrollTop: 0
      },500)
    });
    var timer = null;
    $(window).on('scroll',function(){
      clearTimeout(timer)
      timer = setTimeout(function(){
        var _t = document.body.scrollTop || document.documentElement.scrollTop;
        if(_t > 200 ){
          $backTop.fadeIn('slow')
        }else{
          $backTop.fadeOut('slow')
        }
      },200)
    })
  })()