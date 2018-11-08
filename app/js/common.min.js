jQuery(document).ready(function($) {

  // Menu
  $('.nav-toggle').on('click', function(e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.nav').toggleClass('open');
    $('body').toggleClass('nav-open');
  });

  $('a[href="#"]').click(function(e) {
    e.preventDefault();
  });

  // Sticky header
  var h = $('.header').innerHeight();
  $(window).scroll(function() {
    if($(this).scrollTop() > h / 4) {
      $('.header').addClass('sticky');
    }
    else {
      $('.header').removeClass('sticky');
    }
  });

  $('.modal').popup({
    transition: 'all 0.3s',
    onclose: function() {
      $(this).find('label.error').remove();
    }
  });

  // Mask phone
  var element = document.querySelectorAll('input[type=tel]');
  var maskOptions = {
    mask: '+{7} (000) 000-00-00'
  };

  for (var i = 0; i < element.length; i ++) {
    var mask = new IMask(element[i], maskOptions);
  }

  $('.city b').click(function(e) {
    $(this).parent().next('.city-list').toggleClass('open');
  });

  $('.course-list a[href^="#"]').click(function(e) {
    e.preventDefault();
  });

  var youtube = $('.youtube');
  $.each(youtube, function(index, el) {
    var source = "https://img.youtube.com/vi/"+ $(el).data('embed') +"/sddefault.jpg";
    var image = new Image();
    image.src = source;
    image.addEventListener( "load", function() {
      youtube[ index ].append( image );
    }( index ) );

    $(el).on('click', function() {
      if ( !$(this).attr('href') ) {
        var iframe = document.createElement( "iframe" );

        iframe.setAttribute( "frameborder", "0" );
        iframe.setAttribute( "allowfullscreen", "" );
        iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ $(this).data('embed') +"?rel=0&showinfo=0&autoplay=1" );
        $(this).innerHTML = "";
        $(this).append( iframe );
        $(this).find('.play-button').hide();
      }

    });
  });

  // Partner slider
  const breakpoint = window.matchMedia( '(min-width: 992px)' );
  var partnerSlider;

  const breakpointChecker = function() {
     // if larger viewport and multi-row layout needed
     if ( breakpoint.matches === true ) {
        // clean up old instances and inline styles when available
        if ( partnerSlider !== undefined ) {
          $('.partner-list').removeClass('swiper-container');
          $('.partner-list__item').unwrap('.swiper-wrapper');
          $('.partner-list__item').removeClass('swiper-slide');
          $('.partner-list .swiper-pagination').remove();
          partnerSlider.destroy( true, true );
        }
        // or/and do nothing
        return;
     // else if a small viewport and single column layout needed
     } else if ( breakpoint.matches === false ) {
        // fire small viewport version of swiper
        return enableSwiper();
     }
  };

  const enableSwiper = function() {
    $('.partner-list').addClass('swiper-container');
    if (! $('.partner-list .swiper-wrapper').length ) {
      $('.partner-list__item').wrapAll('<div class="swiper-wrapper"></div>');
    }
    $('.partner-list__item').addClass('swiper-slide');
    $('.partner-list').append('<div class="swiper-pagination"></div>');

    partnerSlider = new Swiper ('.partner-list', {
      slidesPerView: 3,
      breakpoints: {
        767: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 0
        }
      },

      pagination: {
        el: '.swiper-pagination',
      },
    });
  }

  // keep an eye on viewport size changes
  breakpoint.addListener(breakpointChecker);
  // kickstart
  breakpointChecker();

  var teach = $('.teacher-slider').flickity({
    wrapAround: true,
    draggable: true,
    pageDots: false,
  });

  var teachThumb = $('.teacher-thumbnail').flickity({
    asNavFor: '.teacher-slider',
    pageDots: false,
    wrapAround: true,
    cellAlign: 'left'
  });

  $('.teacher-diploma-slider').each(function(i, el) {
    var $this = $(this);
    $this.addClass("teacher-diploma-slider-" + i);
    $this.parent().find(".swiper-button-prev").addClass("button-prev-" + i);
    $this.parent().find(".swiper-button-next").addClass("button-next-" + i);

    var btnNext = '.button-next-' + i;
    var btnPrev = '.button-prev-' + i;

    diplomaSlider = new Swiper ('.teacher-diploma-slider-' + i, {
      slidesPerView: 4,
      spaceBetween: 20,
      breakpoints: {
        992: {
          slidesPerView: 3,
        },
        767: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 0
        }
      },
      navigation: {
        nextEl: btnNext,
        prevEl: btnPrev,
      },
    });
  });

  // Testimonial slider
  testimonialSlider = new Swiper ('.testimonial-slider', {
    slidesPerView: 2,
    spaceBetween: -240,
    centeredSlides: true,
    loop: true,
    breakpoints: {
      767: {
        slidesPerView: 1,
        spaceBetween: 0
      }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
  });

  // Testimonial client slider
  testimonialClientSlider = new Swiper ('.testimonial-client-slider', {
    slidesPerView: 1,
    spaceBetween: 240,
    breakpoints: {
      767: {
        slidesPerView: 1,
        spaceBetween: 100
      }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // slider ceremony
  var ceremonySlider = new Swiper('.ceremony__slider_wrap', {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      767: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      1200: {
        slidesPerView: 2,
        spaceBetween: 30
      }
    }
  });

  // Hide element
  $('.translation-page__services_item').each(function(index, el) {
    if (index >= 3) {
      $(el).hide();
    }
  });

  $('#show-all-services').click(function(e) {
    e.preventDefault();
    if ($('.translation-page__services_item').eq(3).is(':hidden'))
    {
      $(this).text('Скрыть');
    }
    else
    {
      $(this).html('Посмотреть все услуги <i class="fas fa-angle-right"></i>');
    }
    $('.translation-page__services_item').each(function(index, el)
    {
      if (index >= 3)
      {
        $(el).slideToggle();
      }
    });
  });

  $('.office__item').each(function(index, el) {
    if (index >= 3) {
      $(el).hide();
    }
  });

  $('.all-office-photo').click(function(e) {
    e.preventDefault();
    if ($('.office__item').eq(3).is(':hidden'))
    {
      $(this).text('Скрыть');
    }
    else
    {
      $(this).text('Посмотреть еще фото');
    }
    $('.office__item').each(function(index, el)
    {
      if (index >= 3)
      {
        $(el).slideToggle();
      }
    });
  });

  // Filtering isotop
  $(window).on('load', function () {
    var $grid = $('.action-list').isotope({
      itemSelector: '.action-list .col-lg-6',
      horizontalOrder: true,
      fitWidth: true,
      layoutMode: 'masonry'
    });

    // bind filter button click
    $('.action__filter').on( 'click', 'button', function() {
      var filterValue = $( this ).attr('data-filter');
      if( filterValue == '*' ) {
        $('.action-list__item ul').matchHeight();
      }
      else {
        $(filterValue + ' .action-list__item ul').matchHeight();
      }
      $grid.isotope({ filter: filterValue });
    });

    // change is-checked class on buttons
    $('.action__filter').each( function( i, buttonGroup ) {
      var $buttonGroup = $( buttonGroup );
      $buttonGroup.on( 'click', 'button', function() {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $( this ).addClass('is-checked');
      });
    });

  });

  // Match height
  $('.action-list__item ul, .corporate-offer-list__title-wrap, .choice-course__title, .teacher-slider__item').matchHeight();

  // Group course more
  $('.group-course__more').click(function(e) {
    $('.group-course-list__item.hidden').each(function(i, el) {
      $(el).removeClass('hidden');
    });
    $(this).hide();
  });

  // Footer menu
  $('.footer__menu h3').click(function() {
    if ($(window).width() < 768) {
      $(this).toggleClass('active');
      $(this).parent().find('ul').slideToggle(500);
    }
  });

  function mapWidth() {
    if ( $(window).width() > 767 ) {
      var contactWidth = $('.contact').width();
      var containerWidth = $('.contact .container').width();
      var mapWidth = $('.contact__map').width();
      var scrollW = $(document).scrollWidth;
      $('.contact__map').css('width', mapWidth + (contactWidth - containerWidth) / 2);
    }
  }

  mapWidth();

  $(window).resize(function() {
    $('.contact__map').removeAttr('style');
    mapWidth();
  });

  $('.contact__more').click( function(e) {
    e.preventDefault()
    $('.contact__list').toggleClass('open');
  } );

  $('.contact__list a').click(function (e) {
    e.preventDefault();
    $('.contact__list').removeClass('open');
    var id = $(this).data('id');

    $.ajax({
        type: "POST",
        url: window.wp_data.ajax_url,
        data: {
          action: 'get_contact',
          id: id
        },
        beforeSend: function () {
            $('.contact__content-wrap').addClass('active');
        },
        success: function(data) {
          $('.contact__content-wrap').html(data);
          $('.contact__content-wrap').removeClass('active');
        }
    });
  });

  // Sorting schedule table
  $('#language-select').on('change', function(){
    var language = $(this).find('option:selected').val();
    var date = $('.schedule-table__filter select[name="date"]').find('option:selected').val();
    var level = $('.schedule-table__filter select[name="level"]').find('option:selected').val();
    var group = $('.schedule-filter-group__btn.is-checked').data('group-id');
    var filterGroup = $('.schedule-tabs__btn.is-checked').data('filter-group');
    $.ajax({
      type: "POST",
      url: window.wp_data.ajax_url, //адрес из глобальной переменной
      data: {
        action: 'filter_schedule', //название нашего обработчика, который создадим поже
        language: language,
        date: date,
        level: level,
        group: group,
        filter_group: filterGroup
      },
      beforeSend: function() {
        $('.schedule-table__body').addClass('active');
      },
      success: function (data) {
        $('.schedule-table__body').html(data); // заменяем содержимое контейнера ответом с сервера
        $('.schedule-table__body').removeClass('active');
      }
    });
  });

  $('#date-select').on('change', function(){
    var language = $('.schedule-table__filter select[name="language"]').find('option:selected').val();
    var date = $(this).find('option:selected').val();
    var level = $('.schedule-table__filter select[name="level"]').find('option:selected').val();
    var group = $('.schedule-filter-group__btn.is-checked').data('group-id');
    var filterGroup = $('.schedule-tabs__btn.is-checked').data('filter-group');
    $.ajax({
      type: "POST",
      url: window.wp_data.ajax_url, //адрес из глобальной переменной
      data: {
        action: 'filter_schedule', //название нашего обработчика, который создадим поже
        language: language,
        date: date,
        level: level,
        group: group,
        filter_group: filterGroup
      },
      beforeSend: function() {
        $('.schedule-table__body').addClass('active');
      },
      success: function (data) {
        $('.schedule-table__body').html(data); // заменяем содержимое контейнера ответом с сервера
        $('.schedule-table__body').removeClass('active');
      }
    });
  });

  $('#level-select').on('change', function(){
    var language = $('.schedule-table__filter select[name="language"]').find('option:selected').val();
    var date =  $('.schedule-table__filter select[name="date"]').find('option:selected').val();
    var level = $(this).find('option:selected').val();
    var group = $('.schedule-filter-group__btn.is-checked').data('group-id');
    var filterGroup = $('.schedule-tabs__btn.is-checked').data('filter-group');
    $.ajax({
      type: "POST",
      url: window.wp_data.ajax_url, //адрес из глобальной переменной
      data: {
        action: 'filter_schedule', //название нашего обработчика, который создадим поже
        language: language,
        date: date,
        level: level,
        group: group,
        filter_group: filterGroup
      },
      beforeSend: function() {
        $('.schedule-table__body').addClass('active');
      },
      success: function (data) {
        $('.schedule-table__body').html(data); // заменяем содержимое контейнера ответом с сервера
        $('.schedule-table__body').removeClass('active');
      }
    });
  });

  $('.schedule-filter-group__btn').on('click', function(e){
    e.preventDefault();
    $('.schedule-filter-group__btn').removeClass('is-checked');
    $(this).addClass('is-checked');
    var group = $(this).data('group-id');
    $.ajax({
      type: "POST",
      url: window.wp_data.ajax_url,
      data : {
        action : 'filter_schedule',
        group : group
      },
      beforeSend: function() {
        $('.schedule-table__body').addClass('active');
      },
      success: function (data) {
        $('.schedule-table__body').html(data); // заменяем содержимое контейнера ответом с сервера
        $('.schedule-table__filter .form__select').prop('selectedIndex',0);
        $('.schedule-tabs__btn').removeClass('is-checked');
        $('.schedule-table__body').removeClass('active');
      }
    });
  });

  $('.schedule-tabs__btn').on('click', function(e){
      e.preventDefault();
      $('.schedule-tabs__btn').removeClass('is-checked');
      $(this).addClass('is-checked');
      var filterGroup = $(this).data('filter-group');
      var group = $('.schedule-filter-group__btn.is-checked').data('group-id');
      $.ajax({
          type: "POST",
          url: window.wp_data.ajax_url,
          data : {
              action : 'filter_schedule',
              filter_group : filterGroup,
              group: group
          },
          beforeSend: function() {
              $('.schedule-table__body').addClass('active');
          },
          success: function (data) {
              $('.schedule-table__body').html(data); // заменяем содержимое контейнера ответом с сервера
              $('.schedule-table__filter .form__select').prop('selectedIndex',0);
              $('.schedule-table__body').removeClass('active');
          }
      });
  });

  function getSchedule() {
    var language = $('.schedule-table__filter select[name="language"]').find('option:selected').val();
    var date =  $('.schedule-table__filter select[name="date"]').find('option:selected').val();
    var level = $(this).find('option:selected').val();
    var group = $('.schedule-filter-group__btn.is-checked').data('group-id');
    var filterGroup = $('.schedule-tabs__btn.is-checked').data('filter-group');
    $.ajax({
      type: "POST",
      url: window.wp_data.ajax_url, //адрес из глобальной переменной
      data: {
        action: 'filter_schedule', //название нашего обработчика, который создадим поже
        language: language,
        date: date,
        level: level,
        group: group,
        filter_group: filterGroup,
      },
      beforeSend: function() {
        $('.schedule-table__body').addClass('active');
      },
      success: function (data) {
        $('.schedule-table__body').html(data); // заменяем содержимое контейнера ответом с сервера
        $('.schedule-table__body').removeClass('active');
      }
    });
  }

  if ($('.schedule-filter-group').length) {
    getSchedule();
  }

  $('body').on('click','#load-schedule', function(e){
    e.preventDefault();
    var language = $('.schedule-table__filter select[name="language"]').find('option:selected').val();
    var date =  $('.schedule-table__filter select[name="date"]').find('option:selected').val();
    var level = $(this).find('option:selected').val();
    var group = $('.schedule-filter-group__btn.is-checked').data('group-id');
    var filterGroup = $('.schedule-tabs__btn.is-checked').data('filter-group');
    var page = $(this).data('page'); // номер страницы для загрузки
    var buttonRow = $('.schedule-table__more-row');
    $.ajax({
      type: "POST",
      url: window.wp_data.ajax_url,
      data : {
        action : 'filter_schedule',
        language: language,
        date: date,
        level: level,
        group: group,
        filter_group: filterGroup,
        paged : page
      },
      beforeSend: function() {
        $('.schedule-table__body').addClass('active');
      },
      success: function (data) {
        buttonRow.remove(); //удаляем кнопку
        $('.schedule-table__body').append(data); // заменяем содержимое контейнера ответом с сервера
        $('.schedule-table__body').removeClass('active');
      }
    });
  });

  // Load more news
  $('body').on('click','.page-news__btn', function(e){
    e.preventDefault();
    var page = $(this).data('page'); // номер страницы для загрузки
    var idCat = $('.search__wrap ul li.current').data('id-cat');
    var buttonRow = $('.page-news__btn');
    $.ajax({
      type: "POST",
      url: window.wp_data.ajax_url,
      data : {
          action : 'more_news',
          cat: idCat,
          paged : page
      },
      beforeSend: function() {
        buttonRow.addClass('active');
      },
      success: function (data) {
          buttonRow.remove(); //удаляем кнопку
          $('.page-news__list').append(data); // заменяем содержимое контейнера ответом с сервера
      }
    });
  });

  // Tabs
  (function($){
    jQuery.fn.lightTabs = function(options){

      var createTabs = function(){
        tabs = this;
        i = 0;

        showPage = function(i){
          $(tabs).find(".filters-content").children("div").hide();
          $(tabs).find(".filters-content").children("div").eq(i).show();
          $(tabs).find(".filter__btn").removeClass("is-checked");
          $(tabs).find(".filter__btn").eq(i).addClass("is-checked");
        }

        showPage(0);

        $(tabs).find(".filter__btn").each(function(index, element){
          $(element).attr("data-page", i);
          i++;
        });

        $(tabs).find(".filter__btn").click(function(){
          showPage(parseInt($(this).attr("data-page")));
          $('.choice-course__title').matchHeight();
        });
      };
      return this.each(createTabs);
    };
  })(jQuery);

  $(".filters").lightTabs();

  $(function() {
    $(".schedule-filter-group__btns").on("click", ".schedule-filter-group__btn:not(.is-checked)", function() {
        $(this).addClass("is-checked").siblings()
        .removeClass("is-checked")
        .closest(".schedule-filter-group")
        .find(".schedule-filter-group-content__item")
        .hide()
        .eq($(this).index())
        .show()
    });
  });

  $(function() {
    $(".schedule-tabs__btns").on("click", ".schedule-tabs__btn:not(.is-checked)", function() {
        $(this).addClass("is-checked").siblings()
        .removeClass("is-checked")
        .closest(".schedule-tabs")
        .find(".schedule-tabs-content__item")
        .hide()
        .eq($(this).index())
        .show()
    });
  });

  /* Валидация телефона */
  jQuery.validator.addMethod("phoneno", function(phone_number, element) {
     return this.optional(element) || phone_number.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
  }, "Введите Ваш телефон");

  /* Валидация формы */
  $(".callback-form").validate({
    messages: {
      name: "Введите Ваше имя",
      phone: "Введите Ваш телефон",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = $(".callback-form").serialize();
      ajaxSend('.callback-form', t);
    }
  });

  $('.consultation-teacher_open').click(function(e) {
    var name = $(this).parent().find('.teacher-slider__name').text();
    $(".consultation-teacher-form").find("input[name=subject]").val('Получить консультацию преподавателя (' + name + ')');
  });

  $('.repeat-form').each(function(index, el) {
    $(el).addClass('repeat-form-' + index);
    $(".repeat-form-" + index).validate({
      messages: {
        name: "Введите Ваше имя",
        phone: "Введите Ваш телефон",
      },
      rules: {
        "phone": {
          required: true,
          phoneno: true
        }
      },
      submitHandler: function(form) {
        var t = $(".repeat-form-" + index).serialize();
        ajaxSend(".repeat-form-" + index, t);
      }
    });
  });

  $(".consultation-teacher-form").validate({
    messages: {
      name: "Введите Ваше имя",
      phone: "Введите Ваш телефон",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = $(".consultation-teacher-form").serialize();
      ajaxSend('.consultation-teacher-form', t);
    }
  });

  $(".order-translation-form").validate({
    messages: {
      name: "Введите Ваше имя",
      phone: "Введите Ваш телефон",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = $(".order-translation-form").serialize();
      ajaxSend('.order-translation-form', t);
    }
  });

  $('.translation_open').click(function(e) {
    var title = $(this).parent().find('.translation-page__services-title').text();
    $(".translation-form").find("input[name=subject]").val('Заказ услуги перевода (' + title + ')');
  });

  $(".translation-form").validate({
    messages: {
      name: "Введите Ваше имя",
      phone: "Введите Ваш телефон",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = $(".translation-form").serialize();
      ajaxSend('.translation-form', t);
    }
  });

  $('.hsk_open').click(function(e) {
    var title = $(this).parent().parent().find('.hsk__title-wrap h3').text();
    $(".hsk-form").find("input[name=subject]").val('Записаться на курсы (' + title + ') [Страница Подготовка к HSK 1-2]');
  });

  $(".hsk-form").validate({
    messages: {
      name: "Введите Ваше имя",
      phone: "Введите Ваш телефон",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = $(".hsk-form").serialize();
      ajaxSend('.hsk-form', t);
    }
  });

  $('.hsk-package_open').click(function(e) {
    var title = $(this).parent().parent().find('.select-hsk-list__title-wrap h3').text();
    var price = $(this).parent().parent().find('.select-hsk-list__price').text();
    $(".hsk-package-form").find("input[name=subject]").val('Записаться по пакету курсов (' + title + ') (' + price + ') [Страница Подготовка к HSK 1-2]');
  });

  $(".hsk-package-form").validate({
    messages: {
      name: "Введите Ваше имя",
      phone: "Введите Ваш телефон",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = $(".hsk-package-form").serialize();
      ajaxSend('.hsk-package-form', t);
    }
  });

  $('.corporate-offer-list__item .form__btn').click(function(e) {
    var id = $(this).data('id');

    $("." + id).validate({
      messages: {
        phone: "Введите Ваш телефон",
      },
      rules: {
        "phone": {
          required: true,
          phoneno: true
        }
      },
      submitHandler: function(form) {
        var t = $("." + id).serialize();
        ajaxSend("." + id, t);
      }
    });
  });

  $(".action-form").validate({
    messages: {
      name: "Введите Ваше имя",
      phone: "Введите Ваш телефон",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = $(".action-form").serialize();
      ajaxSend('.action-form', t);
    }
  });

  $(".subscribe-form").validate({
    messages: {
      email: "Введите Ваш email",
    },
    rules: {
      "email": {
        email: true
      }
    },
    submitHandler: function(form) {
      var t = $(".subscribe-form").serialize();
      ajaxSend('.subscribe-form', t);
    }
  });

  $(".order-online-course-1-form").validate({
    messages: {
      name: "Введите Ваше имя",
      phone: "Введите Ваш телефон",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = $(".order-online-course-1-form").serialize();
      ajaxSend('.order-online-course-1-form', t);
    }
  });

  $(".sign-lesson-form").validate({
    messages: {
      name: "Введите Ваше имя",
      phone: "Введите Ваш телефон",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = $(".sign-lesson-form").serialize();
      ajaxSend('.sign-lesson-form', t);
    }
  });

  $('.group_open').click(function(e) {
    var title = $(this).parent().parent().find('.group-course-list__name h3').text();

    $('#group h3').text('Записаться на "' + title + '"');
    $('.group-form input[name="subject"]').val('Заявка на запись курса: "' + title + '"');
  });

  $('.action-list__item .group_open').click(function(e) {
    var title = $(this).parent().parent().find('.action-list__item h3').text();

    $('#group h3').text('Записаться на "' + title + '"');
    $('.group-form input[name="subject"]').val('Заявка на запись курса: "' + title + '" - (Страница Акции)');
  });

  $(".group-form").validate({
    messages: {
      name: "Введите Ваше имя",
      phone: "Введите Ваш телефон",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = $(".group-form").serialize();
      ajaxSend('.group-form', t);
    }
  });

  $('.schedule-table').click('.enroll-course_open', function(e) {
    var title = $(e.target).parent().parent().find('.schedule-table__name strong').text();

    $('#enroll-course h3').text('Записаться на "' + title + '"');
    $('.enroll-course-form input[name="subject"]').val('Заявка на запись курса: "' + title + '"');
  });

  $(".enroll-course-form").validate({
    messages: {
      name: "Введите Ваше имя",
      phone: "Введите Ваш телефон",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = $(".enroll-course-form").serialize();
      ajaxSend('.enroll-course-form', t);
    }
  });

  $(".leave-request-form").validate({
    messages: {
      name: "Введите Ваше имя",
      phone: "Введите Ваш телефон",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = $(".leave-request-form").serialize();
      ajaxSend('.leave-request-form', t);
    }
  });

  $(".current-training-form").validate({
    messages: {
      name: "Введите Ваше имя",
      phone: "Введите Ваш телефон",
      email: "Введите Ваш E-mail",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = $(".current-training-form").serialize();
      ajaxSend('.current-training-form', t);
    }
  });

  $(".accelerated-course-form").validate({
    messages: {
      name: "Введите Ваше имя",
      phone: "Введите Ваш телефон",
      email: "Введите Ваш E-mail",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = $(".accelerated-course-form").serialize();
      ajaxSend('.accelerated-course-form', t);
    }
  });

  $(".flagship-course-form").validate({
    messages: {
      name: "Введите Ваше имя",
      phone: "Введите Ваш телефон"
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = $(".flagship-course-form").serialize();
      ajaxSend('.flagship-course-form', t);
    }
  });

  $(".calc-course-form").validate({
    messages: {
      name: "Введите Ваше имя",
      phone: "Введите Ваш телефон",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = {
        name: jQuery(".calc-course-form").find("input[name=name]").val(),
        phone: jQuery(".calc-course-form").find("input[name=phone]").val(),
        subject: jQuery(".calc-course-form").find("input[name=subject]").val()
      };
      ajaxSend('.calc-course-form', t);
    }
  });

  /* Функцыя для отправки формы */
  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: "POST",
      url: "/wp-conetnt/themes/mandarin/sendmail.php",
      data: data,
      success: function() {
        $(".modal").popup("hide");
        $("#thanks").popup("show");
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  }

  if( $('.choice-course__range--time').length ) {
    var rangeTime = document.querySelector('.choice-course__range--time');
    noUiSlider.create(rangeTime, {
      start: 0,
      step: 1,
      connect: [true, false],
      range: {
        'min': 0,
        'max': 2
      }
    });
  }

  if( $('.choice-course__range--count').length ) {
    var rangeCount = document.querySelector('.choice-course__range--count');
    noUiSlider.create(rangeCount, {
      start: 0,
      step: 1,
      connect: [true, false],
      range: {
        'min': 0,
        'max': 2
      }
    });
  }

  if( $('.choice-course__range--need').length ) {
    var rangeNeed = document.querySelector('.choice-course__range--need');
    noUiSlider.create(rangeNeed, {
      start: 0,
      step: 1,
      connect: [true, false],
      range: {
        'min': 0,
        'max': 3
      }
    });
  }

  if( $('.choice-course__range--time-japan').length ) {
    var rangeTimeJapan = document.querySelector('.choice-course__range--time-japan');
    noUiSlider.create(rangeTimeJapan, {
      start: 0,
      step: 1,
      connect: [true, false],
      range: {
        'min': 0,
        'max': 2
      }
    });
  }

  if( $('.choice-course__range--count-japan').length ) {
    var rangeCountJapan = document.querySelector('.choice-course__range--count-japan');
    noUiSlider.create(rangeCountJapan, {
      start: 0,
      step: 1,
      connect: [true, false],
      range: {
        'min': 0,
        'max': 2
      }
    });
  }

  if( $('.choice-course__range--need-japan').length ) {
    var rangeNeedJapan = document.querySelector('.choice-course__range--need-japan');
    noUiSlider.create(rangeNeedJapan, {
      start: 0,
      step: 1,
      connect: [true, false],
      range: {
        'min': 0,
        'max': 3
      }
    });
  }

  if( $('.choice-course__range--time-korean').length ) {
    var rangeTimeKorean = document.querySelector('.choice-course__range--time-korean');
    noUiSlider.create(rangeTimeKorean, {
      start: 0,
      step: 1,
      connect: [true, false],
      range: {
        'min': 0,
        'max': 2
      }
    });
  }

  if( $('.choice-course__range--count-korean').length ) {
    var rangeCountKorean = document.querySelector('.choice-course__range--count-korean');
    noUiSlider.create(rangeCountKorean, {
      start: 0,
      step: 1,
      connect: [true, false],
      range: {
        'min': 0,
        'max': 2
      }
    });
  }

  if( $('.choice-course__range--need-korean').length ) {
    var rangeNeedKorean = document.querySelector('.choice-course__range--need-korean');
    noUiSlider.create(rangeNeedKorean, {
      start: 0,
      step: 1,
      connect: [true, false],
      range: {
        'min': 0,
        'max': 3
      }
    });
  }

  // Choice course test
  var viborChina = {"say":null,"understand":null,"learn":null,"amount1":null,"amount2":null,"do":null,"one":null,"amount3":null};
  var viborJapan = {"say":null,"understand":null,"learn":null,"amount1":null,"amount2":null,"do":null,"one":null,"amount3":null};
  var viborKorean = {"say":null,"understand":null,"learn":null,"amount1":null,"amount2":null,"do":null,"one":null,"amount3":null};

  // Course China
  function choiceCourseChina(course) {
    var base = 0;
    var prof = 0;
    var busi = 0;
    var turi = 0;

    if (viborChina["say"] == "hard") {
      base++;
      busi++;
      turi++;

      if (viborChina["understand"] == "yes") {
        busi++;
        turi++;

        if ((viborChina["learn"] == "language") || (viborChina["learn"] == "writing") || (viborChina["learn"] == "all")) {
          busi++;
          turi++;

          if ((viborChina["amount1"] == 1) || (viborChina["amount1"] == 2) || (viborChina["amount1"] == 3)) {
            busi++;
            turi++;

            if ((viborChina["one"] == "native") || (viborChina["one"] == "russian")) {
              busi++;
              turi++;

              if ((viborChina["amount3"] == 1) || (viborChina["amount3"] == 2)) {
                busi++;
              }

              if ((viborChina["amount3"] == 3) || (viborChina["amount3"] == 4)) {
                turi++;
              }
            }
          }
        }
      } /* understand == yes */

      if ((viborChina["understand"] == "no") || (viborChina["understand"] == "few")) {
        busi++;
        turi++;
        base++;

        if ((viborChina["learn"] == "language") || (viborChina["learn"] == "writing") || (viborChina["learn"] == "all")) {
          busi++;
          turi++;
          base++;

          if ((viborChina["amount1"] == 1) || (viborChina["amount1"] == 2)) {
            busi++;
            base++;
            turi++;

            if (viborChina["one"] == "native") {
              busi++;
              base++;

              if (viborChina["amount3"] == 1) {
                busi++;
              }

              if ((viborChina["amount3"] == 2) || (viborChina["amount3"] == 3) || (viborChina["amount3"] == 4)) {
                base++;
              }
            }

            if (viborChina["one"] == "russian") {
              busi++;
              base++;
              turi++;

              if (viborChina["amount3"] == 1) {
                busi++;
              }

              if ((viborChina["amount3"] == 2) || (viborChina["amount3"] == 3)) {
                base++;
              }

              if (viborChina["amount3"] == 4) {
                turi++;
              }
            }
          }

          if (viborChina["amount1"] == 3) {
            busi++;
            turi++;

            if ((viborChina["one"] == "native") || (viborChina["one"] == "russian")) {
              busi++;
              turi++;

              if ((viborChina["amount3"] == 1) || (viborChina["amount3"] == 2)) {
                busi++;
              }

              if ((viborChina["amount3"] == 3) || (viborChina["amount3"] == 4)) {
                turi++;
              }
            }
          }
        }
      } /* understand == no */
    } /* say == hard */

    if (viborChina["say"] == "easy") {
      prof++;
      busi++;

      if ((viborChina["understand"] == "yes") || (viborChina["understand"] == "no") || (viborChina["understand"] == "few")) {
        prof++;
        busi++;

        if ((viborChina["learn"] == "language") || (viborChina["learn"] == "writing") || (viborChina["learn"] == "all")) {
          busi++;
          prof++;

          if ((viborChina["amount1"] == 1) || (viborChina["amount1"] == 2) || (viborChina["amount1"] == 3)) {
            prof++;
            busi++;

            if ((viborChina["one"] == "native") || (viborChina["one"] == "russian")) {
              busi++;
              prof++;

              if (viborChina["amount3"] == 1) {
                busi++;
              }

              if ((viborChina["amount3"] == 3) || (viborChina["amount3"] == 4) || (viborChina["amount3"] == 2)) {
                 prof++;
              }
            }
          }
        }
      }
    } /* say == ease */

    $('.choice-course__item--china .choice-course__select--1 .choice-course__select-progress').width( base * 40 );
    $('.choice-course__item--china .choice-course__select--2 .choice-course__select-progress').width( prof * 40 );
    $('.choice-course__item--china .choice-course__select--3 .choice-course__select-progress').width( busi * 40 );
    $('.choice-course__item--china .choice-course__select--4 .choice-course__select-progress').width( turi * 40 );

    if ( base != 6 ) {
      $('.choice-course__item--china .choice-course__select--1 .choice-course__select-progress a').hide();
    };
    if ( base == 6 ) { 
      $('.choice-course__item--china .choice-course__select--1 .choice-course__select-progress').css('width','100%');
      $('.choice-course__item--china .choice-course__select--1 .choice-course__select-progress a').show();

      $('.choice-course__item--china .choice-course__result-item').eq(0).find('b').text('586');
      $('.choice-course__item--china .choice-course__result-item').eq(1).find('b').text('621');
      $('.choice-course__item--china .choice-course__result-item').eq(2).find('b').text('55');
    };
    
    if ( base == 1 ) {
      $('.choice-course__item--china .choice-course__result-item').eq(0).find('b').text('586');
      $('.choice-course__item--china .choice-course__result-item').eq(1).find('b').text('621');
      $('.choice-course__item--china .choice-course__result-item').eq(2).find('b').text('55');
    };

    if ( prof != 6 ) {
      $('.choice-course__item--china .choice-course__select--2 .choice-course__select-progress a').hide();

    };
    if ( prof == 6 ) {
      $('.choice-course__item--china .choice-course__select--2 .choice-course__select-progress').css('width','100%');
      $('.choice-course__item--china .choice-course__select--2 .choice-course__select-progress a').show();

      $('.choice-course__item--china .choice-course__result-item').eq(0).find('b').text('980');
      $('.choice-course__item--china .choice-course__result-item').eq(1).find('b').text('1200');
      $('.choice-course__item--china .choice-course__result-item').eq(2).find('b').text('95');
    }
    
    if ( prof == 1 ) {
      $('.choice-course__item--china .choice-course__result-item').eq(0).find('b').text('980');
      $('.choice-course__item--china .choice-course__result-item').eq(1).find('b').text('1200');
      $('.choice-course__item--china .choice-course__result-item').eq(2).find('b').text('95');
    }

    if ( busi != 6 ) {
      $('.choice-course__item--china .choice-course__select--3 .choice-course__select-progress a').hide();
    }
    if ( busi == 6 ) {
      $('.choice-course__item--china .choice-course__select--3 .choice-course__select-progress').css('width','100%');
      $('.choice-course__item--china .choice-course__select--3 .choice-course__select-progress a').show();

      $('.choice-course__item--china .choice-course__result-item').eq(0).find('b').text('885');
      $('.choice-course__item--china .choice-course__result-item').eq(1).find('b').text('1100');
      $('.choice-course__item--china .choice-course__result-item').eq(2).find('b').text('64');
    }

    if ( turi != 6 ) {
      $('.choice-course__item--china .choice-course__select--4 .choice-course__select-progress a').hide();
    };
    if ( turi == 6 ) {
      $('.choice-course__item--china .choice-course__select--4 .choice-course__select-progress').css('width','100%');
      $('.choice-course__item--china .choice-course__select--4 .choice-course__select-progress a').show();

      $('.choice-course__item--china .choice-course__result-item').eq(0).find('b').text('485');
      $('.choice-course__item--china .choice-course__result-item').eq(1).find('b').text('521');
      $('.choice-course__item--china .choice-course__result-item').eq(2).find('b').text('42');
    };

  }

  choiceCourseChina();

  $('.choice-course__item--china input[type=radio]').change(function(event) {
    if ($(this).is("#hard")) {
      viborChina["say"]="hard";

      var course = $(this).parents('.choice-course__item');
      choiceCourseChina(course);
    }

    if ($(this).is("#easy")) {
      viborChina["say"]="easy";

      var course = $(this).parents('.choice-course__item');
      choiceCourseChina(course);
    };
    
    if ($(this).is("#yes")) { 
      viborChina["understand"]="yes"; 

      var course = $(this).parents('.choice-course__item');
      choiceCourseChina(course);
    }

    if ($(this).is("#no")) {
      viborChina["understand"]="no";

      var course = $(this).parents('.choice-course__item');
      choiceCourseChina(course);
    }

    if ($(this).is("#few")) {
      viborChina["understand"]="few";

      var course = $(this).parents('.choice-course__item');
      choiceCourseChina(course);
    }
    
    if ($(this).is("#language")) {
      viborChina["learn"]="language";

      var course = $(this).parents('.choice-course__item');
      choiceCourseChina(course);
    }
    if ($(this).is("#writing")) {
      viborChina["learn"]="writing";

      var course = $(this).parents('.choice-course__item');
      choiceCourseChina(course);
    }
    if ($(this).is("#all")) {
      viborChina["learn"]="all";

      var course = $(this).parents('.choice-course__item');
      choiceCourseChina(course);};

    if ($(this).is("#weekdays")) {
      viborChina["do"]="weekdays";

      var course = $(this).parents('.choice-course__item');
      choiceCourseChina(course);
    }
    if ($(this).is("#weekend")) {
      viborChina["do"]="weekend";

      var course = $(this).parents('.choice-course__item');
      choiceCourseChina(course);
    }

    if ($(this).is("#native")) {
      viborChina["one"]="native";
      var course = $(this).parents('.choice-course__item');
      choiceCourseChina(course);
    }
    if ($(this).is("#russian")) {
      viborChina["one"]="russian";
      var course = $(this).parents('.choice-course__item');
      choiceCourseChina(course);
    }

    viborChina["amount1"] = parseInt(rangeTime.noUiSlider.get()) + 1;
    viborChina["amount2"] = parseInt(rangeCount.noUiSlider.get()) + 1;
    viborChina["amount3"] = parseInt(rangeNeed.noUiSlider.get()) + 1;
  });

  if (rangeTime) {
    rangeTime.noUiSlider.on('change', function(value) {
      viborChina["amount1"] = parseInt(value) + 1;
      choiceCourseChina();
    });
  }

  if (rangeCount) {
    rangeCount.noUiSlider.on('change', function(value) {
      viborChina["amount2"] = parseInt(value) + 1;
      choiceCourseChina();
    });
  }

  if (rangeCount) {
    rangeNeed.noUiSlider.on('change', function(value) {
      viborChina["amount3"] = parseInt(value) + 1;
      choiceCourseChina();
    });
  }

  // Course Japan
  function choiceCourseJapan(course) {
    var base = 0;
    var prof = 0;
    var busi = 0;
    var turi = 0;

    if (viborJapan["say"] == "hard") {
      base++;
      busi++;
      turi++;

      if (viborJapan["understand"] == "yes") {
        busi++;
        turi++;

        if ((viborJapan["learn"] == "language") || (viborJapan["learn"] == "writing") || (viborJapan["learn"] == "all")) {
          busi++;
          turi++;

          if ((viborJapan["amount1"] == 1) || (viborJapan["amount1"] == 2) || (viborJapan["amount1"] == 3)) {
            busi++;
            turi++;

            if ((viborJapan["one"] == "native") || (viborJapan["one"] == "russian")) {
              busi++;
              turi++;

              if ((viborJapan["amount3"] == 1) || (viborJapan["amount3"] == 2)) {
                busi++;
              }

              if ((viborJapan["amount3"] == 3) || (viborJapan["amount3"] == 4)) {
                turi++;
              }
            }
          }
        }
      } /* understand == yes */

      if ((viborJapan["understand"] == "no") || (viborJapan["understand"] == "few")) {
        busi++;
        turi++;
        base++;

        if ((viborJapan["learn"] == "language") || (viborJapan["learn"] == "writing") || (viborJapan["learn"] == "all")) {
          busi++;
          turi++;
          base++;

          if ((viborJapan["amount1"] == 1) || (viborJapan["amount1"] == 2)) {
            busi++;
            base++;
            turi++;

            if (viborJapan["one"] == "native") {
              busi++;
              base++;

              if (viborJapan["amount3"] == 1) {
                busi++;
              }

              if ((viborJapan["amount3"] == 2) || (viborJapan["amount3"] == 3) || (viborJapan["amount3"] == 4)) {
                base++;
              }
            }

            if (viborJapan["one"] == "russian") {
              busi++;
              base++;
              turi++;

              if (viborJapan["amount3"] == 1) {
                busi++;
              }

              if ((viborJapan["amount3"] == 2) || (viborJapan["amount3"] == 3)) {
                base++;
              }

              if (viborJapan["amount3"] == 4) {
                turi++;
              }
            }
          }

          if (viborJapan["amount1"] == 3) {
            busi++;
            turi++;

            if ((viborJapan["one"] == "native") || (viborJapan["one"] == "russian")) {
              busi++;
              turi++;

              if ((viborJapan["amount3"] == 1) || (viborJapan["amount3"] == 2)) {
                busi++;
              }

              if ((viborJapan["amount3"] == 3) || (viborJapan["amount3"] == 4)) {
                turi++;
              }
            }
          }
        }
      } /* understand == no */
    } /* say == hard */

    if (viborJapan["say"] == "easy") {
      prof++;
      busi++;

      if ((viborJapan["understand"] == "yes") || (viborJapan["understand"] == "no") || (viborJapan["understand"] == "few")) {
        prof++;
        busi++;

        if ((viborJapan["learn"] == "language") || (viborJapan["learn"] == "writing") || (viborJapan["learn"] == "all")) {
          busi++;
          prof++;

          if ((viborJapan["amount1"] == 1) || (viborJapan["amount1"] == 2) || (viborJapan["amount1"] == 3)) {
            prof++;
            busi++;

            if ((viborJapan["one"] == "native") || (viborJapan["one"] == "russian")) {
              busi++;
              prof++;

              if (viborJapan["amount3"] == 1) {
                busi++;
              }

              if ((viborJapan["amount3"] == 3) || (viborJapan["amount3"] == 4) || (viborJapan["amount3"] == 2)) {
                 prof++;
              }
            }
          }
        }
      }
    } /* say == ease */

    $('.choice-course__item--japan .choice-course__select--1 .choice-course__select-progress').width( base * 40 );
    $('.choice-course__item--japan .choice-course__select--2 .choice-course__select-progress').width( prof * 40 );
    $('.choice-course__item--japan .choice-course__select--3 .choice-course__select-progress').width( busi * 40 );
    $('.choice-course__item--japan .choice-course__select--4 .choice-course__select-progress').width( turi * 40 );

    if ( base != 6 ) {
      $('.choice-course__item--japan .choice-course__select--1 .choice-course__select-progress a').hide();
    };
    if ( base == 6 ) { 
      $('.choice-course__item--japan .choice-course__select--1 .choice-course__select-progress').css('width','100%');
      $('.choice-course__item--japan .choice-course__select--1 .choice-course__select-progress a').show();

      $('.choice-course__item--japan .choice-course__result-item').eq(0).find('b').text('230');
      $('.choice-course__item--japan .choice-course__result-item').eq(1).find('b').text('750');
      $('.choice-course__item--japan .choice-course__result-item').eq(2).find('b').text('32');
    };
    
    if ( base == 1 ) {
      $('.choice-course__item--japan .choice-course__result-item').eq(0).find('b').text('230');
      $('.choice-course__item--japan .choice-course__result-item').eq(1).find('b').text('750');
      $('.choice-course__item--japan .choice-course__result-item').eq(2).find('b').text('32');
    };

    if ( prof != 6 ) { 
      $('.choice-course__item--japan .choice-course__select--2 .choice-course__select-progress a').hide();

    };
    if ( prof == 6 ) { 
      $('.choice-course__item--japan .choice-course__select--2 .choice-course__select-progress').css('width','100%');
      $('.choice-course__item--japan .choice-course__select--2 .choice-course__select-progress a').show();

      $('.choice-course__item--japan .choice-course__result-item').eq(0).find('b').text('530');
      $('.choice-course__item--japan .choice-course__result-item').eq(1).find('b').text('1500');
      $('.choice-course__item--japan .choice-course__result-item').eq(2).find('b').text('47');
    }
    
    if ( prof == 1 ) {
      $('.choice-course__item--japan .choice-course__result-item').eq(0).find('b').text('530');
      $('.choice-course__item--japan .choice-course__result-item').eq(1).find('b').text('1500');
      $('.choice-course__item--japan .choice-course__result-item').eq(2).find('b').text('47');
    }

    if ( busi != 6 ) { 
      $('.choice-course__item--japan .choice-course__select--3 .choice-course__select-progress a').hide();
    }
    if ( busi == 6 ) { 
      $('.choice-course__item--japan .choice-course__select--3 .choice-course__select-progress').css('width','100%');
      $('.choice-course__item--japan .choice-course__select--3 .choice-course__select-progress a').show();

      $('.choice-course__item--japan .choice-course__result-item').eq(0).find('b').text('1230');
      $('.choice-course__item--japan .choice-course__result-item').eq(1).find('b').text('4000');
      $('.choice-course__item--japan .choice-course__result-item').eq(2).find('b').text('84');
    }

    if ( turi != 6 ) { 
      $('.choice-course__item--japan .choice-course__select--4 .choice-course__select-progress a').hide();
    };
    if ( turi == 6 ) { 
      $('.choice-course__item--japan .choice-course__select--4 .choice-course__select-progress').css('width','100%');
      $('.choice-course__item--japan .choice-course__select--4 .choice-course__select-progress a').show();

      $('.choice-course__item--japan .choice-course__result-item').eq(0).find('b').text('212');
      $('.choice-course__item--japan .choice-course__result-item').eq(1).find('b').text('715');
      $('.choice-course__item--japan .choice-course__result-item').eq(2).find('b').text('45');
    };

  }

  choiceCourseJapan();

  $('.choice-course__item--japan input[type=radio]').change(function(event) {
    if ($(this).is("#hard-japan")) {
      viborJapan["say"]="hard";

      var course = $(this).parents('.choice-course__item');
      choiceCourseJapan(course);
    }

    if ($(this).is("#easy-japan")) {
      viborJapan["say"]="easy";

      var course = $(this).parents('.choice-course__item');
      choiceCourseJapan(course);
    };
    
    if ($(this).is("#yes-japan")) { 
      viborJapan["understand"]="yes"; 

      var course = $(this).parents('.choice-course__item');
      choiceCourseJapan(course);
    }

    if ($(this).is("#no-japan")) { 
      viborJapan["understand"]="no"; 

      var course = $(this).parents('.choice-course__item');
      choiceCourseJapan(course);
    }

    if ($(this).is("#few-japan")) { 
      viborJapan["understand"]="few"; 

      var course = $(this).parents('.choice-course__item');
      choiceCourseJapan(course);
    }
    
    if ($(this).is("#language-japan")) { 
      viborJapan["learn"]="language"; 

      var course = $(this).parents('.choice-course__item');
      choiceCourseJapan(course);
    }
    if ($(this).is("#writing-japan")) { 
      viborJapan["learn"]="writing"; 

      var course = $(this).parents('.choice-course__item');
      choiceCourseJapan(course);
    }
    if ($(this).is("#all-japan")) { 
      viborJapan["learn"]="all"; 

      var course = $(this).parents('.choice-course__item');
      choiceCourseJapan(course);};

    if ($(this).is("#weekdays-japan")) { 
      viborJapan["do"]="weekdays";

      var course = $(this).parents('.choice-course__item');
      choiceCourseJapan(course);
    }
    if ($(this).is("#weekend-japan")) { 
      viborJapan["do"]="weekend"; 

      var course = $(this).parents('.choice-course__item');
      choiceCourseJapan(course);
    }

    if ($(this).is("#native-japan")) { 
      viborJapan["one"]="native"; 
      var course = $(this).parents('.choice-course__item');
      choiceCourseJapan(course);
    }
    if ($(this).is("#russian-japan")) { 
      viborJapan["one"]="russian"; 
      var course = $(this).parents('.choice-course__item');
      choiceCourseJapan(course);
    }

    viborJapan["amount1"] = parseInt(rangeTimeJapan.noUiSlider.get()) + 1;
    viborJapan["amount2"] = parseInt(rangeCountJapan.noUiSlider.get()) + 1;
    viborJapan["amount3"] = parseInt(rangeNeedJapan.noUiSlider.get()) + 1;
  });

  if (rangeTimeJapan) {
    rangeTimeJapan.noUiSlider.on('change', function(value) {
      viborJapan["amount1"] = parseInt(value) + 1;
      choiceCourseJapan();
    });
  }

  if (rangeCountJapan) {
    rangeCountJapan.noUiSlider.on('change', function(value) {
      viborJapan["amount2"] = parseInt(value) + 1;
      choiceCourseJapan();
    });
  }

  if (rangeNeedJapan) {
    rangeNeedJapan.noUiSlider.on('change', function(value) {
      viborJapan["amount3"] = parseInt(value) + 1;
      choiceCourseJapan();
    });
  }

  // Course Korean
  function choiceCourseKorean(course) {
    var base = 0;
    var prof = 0;
    var busi = 0;
    var turi = 0;

    if (viborKorean["say"] == "hard") {
      base++;
      busi++;
      turi++;

      if (viborKorean["understand"] == "yes") {
        busi++;
        turi++;

        if ((viborKorean["learn"] == "language") || (viborKorean["learn"] == "writing") || (viborKorean["learn"] == "all")) {
          busi++;
          turi++;

          if ((viborKorean["amount1"] == 1) || (viborKorean["amount1"] == 2) || (viborKorean["amount1"] == 3)) {
            busi++;
            turi++;

            if ((viborKorean["one"] == "native") || (viborKorean["one"] == "russian")) {
              busi++;
              turi++;

              if ((viborKorean["amount3"] == 1) || (viborKorean["amount3"] == 2)) {
                busi++;
              }

              if ((viborKorean["amount3"] == 3) || (viborKorean["amount3"] == 4)) {
                turi++;
              }
            }
          }
        }
      } /* understand == yes */

      if ((viborKorean["understand"] == "no") || (viborKorean["understand"] == "few")) {
        busi++;
        turi++;
        base++;

        if ((viborKorean["learn"] == "language") || (viborKorean["learn"] == "writing") || (viborKorean["learn"] == "all")) {
          busi++;
          turi++;
          base++;

          if ((viborKorean["amount1"] == 1) || (viborKorean["amount1"] == 2)) {
            busi++;
            base++;
            turi++;

            if (viborKorean["one"] == "native") {
              busi++;
              base++;

              if (viborKorean["amount3"] == 1) {
                busi++;
              }

              if ((viborKorean["amount3"] == 2) || (viborKorean["amount3"] == 3) || (viborKorean["amount3"] == 4)) {
                base++;
              }
            }

            if (viborKorean["one"] == "russian") {
              busi++;
              base++;
              turi++;

              if (viborKorean["amount3"] == 1) {
                busi++;
              }

              if ((viborKorean["amount3"] == 2) || (viborKorean["amount3"] == 3)) {
                base++;
              }

              if (viborKorean["amount3"] == 4) {
                turi++;
              }
            }
          }

          if (viborKorean["amount1"] == 3) {
            busi++;
            turi++;

            if ((viborKorean["one"] == "native") || (viborKorean["one"] == "russian")) {
              busi++;
              turi++;

              if ((viborKorean["amount3"] == 1) || (viborKorean["amount3"] == 2)) {
                busi++;
              }

              if ((viborKorean["amount3"] == 3) || (viborKorean["amount3"] == 4)) {
                turi++;
              }
            }
          }
        }
      } /* understand == no */
    } /* say == hard */

    if (viborKorean["say"] == "easy") {
      prof++;
      busi++;

      if ((viborKorean["understand"] == "yes") || (viborKorean["understand"] == "no") || (viborKorean["understand"] == "few")) {
        prof++;
        busi++;

        if ((viborKorean["learn"] == "language") || (viborKorean["learn"] == "writing") || (viborKorean["learn"] == "all")) {
          busi++;
          prof++;

          if ((viborKorean["amount1"] == 1) || (viborKorean["amount1"] == 2) || (viborKorean["amount1"] == 3)) {
            prof++;
            busi++;

            if ((viborKorean["one"] == "native") || (viborKorean["one"] == "russian")) {
              busi++;
              prof++;

              if (viborKorean["amount3"] == 1) {
                busi++;
              }

              if ((viborKorean["amount3"] == 3) || (viborKorean["amount3"] == 4) || (viborKorean["amount3"] == 2)) {
                 prof++;
              }
            }
          }
        }
      }
    } /* say == ease */

    $('.choice-course__item--korean .choice-course__select--1 .choice-course__select-progress').width( base * 40 );
    $('.choice-course__item--korean .choice-course__select--2 .choice-course__select-progress').width( prof * 40 );
    $('.choice-course__item--korean .choice-course__select--3 .choice-course__select-progress').width( busi * 40 );
    $('.choice-course__item--korean .choice-course__select--4 .choice-course__select-progress').width( turi * 40 );

    if ( base != 6 ) {
      $('.choice-course__item--korean .choice-course__select--1 .choice-course__select-progress a').hide();
    };
    if ( base == 6 ) { 
      $('.choice-course__item--korean .choice-course__select--1 .choice-course__select-progress').css('width','100%');
      $('.choice-course__item--korean .choice-course__select--1 .choice-course__select-progress a').show();

      $('.choice-course__item--korean .choice-course__result-item').eq(0).find('b').text('33');
      $('.choice-course__item--korean .choice-course__result-item').eq(1).find('b').text('980');
      $('.choice-course__item--korean .choice-course__result-item').eq(2).find('b').text('32');
    };
    
    if ( base == 1 ) {
      $('.choice-course__item--korean .choice-course__result-item').eq(0).find('b').text('33');
      $('.choice-course__item--korean .choice-course__result-item').eq(1).find('b').text('980');
      $('.choice-course__item--korean .choice-course__result-item').eq(2).find('b').text('32');
    };

    if ( prof != 6 ) { 
      $('.choice-course__item--korean .choice-course__select--2 .choice-course__select-progress a').hide();

    };
    if ( prof == 6 ) { 
      $('.choice-course__item--korean .choice-course__select--2 .choice-course__select-progress').css('width','100%');
      $('.choice-course__item--korean .choice-course__select--2 .choice-course__select-progress a').show();

      $('.choice-course__item--korean .choice-course__result-item').eq(0).find('b').text('56');
      $('.choice-course__item--korean .choice-course__result-item').eq(1).find('b').text('2030');
      $('.choice-course__item--korean .choice-course__result-item').eq(2).find('b').text('47');
    }
    
    if ( prof == 1 ) {
      $('.choice-course__item--korean .choice-course__result-item').eq(0).find('b').text('56');
      $('.choice-course__item--korean .choice-course__result-item').eq(1).find('b').text('2030');
      $('.choice-course__item--korean .choice-course__result-item').eq(2).find('b').text('47');
    }

    if ( busi != 6 ) { 
      $('.choice-course__item--korean .choice-course__select--3 .choice-course__select-progress a').hide();
    }
    if ( busi == 6 ) { 
      $('.choice-course__item--korean .choice-course__select--3 .choice-course__select-progress').css('width','100%');
      $('.choice-course__item--korean .choice-course__select--3 .choice-course__select-progress a').show();

      $('.choice-course__item--korean .choice-course__result-item').eq(0).find('b').text('15');
      $('.choice-course__item--korean .choice-course__result-item').eq(1).find('b').text('5230');
      $('.choice-course__item--korean .choice-course__result-item').eq(2).find('b').text('64');
    }

    if ( turi != 6 ) { 
      $('.choice-course__item--korean .choice-course__select--4 .choice-course__select-progress a').hide();
    };
    if ( turi == 6 ) { 
      $('.choice-course__item--korean .choice-course__select--4 .choice-course__select-progress').css('width','100%');
      $('.choice-course__item--korean .choice-course__select--4 .choice-course__select-progress a').show();

      $('.choice-course__item--korean .choice-course__result-item').eq(0).find('b').text('27');
      $('.choice-course__item--korean .choice-course__result-item').eq(1).find('b').text('850');
      $('.choice-course__item--korean .choice-course__result-item').eq(2).find('b').text('30');
    };

  }

  choiceCourseKorean();

  $('.choice-course__item--korean input[type=radio]').change(function(event) {
    if ($(this).is("#hard-korean")) {
      viborKorean["say"]="hard";

      var course = $(this).parents('.choice-course__item');
      choiceCourseKorean(course);
    }

    if ($(this).is("#easy-korean")) {
      viborKorean["say"]="easy";

      var course = $(this).parents('.choice-course__item');
      choiceCourseKorean(course);
    };
    
    if ($(this).is("#yes-korean")) { 
      viborKorean["understand"]="yes"; 

      var course = $(this).parents('.choice-course__item');
      choiceCourseKorean(course);
    }

    if ($(this).is("#no-korean")) { 
      viborKorean["understand"]="no"; 

      var course = $(this).parents('.choice-course__item');
      choiceCourseKorean(course);
    }

    if ($(this).is("#few-korean")) { 
      viborKorean["understand"]="few"; 

      var course = $(this).parents('.choice-course__item');
      choiceCourseKorean(course);
    }
    
    if ($(this).is("#language-korean")) { 
      viborKorean["learn"]="language"; 

      var course = $(this).parents('.choice-course__item');
      choiceCourseKorean(course);
    }
    if ($(this).is("#writing-korean")) { 
      viborKorean["learn"]="writing"; 

      var course = $(this).parents('.choice-course__item');
      choiceCourseKorean(course);
    }
    if ($(this).is("#all-korean")) { 
      viborKorean["learn"]="all"; 

      var course = $(this).parents('.choice-course__item');
      choiceCourseKorean(course);};

    if ($(this).is("#weekdays-korean")) { 
      viborKorean["do"]="weekdays";

      var course = $(this).parents('.choice-course__item');
      choiceCourseKorean(course);
    }
    if ($(this).is("#weekend-korean")) { 
      viborKorean["do"]="weekend"; 

      var course = $(this).parents('.choice-course__item');
      choiceCourseKorean(course);
    }

    if ($(this).is("#native-korean")) { 
      viborKorean["one"]="native"; 
      var course = $(this).parents('.choice-course__item');
      choiceCourseKorean(course);
    }
    if ($(this).is("#russian-korean")) { 
      viborKorean["one"]="russian"; 
      var course = $(this).parents('.choice-course__item');
      choiceCourseKorean(course);
    }

    viborKorean["amount1"] = parseInt(rangeTimeKorean.noUiSlider.get()) + 1;
    viborKorean["amount2"] = parseInt(rangeCountKorean.noUiSlider.get()) + 1;
    viborKorean["amount3"] = parseInt(rangeNeedKorean.noUiSlider.get()) + 1;
  });

  if (rangeTimeKorean) {
    rangeTimeKorean.noUiSlider.on('change', function(value) {
      viborKorean["amount1"] = parseInt(value) + 1;
      choiceCourseKorean();
    });
  }

  if (rangeCountKorean) {
    rangeCountKorean.noUiSlider.on('change', function(value) {
      viborKorean["amount2"] = parseInt(value) + 1;
      choiceCourseKorean();
    });
  }

  if (rangeNeedKorean) {
    rangeNeedKorean.noUiSlider.on('change', function(value) {
      viborKorean["amount3"] = parseInt(value) + 1;
      choiceCourseKorean();
    });
  }

});