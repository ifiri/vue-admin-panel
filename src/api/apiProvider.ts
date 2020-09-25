import axios from 'axios';

import useConfig from '@/effects/useConfig';

export default class ApiProvider {
  private base;
  private axios;

  constructor({ base = null, headers = {} } = {}) {
    const config: any = useConfig();

    this.base = base || config.system.base;
    this.axios = axios.create({
      baseURL: this.base,
      headers,
    });
  }

  setHeader(headers: object) {
    this.axios.headers.common = Object.assign(
      {}, axios.defaults.headers.common, headers
    );

    return this.axios;
  }

  fetch(resource: string, query?: object) {
    return this.axios.get(resource, {
      params: query || {},
    });
  }

  post(resource: string, data: object) {
    return this.axios.post(resource, data);
  }

  put(resource: string, data: object) {
    return this.axios.put(resource, data);
  }

  delete(resource: string) {
    return this.axios.delete(resource);
  }
};
