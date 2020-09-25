<template>
  <span>
    {{ entity }} €
  </span>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'DataTableColumnPrice',
  props: {
    entity: {
      type: [Number],
      default: 0
    }
  }
})
export default class DataTableColumnPrice extends Vue {};
</script>
