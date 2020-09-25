<template>
  <base-layout :title="title" :view="this">
    <template v-slot:content>
      <products-list></products-list>
    </template>

    <template v-slot:filter>
      <filters.products></filters.products>
    </template>

    <template v-slot:appends>
      <product-modal v-if="modal" :modal="modal()" :entity="entity()"></product-modal>
    </template>
  </base-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import BaseLayout from '@/components/layouts/BaseLayout.vue';
import ProductsList from '@/components/entries-lists/ProductsList.vue';
import { ProductsFilter } from '@/components/filters/layouts';

import ProductModal from '@/components/modals/ProductModal.vue';

@Component({
  name: 'products-view',
  components: {
    'products-list': ProductsList,
    'product-modal': ProductModal,

    'filters.products': ProductsFilter,
    'base-layout': BaseLayout,
  }
})
export default class extends Vue {
  get title() {
    return this.$route.name;
  }

  modal() {
    return this.$store.openedModal;
  }

  entity() {
    const modal = this.modal();

    return modal && modal.reference;
  }
}
</script>
