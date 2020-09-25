<template>
  <fragment>
    <data-table
      :rows="items"
      :type="type"
      :showExpand="showExpand"
      :expanded="expanded"
      :hideControls="hideControls"

      :onClick="onClick"
    >
      <template v-slot:expand="{ item }">
        <slot name="expand" v-bind:item="item">
          <template v-if="isCategoryHaveDescendants(item)">
            <template v-if="isCategoryExpanded(item)">
              <v-icon class="expander" @click="foldCategory(item)">mdi-chevron-down</v-icon>
            </template>

            <template v-else>
              <v-icon class="expander" @click="expandCategory(item)">mdi-chevron-right</v-icon>
            </template>
          </template>

          <template v-else>
            <span class="expander--dummy"></span>
          </template>
        </slot>
      </template>

      <template v-slot:expanded-item="{ headers, item }">
        <slot name="expanded-item" v-bind:item="item" v-bind:headers="headers">
          <td :colspan="headers.length" class="tree-table__node-wrapper">
            <tree-table-recursive
              :rows="item.descendants"
              :type="type"
              :showExpand="showExpand"
              :expanded.sync="expanded"
              :onClick="onClick"

              :hideControls="true"
            ></tree-table-recursive>
          </td>
        </slot>
      </template>
    </data-table>
  </fragment>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { Observer } from 'mobx-vue';
import { action } from 'mobx';

import DataTable from '@/components/data-table/DataTable.vue';

import useConfig from '@/effects/useConfig';

@Observer
@Component({
  name: 'tree-table',
  components: {
    'data-table': DataTable,
    'tree-table': () => import('./TreeTable.vue'),

    // This one is STRICTLY required for make recursive component works.
    // We should use in the cycle another instance of same component,
    // because in other case it will cause fatal error.
    'tree-table-recursive': () => import('./TreeTable.vue'),
  },
  props: {
    rows: {
      type: Array,
      default: [],
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
export default class TreeTable extends Vue {
  expandCategory(category) {
    if (!this.isCategoryExpanded(category)) {
      this.expanded.push(category);
    }

    event && event.stopPropagation();
  }

  foldCategory(category) {
    const expandedIndexOfCategory = this.getExpandedIndexOf(category);

    if (~expandedIndexOfCategory) {
      this.expanded.splice(expandedIndexOfCategory, 1);
    }

    event && event.stopPropagation();
  }

  isCategoryExpanded(category) {
    return ~this.getExpandedIndexOf(category);
  }

  getExpandedIndexOf(category) {
    return this.expanded.findIndex(element => {
      if (element.id && element.id === category.id) {
        return element;
      }
    });
  }

  isCategoryHaveDescendants(category) {
    return category && !!category.descendants.length;
  }

  get items() {
    const items = [];

    this.rows.forEach(row => {
      const item = {};

      for (const alias in row) {
        const column = row[alias] || null;

        item[alias] = column;
      }

      items.push(item);
    });

    return items;
  }

  get columns() {
    const { entities } = useConfig();

    return entities[this.type] && entities[this.type].columns;
  }
}
</script>

<style lang="scss">
.data-table {
  &__row {
    // @todo здесь вообще нехорошо сделано, через модификаторы.
    // возможно, сделать каждый тип row отдельным компонентом
    &--products,
    &--categories {
      td {
        cursor: pointer;
      }
    }
  }
}

.expander {
  cursor: pointer;

  &--dummy {
    cursor: default;

    pointer-events: none;
    display: inline-block;
    width: 24px;
  }
}

.v-data-table__expanded__content {
  .data-table--categories & {
    box-shadow: none !important;

    .data-table {
      // @todo magic color
      background-color: rgba(#1976D2, 0.075) !important;
    }
  }
}

.tree-table__node-wrapper {
  padding: 0 !important;
}
</style>
