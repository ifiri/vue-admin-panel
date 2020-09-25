import { values } from 'mobx';

const views = self => ({
  getCategoryById(categoryId: number) {
    const searchOnNextLevel = categories => {
      for (const category of categories) {
        if (parseInt(category.id) === categoryId) {
          return category;
        }

        // @todo isCategoryHaveDescendants
        if (category.descendants && category.descendants.length) {
          const potentiallyFound = searchOnNextLevel(category.descendants);

          if (potentiallyFound) {
            return potentiallyFound;
          }
        }
      }

      return null;
    };

    return searchOnNextLevel(
      self.normalizedCategories
    ) || null;
  },

  getProductsCategories() {
    return values(self.categories);
  },

  get normalizedCategories() {
    const tree = self.categories;
    const categories = [] as any;

    tree.forEach(category => {
      if (!category.parent) {
        categories.push(category);
      }
    });

    return categories;
  },

  isProductsCategoriesLoaded() {
    return !!self.categories.length;
  },
});

export default views;
