import { action } from 'mobx';

export default {
  data: () => ({
    shouldBeFetched: [],
  }),

  // Don't put this in the `methods` due to different merging behavior
  created: function() {
    if (!this.fetch) {
      throw new Error('Entriesful component should implement the `fetch` action');
    }

    if (!this.$store) {
      throw new Error('Current component haven\'t access to the store');
    }

    this.fetch();
  },
};
