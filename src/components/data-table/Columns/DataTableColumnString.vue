<template>
  <span>
    {{ entity }}
  </span>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'DataTableColumnString',
  props: {
    entity: {
      type: [String, Number],
      default: ''
    }
  }
})
export default class DataTableColumnString extends Vue {};
</script>
