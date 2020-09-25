import { types } from 'mobx-state-tree';

import AnyModal from './anyModal';
import actions from './actions';
import views from './views';

const Modals = types.model('Modals', {
  modals: types.array(AnyModal),

  // In `openedModal` will store references to the
  // modal entities. Every modal type is an reference
  // to the original entity model, f.e. ProductModal is
  // reference to Product entity.
  openedModal: types.maybeNull(types.safeReference(AnyModal, {
    acceptsUndefined: true,
  })),
}).views(views).actions(actions);

export default Modals;
