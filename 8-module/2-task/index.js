import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    
  

    this.productGrid = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
        
        </div>
      </div>`
  )

  setTimeout(() => this.productsCardsRender(), 0);

  }

  productsCardsRender() {
    document.querySelector('.products-grid__inner').innerHTML = '';
    
    for (let item of this.products){
      let newItemElement = new ProductCard(item);
      console.log(newItemElement);
      document.querySelector('.products-grid__inner').append(newItemElement.elem);
    }
  }

  updateFilter(filters) {

  }

  get elem(){
    return this.productGrid;
  }
}
