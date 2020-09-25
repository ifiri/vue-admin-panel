import useConfig from '@/effects/useConfig';
import ApiService from '@/api/apiProvider';

// @todo dry {1}
const fetch = (query = {}) => {
  const apiService = new ApiService();

  const { endpoints } = useConfig();

  return apiService.fetch(endpoints.orders.get, query).then(response => {
    // @todo dry
    response.data = response.data && response.data.map(item => {
      return [
        item.id,
        item,
      ];
    });

    return new Map(response.data);
  });
};

export default fetch;
