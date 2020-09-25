import { values } from 'mobx';

const views = self => ({
  getOrders() {
    return values(self.orders);
  },
});

export default views;
