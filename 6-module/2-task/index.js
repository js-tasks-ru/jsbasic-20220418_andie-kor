import createElement from '../../assets/lib/create-element.js'

export default class ProductCard {
  constructor(product) {

    let card = createElement(`
    <div id="holder" class="container_half">
      <div class="card">
        <div class="card__top">
          <img src="/assets/images/products/${product.image}" class="card__image" alt="product">
          <span class="card__price">€${product.price.toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">Laab kai chicken salad</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    /div>
    `);

    this.card = card;
    this.productId = product.id;

    let cardButton = this.card.querySelector('.card__button');
    cardButton.addEventListener('click', (event) => {
      this.onClick(event);
    });
  }  

  onClick(event) {
    let productEvent = new CustomEvent('product-add', {
      detail: this.productId,
      bubbles: true,
    });

    this.card.dispatchEvent(productEvent);
    this.card.addEventListener('product-add', {});
  }

  get elem() {
    return this.card;
  }
}


