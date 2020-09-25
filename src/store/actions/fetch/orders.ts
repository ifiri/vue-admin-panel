import { flow } from 'mobx-state-tree';
import { fetch } from '@/api/orders';

export default (self, query) => flow(function* () {
  try {
    const response = yield fetch(query);

    if (response) {
      (response as any).forEach((entity, id) => {
        self.orders.set(id, entity);
      });
    }
  } catch (error) {
    console.error('Failed to fetch orders', error);
  }

  return self.orders.length;
})();
