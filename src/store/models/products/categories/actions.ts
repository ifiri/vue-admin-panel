import { factory as produceUpdatingPromiseBy } from '@/store/actions/update';

const actions = self => {
  return {
    updateProductCategory(category: object, values?: object) {
      if (!values) {
        throw new Error('Impossible to update entity without data');
      }

      return produceUpdatingPromiseBy('product.category', self, category, values);
    },
  };
};

export default actions;
