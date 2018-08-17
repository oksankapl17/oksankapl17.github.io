(function($) {
    // WOW.js
    if (typeof WOW !== "undefined") {
        new WOW().init();
    }
    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            let target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 50,
                }, 1000, 'easeInOutExpo');
                return false;
            }
        }
    });

    // Scroll to top button appear
    $(document).scroll(() => {
        const scrollDistance = $(this).scrollTop();
        if (scrollDistance > 100) {
            $('.scroll-to-top').fadeIn();
        }
        else {
            $('.scroll-to-top').fadeOut();
        }
    });


    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#navbar-wrapper',
        offset: 80
    });

    // Collapse Navbar
    const navbarCollapse = () => {
        if ($("#navbar-wrapper").offset().top > 100) {
            $("#navbar-wrapper").addClass("navbar-shrink");
        }
        else {
            $("#navbar-wrapper").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);


    const $contactForm = $('#contact-form');
    $contactForm.submit(function(e) {
        e.preventDefault();
        const $submit = $('.btn-primary', $contactForm);
        const defaultSubmitText = $submit.val();
        const data = $(this).serializeArray();
        $.post('https://formspree.io/oksankapl17@gmail.com', { name: data[0].value, email: data[1].value, question: data[1].value })
            .done(() => {
                $contactForm.prepend('<div class="alert alert-success alert-dismissible">Message sent!<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
                $submit.val('Message sent!');
                setTimeout(function() {
                    $contactForm.find('.alert').remove();
                    $submit.attr('disabled', false).val(defaultSubmitText);
                }, 5000);
            })
            .fail(() => {
                $contactForm.find('.alert').remove();
                $contactForm.prepend('<div class="alert alert-danger alert-dismissible">Ops, there was an error.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
                $submit.val('Ops, there was an error.');
                setTimeout(function() {
                    $('.alert').remove();
                    $submit.attr('disabled', false).val(defaultSubmitText);
                }, 5000);
            })
    });
})(jQuery);