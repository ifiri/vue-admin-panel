<template>
  <form-wrapper :entity="entity" :form="this" type="category">
    <template v-slot:items="{ entity, form }">
      <div class="form__item">
        <v-text-field
          label="Название"
          class="form__field"

          :value="entity && entity.title"
          :hide-details="true"

          @change="form.onInputChange('title', $event)"
        ></v-text-field>
      </div>

      <div class="form__item">
        <v-text-field
          label="Алиас"
          class="form__field"

          :value="entity && entity.alias"
          :hide-details="true"

          @change="form.onInputChange('alias', $event)"
        ></v-text-field>
      </div>

      <div class="form__item">
        <categories-select
          label="Родительская категория"

          :entity="entity"
          :value="entity && entity.parent"

          :excludeSubTree="entity"

          @change="form.onInputChange('parent', $event)"
        ></categories-select>
      </div>
    </template>

    <template v-slot:actions="{ form }">
      <v-btn color="primary" @click="form.onSaveButtonClick">
        Сохранить
      </v-btn>
    </template>
  </form-wrapper>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Observer } from 'mobx-vue';
import { action } from 'mobx';
import { CategoriesSelect } from '@/components/categories-select';

import { useMerged, useSanitize, useDeepPut } from '@/effects';
import * as formElements from './elements';

@Observer
@Component({
  name: 'category-form',
  components: {
    CategoriesSelect,

    ...formElements,
  },
  props: {
    entity: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    changes: {},
  }),
})
export default class extends Vue {
  onInputChange(property, value) {
    value && useDeepPut(this.changes, property, value);
  }

  onSaveButtonClick(event) {
    const processedChanges = useSanitize(
      useMerged(this.changes, this.entity)
    );

    this.update(processedChanges);

    event.preventDefault();
  }

  @action.bound
  update(values) {
    return this.$store.updateProductCategory(this.entity, values);
  }
}
</script>
