import useConfig from '@/effects/useConfig';
import ApiService from '@/api/apiProvider';

// @todo dry {1}
const fetch = (query = {}) => {
  const apiService = new ApiService();

  const { endpoints } = useConfig();

  return apiService.fetch(endpoints.products.categories.get, query).then(response => {
    const categories = [] as any;

    const fillCategories = (categoriez, parent?: number) => {
      for (const category of categoriez) {
        let descendants = [];

        if (category.descendants) {
          descendants = category.descendants.map(item => {
            return item.id + '';
          });

          fillCategories(category.descendants, category.id);
        }

        // @todo вот эти поля как-то автоматизирвоать, брать из полей модели
        categories.push([
          category.id,
          {
            id: category.id + '',
            title: category.title,
            alias: category.alias,
            description: category.description,

            parent: parent ? parent + '' : null,

            descendants: descendants,
          }
        ]);
      }
    };

    fillCategories(response.data);

    return new Map(categories);
  });
};

export default fetch;
