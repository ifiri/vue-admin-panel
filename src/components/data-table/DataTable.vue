<template>
  <v-data-table
    :class="tableClassName"
    :items="items"
    :headers="headers"
    :items-per-page="20"
    :footer-props="{
      itemsPerPageOptions: [20, 10, 5, -1],
    }"
    disable-filtering
    disable-sort
    :hide-default-footer="hideControls"

    :show-expand="showExpand"
    :expanded="expanded"

    @click:row="onClick"
  >
    <template v-for="header in headers" v-slot:[getSlotName(header)]="{ item, header }">
      <data-table-column :key="header.value" v-bind:entity="item[header.value]" v-bind:type="header.type"></data-table-column>
    </template>

    <template v-slot:item.data-table-expand="{ item }">
      <slot name="expand" v-bind:item="item"></slot>
    </template>

    <template v-slot:expanded-item="{ headers, item }">
      <slot name="expanded-item" v-bind:item="item" v-bind:headers="headers"></slot>
    </template>
  </v-data-table>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { Observer } from 'mobx-vue';
import { action } from 'mobx';

import DataTableColumn from './DataTableColumn.vue';

import useConfig from '@/effects/useConfig';

@Observer
@Component({
  name: 'data-table',
  components: {
    'data-table-column': DataTableColumn,
  },
  props: {
    rows: {
      type: Array,
      default: () => ([]),
    },
    type: String,
    showExpand: Boolean,
    expanded: Array,
    hideControls: Boolean,
    onClick: {
      type: Function,
      default: () => {},
    },
  },
})
export default class DataTable extends Vue {
  get headers() {
    const headers = [];

    this.columns.forEach(column => {
      headers.push({
        text: column.name,
        value: column.alias,

        align: 'left',
        sortable: false,
        width: column.width || null,

        // This prop is unofficial, not from the manual.
        // We should add it here because we need to get type of column
        // in the one of table slots.
        type: column.type,
      });
    });

    return headers;
  }

  get items() {
    const items = [];

    this.rows.forEach(row => {
      items.push(row);
    });

    return items;
  }

  get tableClassName() {
    const classNames = [];

    if (this.hideControls) {
      classNames.push('data-table--no-header');
    }

    if (this.type) {
      classNames.push(`data-table data-table--${this.type}`);
    }

    classNames.unshift('data-table');

    return classNames.join(' ');
  }

  get rowClassName() {
    if (this.type) {
      return `data-table__row data-table__row--${this.type}`;
    }

    return 'data-table__row';
  }

  get columns() {
    const { entities } = useConfig();

    return entities[this.type] && entities[this.type].columns;
  }

  getSlotName(header) {
    return 'item.' + header.value;
  }
}
</script>

<style lang="scss">
.data-table {
  td {
    cursor: pointer;
  }

  &--user-emails td,
  &--orders td, {
    cursor: default;
  }

  &--no-header {
    .v-data-table-header {
      // @todo грязный хак, увы. нужно скрыть секцию `thead`, определяющую размеры колонок,
      // но при этом не удалять ее из разметки, т.к. размеры колонок в таблице задаются
      // только в `th` тэгах. При этом сделать так, чтобы размеры задавались в `td`,
      // потребует массу костылей, переработки TreeTable и на текущем этапе нерентабельно.
      // Удаление данной строки сломает разметку вложенных таблиц.
      visibility: collapse;
    }
  }
}
</style>
