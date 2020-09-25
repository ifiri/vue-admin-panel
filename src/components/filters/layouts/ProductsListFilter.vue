<template>
  <filters.set>
    <filters.wrapper type="products">
      <template v-slot:content>
        <v-text-field
          label="Активность"
          placeholder="Введите для поиска"

          class="filter__field"
          v-model="activity"

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

@Filterable('products')
@Component({
  name: 'products-list-filter',
  data: () => ({
    activity: null,
  }),
  components: {
    'filters.set': filterElements.set,
    'filters.wrapper': filterElements.wrapper,
  },
})
export default class ProductsListFilter extends Vue {
  getQuery() {
    return {
      activity: this.activity,
    };
  }
}
</script>
