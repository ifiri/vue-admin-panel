<template>
  <fragment>
    <v-card :flat="flat" :class="cardClass">
      <v-card-title :class="titleClass" primary-title>
        {{ title }}
      </v-card-title>

      <v-container fluid :class="containerClass">
        <v-row no-gutters>
          <slot name="filters"></slot>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12">
            <slot name="content" v-bind:view="view"></slot>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <slot name="appends"></slot>
  </fragment>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Observer } from 'mobx-vue';

@Observer
@Component({
  name: 'base-layout',
  props: {
    title: String,
    type: {
      type: String,
      default: null,
    },
    view: [Object, String],
    flat: {
      type: Boolean,
      default: false,
    },
  },
})
export default class extends Vue {
  viewClass = 'view';

  get cardClass() {
    if (this.type) {
      return `${this.viewClass} ${this.viewClass}--${this.type}`;
    }

    return this.viewClass;
  }

  get containerClass() {
    return `${this.viewClass}__container`;
  }

  get titleClass() {
    return `${this.viewClass}__title`;
  }
}
</script>

<style lang="scss">
.view {
  width: auto;

  padding-left: 0;
  padding-right: 0;

  &--category {
    margin: 0 auto;
    width: 50vw;
    min-width: 300px;
  }
}
</style>
