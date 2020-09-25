import { factory as produceUpdatingPromiseBy } from '@/store/actions/update';

const actions = self => ({
  updateProduct(product: object, values?: object) {
    if (!values) {
      throw new Error('Impossible to update entity without data');
    }

    return produceUpdatingPromiseBy('product', self, null, values);
  },
});

export default actions;
