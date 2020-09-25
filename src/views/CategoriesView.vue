<template>
  <base-layout :title="title" :view="this">
    <template v-slot:content>
      <categories-list></categories-list>
    </template>
  </base-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import BaseLayout from '@/components/layouts/BaseLayout.vue';
import CategoriesList from '@/components/entries-lists/CategoriesList.vue';

@Component({
  name: 'categories-view',
  components: {
    'base-layout': BaseLayout,
    'categories-list': CategoriesList,
  },
})
export default class extends Vue {
  get title() {
    return this.$route.name;
  }
}
</script>
