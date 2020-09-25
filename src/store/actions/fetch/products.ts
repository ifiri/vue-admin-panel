import { flow } from 'mobx-state-tree';

import {
  fetch as fetchProductsViaApi,
  // update as updateProductViaApi,
} from '@/api/products';

export default (self, query) => flow(function* () {
  try {
    const products = yield fetchProductsViaApi(query);

    if (products) {
      (products as any).forEach((product, id) => {
        self.products.set(id, product);
      });
    }
  } catch (error) {
    console.error('Failed to fetch products', error);
  }

  return self.products.length;
})();
