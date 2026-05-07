

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
})

const mainReviewSlideHandler = () => {
    var swiper = new Swiper(".main .review-section .swiper", {
        slidesPerView: "auto",
        spaceBetween: 30,
    });
}

const mainCarpriceSlideHandler = () => {
   var swiper = new Swiper(".main .carprice-section .swiper", {
        slidesPerView: "auto",
        spaceBetween: 10,
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


const phoneNumberCheck = (phoneNumber) => {
    $(document).on('input', 'input[name="wr_content"]', function () {
        // 숫자만 남기기
        let v = this.value.replace(/\D/g, '');
      
        // 최대 11자리까지만 (01012345678)
        if (v.length > 11) v = v.slice(0, 11);
      
        // 02(서울) 같은 특이 케이스는 빼고, 요청하신 010/01x 기준으로 10~11자리만 처리
        // 11자리: 010-1234-5678
        if (v.length >= 8) {
          // 10자리면 3-3-4, 11자리면 3-4-4
          const midLen = (v.length === 10) ? 3 : 4;
          this.value = v.replace(new RegExp(`^(\\d{3})(\\d{${midLen}})(\\d{4})$`), '$1-$2-$3');
        } else if (v.length >= 4) {
          this.value = v.replace(/^(\d{3})(\d+)$/, '$1-$2'); // 010-xxxx
        } else {
          this.value = v; // 0~3자리
        }
    });
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
