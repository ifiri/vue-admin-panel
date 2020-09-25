<template>
  <span>
    {{ entity }}
  </span>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'DataTableColumnNumber',
  props: {
    entity: {
      type: [Number],
      default: 0
    }
  }
})
export default class DataTableColumnNumber extends Vue {};
</script>
