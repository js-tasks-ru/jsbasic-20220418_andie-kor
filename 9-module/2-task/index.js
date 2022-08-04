import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

//import pr from '../../8-module/2-task/products.js';

export default class Main {

  constructor() {
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({steps: 5, value: 3});
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);
  }

  async render() {
    document.querySelector('[data-carousel-holder]').append(this.carousel.elem);
    document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
    document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
    document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);

    return fetch('./products.json')
      .then (responce => responce.json())
      .then (products => {
        this.products = products;
    
        this.productsGrid = new ProductsGrid(this.products);

        document.querySelector('[data-products-grid-holder]').innerHTML = '';
        document.querySelector('[data-products-grid-holder]').append(this.productsGrid.elem);
      
        this.productsGrid.updateFilter({
          noNuts: document.querySelector('#nuts-checkbox').checked,
          vegeterianOnly: document.querySelector('#vegeterian-checkbox').checked,
          maxSpiciness: this.stepSlider.value,
          category: this.ribbonMenu.value
        });

        console.log(this.ribbonMenu.value);

        document.body.addEventListener('product-add', (event) => {
          const targetProduct = this.products.find(prod => prod.id === event.detail);
          this.cart.addProduct(targetProduct);
        })

        document.body.addEventListener('slider-change', (event) => {
          this.productsGrid.updateFilter({
            maxSpiciness: event.detail
          })
        })

        document.body.addEventListener('ribbon-select', (event) => {        
          this.productsGrid.updateFilter({
            category: event.detail
          })
        })

        document.body.addEventListener('change', (event) => {        
          console.log(event.target);  
          if (event.target.closest('#nuts-checkbox')) {
            this.productsGrid.updateFilter({
              noNuts: event.target.checked
            });
          }
          else if (event.target.closest('#vegeterian-checkbox')) {
            this.productsGrid.updateFilter({
              vegeterianOnly: event.target.checked
            });
          }
        })
      })
  }
}
