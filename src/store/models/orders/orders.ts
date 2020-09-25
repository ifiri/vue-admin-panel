import { types } from 'mobx-state-tree';

import Order from './order';
import views from './views';

const Orders = types.model('Orders', {
  orders: types.map(Order),
}).views(views);

export default Orders;
