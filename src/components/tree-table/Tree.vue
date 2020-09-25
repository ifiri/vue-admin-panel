<template>
  <fragment>
    <tree-table
      :rows="items"
      :type="type"
      :showExpand="showExpand"
      :expanded.sync="expanded"

      :hideControls="false"
      :onClick="onClick"
    ></tree-table>
  </fragment>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { Observer } from 'mobx-vue';
import { action } from 'mobx';

import useConfig from '@/effects/useConfig';

@Observer
@Component({
  name: 'tree',
  components: {
    'tree-table': () => import('./TreeTable.vue'),
  },
  props: {
    rows: {
      type: Array,
      default: [],
    },
    type: String,
    showExpand: Boolean,
    onClick: {
      type: Function,
      default: () => {},
    },
  },
  data: () => ({
    expanded: [],
  }),
})
export default class Tree extends Vue {
  get items() {
    const items = [];

    this.rows.forEach(row => {
      const item = {};

      for (const alias in row) {
        const column = row[alias] || null;

        item[alias] = column;
      }

      items.push(item);
    });

    return items;
  }
}
</script>
