import useConfig from '@/effects/useConfig';
import ApiService from '@/api/apiProvider';

const update = (product, query = {}) => {
  const apiService = new ApiService();

  const { endpoints } = useConfig();
  const updateEndpoint = `${endpoints.products.update}/${product.id}`;

  return apiService.post(updateEndpoint, query).then(function(response) {
    return response.data;
  });
};

export default update;
