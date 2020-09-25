<template>
  <user-provider>
    <template v-slot:content="{ entity }">
      <user-layout :title="title" :type="type" flat>
        <template v-slot:content>
          <user-form
            :entity="entity"
          ></user-form>
        </template>

        <template v-slot:appends.user:emails>
          <base-layout title="Отправленные emails" :type="type" flat>
            <template v-slot:content>
              <user-emails-list
                :entity="entity"
              ></user-emails-list>
            </template>
          </base-layout>
        </template>
      </user-layout>
    </template>
  </user-provider>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import BaseLayout from '@/components/layouts/BaseLayout.vue';
import UserForm from '@/components/forms/UserForm.vue';
import UserProvider from '@/components/entity-providers/UserProvider.vue';
import UserEmailsList from '@/components/entries-lists/UserEmailsList.vue';
import UserLayout from '@/components/layouts/UserLayout.vue';

@Component({
  name: 'user-view',
  components: {
    'base-layout': BaseLayout,
    'user-layout': UserLayout,

    'user-form': UserForm,

    'user-provider': UserProvider,
    'user-emails-list': UserEmailsList,
  },
})
export default class extends Vue {
  get title() {
    return this.$route.name;
  }

  get type() {
    return 'user';
  }
}
</script>
