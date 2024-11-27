import { baseAPIURL } from '@/config'
import { accessTokenStore } from '@/stores/useAccessTokenLine';
import axios from 'axios'

export const backEndApi = axios.create({ baseURL: baseAPIURL })

backEndApi.interceptors.request.use((config) => {
    const getAccessToken = accessTokenStore();
    if (getAccessToken) {
      config.headers.Authorization = `Bearer ${getAccessToken?.accessToken}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
});