let scrollTop = $(window).scrollTop();

$(window).scroll(function(evt) {
    scrollTop = $(this).scrollTop();
});

$(document).ready(function() {
    // якоря для ссылок
    $('.anchor[href^="#"]').click(function () {
        $('.header').removeClass('active'); 
        $('.menu').removeClass('active');

        elementClick = $(this).attr("href");
        destination = $(elementClick).offset().top-150;
        $('html, body').animate( { scrollTop: destination }, 500, 'swing' );
        return false;
    });

    // валидация
    function checkValidate() {
        var form = $('form');

        $.each(form, function () {
            $(this).validate({
                ignore: [],
                errorClass: 'error',
                validClass: 'success',
                rules: {
                    name: {
                        required: true 
                    },
                    email: {
                        required: true,
                        email: true 
                    },
                    phone: {
                        required: true,
                        phone: true 
                    },
                    message: {
                        required: true 
                    },
                    password: {
                        required: true,
                        normalizer: function normalizer(value) {
                            return $.trim(value);
                        }
                    }
                },
                errorElement : 'span',
                errorPlacement: function(error, element) {
                    var placement = $(element).data('error');
                    if (placement) {
                        $(placement).append(error);
                    } else {
                        error.insertAfter(element);
                    }
                },
                messages: {
                    phone: {
                        required: 'Заполните поле',
                        phone: 'Некорректный номер'
                    },
                    email: {
                        required: 'Заполните поле',
                        email: 'Некорректный e-mail'
                    },
                    name: {
                        required: 'Заполните поле'
                    },
                    text: {
                        required: 'Заполните поле'
                    }
                }
            });
        });
        jQuery.validator.addMethod('email', function (value, element) {
            return this.optional(element) || /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/.test(value);
        });
        jQuery.validator.addMethod('phone', function (value, element) {
            return this.optional(element) || /\+7\(\d+\)\d{3}-\d{2}-\d{2}/.test(value);
        });
    }
    checkValidate();

    // маски
    if ($('.phone-mask').length) {
        $('.phone-mask').inputmask({
            regex: "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,9}$",
            "clearIncomplete": true
        });
    }

    // аккордеон
    function openAccordion() {
        var wrap = $('.accordion-wrap');
        var accordion = wrap.find('.accordion-title');

        accordion.on('click', function() {
            var $this = $(this);
            var $parent = $(this).parent();
            var content = $this.next();

            if (content.is(':visible')) {
                $this.removeClass('active');
                $parent.removeClass('active');
                content.slideUp('fast');
            } else {
                $this.addClass('active');
                $parent.addClass('active');
                content.slideDown('fast');
            }

        });
    }
    openAccordion();

    // таймер завершения акции
    let end_date = $('.end-event-date').val();
    $('.countdown__widget').countdown(end_date)
    .on('update.countdown', function (event) {
        $(this).html(event.strftime(
            `<div class="countdown__widget-part days">
                <div class="countdown__widget-number">%D</div>
                <span class="countdown__widget-text">дней</span>
            </div>
            <div class="countdown__widget-part hours">
                <div class="countdown__widget-number">%H</div>
                <span class="countdown__widget-text">часов</span>
            </div>
            <div class="countdown__widget-part minutes">
                <div class="countdown__widget-number">%M</div>
                <span class="countdown__widget-text">минут</span>
            </div>`
        ));
    });

    // модалки
    $('body').on('click','.open-modal', function(e){
        e.preventDefault();
        let modal_id = $(this).attr('href');
        $.fancybox.open({
            src: modal_id,
            type: 'inline'
        });
    });
});