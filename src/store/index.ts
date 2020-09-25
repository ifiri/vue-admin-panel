import { types, Instance } from 'mobx-state-tree';

import Root from './models';
import config from '@/config';

// We need to be sure that all components which will be forced
// to get store from this file itself will using the same store
// as everywhere in the application
const createStore = (() => {
  const store = Root.create();

  return () => store;
})();

const store = createStore();

// We should import Interface for store to extend Vue.prototype
export type IStore = Instance<typeof Root>;
export default store;
