<template>
  <tree
    :rows="getRows()"
    :type="type"
    :showExpand="true"

    :onClick="onRowClick"
  ></tree>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Observer } from 'mobx-vue';
import { action } from 'mobx';

import Tree from 'vuetify-tree-table';

import DataTable from '@/components/data-table/DataTable.vue';

import carryEntries from '@/mixins/carryEntries';

console.log('!!!!!!!!!!!!', Tree);

@Observer
@Component({
  name: 'categories-list',
  components: {
    Tree,
    // 'tree': () => import('vuetify-tree-table'),
  },
  mixins: [
    carryEntries,
  ],
})
export default class extends Vue {
  type = 'categories';

  shouldBeFetched = [
    'products.categories',
  ];

  getRows() {
    return this.$store.normalizedCategories;
  }

  onRowClick(item) {
    this.$router.push(`${this.$route.path}/${item.id}`);

    // `event` is a magic variable from vuetify
    event && event.stopPropagation();
  }

  @action.bound
  fetch() {
    this.$store.fetch(this.shouldBeFetched);
  }
}
</script>
