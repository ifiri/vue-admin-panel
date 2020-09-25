<template>
  <fragment>
    <slot name="content" v-bind:entity="entity" v-bind:getEntity="getEntity"></slot>
  </fragment>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Observer } from 'mobx-vue';
import { action } from 'mobx';

import carryEntries from '@/mixins/carryEntries';

// @todo передавать id желаемой сущности в props
@Observer
@Component({
  name: 'category-provider',
  data: () => ({
    entity: {},
  }),
  mixins: [
    carryEntries,
  ],
})
export default class extends Vue {
  shouldBeFetched = [
    'products.categories',
  ];

  getEntity() {
    return this.entity;
  }

  @action.bound
  fetch() {
    return this.$store.fetch(
      this.shouldBeFetched
    ).then(response => {
      // We should duplicate category into `entity` field
      // because we need it in the `data`, when `category` is the
      // just calculable property

      // @todo сделать определение сущености через отдельный сервис
      this.entity = this.$store.getCategoryById(
        parseInt(this.$route.params.category)
      );
    });
  }
}
</script>
