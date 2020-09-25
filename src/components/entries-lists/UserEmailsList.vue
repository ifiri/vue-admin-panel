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

@Observer
@Component({
  name: 'user-emails-list',
  components: {
    'data-table': DataTable,
  },
  props: {
    entity: Object,
  },
})
export default class extends Vue {
  shouldBeFetched = [
    'users.emails',
  ];

  get title() {
    return 'Emails';
  }

  get type() {
    return 'user-emails';
  }

  getRows() {
    return this.$store.getUserEmails(this.entity.id);
  }
}
</script>
