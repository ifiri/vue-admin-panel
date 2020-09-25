import { flow } from 'mobx-state-tree';

import {
  update as updateProductViaApi,
} from '@/api/products';

export default (self, product, values) => flow(function* () {
  self.isFetching = true;

  try {
    const result = yield updateProductViaApi(product, values);

    result && self.products.set(product.id, values);

    self.isFetching = false;
  } catch (error) {
    // @todo ошибки на стороне клиента
    console.error('Failed to update product', error);

    self.isFetching = false;
  }

  return product;
})();
