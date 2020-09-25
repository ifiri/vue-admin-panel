import { flow } from 'mobx-state-tree';

import {
  fetch as fetchProductsCategoriesViaApi,
} from '@/api/products/categories';

export default (self, query) => flow(function* () {
  try {
    const categories = yield fetchProductsCategoriesViaApi(query);

    if (categories) {
      (categories as any).forEach((category, id) => {
        self.categories.set(id, category);
      });
    }
  } catch (error) {
    console.error('Failed to fetch categories', error);
  }

  return self.categories.length;
})();
