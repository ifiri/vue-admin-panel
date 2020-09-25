<template>
  <base-layout :title="title" :view="this">
    <template v-slot:content>
      <orders-list></orders-list>
    </template>

    <template v-slot:filter>
      <filter.orders></filter.orders>
    </template>
  </base-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import BaseLayout from '@/components/layouts/BaseLayout.vue';
import OrdersList from '@/components/entries-lists/OrdersList.vue';
import { OrdersFilter } from '@/components/filters/layouts';

@Component({
  name: 'orders-view',
  components: {
    'base-layout': BaseLayout,
    'orders-list': OrdersList,
    'filter.orders': OrdersFilter,
  },
})
export default class extends Vue {
  get title() {
    return this.$route.name;
  }
}
</script>
