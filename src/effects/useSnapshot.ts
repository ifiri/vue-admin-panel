import { getSnapshot } from 'mobx-state-tree';
import store from '@/store';

// Create hook which allows get snapshots from the store
const useSnapshot = (() => {
  const _store = store;

  return () => getSnapshot(_store);
})();

export default useSnapshot;
