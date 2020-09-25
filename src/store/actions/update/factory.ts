// @ts-nocheck

import updateProduct from './product';
import updateProductCategory from './productCategory';
import updateUser from './user';

const factory = (entity, self, category, values) => {
  switch (entity) {
    case 'product':
      // @ts-ignore
      return updateProduct(self, values);

    case 'product.category':
      return updateProductCategory(self, category, values);

    case 'user':
      return updateUser(self, category, values);
  }

  throw new Error('Provided entity haven\'t any updater');
};

export default factory;
