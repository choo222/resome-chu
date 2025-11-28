// Initialize Swiper
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 2,
  spaceBetween: 1,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});


//Heart Click
const wishBtn = document.querySelectorAll('.card-inner .add-to-wish');
wishBtn.forEach(item => {
  item.addEventListener('click', ()=>{
    item.classList.toggle('active');
  });
});