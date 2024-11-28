import { baseAPIURL } from '@/config'
import { accessTokenStore } from '@/stores/useAccessTokenLine';
import axios from 'axios'

export const backEndApi = axios.create({ baseURL: baseAPIURL })

backEndApi.interceptors.request.use(async (config) => {
    const getAccessToken = accessTokenStore();
    await getAccessToken.getIDToken(); // เรียกฟังก์ชันโหลด token
    const token = getAccessToken?.accessToken;
    if (getAccessToken) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
});