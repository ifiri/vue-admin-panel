<template>
  <component :is="columnComponent" :entity="entity"></component>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { Observer } from 'mobx-vue';
import * as columns from './Columns';

@Observer
@Component({
  name: 'DataTableColumn',
  components: {
    ...columns,
  },
  props: {
    entity: {
      type: [String, Number, Object, Boolean],
      default: {},
    },
    type: {
      type: String,
      default: 'string',
    },
    width: {
      type: Number,
      default: null,
    },
  },
})
export default class DataTableColumn extends Vue {
  get columnComponent() {
    const getColumnType = () => {
      return this.type.charAt(0).toUpperCase() + this.type.slice(1);
    };

    return `DataTableColumn${getColumnType()}`;
  }
};
</script>
