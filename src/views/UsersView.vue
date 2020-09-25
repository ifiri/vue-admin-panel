<template>
  <base-layout :title="title" :view="this">
    <template v-slot:content>
      <users-list></users-list>
    </template>

    <template v-slot:filter>
      <filters.users></filters.users>
    </template>
  </base-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import BaseLayout from '@/components/layouts/BaseLayout.vue';
import UsersList from '@/components/entries-lists/UsersList.vue';
import { UsersFilter } from '@/components/filters/layouts';

@Component({
  name: 'users-view',
  components: {
    'base-layout': BaseLayout,
    'users-list': UsersList,
    'filters.users': UsersFilter,
  },
})
export default class extends Vue {
  get title() {
    return this.$route.name;
  }
}
</script>
