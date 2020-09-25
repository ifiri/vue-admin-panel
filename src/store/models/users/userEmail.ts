import { types } from 'mobx-state-tree';

const UserEmail = types.model('UserEmail', {
  id: types.identifierNumber,
  type: types.string,
  date: types.string,
});

export default UserEmail;
