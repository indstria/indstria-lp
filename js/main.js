(function($){ "use strict";

$(document).ready(function(){
    /**
     * Smooth Scroll
     */
    $('a[href^=#]').each(function(){
        var that = this;
        new MBP.fastButton(that, function(e){
            $('html, body').animate({ scrollTop: $($(that)[0].hash || document.body).offset().top }, 'slow');
            e.preventDefault();
            e.stopPropagation();
        });
    });
});

    // $(document).on('click', '#js-preregist', function(){
    //     var u = '//docs.google.com/forms/d/1DOX-8BREiGGHYZChs_718IvO09_HLZlPwcC6P36sjpg/formResponse?embedded=true',
    //         params = { 'entry.1256112701': $('#js-email').val() };
    //     $.post(u, params, function(res){
    //         console.log("Data Loaded: " + res);
    //     });
    // });

})(this.Zepto || this.jQuery);