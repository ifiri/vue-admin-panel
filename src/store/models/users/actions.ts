import { factory as produceUpdatingPromiseBy } from '@/store/actions/update';

const actions = self => ({
  updateUser(user: object, values?: object) {
    if (!values) {
      throw new Error('Impossible to update entity without data');
    }

    return produceUpdatingPromiseBy('user', self, user, values);
  },
});

export default actions;
