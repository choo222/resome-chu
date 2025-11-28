// tabmenu______________________________________________________________
$(document).ready(function(){

  $(".btn li").click(function(){
    $(this).addClass("active").siblings().removeClass("active");

    let result = $(this).attr("data-alt");
    $(".tab-contents div").removeClass("active");
    $("#"+result).addClass("active").hide().fadeIn();
  });

});


// swiper_____________________________________________________________
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 6,
  spaceBetween: 1,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});


// select box________________________________________________________
$(window).on('load', function() {
    selectCus();
})

function selectCus() {
  $('.select_cus').each(function() {
    const $select = $(this);
    const $selectTrigger = $select.find('.trigger');
    const $options = $select.find('.option');
    const $hiddenInput = $select.find('.opt_val');

    $selectTrigger.click(function() {
      $options.toggle();
      $select.toggleClass('active');
      $('.select_cus').not($select).find('.option').hide();
      $('.select_cus').not($select).removeClass('active');
    });

    $options.find('li').click(function() {
      const value = $(this).data('value');
      const text = $(this).text();
      $select.find('.trigger_txt').text(text);
      $options.hide();
      $select.removeClass('active');
      if (value != '') {
        $select.addClass('select')
      } else {
        $select.removeClass('select')
      }
      $hiddenInput.val(value);
    });
  });

  $(document).click(function(e) {
    if (!$(e.target).closest('.select_cus').length) {
      $('.select_cus .option').hide();
      $('.select_cus').removeClass('active');
    }
  });
}

// spa방식에 안전한 코드
// // 열기/닫기
// $(document).on('click', '.select_cus .trigger', function(e) {
//   const $select = $(this).closest('.select_cus');
//   const $options = $select.find('.option');

//   // 다른 select 닫기
//   $('.select_cus').not($select).removeClass('active').find('.option').hide();

//   // 현재 토글
//   $select.toggleClass('active');
//   $options.toggle();

//   e.stopPropagation();
// });

// // 옵션 선택
// $(document).on('click', '.select_cus .option li', function(e) {
//   const $li = $(this);
//   const $select = $li.closest('.select_cus');
//   const value = $li.data('value');
//   const text = $li.text();

//   $select.find('.trigger_txt').text(text);
//   $select.find('.opt_val').val(value);

//   if (value) {
//     $select.addClass('select');
//   } else {
//     $select.removeClass('select');
//   }

//   $select.removeClass('active').find('.option').hide();
//   e.stopPropagation();
// });

// // 바깥 클릭시 닫기
// $(document).on('click', function() {
//   $('.select_cus').removeClass('active').find('.option').hide();
// });


//숫자증감__________________________________________________________________
const qtys = document.querySelectorAll('.qty');
qtys.forEach((qtys)=>{
  const minusBtn =qtys.querySelector('.minus');
  const plusBtn =qtys.querySelector('.plus');
  const input =qtys.querySelector('.qty input');

  minusBtn.addEventListener('click', ()=>{
    if(input.value >0){
      input.value = parseInt(input.value)-1;
    };
    if(input.value==0){
      minusBtn.style.cssText = 'opacity:0.5; background-color:#ddd;';
    }else{
      minusBtn.style.cssText = 'opacity:1; background-color:#fff;';
    }
  });

  plusBtn.addEventListener('click', ()=>{
    input.value = parseInt(input.value)+1;
    if(input.value!==0){
      minusBtn.style.cssText = 'opacity:1; background-color:#fff;';
    }
  });

});



// 결제 버튼 활성화 함수 ------------------------------------------------
function checkReserveConditions() {
  const nameInput = $('.reserve-s1 input[type="text"]').val().trim();

  // reserve-s2 성인/아동 값
  const adult = parseInt($('.reserve-s2 .qty-wrap:eq(0) input').val());
  const kid = parseInt($('.reserve-s2 .qty-wrap:eq(1) input').val());

  // reserve-s4 필수 옵션 (첫 번째 select_cus)
  const requiredOption = $('.reserve-s4 .select_cus .opt_val').first().val();

  // 버튼 요소
  const $button = $('.button2');

  // 조건 체크
  const cond1 = nameInput.length > 0;
  const cond2 = !(adult === 0 && kid === 0);  // 둘 다 0이면 false
  const cond3 = requiredOption !== "";         // 옵션 선택됨

  if (cond1 && cond2 && cond3) {
    $button.prop('disabled', false).addClass('active');
  } else {
    $button.prop('disabled', true).removeClass('active');
  }
}

// -------------------------------------------------------------------------
// 각 요소 변화 감지 + 버튼 상태 업데이트
// -------------------------------------------------------------------------
$(document).ready(function () {
  // reserve-s1 이름 입력 감지
  $('.reserve-s1 input[type="text"]').on('input', checkReserveConditions);

  // reserve-s2 숫자 변경 감지 (plus/minus 버튼 클릭 포함)
  $('.reserve-s2 .qty input').on('input', checkReserveConditions);
  $('.reserve-s2 .qty .plus, .reserve-s2 .qty .minus').on('click', function () {
    setTimeout(checkReserveConditions, 10); // 값 업데이트 후 체크
  });

  // reserve-s4 커스텀 셀렉트 변경 감지
  $(document).on('click', '.select_cus .option li', function () {
    setTimeout(checkReserveConditions, 10);
  });

  // 초기 실행
  checkReserveConditions();
});
