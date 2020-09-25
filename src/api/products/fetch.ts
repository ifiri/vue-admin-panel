import useConfig from '@/effects/useConfig';
import ApiService from '@/api/apiProvider';

// @todo dry {1}
const fetch = (query = {}) => {
  const apiService = new ApiService();

  const { endpoints } = useConfig();

  return apiService.fetch(endpoints.products.get, query).then(response => {
    response.data = response.data && response.data.map(item => {
      item.id = item.id + '';
      item.category = item.category_id + '';

      return [
        item.id,
        item,
      ];
    });

    return new Map(response.data);
  });
};

export default fetch;
