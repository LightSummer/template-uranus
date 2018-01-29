$(function(){
        var $win_w = $(window).width();
        var image_base_path = "/media/minisite/images/";
        // �ֻ���Ļ�����õ���������ʽ
        function setShow(){
            if($win_w<768){
                $win_w = $(window).width();
                $('.show_img').addClass('show_mobile');
                $('.miniShow').find('li').width($win_w);
                $('.mask').addClass('mask_mobile');
            }else{
                $('.show_img').removeClass('show_mobile');
                $('.mask').removeClass('mask_mobile');
            }
        }
        setShow();
        $(window).resize(function(){
            setShow();
        });
        $(".preview-img").click(function(){
            var dir_name = $(this).attr("dir_name");
            var image_count = parseInt($(this).attr("image_count"));
            // �Ƴ�ԭ��ͼƬ
            $(".show_img").find("ul").html("");
            // �Ƴ�ԭ��ҳǩ
            $(".show_img").find("p.page_count").html("");
            // �����ֲ��ؼ�
            var show_control = $(".show_img").clone();
            // �Ƴ�ԭ�пؼ�
            $(".show_img").remove();
            if($win_w < 768){
                show_control.addClass('show_mobile');
            }else{
                show_control.removeClass('show_mobile');
            }
            var ul_control = show_control.find("ul");
            for (var i = 1; i <= image_count; i ++) {
                var image_no = i;
                if (i < 10){
                    image_no = "0" + image_no;
                }
                var image_path = image_base_path + dir_name + "/" + dir_name + image_no + ".jpg";
                var li_item = $('<li><img src="'+ image_path +'"></li>');
                if($win_w < 768){
                    li_item.css("width", $win_w);
                }
                ul_control.append(li_item);
            }
            $(".mask").after(show_control);
            // ���¿ؼ�����¼�
            show_control.carousel({
                autoRun: false,      // �Ƿ��Զ�����
                prevBtn: 'next',   // �����ʽ
                nextBtn: 'prev',  // �Ҽ���ʽ
                showPageMark:true,
                pageClass: "page_count",
                pageType: 2
            });
            $(".mask").show();
            show_control.find(".close_show").click(function(){
                $(".mask").hide();
                $(".show_img").hide();
                $(".show_img").find("ul").html();
            });
            show_control.show();
        });
        $(".mask").click(function(){
            $(this).hide();
            $(".show_img").hide();
            $(".show_img").find("ul").html();
        });
    });(jQuery);