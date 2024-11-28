import { baseAPIURL } from '@/config'
import { accessTokenStore } from '@/stores/useAccessTokenLine'
import axios from 'axios'

export const backEndApi = axios.create({ baseURL: baseAPIURL })

backEndApi.interceptors.request.use(
  config => {
    const getAccessToken = accessTokenStore()
    const token = getAccessToken?.accessToken
    if (getAccessToken) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)
