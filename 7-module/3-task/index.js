import createElement from '../../assets/lib/create-element.js'

export default class StepSlider {
  constructor({ steps, value = 0 }) {

    this.steps = steps;
    this.value = value;
    this.position = 0;

    this.render(); 
  }

  render(){
    let slider = createElement(`
      <div class="slider">

        <!--Ползунок слайдера с активным значением-->
        <div class="slider__thumb" style="left: ${this.position}%;">
          <span class="slider__value"></span>
        </div>

        <!--Заполненная часть слайдера-->
        <div class="slider__progress" style="width: ${this.position}%;"></div>

        <!--Шаги слайдера-->
        
      </div>
    `);

    this.slider = slider;    

    this.stepsRender();
    this.setNewSlideValue();

    this.slider.addEventListener('click', (event) => {
      this.sliderListener(event);
    })
  }

  stepsRender() {
    let sliderSteps = document.createElement('div');
    sliderSteps.className = 'slider__steps';

    for (let i = 0; i < this.steps; i++){
      let span = document.createElement('span');
      span.dataset.id = i;
      sliderSteps.append(span);
    }

    this.slider.append(sliderSteps);
  }

  sliderListener(event) {
    if (event.target.tagName === 'SPAN') {
      this.value = event.target.dataset.id;

      this.position = event.target.dataset.id * (100 / (this.steps-1));
    }
    else {
      let left = event.clientX - this.slider.getBoundingClientRect().left;
      let pos = (left / this.slider.offsetWidth) * (this.steps -1) ;
      this.value = Math.round(pos);
      this.position = this.value / (this.steps - 1) * 100;
    }

    this.setNewSlideValue();

    let sliderChangeEvent =  new CustomEvent('slider-change', { 
      detail: this.value, 
      bubbles: true 
    });

    this.slider.dispatchEvent(sliderChangeEvent);
  }

  setNewSlideValue() {

    if (!document.querySelector('.slider__value')) { // first render
      this.slider.querySelector('.slider__value').innerHTML = this.value;
      this.slider.querySelector(`.slider__steps [data-id~= "${this.value}"]`).classList.add('slider__step-active');
    }

    else {
      document.querySelector('.slider__value').innerHTML = this.value;
      document.querySelector('.slider__thumb').style.left = this.position + '%';
      document.querySelector('.slider__progress').style.width = this.position + '%';

      for(let item of document.querySelector('.slider__steps').childNodes){
        item.classList = '';
      }
      document.querySelector(`.slider__steps [data-id~= "${this.value}"]`).classList.add('slider__step-active');
    }
  }

  get elem() {
    return this.slider;
  }
}
