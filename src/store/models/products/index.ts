import { types } from 'mobx-state-tree';

import Products from './products';
import ProductCategories from './categories/productsCategories';

const ProductsComposed = types.compose('ProductsComposed', Products, ProductCategories);

export default ProductsComposed;
