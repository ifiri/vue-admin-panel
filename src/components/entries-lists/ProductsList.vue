<template>
  <data-table
    :rows="getRows()"
    :type="type"

    :onClick="onRowClick"
  ></data-table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Observer } from 'mobx-vue';
import { action } from 'mobx';

import DataTable from '@/components/data-table/DataTable.vue';

import carryEntries from '@/mixins/carryEntries';

@Observer
@Component({
  name: 'products-list',
  components: {
    'data-table': DataTable,
  },
  mixins: [
    carryEntries,
  ],
})
export default class extends Vue {
  type = 'products';

  shouldBeFetched = [
    'products',
    'products.categories',
  ];

  getRows() {
    return this.$store.getProducts();
  }

  onRowClick(item) {
    this.toggleProductModal(item);

    // `event` is a magic variable from vuetify
    event && event.stopPropagation();
  }

  @action.bound
  toggleProductModal(item) {
    this.$store.changeModal(item);
  }

  @action.bound
  fetch() {
    this.$store.fetch(this.shouldBeFetched);
  }
}
</script>
