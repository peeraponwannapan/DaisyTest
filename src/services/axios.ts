import { baseAPIURL } from '@/config'
import { accessTokenStore } from '@/stores/useAccessTokenLine'
import axios from 'axios'

export const backEndApi = axios.create({ baseURL: baseAPIURL })

export default function setupAxiosInterceptors(getAccessTokenFromMiddleware: string) {
  backEndApi.interceptors.request.use(
    config => {
      const getAccessToken = accessTokenStore()
      const token = getAccessTokenFromMiddleware || getAccessToken?.accessToken
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    error => {
      return Promise.reject(error)
    },
  )
}