<template>
  <span>
    {{ entity && entity.title }}
  </span>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'DataTableColumnCategory',
  props: {
    entity: {
      type: Object,
      default: {},
      required: false,
    },
  },
})
export default class DataTableColumnCategory extends Vue {};
</script>
