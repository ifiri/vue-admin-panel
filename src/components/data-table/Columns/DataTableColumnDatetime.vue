<template>
  <span>
    {{ value }}
  </span>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'DataTableColumnDatetime',
  props: {
    entity: {
      type: String,
      default: Date.now(),
    },
  },
})
export default class DataTableColumnDatetime extends Vue {
  get value() {
    const date = new Date(this.entity);

    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }
};
</script>
