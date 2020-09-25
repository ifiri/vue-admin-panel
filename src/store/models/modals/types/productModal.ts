import { types } from 'mobx-state-tree';

import Product from '@/store/models/products/product';

const ProductModal = types.model({
  id: types.identifier,
  type: 'product',

  reference: types.reference(Product),
});

export default ProductModal;
