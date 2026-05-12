

document.addEventListener("DOMContentLoaded", function(e){
    popupApplyHandler();
    popupEventHandler();
    headerMenuSlideHandler();
    asideMenuHandler();
    mainVisualSlideHandler();
    mainNewcarSlideHandler();
    mainLimitationSlideHandler();
    mainYoutubeSlideHandler();
    mainBestcarSlideHandler();
    mainCarpriceSlideHandler();
    mainReviewSlideHandler();
    mainCarBrandSlideHandler();
    mainFaqSlideHandler();
    partnerSlideHandler();
    excellenceApplyPopupHandler();
    floatingApplyHandler();
    carDetailSlideHandler();
    makeCarSlideHandler();
    makeCarResultPopupHandler();
    makeCarStepHandler();
})


const makeCarStepHandler = () => {
    let index = 0; 
    $('.sub.make-car .make-car-section .pn-btn-wrap .pn-btn.step-next-btn').click(function(){
        if(index === 0){
            const brand = $('.sub.make-car .make-car-section input[name="brand"]:checked').val();
            if (!brand) {
                alert('브랜드를 선택해주세요.');
                return;
            }
        }else if(index === 1){
            const model = $('.sub.make-car .make-car-section input[name="car-model"]:checked').val();
            if (!model) {
                alert('모델을 선택해주세요.');
                return;
            }
        }else if(index === 2){
            //연료
            const fuel = $('.sub.make-car .make-car-section input[name="fuel"]:checked').val(); 
            //모델
            const trim = $('.sub.make-car .make-car-section input[name="car-trim"]:checked').val();
            const trimDetail = $('.sub.make-car .make-car-section input[name="car-trim-detail"]:checked').val(); 
            //외장 색상
            const exteriorColor = $('.sub.make-car .make-car-section input[name="exterior-color"]:checked').val();
            //내장 색상
            const interiorColor = $('.sub.make-car .make-car-section input[name="interior-color"]:checked').val();
            //차량 옵션
            const carOption = $('.sub.make-car .make-car-section input[name="car-option"]:checked').val();
            //계약 기간 
            const contractPeriod = $('.sub.make-car .make-car-section input[name="contract-period"]:checked').val();
            //주행 거리 
            const mileage = $('.sub.make-car .make-car-section input[name="mileage"]:checked').val();
            //보증조건 : 선납금
            const prepayment = $('.sub.make-car .make-car-section input[name="prepayment"]:checked').val();
            //보증 조건 : 보증금
            const deposit = $('.sub.make-car .make-car-section input[name="deposit"]:checked').val();
        
            if (!fuel) {
                alert('연료를 선택해주세요.');
                return;
            }else if(!trim) {
                alert('모델을 선택해주세요.');
                return;
            }else if (!trimDetail) {
                alert('모델을 선택해주세요.');
                return;
            }else if(!exteriorColor) {
                alert('외장 색상을 선택해주세요.');
                return;
            }else if(!interiorColor) {
                alert('내장 색상을 선택해주세요.');
                return;
            }else if(!carOption) {
                alert('차량 옵션을 선택해주세요.');
                return;
            }else if(!contractPeriod) {
                alert('계약 기간을 선택해주세요.');
                return;
            }else if(!mileage) {
                alert('주행 거리를 선택해주세요.');
                return;
            }else if(!prepayment) {
                alert('선납금을 선택해주세요.');
                return;
            }else if(!deposit) {
                alert('보증금을 선택해주세요.');
                return;
            }

        }
        index++;
        scrollToTop()
        $('.sub.make-car .make-car-section .step-list > li').removeClass('is-active');
        $('.sub.make-car .make-car-section .step-list > li').eq(index).addClass('is-active');
    })
    $('.sub.make-car .make-car-section .pn-btn-wrap .pn-btn.step-prev-btn').click(function(){
        index--;
        $('.sub.make-car .make-car-section .step-list > li').removeClass('is-active');
        $('.sub.make-car .make-car-section .step-list > li').eq(index).addClass('is-active');
        scrollToTop()
    })

    // 선택하는 값에 따라 결과창에 다른 결과화면 뿌리기(AJAX로 추가된 요소도 대응)
    $(document).on('change', '.sub.make-car .make-car-section input[name="brand"]', function () {
        //브랜드 이름
        const selectedBrand = $(this).closest('label').find('.brand-name').text().trim();
        $('.sub.make-car .result-content .brand').text(selectedBrand);
        $('.sub.make-car .result-content-box .content-list > li .content .result-car-name .brand').text(selectedBrand);
    });
    $(document).on('change', '.sub.make-car .make-car-section input[name="car-model"]', function () {
        //차 이름
        const selectedCarModel = $(this).closest('label').find('.brand-name').text().trim();
        $('.sub.make-car .result-content .car-name').text(selectedCarModel);
        $('.sub.make-car .result-content-box .content-list > li .content .result-car-name .name').text(selectedCarModel);

        //차 이미지
        const selectedCarImage = $(this).closest('label').find('.logo-div').css('background-image').trim();
        $('.sub.make-car .result-img').css('background-image', selectedCarImage);
    });

    // 트림 상세 선택 시 선택한 금액을 상위 트림 가격 영역에 표시
    $(document).on('change', '.sub.make-car .make-car-section input[name="car-trim-detail"]', function () {
        const trimName = $(this).closest('label').find('.brand-name').text().trim();
        const price = Number($(this).closest('label').find('.price').data('price'));
        const priceText = price.toLocaleString('ko-KR') + '원~';
        $('.sub.make-car .make-car-section .slide-choice-wrap .model .text-wrap .price').text('');
        $(this)
            .closest('.slide-choice-wrap')
            .children('.model')
            .find('.text-wrap .price')
            .text(priceText);
        $('.sub.make-car .result-content-box .content-list .price-box .name').text(trimName);
        $('.sub.make-car .result-content-box .content-list .price-box .price').text(price.toLocaleString('ko-KR') + '원');
        $('.sub.make-car #car-price').text(price.toLocaleString('ko-KR') + '원');
        totalPriceHandler();
    });
    
    //연료
    $(document).on('change', '.sub.make-car .make-car-section input[name="fuel"]', function () {
        const fuel = $(this).val();
        $('.sub.make-car #fuel-name').text(fuel);
    });

    //컬러 및 옵션
    //외장색상
    $(document).on('change', '.sub.make-car .make-car-section input[name="exterior-color"]', function () {
        const exteriorColor = $(this).val();
        const backgroundColor = $(this).closest('label').find('.color-chart').css('background-color');
        const price = Number($(this).data('price'));
        // console.log(exteriorColor, backgroundColor)
        $('.sub.make-car #exterior-color-div').css('background-color', backgroundColor);
        $('.sub.make-car #exterior-color-div + .car-out-color').text(exteriorColor);
        $('.sub.make-car #exterior-color-name').text(exteriorColor);
        $('.sub.make-car #exterior-color-price').text(price.toLocaleString('ko-KR') + '원');
        colorPriceHandler();
    });

    //내장색상
    $(document).on('change', '.sub.make-car .make-car-section input[name="interior-color"]', function () {
        const interiorColor = $(this).val();
        const backgroundColor = $(this).closest('label').find('.color-chart').css('background-color');
        const price = Number($(this).data('price'));
        $('.sub.make-car #interior-color-div').css('background-color', backgroundColor);
        $('.sub.make-car #interior-color-div + .car-out-color').text(interiorColor);
        $('.sub.make-car #interior-color-name').text(interiorColor);
        $('.sub.make-car #interior-color-price').text(price.toLocaleString('ko-KR') + '원');
        colorPriceHandler()
    });

    //차량옵션 
    $(document).on('change', '.sub.make-car .make-car-section input[name="car-option"]', function () {
        const carOption = $(this).val();
        const price = Number($(this).data('price'));
        $('.sub.make-car #car-option-name').text(carOption);
        $('.sub.make-car #car-option-price').text(price.toLocaleString('ko-KR') + '원');
        colorPriceHandler();
    })


    //내장색상 + 외장색상 + 차량 옵션 가격 더하기 
    function colorPriceHandler() {
        const OutPrice = Number($('.sub.make-car .make-car-section input[name="exterior-color"]:checked').data('price') || 0);
        const InnerPrice = Number($('.sub.make-car .make-car-section input[name="interior-color"]:checked').data('price') || 0);
        const CarOptionPrice = Number($('.sub.make-car .make-car-section input[name="car-option"]:checked').data('price') || 0);
        let colorPrice = OutPrice + InnerPrice + CarOptionPrice;
        $('.sub.make-car #color-price').text(colorPrice.toLocaleString('ko-KR') + '원');
        totalPriceHandler();

    }



    //주요 계약 조건
    $(document).on('change', '.sub.make-car .make-car-section input[name="contract-period"]', function () {
        const contractPeriod = $(this).val();
        $('.sub.make-car #contract-period-name').text(contractPeriod);
    })
    $(document).on('change', '.sub.make-car .make-car-section input[name="mileage"]', function () {
        const mileage = $(this).val();
        $('.sub.make-car #mileage-name').text(mileage);
    })
    $(document).on('change', '.sub.make-car .make-car-section input[name="prepayment"]', function () {
        const prepayment = $(this).val();
        $('.sub.make-car #prepayment-name').text(prepayment);
    })
    $(document).on('change', '.sub.make-car .make-car-section input[name="deposit"]', function () {
        const deposit = $(this).val();
        $('.sub.make-car #deposit-name').text(deposit);
    })

    //총액
    function totalPriceHandler() {
        const carPrice = getPriceNumber($('.sub.make-car #car-price').text());
        const colorPrice = getPriceNumber($('.sub.make-car #color-price').text());
        const totalPrice = carPrice + colorPrice;
        $('.sub.make-car #total-price').text(totalPrice.toLocaleString('ko-KR') + '원');
    }

    function getPriceNumber(priceText) {
        return Number(String(priceText).replace(/[^0-9]/g, '')) || 0;
    }
}

const scrollToTop = () => {
    const smoother = window.ScrollSmoother && ScrollSmoother.get && ScrollSmoother.get();
    if (smoother) {
        smoother.scrollTo(0, true);
    } else {
        $('html, body').stop().animate({ scrollTop: 0 }, 0);
    }
}


const makeCarResultPopupHandler = () => {
    $('.make-car-result-popup .content-arti .btn-wrap .bottom-btn.close-btn').click(function(){
        $('.make-car-result-popup').removeClass('show');
    })
    $('.result-popup-show-btn').click(function(){
        $('.make-car-result-popup').addClass('show');
    })
}

const makeCarSlideHandler = () => {
    $('.sub.make-car .brand-toggle-wrap .brand-toggle-title').click(function(){
        $(this).closest('.brand-toggle-wrap').toggleClass('hide');
        $(this).siblings('.brand-toggle-content').slideToggle();
    })

    $('.sub.make-car .step3 .text-content-wrap .text-label-wrap .slide-choice-wrap .model input[type="radio"]').change(function(){
        const $slideChoiceWrap = $(this).closest('.slide-choice-wrap');
        const $subList = $slideChoiceWrap.children('.sub-list');
        const $siblingSubList = $slideChoiceWrap.siblings('.slide-choice-wrap').children('.sub-list');

        $siblingSubList.find('input[type="radio"], input[type="checkbox"]').prop('checked', false);
        $siblingSubList.slideUp();

        if ($(this).is(':checked')) {
            $subList.stop(true, true).slideToggle();
        }
    })
}

const carDetailSlideHandler = () => {
    var swiper = new Swiper(".sub.car-detail .section5 .swiper", {
        slidesPerView: "auto",
        spaceBetween: 20,
        loop: true,
        watchOverflow: false,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });
}

const floatingApplyHandler = () => {
    const $floating = $('.floating-apply-section');
    if (!$floating.length) return;

    const checkScrollEnd = () => {
        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();
        const docHeight = $(document).height();

        // 스크롤이 맨 끝에 닿으면 숨김 (100px 오차 허용)
        if (scrollTop + windowHeight >= docHeight - 100) {
            $floating.hide();
        } else {
            $floating.show();
        }
    }

    $(window).on('scroll resize', checkScrollEnd);
    checkScrollEnd();
}

const excellenceApplyPopupHandler = () => {
    //팝업 닫기
    $('.excellence-apply-popup .content-arti .btn-wrap .bottom-btn.close-btn').click(function(){
        $('.excellence-apply-popup').removeClass('show');
    });
}

const partnerSlideHandler = () => {
    if (!$.fn.marquee) return;

    var marqueePaused1 = false;
    var marqueePaused2 = false;

    var marquee1 = $(".main .partner-section .slide-div .logo-list.type1").marquee({
        duration: 25000,
        delayBeforeStart: 500,
        direction: "right",
        startVisible: true,
        duplicated: true,
        gap: 20,
    });

    var marquee2 = $(".main .partner-section .slide-div .logo-list.type2").marquee({
        duration: 25000,
        delayBeforeStart: 500,
        direction: "left",
        startVisible: true,
        duplicated: true,
        gap: 20,
    });

    $(".main .partner-section .slide-div .logo-list.type1").on("mouseenter", ".logo-item", function () {
        if (!marqueePaused1) marquee1.marquee("pause");
    });
    $(".main .partner-section .slide-div .logo-list.type1").on("mouseleave", ".logo-item", function () {
        if (!marqueePaused1) marquee1.marquee("resume");
    });

    $(".main .partner-section .slide-div .logo-list.type2").on("mouseenter", ".logo-item", function () {
        if (!marqueePaused2) marquee2.marquee("pause");
    });
    $(".main .partner-section .slide-div .logo-list.type2").on("mouseleave", ".logo-item", function () {
        if (!marqueePaused2) marquee2.marquee("resume");
    });
}

const mainFaqSlideHandler = () => {
    $('.main .faq-section .faq-list .qna-box.q-box').click(function(){
        $(this).closest('li').toggleClass('is-active');
        $(this).closest('li').find('.qna-box.a-box').slideToggle();
    })
}

const mainCarBrandSlideHandler = () => {
    //브랜드 슬라이드
    $('.main .carprice-section .main-tab-content .car-brand-tab .swiper').each(function () {
        new Swiper(this, {
            slidesPerView: "auto",
            spaceBetween: 10,
            loop: true,
            watchOverflow: false,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
        });
    });

    // 탭, 컨텐츠
    $('.main .car-brand-section .main-tab-list .item').click(function(){
        const $list = $(this).closest('.main-tab-list');
        const $content = $list.next('.main-tab-content');
        const index = $(this).closest('li').index();

        // 같은 탭 리스트 안에서만 토글
        $list.find('.item').removeClass('is-active');
        $(this).addClass('is-active');

        // 짝이 되는 컨텐츠도 토글
        $content.children('li').removeClass('is-active');
        $content.children('li').eq(index).addClass('is-active');
    });

}

const mainReviewSlideHandler = () => {
    var swiper = new Swiper(".main .review-section .swiper", {
        slidesPerView: "auto",
        loop : true,
        spaceBetween: 20,
        autoplay:{
            delay: 5000,
            disableOnInteraction: false,
        }
    });
}

const mainCarpriceSlideHandler = () => {
    //내용 슬라이드
   var swiper = new Swiper(".main .carprice-section .main-tab-content .slide-div .swiper", {
        slidesPerView: "auto",
        spaceBetween: 20,
        loop: true,
        watchOverflow: false,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
   });
}

const mainBestcarSlideHandler = () => {

    //슬라이드
    $('.main .bestcar-section .swiper').each(function () {
        const swiperEl = this;
        const $numberDiv = $(swiperEl).siblings('.slide-number-div');
        const slideCount = $(swiperEl).find('.swiper-slide').length;

        const updateSlideNumber = (swiper) => {
            const realIndex = (swiper.realIndex % slideCount) + 1;
            $numberDiv.find('.real').text(realIndex);
            $numberDiv.find('.total').text(slideCount);
        }

        new Swiper(swiperEl, {
            slidesPerView: 1,
            spaceBetween: 30,
            watchOverflow: false,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            on: {
                init: function () {
                    updateSlideNumber(this);
                },
                slideChange: function () {
                    updateSlideNumber(this);
                },
            },
        });
    });

    //탭 버튼 클릭시 슬라이드 변경
    $('.main .bestcar-section .tab-list .tab-btn').click(function(){
        const index = $(this).closest('li').index();
        $('.main .bestcar-section .tab-list .tab-btn').removeClass('is-active');
        $(this).addClass('is-active');
        $('.main .bestcar-section .tab-content > li').removeClass('is-active');
        $('.main .bestcar-section .tab-content > li').eq(index).addClass('is-active');
    })

}

const mainYoutubeSlideHandler = () => {

    //슬라이드
    var swiper = new Swiper(".main .youtube-section .swiper", {
        slidesPerView: "auto",
        spaceBetween: 30,
        watchOverflow: false,
        loop: true,
        allowTouchMove: true,
        simulateTouch: true,
        grabCursor: true,
        touchStartPreventDefault: false,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        breakpoints: {
            0: {
                spaceBetween: 10,
            },
            650: {
                spaceBetween: 30,
            },
        },
    });

    //슬라이드 클릭시 iframe 변경 
    const getYoutubeId = (url) => {
        if (!url) return '';
        const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
        return m ? m[1] : '';
    }

    $(document).on('click', '.main .youtube-section .slide-div .youtube-btn', function () {
        const $slide = $(this).closest('.swiper-slide');
        const url = $slide.data('src');
        const videoId = getYoutubeId(url);
        if (!videoId) return;

        const $iframe = $('.main .youtube-section .youtube-div iframe');
        $iframe.attr('src', `https://www.youtube.com/embed/${videoId}?rel=0`);
    });
}

const mainLimitationSlideHandler = () => {
    var swiper = new Swiper(".main .limitation-section .swiper", {
        slidesPerView: 1.1,
        spaceBetween: 30,
        watchOverflow: false,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            650: {
                slidesPerView: 1,
            },
        },
    });
}

const mainNewcarSlideHandler = () => {
    var swiper = new Swiper(".main .newcar-section .swiper", {
        slidesPerView: "auto",
        spaceBetween: 10,
        watchOverflow: false,
        loop: true,
        
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });
}

const mainVisualSlideHandler = () => {

    const $swiper = $(".main .visual-section .swiper");
    const $wrapper = $swiper.find(".swiper-wrapper");
    const $slides = $wrapper.find(".swiper-slide");
    const slideCount = $slides.length;
    const $slideNumber = $(".main .visual-section .slide-number");

    if (slideCount === 0) return;

    const updateSlideNumber = (swiper) => {
        const realIndex = (swiper.realIndex % slideCount) + 1;
        $slideNumber.find(".real").text(realIndex);
        $slideNumber.find(".total").text(slideCount);
    }

    // 슬라이드 1개면 강제 복제
    if (slideCount <= 3) {

        for(let i = 0; i < 4; i++) {
            $wrapper.append($slides.eq(0).clone());
        }
    }

    var swiper = new Swiper(".main .visual-section .swiper", {

        centeredSlides: true,
        slidesPerView: 2.2,
        spaceBetween: 30,

        loop: true,
        watchOverflow: false,

        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        on: {
            init: function () {
                updateSlideNumber(this);
            },
            slideChange: function () {
                updateSlideNumber(this);
            },
        },

        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            650: {
                slidesPerView: 1.5,
            },
            950: {
                slidesPerView: 2,
            },
            1250: {
                slidesPerView: 2.2,
            },
        }

    });
}

const asideMenuHandler = () => {
    $('header .menu-btn').click(function(){
        $('.aside-menu').addClass('active');
    })

    $('.aside-menu .menu-wrap .btn-div .close-btn').click(function(){
        $('.aside-menu').removeClass('active');
    })
    $('.aside-menu .close-bg').click(function(){
        $('.aside-menu').removeClass('active');
    })
}

const headerMenuSlideHandler = () => {
    var swiper = new Swiper("header .menu-div .mySwiper", {
        slidesPerView: "auto",
        spaceBetween: 30,
        centeredSlides: false,
        freeMode: true,      // 메뉴 드래그 느낌
        watchOverflow: true, // 넘치지 않으면 비활성
        breakpoints: {
            0: {
                spaceBetween: 16,
            },650: {
                spaceBetween: 30,
            },
        },
    });
}

const popupEventHandler = () => {
    $('.event-popup-section .close-btn').click(function(){
        $('.event-popup-section').hide();
    });
}


const phoneNumberCheck = (input) => {
    // 숫자만 남기기
    let v = input.value.replace(/\D/g, '');

    // 최대 11자리까지만 (01012345678)
    if (v.length > 11) v = v.slice(0, 11);

    // 10자리면 3-3-4, 11자리면 3-4-4
    if (v.length >= 8) {
        const midLen = (v.length === 10) ? 3 : 4;
        input.value = v.replace(new RegExp(`^(\\d{3})(\\d{${midLen}})(\\d{4})$`), '$1-$2-$3');
    } else if (v.length >= 4) {
        input.value = v.replace(/^(\d{3})(\d+)$/, '$1-$2'); // 010-xxxx
    } else {
        input.value = v; // 0~3자리
    }
}

const popupApplyHandler = () => {
    let index = 0; 

    // 이전 버튼 누를 경우 
    $('.apply-popup-section .pn-btn-wrap .pn-btn.prev-btn').click(function(){
        index--;
        $('.apply-popup-section .step-list > li').removeClass('is-active');
        $('.apply-popup-section .step-list > li').eq(index).addClass('is-active');
    })
    // 다음 버튼 누를 경우 
    $('.apply-popup-section .pn-btn-wrap .pn-btn.next-btn').click(function(){
        //다음 버튼 누를때는, 값이 입력되거나 선택되었는지 유효성을 검사함
        if(index === 1){
            if($('input[name="wr_subject"]').val() === ''){
                alert('원하는 차종을 입력해주세요.');
                return;
            }
        }
        if(index === 2){
            if($('input[name="wr_content"]').val() === ''){
                alert('핸드폰 번호를 입력해주세요.');
                return;
            }
        }
        if(index === 3){
            if($('input[name="wr_name"]').val() === ''){
                alert('성함을 입력해주세요.');
                return;
            }else if($('input[id="agree1"]').is(':checked') === false){
                alert('개인정보 수집, 이용, 제공 동의를 체크해주세요.');
                return;
            }else if($('input[id="agree2"]').is(':checked') === false){
                alert('개인정보 제 3자 제공 동의를 체크해주세요.');
                return;
            }else if($('input[id="agree3"]').is(':checked') === false){
                alert('마케팅 활용 및 광고성 정보수신 동의를 체크해주세요.');
                return;
            }
        }

        index++;
        
        $('.apply-popup-section .step-list > li').removeClass('is-active');
        $('.apply-popup-section .step-list > li').eq(index).addClass('is-active');
    })
        
    //step1 에서 누르면 다음 페이지로 이동
    $(document).on('click', 'input[name="wr_1"]', function () {
        index = 1;
        $('.apply-popup-section .step-list > li').removeClass('is-active');
        $('.apply-popup-section .step-list > li').eq(index).addClass('is-active');
    });

    //닫기 버튼 누르면 팝업 닫게
    $('.apply-popup-section .close-popup').click(function(){
        $('.apply-popup-section').hide();
    });

}
