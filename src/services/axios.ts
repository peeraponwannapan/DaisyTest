import { baseAPIURL } from '@/config'
import { accessTokenStore } from '@/stores/useAccessTokenLine';
import axios from 'axios'

export const backEndApi = axios.create({ baseURL: baseAPIURL })

backEndApi.interceptors.request.use((config) => {
    const getAccessToken = accessTokenStore();
    if (getAccessToken) {
      config.headers.Authorization = `Bearer ${getAccessToken?.accessToken || "eyJraWQiOiJjNmYzNGU4NjNkM2U1ZTMyYmEzMjA4MTQwMmQ4YjNlMTBlOGVkYjYzODU2OGE1N2IyNzE2YzBmMzBmNTY3MTAzIiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2FjY2Vzcy5saW5lLm1lIiwic3ViIjoiVTg5ODQ5NTkzNDgwOWU5MmFiNDlhNDY2MzRmYjJlZWI0IiwiYXVkIjoiMjAwNjUyNDEzOCIsImV4cCI6MTczMjczODIxNywiaWF0IjoxNzMyNzM0NjE3LCJhbXIiOlsibGluZXNzbyJdLCJuYW1lIjoi4bS54bSs4bS6IiwicGljdHVyZSI6Imh0dHBzOi8vcHJvZmlsZS5saW5lLXNjZG4ubmV0LzBoNlVmTmpQMzFhWHBiTjNnenk1SVdMV2R5Wnhjc0dXOHlJMWdnVEhnMk1oMGxWWHdzYjFJaFRDMWpOaDUyQnlsNVpnTjBIbmcxWTBrbCJ9.S7zSVcfJEVu5_g1hdL6cFj54zLWfP62LVFjvkG-tij4RBXTXUAEeO4EH31CE7DexiGgZ-USoR06v1TiF3VUapg"}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
});