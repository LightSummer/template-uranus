/*
 * simpleGal -v0.0.1
 * A simple image gallery plugin.
 * https://github.com/steverydz/simpleGal
 * 
 * Made by Steve Rydz
 * Under MIT License
 */
(function($){

  $.fn.extend({

    simpleGal: function (options) {

      var defaults = {
        mainImage: ".placeholder"
      };

      options = $.extend(defaults, options);
      return this.each(function () {
        var thumbnail = $(this).find("a"),
            //mainImage = $(this).siblings().find(options.mainImage);
								mainImage = $('.detail-gallery').find(options.mainImage);
        thumbnail.on("click", function (e) {
          e.preventDefault();
										//$(this).addClass("active");
										//$(this).parents().siblings().children().removeClass("active");
										index = thumbnail.index(this);
										$(".detail-gallery ").each(function(){
											var indexthumbnails = $(this).find(".thumbnails a").eq(index)
       			 	indexthumbnails.addClass("active");
												indexthumbnails.parent("li").siblings().find("a").removeClass("active");
										})
										$(this).parentsUntil(".detail-gallery")
          var galleryImage = $(this).attr("href");
          mainImage.attr("src", galleryImage);
        });

      });

    }

  });

})(jQuery);
