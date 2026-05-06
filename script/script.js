

document.addEventListener("DOMContentLoaded", function(e){
    popupApplyHandler();
    popupEventHandler();
    headerMenuSlideHandler();
})

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
            if($('input[id="agree1"]').is(':checked') === false){
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
    $(document).on('click', 'input[name="wr_name"]', function () {
        index = 1;
        $('.apply-popup-section .step-list > li').removeClass('is-active');
        $('.apply-popup-section .step-list > li').eq(index).addClass('is-active');
    });

    //닫기 버튼 누르면 팝업 닫게
    $('.apply-popup-section .close-popup').click(function(){
        $('.apply-popup-section').hide();
    });

}
