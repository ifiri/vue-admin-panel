import { types } from 'mobx-state-tree';
import UserEmail from './userEmail';

const User = types.model('User', {
  id: types.identifierNumber,
  name: types.string,
  type: types.string,
  email: types.string,

  // @todo перенести в отдельную модель со своими экшенами и вьюхамт
  emails: types.array(UserEmail),
});

export default User;
