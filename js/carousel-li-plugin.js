(function($){
    $.fn.carousel = function(options){
        // pageType说明(1:全显示1,2,3,4,5 ; 2:简单显示 1/35 )
        var defaults = {
            autoRun: true,          // 是否自动滚动
            prevBtn: 'prev',        // 左键样式
            nextBtn: 'next',        // 右键样式
            showItemCount: 1,       // 最小item个数
            autoRunTime: 3000,      // 滚动间隔时间
            margin: 0,              // 调整像素
            showPageMark: false,    // 是否显示页签
            pageClass: 'page',      // 页签样式
            showPreview: false,     // 是否有缩略图
            previewClass: 'imgView',// 缩略图样式
            moveTime: 500,          // 动画执行时间
            pageType: 1,            // 页签类型
            isRound: true           // 是否要循环滚动(暂不支持)
        };
        var currentPage = 0;
        var opts = $.extend(defaults, options);

        var showBox = this.find('li');
        // 添加页签
        function set_all_num_page(control){
            var pageBox = $(control.find("." + opts.pageClass));
            for(var i = 0; i < showBox.length; i ++){
                if(i == 0){
                    pageBox.append("<dd class='current'>" + (i+1) + "</dd>");
                }else{
                    pageBox.append("<dd>" + (i+1) +"</dd>");
                }
            }
        }
        function set_simple_num_page(control){
            var pageBox = control.find("." + opts.pageClass);
            pageBox.append("<span class='m_left'>&lt;</span>");
            pageBox.append("<span class='current_num'>1</span>");
            pageBox.append("<span>/</span>");
            pageBox.append("<span>" + showBox.length + "</span>");
            pageBox.append("<span class='m_right'>&gt;</span>");
        }
        if(opts.showPageMark) {
            if(showBox.length > opts.showItemCount) {
                if (opts.pageType == 1){
                    set_all_num_page(this);
                } else if (opts.pageType == 2) {
                    set_simple_num_page(this);
                }
            }
        }
        var _moving;
        var obj_mover = this;
        this.find("."+ opts.prevBtn).click(function(){
            if(opts.showPreview) {
                mover_preview_carousel(obj_mover, "left", 1);
            } else {
                mover_carousel(obj_mover, "left");
            }
        });

        this.find("."+ opts.nextBtn).click(function(){
            if(opts.showPreview) {
                mover_preview_carousel(obj_mover, "right", 1);
            } else {
                mover_carousel(obj_mover, "right");
            }
        });

        if(showBox.length > opts.showItemCount && opts.autoRun){
            this.hover(function () {
                clearInterval(_moving);//当鼠标在滚动区域中时,停止滚动
            },function () {
                _moving = setInterval(function () {
                    mover_carousel(obj_mover, "left");
                }, opts.autoRunTime);//滚动间隔时间取决于autoRunTime
            }).trigger('mouseleave');
        } else {
            clearInterval(_moving);
        }
        //平台、设备和操作系统
        var system = {
            win: false,
            mac: false,
            xll: false,
            ipad:false
        };
        //检测平台
        var p = navigator.platform;
        system.win = p.indexOf("Win") == 0;
        system.mac = p.indexOf("Mac") == 0;
        system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
        system.ipad = (navigator.userAgent.match(/iPad/i) != null)?true:false;
        //跳转语句，如果是手机访问就自动跳转到wap.baidu.com页面
//        if (system.win || system.mac || system.xll||system.ipad) {
//        } else {
        this.find('li').touchwipe({
            wipeLeft: function() {
                if(opts.autoRun){
                    clearInterval(_moving);
                }
                if(opts.showPreview) {
                    mover_preview_carousel(obj_mover, "right", 1);
                } else {
                    mover_carousel(obj_mover, "left");
                }
            },
            wipeRight: function() {
                if(opts.autoRun){
                    clearInterval(_moving);
                }
                if(opts.showPreview) {
                    mover_preview_carousel(obj_mover, "left", 1);
                } else {
                    mover_carousel(obj_mover, "right");
                }
            },
            wipeEnd: function(){
                if(opts.autoRun){
                    _moving = setInterval(function () {
                        mover_carousel(obj_mover, "left");
                    }, opts.autoRunTime);//滚动间隔时间取决于autoRunTime
                }
            }
        });
//        }
        var preview_current_index = 0;


        if(opts.showPreview) {
            var previewBox = this.parent().find("div." + opts.previewClass).find("li");
            previewBox.click(function(){
                var current_li = $(this).parent().parent().find("li.current");
                var current_index = $(previewBox).index(current_li);
                var click_index = $(this).index();
                if(current_index != click_index){
                    var direction = "right";
                    var move_count = click_index - current_index;
                    if (click_index < current_index) {
                        direction = "left";
                        move_count = current_index - click_index;
                    }
                    mover_preview_carousel(obj_mover, direction, move_count);
                }
            });
        }

        function mover_preview_carousel(obj_mover, direction, move_count) {
            // 获取滚动区域list
            var run_list = obj_mover.find('li');
            if (run_list.length <= 1) {
                alert("图片数量少于两张不能切换");
                return;
            }
            if (direction == "left") {
                if(preview_current_index <= 0){
                    preview_current_index = 0;
                    alert("已经是第一张了");
                    return;
                }
                preview_current_index -= move_count;
            } else if (direction == "right") {
                if(preview_current_index >= run_list.length -1){
                    preview_current_index = run_list.length -1;
                    alert("已经是最后一张了");
                    return;
                }
                preview_current_index += move_count;
            }

            var preview_show_box = obj_mover.parent().find("div." + opts.previewClass);
            var current_preview = preview_show_box.find("li.current");
            current_preview.removeClass("current");
            preview_show_box.find("li:eq(" + preview_current_index + ")").addClass("current");
            var show_preview_width = (preview_current_index + 2) * current_preview.width();
            if(show_preview_width > preview_show_box.width() && preview_current_index + 1 < preview_show_box.find("li").length){
                preview_show_box.find("ul").animate({left: preview_show_box.width() - show_preview_width}, "slow");
            } else if(preview_current_index + 1 < preview_show_box.find("li").length) {
                preview_show_box.find("ul").animate({left: 0}, "slow");
            } else if (preview_current_index == run_list.length -1) {

            }
            var _field = $(run_list[0]);//此变量不可放置于函数起始处,li:last取值是变化的
            var _single_num = _field.width() * preview_current_index;//取得每次滚动数量(多行滚动情况下,此变量不可置于开始处,否则会有间隔时长延时)
            _field.parent().stop().animate({marginLeft: -_single_num-opts.margin}, opts.moveTime, function () {
            });
        }

        function mover_carousel(obj_mover, direction){
            // 获取滚动区域list
            var run_list = obj_mover.find('li');
            if (run_list.length > opts.showItemCount) {
                if (direction == "left") {
                    if (opts.showPageMark) {
                        currentPage += 1;
                        if (currentPage >= run_list.length){
                            currentPage = 0;
                        }
                    }
                    var _field = $(run_list[0]);//此变量不可放置于函数起始处,li:first取值是变化的
                    var _single_num = _field.width();//取得单元滚动数量(多行滚动情况下,此变量不可置于开始处,否则会有间隔时长延时)
                    _field.stop().animate({marginLeft: -_single_num-opts.margin}, opts.moveTime, function () {
                        _field.css('marginLeft', 0).appendTo(_field.parent());//隐藏后,将该行的margin值置零,并插入到最后,实现无缝滚动
                    });
                } else if (direction == "right") {
                    if (opts.showPageMark) {
                        currentPage -= 1;
                        if (currentPage < 0){
                            currentPage = run_list.length - 1;
                        }
                    }
                    var _field = $(run_list[run_list.length - 1]);//此变量不可放置于函数起始处,li:last取值是变化的
                    var _single_num = _field.width();//取得每次滚动数量(多行滚动情况下,此变量不可置于开始处,否则会有间隔时长延时)
                    _field.parent().prepend(_field.css('marginLeft', -_single_num-opts.margin));//添加到第一个
                    _field.stop().animate({marginLeft: 0}, opts.moveTime, function () {
                    });
                }
                // 设置页签
                if (opts.showPageMark) {
                    if (opts.pageType == 1){
                        $(obj_mover.find("." + opts.pageClass)).find("dd.current").removeClass("current");
                        $(obj_mover.find("." + opts.pageClass)).find("dd:eq(" + currentPage + ")").addClass("current");
                    } else if (opts.pageType == 2) {
                        $(obj_mover.find("." + opts.pageClass)).find("span.current_num").text(currentPage + 1);
                    }
                }
            }
        }
    }
})(jQuery);