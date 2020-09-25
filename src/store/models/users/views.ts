import { values } from 'mobx';
import { getSnapshot } from 'mobx-state-tree';

const views = self => ({
  getUsers() {
    console.log('users now are', values(self.users));
    return values(self.users);
  },

  getUserById(userId: number) {
    const user = self.users.get(userId);

    return user && getSnapshot(user);
  },

  getUserEmails(userId: number) {
    const user = self.getUserById(userId);

    return (user && user.emails) || [];
  },
});

export default views;
