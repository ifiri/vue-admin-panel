<template>
  <span>
    {{ entity && entity.name }}
  </span>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'DataTableColumnUser',
  props: {
    entity: {
      type: Object,
      default: {},
      required: false,
    },
  },
})
export default class DataTableColumnUser extends Vue {};
</script>
