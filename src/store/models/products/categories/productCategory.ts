import { types } from 'mobx-state-tree';

const ProductCategory = types.model('ProductCategory', {
  id: types.identifier,
  title: types.string,
  alias: types.string,
  description: types.maybeNull(types.string),

  parent: types.maybeNull(
    types.reference(
      types.late(() => ProductCategory)
    )
  ),

  descendants: types.array(
    types.reference(
      types.late(() => ProductCategory)
    )
  ),
});

export default ProductCategory;
