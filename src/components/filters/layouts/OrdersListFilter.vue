<template>
  <filters.set>
    <filters.wrapper type="orders">
      <template v-slot:content>
        <v-text-field
          label="Тип заказа"
          placeholder="Введите для поиска"

          class="filter__field"
          v-model="type"

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

@Filterable('orders')
@Component({
  name: 'orders-list-filter',
  data: () => ({
    type: null,
  }),
  components: {
    'filters.set': filterElements.set,
    'filters.wrapper': filterElements.wrapper,
  },
})
export default class UsersListFilter extends Vue {
  getQuery() {
    return {
      type: this.type,
    };
  }
}
</script>
