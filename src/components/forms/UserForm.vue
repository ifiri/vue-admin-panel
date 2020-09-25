<template>
  <form-wrapper :entity="entity" :form="this" type="user">
    <template v-slot:items="{ entity, form }">
      <div class="form__item">
        <v-text-field
          label="Имя пользователя"
          class="form__field"

          :value="entity && entity.name"
          :hide-details="true"

          @change="form.onInputChange('name', $event)"
        ></v-text-field>
      </div>

      <div class="form__item">
        <v-text-field
          label="Тип пользователя"
          class="form__field"

          :value="entity && entity.type"
          :hide-details="true"

          @change="form.onInputChange('type', $event)"
        ></v-text-field>
      </div>

      <div class="form__item">
        <v-text-field
          label="Электронная почта"
          class="form__field"

          :value="entity && entity.email"
          :hide-details="true"

          @change="form.onInputChange('email', $event)"
        ></v-text-field>
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

import { useMerged, useSanitize, useDeepPut } from '@/effects';
import * as formElements from './elements';

@Observer
@Component({
  name: 'user-form',
  components: {
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
    // @todo как-то еще больше вынести и автоматизировать
    // цель - чтобы при обработке сабмита здесь меня уже дожидалось
    // обработанное значение
    const processedChanges = useSanitize(
      useMerged(this.changes, this.entity)
    );

    this.update(processedChanges);

    event.preventDefault();
  }

  @action.bound
  update(values) {
    return this.$store.updateUser(this.entity, values);
  }
}
</script>
