(function ($) {

    init_select2_fields();

    document.body.addEventListener( 'directorist-reload-select2-fields', init_select2_fields );

    function init_select2_fields() {
        let select2_args = {
            allowClear: true,
            width: '100%',
            templateResult: function (data) {
                // We only really care if there is an element to pull classes from
                if ( ! data.element ) {
                    return data.text;
                }
                var $element = $(data.element);
                var $wrapper = $('<span></span>');
    
                $wrapper.addClass($element[0].className);
                $wrapper.text(data.text);
    
                return $wrapper;
            }
        };
    
        let select2_fields = [
            // General
            { elm: $('.select-basic'), args: select2_args },
            
            // Location
            { elm: $('#at_biz_dir-location'), args: select2_args },
            { elm: $('#loc-type'), args: select2_args },
            { elm: $('.bdas-location-search'), args: select2_args },
            { elm: $('.directorist-location-select'), args: select2_args },
    
            // Category
            { elm: $('#at_biz_dir-category'), args: select2_args },
            { elm: $('#cat-type'), args: select2_args },
            { elm: $('.bdas-category-search'), args: select2_args },
            { elm: $('.directorist-category-select'), args: select2_args },
        ];

        select2_fields.forEach( field => {
            if ( ! field.elm ) { return; }
            if ( ! field.args ) { return; }
    
            convert_to_select2( field );
        });
    }

    function convert_to_select2( field ) {
        var options = field.elm.find( 'option' );
        var placeholder = ( options.length ) ? options[0].innerHTML: '';

        if ( placeholder.length ) {
            field.args.placeholder = placeholder;
        }

        field.elm.select2( field.args );
    }

    //ad search js
    /* var showMore = atbdp_search_listing.i18n_text.show_more;
    var showLess = atbdp_search_listing.i18n_text.show_less;
    var checkbox = $(".bads-tags .custom-control");
    checkbox.slice(4).hide();
    var show_more = $(".more-less");
    show_more.on("click", function (e) {
        e.preventDefault();
        var txt = checkbox.slice(4).is(":visible") ? showMore : showLess;
        $(this).text(txt);
        checkbox.slice(4).slideToggle(200);
        $(this).toggleClass("ad");
    });
    if (checkbox.length <= 4) {
        show_more.remove();
    }


    var item = $('.custom-control').closest('.bads-custom-checks');
    item.each(function (index, el) {
        var count = 0;
        var abc = $(el)[0];
        var abc2 = $(abc).children('.custom-control');
        if(abc2.length <= 4){
            $(abc2).closest('.bads-custom-checks').next('a.more-or-less').hide();
        }
        $(abc2).slice(4, abc2.length).hide();

    });





    $(".bads-custom-checks").parent(".form-group").addClass("ads-filter-tags"); */
    $( window  ).on( 'load', function() {

        $('.directorist-btn-ml').each( (index, element) => {
            let item = $(element).closest('.atbdp_cf_checkbox, .direcorist-search-field-tag');
            var abc2 = $(item).find('.directorist-checkbox ');
            $(abc2).slice(4, abc2.length).slideUp();
        });

    });

    $('body').on('click', '.directorist-btn-ml', function(event) {
        event.preventDefault();
        var item = $(this).closest('.atbdp_cf_checkbox, .direcorist-search-field-tag');
        var abc2 = $(item).find('.directorist-checkbox ');
        $(abc2).slice(4, abc2.length).slideUp();

        $(this).toggleClass('active');

       if($(this).hasClass('active')){
           $(this).text(atbdp_search_listing.i18n_text.show_less);
           $(abc2).slice(4, abc2.length).slideDown();
       } else {
           $(this).text(atbdp_search_listing.i18n_text.show_more);
           $(abc2).slice(4, abc2.length).slideUp();
       }

    });

    /* Advanced search */
    var ad = $(".directorist-search-float .directorist-advanced-filter");
    ad.css({
        visibility: 'hidden',
        height: '0',
    });

    const adsItemHeight = $('.directorist-advanced-filter .directorist-advanced-filter__advanced--element');
    let adsFilterHeight = $('.directorist-advanced-filter__action').innerHeight();
    let adsItemsHeight;
    for(let i = 0; i<= adsItemHeight.length; i++){
        adsItemsHeight = adsItemHeight.innerHeight() * i;
    }
    if(isNaN(adsItemsHeight)){
        adsItemsHeight = 0;
    }

    var dFilterBtn = $('body').find('.directorist-filter-btn');
    
    var count = 0;
    $('body').on("click", '.directorist-filter-btn', function (e) {
        count++;
        e.preventDefault();
        var currentPos = e.clientY, displayPos = window.innerHeight, height = displayPos - currentPos;
        
        if (count % 2 === 0) {
            $(e.currentTarget).closest('.directorist-search-form,.directorist-archive-contents').find('.directorist-search-float').find('.directorist-advanced-filter').css({
                visibility: 'hidden',
                opacity: '0',
                height: '0',
                transition: '.3s ease'
            });
        } else {
            $(e.currentTarget).closest('.directorist-search-form,.directorist-archive-contents').find('.directorist-search-float').find('.directorist-advanced-filter').css({
                visibility: 'visible',
                height: adsItemsHeight + adsFilterHeight + 70 + 'px',
                transition: '0.3s ease',
                opacity: '1',
            });
        }
    });

    var ad_slide = $(".directorist-search-slide .directorist-advanced-filter");
    ad_slide.hide().slideUp();
    $('body').on("click", '.directorist-filter-btn', function (e) {
        e.preventDefault();
        $(this).closest('.directorist-search-form, .directorist-archive-contents').find('.directorist-search-slide').find('.directorist-advanced-filter').slideToggle().show();
        $(this).closest('.directorist-search-form, .directorist-archive-contents').find('.directorist-search-slide').find('.directorist-advanced-filter').toggleClass("directorist-advanced-filter--show");
        atbd_callingSlider();
    });
    $(".directorist-advanced-filter").parents("div").css("overflow", "visible");


    //remove preload after window load
    $(window).on( 'load', function () {
        $("body").removeClass("directorist-preload");
        $('.button.wp-color-result').attr('style', ' ');
    });

    $('.directorist-mark-as-favorite__btn').each(function () {
        $(this).on('click', function (event) {
            event.preventDefault();
            var data = {
                'action': 'atbdp-favourites-all-listing',
                'post_id': $(this).data('listing_id')
            };
            var fav_tooltip_success = '<span>'+atbdp_search_listing.i18n_text.added_favourite+'</span>';
            var fav_tooltip_warning = '<span>'+atbdp_search_listing.i18n_text.please_login+'</span>';

            $(".directorist-favorite-tooltip").hide();
            $.post(atbdp_search_listing.ajax_url, data, function (response) {
                var post_id = data['post_id'].toString();
                var staElement = $('#directorist-fav_'+ post_id);
                var data_id = staElement.attr('data-listing_id');

                if (response === "login_required") {
                    staElement.children(".directorist-favorite-tooltip").append(fav_tooltip_warning);
                    staElement.children(".directorist-favorite-tooltip").fadeIn();
                    setTimeout(function () {
                        staElement.children(".directorist-favorite-tooltip").children("span").remove();
                    },3000);

                }else if('false' === response){
                    staElement.removeClass('directorist-added-to-favorite');
                    $(".directorist-favorite-tooltip span").remove();
                }else{
                    if ( data_id === post_id){
                        staElement.addClass('directorist-added-to-favorite');
                        staElement.children(".directorist-favorite-tooltip").append(fav_tooltip_success);
                        staElement.children(".directorist-favorite-tooltip").fadeIn();
                        setTimeout(function () {
                            staElement.children(".directorist-favorite-tooltip").children("span").remove();
                        },3000)
                    }
                }
            });

        })
    });

})(jQuery);

const $ = jQuery;

/* advanced search form reset */
function adsFormReset() {
    let adsForm = document.querySelector(".directorist-search-form");

    if ( ! adsForm ) {
        adsForm = document.querySelector(".directorist-advanced-filter__form");
    }

    if ( ! adsForm ) {
        adsForm = document.querySelector(".atbd_ads-form");
    }

    jQuery('.select2-hidden-accessible').val(null).trigger('change');
    resetPureSelect();

    adsForm.querySelectorAll("input[type='text']").forEach(function (el) {
        el.value = "";
    });
    adsForm.querySelectorAll("input[type='radio']").forEach(function (el) {
        el.checked = false;
    });
    adsForm.querySelectorAll("input[type='checkbox']").forEach(function (el) {
        el.checked = false;
    });
    adsForm.querySelectorAll("select").forEach(function (el) {
        el.selectedIndex = 0;
    });
    const irisPicker = adsForm.querySelector("input.wp-picker-clear");
    if(irisPicker !== null){
        irisPicker.click();
    }
    const rangeValue = adsForm.querySelector(".atbd-current-value span");
    if(rangeValue !== null){
        rangeValue.textContent = "0";
    }
}
if(document.querySelector(".directorist-search-form #atbdp_reset") !== null){
    document.querySelector(".directorist-search-form #atbdp_reset").addEventListener("click", function (e) {
        e.preventDefault();
        adsFormReset();
        atbd_callingSlider(0);
    });
}
if(document.querySelector(".directorist-advanced-filter #atbdp_reset") !== null){
    document.querySelector(".directorist-advanced-filter #atbdp_reset").addEventListener("click", function (e) {
        e.preventDefault();
        adsFormReset();
        atbd_callingSlider(0);
    });
}
if(document.querySelector("#bdlm-search-area #atbdp_reset") !== null){
    document.querySelector("#bdlm-search-area #atbdp_reset").addEventListener("click", function (e) {
        e.preventDefault();
        adsFormReset();
        atbd_callingSlider(0);
    })
}

function resetPureSelect( inp_selector ) {
    const selector = ( inp_selector ) ? $(inp_selector) : $( '.directorist-select' );

    $(selector).each( function( ind, elm ) {
        let pure_select_container = $(elm).find( '.directorist-select__container' );
        if ( ! pure_select_container.length ) return;
        if ( ! $(elm).find( 'select' ).length ) return;

        let select_inp = $(elm).find( 'select' )[0];
        let placeholder = select_inp[0].innerHTML;
        placeholder = placeholder + '<i class="la la-angle-down"></i>';

        $(elm).find('.directorist-select__label').html( placeholder );
        select_inp.selectedIndex = 0;
    });
}