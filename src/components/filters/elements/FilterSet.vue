<template>
  <div :class="filtersClass">
    <slot></slot>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'filter-set',
  props: {
    type: {
      type: String,
      default: null,
    }
  },
  data: () => ({
    email: null,
  }),
})
export default class FilterSet extends Vue {
  get filtersClass() {
    if (this.type) {
      return `filters filters--${this.type}`;
    }

    return 'filters';
  }
}
</script>

<style lang="scss" scoped>
.filters {
  flex-grow: 1;

  padding: 15px 15px 25px;
  background-color: #6800ff0f;

  &::after {
    display: none;
  }
}
</style>
