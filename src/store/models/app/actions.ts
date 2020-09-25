// @ts-nocheck
import { flow } from 'mobx-state-tree';
import { values, action } from 'mobx';

import { factory as produceFetchingPromiseBy } from '@/store/actions/fetch';

const actions = self => {
  const promises = [];

  return {
    // @todo dry {8}
    startFetching() {
      self.isFetching = true;
    },

    stopFetching() {
      self.isFetching = false;
    },

    async fetch(shouldBeFetched: Array<string>, query = {}) {
      if (!self.isFetching) {
        self.startFetching();
      }

      for (const index in shouldBeFetched) {
        const entityName = shouldBeFetched[index];
        const promise = produceFetchingPromiseBy(entityName, self, query);

        // @ts-ignore
        promises.push(promise);
      }

      // self.promise = promises.concat(promises);

      await Promise.all(promises).then(response => {
        // self.promises.forEach(promise => {

        // });

        return response;
      });

      if (self.isFetching) {
        console.log('stop fetch ', shouldBeFetched);
        self.stopFetching();
      }
    },
  };
};

export default actions;
