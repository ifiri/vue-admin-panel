import fetchProducts from './products';
import fetchProductsCategories from './productsCategories';
import fetchUsers from './users';
import fetchUsersEmails from './usersEmails';
import fetchOrders from './orders';

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
const factory = (entity, self, query) => {
  switch (entity) {
    case 'products':
      return fetchProducts(self, query);

    case 'products.categories':
      return fetchProductsCategories(self, query);

    case 'users':
      return fetchUsers(self, query);

    case 'users.emails':
      return fetchUsersEmails(self, query);

    case 'orders':
      return fetchOrders(self, query);
  }

  throw new Error('Provided entity haven\'t any fetcher');
};

export default factory;
