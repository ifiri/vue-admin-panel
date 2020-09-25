import { values } from 'mobx';

const views = self => ({
  getProducts() {
    return values(self.products);
  },

  isProductsLoaded() {
    return !!self.products.length;
  },
});

export default views;
