import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {
      noNuts: false,
      vegeterianOnly: false,
      maxSpiciness: 4, 
      category: '',
    };

    this.productGrid = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>`
    );

    this.productsCardsRender();
  }

  productsCardsRender() {

    let targetElement = this.productGrid.querySelector('.products-grid__inner');
    targetElement.innerHTML = '';

    for (let item of this.products) {

      if ((this.filters.noNuts == true) && (item.nuts == true)) continue;
      if ((this.filters.vegeterianOnly == true) && (item.vegeterian != true)) continue;
      if (this.filters.maxSpiciness < item.spiciness) continue;
      if ((this.filters.category != false) && (this.filters.category != item.category)) continue;    
      
      let newItemElement = new ProductCard(item);
      targetElement.append(newItemElement.elem);

    }
  }

  updateFilter(filters) {

    if(filters.hasOwnProperty('noNuts')) {
      this.filters.noNuts = filters.noNuts;
    }
    if(filters.hasOwnProperty('vegeterianOnly')) {
      this.filters.vegeterianOnly = filters.vegeterianOnly;
    }
    if(filters.hasOwnProperty('maxSpiciness')) {
      this.filters.maxSpiciness = filters.maxSpiciness;
    }
    if(filters.hasOwnProperty('category') && filters.category != undefined) {
      this.filters.category = filters.category;
    }

    this.productsCardsRender();
  }


  get elem(){
    return this.productGrid;
  }
}
