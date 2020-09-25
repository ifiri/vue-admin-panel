import { types } from 'mobx-state-tree';

import ProductCategory from './categories/productCategory';

const Product = types.model('Product', {
  // @todo identifier must be a integer
  id: types.identifier,
  name: types.string,
  activity: types.number,
  year: types.number,
  color: types.model({
    name: types.string,
    hex: types.string
  }),
  price: types.number,

  category: types.safeReference(ProductCategory),
});

export default Product;
