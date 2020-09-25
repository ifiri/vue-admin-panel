<template>
  <fragment>
    <v-card :flat="flat" :class="cardClass">
      <div class="user__layout">
        <div flat class="user__edit">

          <v-card-title :class="titleClass">
            {{ title }}
          </v-card-title>

          <slot name="content" v-bind:view="view"></slot>
        </div>

        <div class="user__emails">
          <slot name="appends.user:emails"></slot>
        </div>
      </div>
    </v-card>

    <slot name="appends"></slot>
  </fragment>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Observer } from 'mobx-vue';

import BaseLayout from './BaseLayout.vue';

@Observer
@Component({
  name: 'user-layout',
})
export default class extends BaseLayout {
  get cardClass() {
    if (this.type) {
      return `${this.viewClass} ${this.viewClass}--${this.type} user`;
    }

    return this.viewClass + ' user';
  }

  get titleClass() {
    return `${this.viewClass}__title user__title`;
  }
}
</script>

<style lang="scss">
.user {
  margin: 0 auto;
  width: 100vw;
  min-width: 300px;

  &__emails {
    flex-grow: 2;
  }

  &__edit {
    flex-grow: 1;

    // @todo
    .form {
      padding-top: 12px;
    }
  }

  &__title {
    padding-left: 0;
    padding-right: 0;
  }

  &__layout {
    display: flex;
    justify-content: space-between;

    margin-bottom: 25px;

    > * {
      padding: 0 16px;
    }

    > *:not(:last-child) {
      margin-left: auto;

    }

    > *:first-child {
      margin-left: 0;
    }
  }
}
</style>
