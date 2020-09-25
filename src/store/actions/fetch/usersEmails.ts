import { flow } from 'mobx-state-tree';
import { fetch } from '@/api/users/emails';

export default (self, query) => flow(function* () {
  try {
    const response = yield fetch(query);

    if (response) {
      (response as any).forEach((entity, id) => {
        if (query.id) {
          const user = self.users.get(query.id);

          user.emails.push(entity);
        }
      });
    }
  } catch (error) {
    console.error('Failed to fetch users emails', error);
  }

  return self.users.length;
})();
