import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this.ribbonItemRender();
    this.ribbonItemsRender();
  }

  ribbonItemRender(){
    let ribbon = createElement(`
    <div class="ribbon">
      <!--Кнопка прокрутки влево-->
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>

      <!--Ссылки на категории-->
      <nav class="ribbon__inner"></nav>

      <!--Кнопка прокрутки вправо-->
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
    `);

    ribbon.addEventListener('click', (event) => {
      this.ribbonArrowClick(event);
      this.ribbonItemClick(event);
      this.ribbonSelect(event);
    });

    this.ribbon = ribbon;
    this.ribbonInner = this.ribbon.querySelector('.ribbon__inner');
  }

  ribbonItemsRender() {
    this.categories.map((item) => {
      this.ribbonInner.append(createElement(`<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`));
    })
  }

  ribbonArrowClick(event){
    if (!event.target.closest('.ribbon__arrow')) return;
    
    if (event.target.closest('.ribbon__arrow_left')) {
      this.ribbonInner.scrollBy(-350, 0);
    } 

    if (event.target.closest('.ribbon__arrow_right')) {
      this.ribbonInner.scrollBy(+350, 0);
    } 

    this.ribbonInner.addEventListener('scroll', (event) => {
      this.arrowHide(event);
    })    
  }

  ribbonItemClick(event) {
    if (!event.target.closest('.ribbon__item')) return;

    event.preventDefault();

    for (let ribbonItem of this.ribbonInner.children){
      ribbonItem.classList.remove('ribbon__item_active');
    }

    event.target.classList.add('ribbon__item_active');
  }
  
  arrowHide(event){
    let arrowLeft = this.ribbon.querySelector('.ribbon__arrow_left');
    let arrowRight = this.ribbon.querySelector('.ribbon__arrow_right');
    
    let scrollWidth = this.ribbonInner.scrollWidth;
    let scrollLeft = this.ribbonInner.scrollLeft;
    let clientWidth = this.ribbonInner.clientWidth;    
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollLeft == 0) arrowLeft.classList.remove('ribbon__arrow_visible');
    else if (!arrowLeft.classList.contains('ribbon__arrow_visible')) arrowLeft.classList.add('ribbon__arrow_visible');

    if (scrollRight < 1) arrowRight.classList.remove('ribbon__arrow_visible');
    else if (!arrowRight.classList.contains('ribbon__arrow_visible')) arrowRight.classList.add('ribbon__arrow_visible');
  }

  ribbonSelect(event){
    if (!event.target.classList.contains('ribbon__item')) return;

    let ribbonEvent = new CustomEvent('ribbon-select', {
      detail: event.target.dataset.id,
      bubbles: true,
    });

    this.ribbon.dispatchEvent(ribbonEvent);
  }

  get elem() {
    return this.ribbon;
  }
}
