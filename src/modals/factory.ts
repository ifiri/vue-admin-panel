import { getType } from 'mobx-state-tree';

/**
 * This factory produces a properly formatted snapshots
 * of non-created model of specifil modal. When these snapshots
 * will be pushed into state tree or casted, they will turn into
 * fullqualified tree nodes.
 *
 * In other words, this factory produces `frozen` models of specific modal,
 * which can be unfrozen via integration with state tree.
 *
 * @type object
 */
const factory = node => {
  // First, create object with data
  const snapshot = (
    node => {
      const type = getType(node);

      switch (type.name) {
        case 'Product':
          return {
            id: 'product.modal.' + Date.now(),
            type: 'product',
            reference: node,
          };
      }

      throw new Error('Unsupported node type');
    }
  )(node);

  // Then, we should freeze it and prevent any changes
  Object.freeze(snapshot);

  return snapshot;
};

export default factory;
