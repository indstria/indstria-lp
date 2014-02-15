require(['woothee', 'mbp', 'jquery'], function(woothee, MBP, $){
    'use strict';

    var ua = woothee.parse(navigator.userAgent);
    console.log(ua);

    MBP.preventZoom();

    $(document).ready(function(){
        /**
         * Smooth Scroll
         */
        $('a[href^=#]').each(function(){
            var that = this;
            new MBP.fastButton(that, function(e){
                $('html, body').animate({
                    scrollTop: $($(that)[0].hash || document.body).offset().top
                }, 'slow');
                e.preventDefault();
                e.stopPropagation();
            });
        });
    });
});