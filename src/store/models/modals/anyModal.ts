import { types } from 'mobx-state-tree';

import * as modals from './types';

const AnyModal = types.union({
  dispatcher(snapshot): any {
    if (snapshot) {
      switch (snapshot.type) {
        case 'product':
          return modals.ProductModal;
      }

      throw new Error('Node is not supported');
    }

    // Instead of exception, just allow `all` available modals
    return {
      validate() {
        return true;
      }
    };
  }
}, ...Object.values(modals));

export default AnyModal;
