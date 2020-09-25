import useConfig from '@/effects/useConfig';
import ApiService from '@/api/apiProvider';

const update = (category, query = {}) => {
  const apiService = new ApiService();

  const { endpoints } = useConfig();
  const updateEndpoint = `${endpoints.products.categories.update}/${category.id}`;

  return apiService.post(updateEndpoint, query).then(
    response => response.data
  );
};

export default update;
