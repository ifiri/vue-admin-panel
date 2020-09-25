import { cast } from 'mobx-state-tree';

// I was forced to call `factory` as `produceModalBy` because
// in our case factory isn't a class. This is a function.
// Due to semanthic, I decide give this function verb-based
// name, but module name should stay noun-based (because it describes pattern).
// In JS world, this notation is the same as `Factory.produceModalBy` in OOP world.
import { factory as produceModalBy } from '@/modals';

const actions = self => ({
  changeModal(entity: object) {
    if (entity) {
      const modalNode = produceModalBy(entity);

      self.modals.push(modalNode);
      self.openedModal = cast(modalNode.id);

      return self.openedModal;
    }

    throw new Error('Entity isn\'t provided');
  },

  clearOpenedModal() {
    // @todo обнулять все модалки не очень разумно, стоит их хранить
    self.openedModal = undefined;
    self.modals = [];
  },
});

export default actions;
