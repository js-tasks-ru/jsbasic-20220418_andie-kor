import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.render();    
  }

  render(){
    let carousel = createElement(`
      <div class="carousel">
      <!--Кнопки переключения-->
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>

      <div class="carousel__inner"></div>
    `);

    carousel.querySelector('.carousel__arrow_left').style.display = 'none';

    this.slides.map((slide) => {
      let carouselSlide = createElement(`
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `);
   
      this.carouselInner = carousel.querySelector('.carousel__inner');
      this.carouselInner.append(carouselSlide);
    });

    carousel.addEventListener('click', (event) => {
      this.eventListener(event);
    });

    this.carousel = carousel;
  }

  eventListener(event){
    if (event.target.closest('.carousel__arrow')) this.changeSlide(event);
    else if (event.target.closest('.carousel__button')) this.addProduct(event);
    else return;
  }

  changeSlide(event) {
    const carouselArrow = event.target.closest('.carousel__arrow');
    if (!this.elem.contains(carouselArrow)) return;

    if (!this.carouselCurrentPosition) this.carouselCurrentPosition = 0;
    if (!this.currentVisibleSlide) this.currentVisibleSlide = 0;

    this.carouselSlides = document.querySelectorAll('.carousel__slide');  
    let currentSlideWidth = this.carouselSlides[this.currentVisibleSlide].offsetWidth;

    if (carouselArrow.classList.contains ('carousel__arrow_right')) {
      this.carouselCurrentPosition -= currentSlideWidth;
      this.currentVisibleSlide += 1;
    }

    if (carouselArrow.classList.contains ('carousel__arrow_left')) {
      this.carouselCurrentPosition += currentSlideWidth;
      this.currentVisibleSlide -= 1;
    }
    
    this.elem.querySelector('.carousel__inner').style.transform = `translateX(${this.carouselCurrentPosition}px)`;
    this.checkDisplayButtons();
  }

  checkDisplayButtons(){
    if (this.currentVisibleSlide >= this.carouselSlides.length-1) {
      this.elem.querySelector('.carousel__arrow_right').style.display = 'none';
    }
    else if (this.currentVisibleSlide == 0) {
      this.elem.querySelector('.carousel__arrow_left').style.display = 'none';
    }
    else { 
      this.elem.querySelector('.carousel__arrow_left').style.display = '';
      this.elem.querySelector('.carousel__arrow_right').style.display = '';
    }
  }

  addProduct(event){
    let productEvent = new CustomEvent ('product-add', {
      detail: event.target.closest('.carousel__slide').dataset.id,
      bubbles: true,
    });
    
    this.elem.dispatchEvent(productEvent);
  }

  get elem(){
    return this.carousel;
  }
}