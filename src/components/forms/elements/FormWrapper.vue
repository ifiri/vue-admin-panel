<template>
  <v-form :method="method" :class="formClass">
    <slot name="items" v-bind:entity="entity" v-bind:form="form"></slot>

    <template v-if="isActionsSlotFilled">
      <v-divider></v-divider>

      <div class="form__actions">
        <slot name="actions" v-bind:entity="entity" v-bind:form="form"></slot>
      </div>
    </template>
  </v-form>
</template>

<script lang="ts">
import dotty from 'dotty';
import { Component, Vue } from 'vue-property-decorator';
import { Observer } from 'mobx-vue';
import { action } from 'mobx';

@Observer
@Component({
  name: 'user-form',
  components: {
    // ~
  },
  props: {
    entity: Object,
    form: Object,
    type: {
      type: String,
      default: null,
    },
    method: {
      type: String,
      default: 'post',
    },
  },
})
export default class extends Vue {
  isActionsSlotFilled() {
    return !!this.$slots.actions;
  }

  get formClass() {
    if (this.type) {
      return `form form--${this.type}`;
    }

    return 'form';
  }

  onSaveButtonClick(event) {
    const changes = this.merge(
      this.sanitize(this.changes)
    );

    this.updateUser(changes);

    event.preventDefault();
  }
}
</script>

<style lang="scss">
.form {
  padding: 0 5px;

  &__item {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }

  &__actions {
    margin-top: 20px;

    display: flex;
    justify-content: flex-end;
  }
}
</style>
