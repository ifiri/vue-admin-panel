<template>
  <data-table
    :rows="getRows()"
    :type="type"
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
  name: 'orders-list',
  components: {
    'data-table': DataTable,
  },
  mixins: [
    carryEntries,
  ],
})
export default class extends Vue {
  type = 'orders';

  shouldBeFetched = [
    'users',
  ];

  getRows() {
    return this.$store.getOrders();
  }

  @action.bound
  fetch() {
    this.$store.fetch(this.shouldBeFetched).then(response => {
      this.$store.fetch(['orders']);
    });
  }
}
</script>
