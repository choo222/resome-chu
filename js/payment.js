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

// tab
$(document).ready(function(){

  $(".tab-title").click(function(e){
    let group = $(this).closest(".tab-group");
    let target = $(this).next(".tab-contents");

    group.children(".tab-contents").not(target).slideUp();
    group.children(".tab-title").not(this).removeClass("active");

    $(this).toggleClass("active");
    target.stop().slideToggle();

    e.stopPropagation();
  });
});

// payment
$(document).ready(function () {

  if (!$("#mr4").is(":checked")) {
    $(".simple").hide();
  }

  $("input[name='methodradio']").on("change", function () {
    if ($("#mr4").is(":checked")) {
      $(".simple").slideDown(300);
    } else {
      $(".simple").slideUp(300);
    }
  });

});


// 버튼 활성화
$(document).ready(function () {
  const $btn = $('.button2');
  const $check2 = $('#check2');

  function checkAgreement() {
    if ($check2.is(':checked')) {
      $btn.prop('disabled', false).addClass('active');
    } else {
      $btn.prop('disabled', true).removeClass('active');
    }
  }

  // 체크 변경 시 바로 실행
  $check2.on('change', checkAgreement);

  // 초기 비활성화
  checkAgreement();
});
