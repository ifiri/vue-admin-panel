import { types } from 'mobx-state-tree';

import User from './user';
import views from './views';
import actions from './actions';

const Users = types.model('Users', {
  users: types.map(User),
}).views(views).actions(actions);

export default Users;
