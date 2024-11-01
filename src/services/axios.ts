import { baseAPIURL } from '@/config'
import axios from 'axios'

export const backEndApi = axios.create({ baseURL: baseAPIURL })
