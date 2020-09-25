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
  name: 'users-list',
  components: {
    'data-table': DataTable,
  },
  mixins: [
    carryEntries,
  ],
})
export default class extends Vue {
  type = 'users';

  shouldBeFetched = [
    'users',
  ];

  getRows() {
    return this.$store.getUsers();
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
