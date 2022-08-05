import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    let cartElement = document.querySelector('.cart-icon');
    
    if (!cartElement.offsetHeight) return;
    
    if (document.documentElement.clientWidth <= 767) resetStyles();  
    else if (window.pageYOffset > 50) {
      const containerRight =  document.querySelector('.container').getBoundingClientRect().right + 20;
      const sideRight = document.documentElement.clientWidth - cartElement.getBoundingClientRect().width - 10;
      const minRight = Math.round(Math.min(containerRight, sideRight));

      cartElement.style.position = 'fixed';
      cartElement.style.top = 50 + 'px';
      cartElement.style.left = minRight + 'px';
      cartElement.style.zIndex = 100;
    } 
    else resetStyles();  

    function resetStyles() {
      cartElement.style.position = '';
      cartElement.style.top = '';
      cartElement.style.left ='';
      cartElement.style.zIndex = '';
    }
  }
}