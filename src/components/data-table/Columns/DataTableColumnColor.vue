<template>
  <span class="data-table-list-row-column-color">
    <span class="data-table-list-row-column-color-sample" :style="{ backgroundColor: entity.hex }"></span>
    <span class="data-table-list-row-column-color-name">
      {{ entity.name }}
    </span>
  </span>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'DataTableColumnColor',
  props: {
    entity: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      style: {
        backgroundColor: this.entity.hex
      }
    }
  }
})
export default class DataTableColumnColor extends Vue {};
</script>

<style scoped>
.data-table-list-row-column-color {}
.data-table-list-row-column-color-sample {
  display: inline-block;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  vertical-align: middle;
}
.data-table-list-row-column-color-name {
  vertical-align: middle;
}
</style>
