<template>
  <category-provider>
    <template v-slot:content="{ entity }">
      <base-layout flat :title="title" :type="type">
        <template v-slot:content>
          <category-form
            :entity="entity"
          ></category-form>
        </template>
      </base-layout>
    </template>
  </category-provider>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import BaseLayout from '@/components/layouts/BaseLayout.vue';
import CategoryForm from '@/components/forms/CategoryForm.vue';
import CategoryProvider from '@/components/entity-providers/CategoryProvider.vue';

@Component({
  name: 'category-view',
  components: {
    BaseLayout,
    CategoryForm,
    CategoryProvider,
  },
})
export default class extends Vue {
  get title() {
    return this.$route.name;
  }

  get type() {
    return 'category';
  }
}
</script>
