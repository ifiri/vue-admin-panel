import { flow } from 'mobx-state-tree';

import {
  update as updateProductCategoryViaApi,
} from '@/api/products/categories';

export default (self, category, values) => flow(function* () {
  self.isFetching = true;

  try {
    const result = yield updateProductCategoryViaApi(category, values);

    result && self.categories.set(category.id, values);

    self.isFetching = false;
  } catch (error) {
    console.error('Failed to update category', error);

    self.isFetching = false;
  }

  return category;
})();
