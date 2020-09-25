import { types } from 'mobx-state-tree';

import ProductCategory from './productCategory';
import actions from './actions';
import views from './views';

const ProductsCategories = types.model('ProductsCategories', {
  categories: types.map(ProductCategory),
}).views(views).actions(actions);

export default ProductsCategories;
