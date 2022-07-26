export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product || product === null) return;

    let cartItem = this.cartItems.find((item) => item.product.name == product.name);
    
    if (cartItem) cartItem.count += 1;
    else {
      const newProd = {
        product: product,
        count: 1
      };
      this.cartItems.push(newProd);
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let indexProduct;

    let cartItem = this.cartItems.find( function(item, index) {
      indexProduct = index;
      return (item.product.id == productId);
    });

    cartItem.count += amount;
    if (cartItem.count == 0) this.cartItems.splice(indexProduct, 1);

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    if (this.cartItems.length) return false;
    else return true;
  }

  getTotalCount() {
    let count = 0;

    for (let prod of this.cartItems) {
      if (prod.count) count += prod.count;
    }

    return count;
  }

  getTotalPrice() {
    let totalPrice = 0;

    for (let prod of this.cartItems) {
      let productTotalPrice = prod.count * prod.product.price;
      if (productTotalPrice) totalPrice += productTotalPrice;
    }

    return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

