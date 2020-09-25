import { flow } from 'mobx-state-tree';
import { update } from '@/api/users';

export default (self, entity, values) => flow(function* () {
  self.isFetching = true;

  try {
    const result = yield update(entity, values);
    const { emails } = self.users.get(entity.id);

    result && self.users.set(entity.id, {
      ...values,
      emails,
    });

    self.isFetching = false;
  } catch (error) {
    // @todo ошибки на стороне клиента
    console.error('Failed to update user', error);

    self.isFetching = false;
  }

  return entity;
})();
