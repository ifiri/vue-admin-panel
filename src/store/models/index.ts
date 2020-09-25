// @ts-nocheck
import { types } from 'mobx-state-tree';

import App from './app';
import Products from './products';
import Users from './users';
import Orders from './orders';
import Modals from './modals';

// @todo разнести экшены и вьюхи по моделям
import actions from './app/actions';

// List of composing models
const models = [
  App,
  Products,
  Users,
  Orders,
  Modals,
];

// Build root model
// @ts-ignore
const Root = types.compose('Root', ...models).actions(actions); // @todo из models

export default Root;
