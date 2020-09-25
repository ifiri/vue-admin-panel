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

@Observer
@Component({
  name: 'user-provider',
  data: () => ({
    entity: {},
  }),
  mixins: [
    carryEntries,
  ],
})
export default class extends Vue {
  shouldBeFetched = [
    'users',
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
      this.entity = this.$store.getUserById(
        parseInt(this.$route.params.user)
      );

      // @todo support for chained fetch
      if (!this.$store.getUserEmails(this.entity.id).length) {
        this.$store.fetch(['users.emails'], { id: this.entity.id });
      }
    });
  }
}
</script>
