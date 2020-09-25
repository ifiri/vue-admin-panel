<template>
  <v-autocomplete
    :label="label"
    :items="items"
    :value="value && value.id"

    @change="$listeners.change"
  >
    <template v-slot:selection="{ item }">
      {{ removeDeepPrefixFrom(item) }}
    </template>
  </v-autocomplete>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { action } from 'mobx';

import carryEntries from '@/mixins/carryEntries';

@Component({
  name: 'categories-select',
  props: {
    entity: Object,
    value: Object,
    label: {
      type: String,
      default: 'Категория',
    },

    onlyFinalNodes: {
      type: Boolean,
      default: false,
    },

    excludeSubTree: {
      type: Object,
      default: null,
    },

    onChange: {
      type: Function,
      default: () => {},
    },
  },
  mixins: [
    carryEntries,
  ],
})
export default class CategoriesSelect extends Vue {
  shouldBeFetched = [
    'products.categories',
  ];

  categories = [];

  get items() {
    const items = [];

    const extract = (categories, nestingLevel = 0) => {
      const deepPrefix = this.getDeepPrefix(nestingLevel);

      categories.forEach(category => {
        const categoryTitle = `${deepPrefix} ${category.title}`;

        const item = {
          text: categoryTitle,
          value: category.id,
        };

        if (this.isCategoryShouldBeDisabled(category)) {
          item.disabled = true;
        }

        if (this.isCategorySubtreeCanBeIncluded(category)) {
          items.push(item);

          if (this.isCategoryHaveDescendants(category)) {
            extract(category.descendants, nestingLevel + 1);
          }
        }
      });
    };

    extract(
      this.categories
    );

    return items;
  }

  removeDeepPrefixFrom(item) {
    return item.text && item.text.replace(/─/gi, '');
  }

  getDeepPrefix(nesting) {
    // We cannot use ASCII codes here,
    // so just note, that symbol `─` is `&#9472`
    const line = '─';

    return line.repeat(nesting);
  }

  isCategoryHaveDescendants(category) {
    return (category.descendants && category.descendants.length);
  }

  isCategoryShouldBeDisabled(category) {
    return this.onlyFinalNodes && this.isCategoryHaveDescendants(category);
  }

  isCategorySubtreeCanBeIncluded(category) {
    return !(
      this.excludeSubTree && category.id === this.excludeSubTree.id
    );
  }

  @action.bound
  fetch() {
    return this.$store.fetch(
      this.shouldBeFetched
    ).then(response => {
      this.categories = this.$store.normalizedCategories;
    });
  }
}
</script>
