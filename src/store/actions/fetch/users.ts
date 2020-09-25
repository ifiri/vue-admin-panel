import { flow } from 'mobx-state-tree';
import { fetch } from '@/api/users';

export default (self, query) => flow(function* () {
  try {
    const response = yield fetch(query);

    if (response) {
      (response as any).forEach((entity, id) => {
        self.users.set(id, entity);
      });
    }
  } catch (error) {
    console.error('Failed to fetch users', error);
  }

  return self.users.length;
})();
