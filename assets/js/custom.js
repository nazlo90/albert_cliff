$(document).ready(function () {
    addClassonHover();
    sliderAnimate();
    videoLength();
    videoEnded();
});
$( window ).on('load', function() {
    $('body').addClass('page-load');
    $('.slider').addClass('content-load');
    setTimeout(function() {
        $('.gray-block').addClass('width-50');
    },2000);
});
;function addClassonHover() {
    var timeOut;
    $(".button")
    .mouseover(function() {
        clearTimeout(timeOut);
        $(this).removeClass('la-reset').removeClass("la-out").addClass("la-in");
    })
    .mouseout(function() {
        $(this).removeClass("la-in").addClass("la-out");
        var $this = $(this);
        timeOut = setTimeout(function() {
            $this.addClass('la-reset').removeClass("la-out");
        }, 300);
    });
}
;function sliderAnimate() {
    if($('.video_cont._cp-1').length > 0) {
        if(!is_touch_device()) {
            $(document).mousemove(function(e){
                var x_v = e.pageX / 25;
                var y_v = e.pageY / 25;
                var x_b = e.pageX / 80;
                var y_b = e.pageY / 80;
                $('.video_cont._cp-1').css({
                    transform: 'translate('+x_v+'px, '+y_v+'px)'
                });
                $('.video_cont .vc').css({
                    transform: 'translate(-'+x_v+'px, -'+y_v+'px)'
                });
                $('.gray-block').css({
                    transform: 'translate('+x_b+'px, '+y_b+'px)'
                });
            });
        }
    }
}
;function is_touch_device() {
    return 'ontouchstart' in window
        || navigator.maxTouchPoints;
}

;function videoLength() {
    $('.active .vc video').on('timeupdate', function () {
        var video = $(this)[0];
        var currentPos = video.currentTime; //get currentime
        var maxduration = video.duration; //get video duration
        var percentage = (100 * currentPos / maxduration) + '%';
        var toFixed = parseInt(percentage).toFixed(0);
        var trData = 100 - toFixed;
        $('.slide-bnt .hover_rtl').css("transform", "translateY("+trData+"%)");
        $('.slide-bnt .hover_rtl b').css("transform", "translateY(-"+trData+"%)");
    });

}

;function nextSlide() {
    $('.slider').removeClass('content-hide');
    $('.ls-list .slide_item.active').removeClass('active');
    $('.ls-list .slide_item.next_slide').addClass('active').removeClass('next_slide');
}

;function findNext() {
    if(!$('.slide_item.active').is(':last-child')) {
        if(!$('.slide_item.active').next('.slide_item').hasClass('next_slide')) {
            $('.slide_item.active').next('.slide_item').addClass('next_slide');
        }
    } else {
        if(!$('.slide_item.active').parents('.ls-list').find('.slide_item:first-child').hasClass('next_slide')) {
            $('.slide_item.active').parents('.ls-list').find('.slide_item:first-child').addClass('next_slide');
        }
    }
    $('#dots span').removeClass('current');
    $('#dots span[data-index = "' + $(".slide_item.active").attr("id") + '"]').addClass('current');

    $('.ov-vis').addClass('inactive');
    setTimeout(function() {
        $('.ov-vis').removeClass('inactive');
    }, 2000);
}
;function videoEnded() {
    $('.slider .slide_item').each(function () {
        if($(this).hasClass('active')) {
            $(this).find('video')[0].play();
        } else {
            $(this).find('video')[0].pause();
            $(this).find('video')[0].currentTime = 0;
        }
    });
}

;function pagination() {
    $('.slide_item').each(function(index) {
        $('#dots').append('<span data-index="slide_'+index+'"></span>');
        $(this).attr('id', 'slide_'+index);
    })
}

$(document).ready(function () {
    pagination();

    $('#dots span').click(function () {
        $('.slider').addClass('content-hide');

        var currentIndex = $(this).attr('data-index');
        setTimeout(function() {
            $('.slide_item').removeClass('active').removeClass('next_slide');
            $('.slide_item#' + currentIndex ).addClass('active');
            $('.slider').removeClass('content-hide');
            findNext();
            videoEnded();
            videoLength();
        }, 1500);

    });

    findNext();

    $('.vc video').on('ended', function() {
        $('.slider').addClass('content-hide');

        setTimeout(function() {
            nextSlide();
            findNext();
            videoEnded();
            videoLength();
        }, 1500);
    });

    $('.slide-up').click(function () {
        if(!$(this).parents('.ov-vis').find('#dots .current').is(':first-child')) {
            $(this).parents('.ov-vis').find('#dots .current').prev('span').click();
        } else {
            $(this).parents('.ov-vis').find('#dots span:last-child').click();
        }
    });
    $('.slide-down').click(function () {
        if(!$(this).parents('.ov-vis').find('#dots .current').is(':last-child')) {
            $(this).parents('.ov-vis').find('#dots .current').next('span').click();
        } else {
            $(this).parents('.ov-vis').find('#dots span:first-child').click();
        }
    });
});