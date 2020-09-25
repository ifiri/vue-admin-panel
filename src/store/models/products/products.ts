import { types } from 'mobx-state-tree';

import Product from './product';
import actions from './actions';
import views from './views';

const Products = types.model('Products', {
  products: types.map(Product),
}).views(views).actions(actions);

export default Products;
