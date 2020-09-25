import useConfig from '@/effects/useConfig';
import ApiService from '@/api/apiProvider';

const update = (entity, query = {}) => {
  const apiService = new ApiService();

  const { endpoints } = useConfig();
  const updateEndpoint = `${endpoints.users.update}/${entity.id}`;

  return apiService.post(updateEndpoint, query).then(function(response) {
    return response.data;
  });
};

export default update;
