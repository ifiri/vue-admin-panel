import { types } from 'mobx-state-tree';
import User from '@/store/models/users/user';

const Order = types.model('Order', {
  id: types.identifierNumber,
  client: types.reference(User),
  status: types.string,
  order_date: types.string,
  shipment_date: types.optional(types.string, ''),
});

export default Order;
