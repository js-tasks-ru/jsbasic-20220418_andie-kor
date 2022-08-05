import createElement from '../../assets/lib/create-element.js'

export default class StepSlider {
  constructor({ steps, value = 0 }) {

    this.steps = steps;
    this.value = value;
    this.percentPosition = this.value / (this.steps - 1) * 100;

    this.render(); 
  }

  render(){
    let slider = createElement(`
      <div class="slider">

        <!--Ползунок слайдера с активным значением-->
        <div class="slider__thumb" style="left: ${this.percentPosition}%;">
          <span class="slider__value"></span>
        </div>

        <!--Заполненная часть слайдера-->
        <div class="slider__progress" style="width: ${this.percentPosition}%;"></div>

        <!--Шаги слайдера-->
        
      </div>
    `);

    this.slider = slider;    

    this.stepsRender();
    this.setNewSliderValue();

    this.slider.addEventListener('click', (event) => {
      this.clickListener(event); 
    })

    this.slider.querySelector('.slider__thumb').addEventListener('pointerdown', () => {
      this.cursorListener();
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

  clickListener(event) {
    if (event.target.closest('.slider__steps') && event.target.tagName === 'SPAN') {
      this.value = event.target.dataset.id;
    }
    else {
      let left = event.clientX - this.slider.getBoundingClientRect().left;
      let pos = (left / this.slider.offsetWidth) * (this.steps -1) ;
      this.value = Math.round(pos);
    }

    this.percentPosition = this.value / (this.steps - 1) * 100;

    this.setNewSliderValue();
    this.createCustomEvent();
  }

  cursorListener() {

    document.querySelector('.slider__thumb').ondragstart = () => false;

    function pointerMove(event) {
      document.querySelector('.slider').classList.add('slider_dragging');   

      let currnetPosition = event.clientX - this.slider.getBoundingClientRect().left;
      this.percentPosition = currnetPosition / (this.slider.offsetWidth/100);
      
      if (this.percentPosition < 0) this.percentPosition = 0;
      if (this.percentPosition > 100) this.percentPosition = 100; 

      this.value = Math.round((this.percentPosition / 100) * (this.steps-1));
      
      this.setNewSliderValue();
    }

    this.onMoveListener = pointerMove.bind(this);
      
    document.addEventListener('pointermove', this.onMoveListener);
    
    document.addEventListener('pointerup', (event) => {
      document.removeEventListener('pointermove', this.onMoveListener);
      
      if (document.querySelector('.slider').classList.contains('slider_dragging')){
        document.querySelector('.slider').classList.remove('slider_dragging');
      }
      
      let left = event.clientX - this.slider.getBoundingClientRect().left;
      let pos = (left / this.slider.offsetWidth) * (this.steps -1) ;
      this.value = Math.round(pos); 
      if (this.value > this.steps - 1) this.value = this.steps - 1;
      if (this.value < 0) this.value = 0;
      this.percentPosition = this.value / (this.steps - 1) * 100;
      
      this.setNewSliderValue();
      this.createCustomEvent();

    }, {once: true})
  }

  createCustomEvent() {
    let sliderChangeEvent = new CustomEvent('slider-change', { 
      detail: this.value, 
      bubbles: true 
    });
    this.slider.dispatchEvent(sliderChangeEvent);
  }

  setNewSliderValue() {

    if (!document.querySelector('.slider__value')) { // first render
      this.slider.querySelector('.slider__value').innerHTML = this.value;
      this.slider.querySelector(`.slider__steps [data-id~= "${this.value}"]`).classList.add('slider__step-active');
    }
    else {
      document.querySelector('.slider__value').innerHTML = this.value;
      document.querySelector('.slider__thumb').style.left = this.percentPosition + '%';
      document.querySelector('.slider__progress').style.width = this.percentPosition + '%';

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
