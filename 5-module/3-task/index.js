function initCarousel() {
  let carouselCurrentPosition = 0;
  let currentSlideWidth = 0;
  let currentVisibleSlide = 0; 

  const carousel = document.querySelector('.carousel');
  const carouselInner = document.querySelector('.carousel__inner');
  const carouselSlides = document.querySelectorAll('.carousel__slide');
  const carouselArrowRight = document.querySelector('.carousel__arrow_right');
  const carouselArrowLeft = document.querySelector('.carousel__arrow_left');
    
  checkDisplayCarousel();

  carousel.addEventListener('click', function(event){

    const carouselArrow = event.target.closest('.carousel__arrow');
    if (!carouselArrow) return;
    if (!carousel.contains(carouselArrow)) return;

    currentSlideWidth = carouselSlides[currentVisibleSlide].offsetWidth;

    if (carouselArrow.classList.contains ('carousel__arrow_right')) {
      carouselCurrentPosition -= currentSlideWidth;
      currentVisibleSlide += 1;
    }

    if (carouselArrow.classList.contains ('carousel__arrow_left')) {
      carouselCurrentPosition += currentSlideWidth;
      currentVisibleSlide -= 1;
    }

    carouselInner.style.transform = `translateX(${carouselCurrentPosition}px)`;

    checkDisplayCarousel();

  });

  function checkDisplayCarousel(){
    if (currentVisibleSlide >= carouselSlides.length-1) {
      carouselArrowRight.style.display = 'none';
    }
    else if (currentVisibleSlide == 0) {
      carouselArrowLeft.style.display = 'none';
    }
    else { 
      carouselArrowLeft.style.display = '';
      carouselArrowRight.style.display = '';
    }
  }

}