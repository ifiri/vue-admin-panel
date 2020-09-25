import { types } from 'mobx-state-tree';

import views from './views';

const App = types.model('App', {
  isFetching: types.optional(types.boolean, false),
}).views(views);

export default App;
