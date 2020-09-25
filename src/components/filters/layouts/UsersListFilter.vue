<template>
  <filters.set>
    <filters.wrapper type="users">
      <template v-slot:content>
        <v-text-field
          label="Email"
          placeholder="Введите для поиска"

          class="filter__field"
          v-model="email"

          :hide-details="true"
          @input="onFilterChange"

          outlined
          clearable
        ></v-text-field>
      </template>
    </filters.wrapper>
  </filters.set>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

import * as filterElements from '@/components/filters/elements';
import Filterable from '../filterable';

@Filterable('users')
@Component({
  name: 'users-list-filter',
  data: () => ({
    email: null,
  }),
  components: {
    'filters.set': filterElements.set,
    'filters.wrapper': filterElements.wrapper,
  },
})
export default class UsersListFilter extends Vue {
  getQuery() {
    return {
      email: this.email,
    };
  }
}
</script>
