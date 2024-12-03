import useLiff from '@/hook/liff'
import setupAxiosInterceptors from '@/services/axios'
import { defineStore } from 'pinia'

export const accessTokenStore = defineStore('accessToken', {
  state: () => ({
    accessToken: '',
    isLoading: false,
    expiresAt: null as number | null,
  }),
  actions: {
    async getIDToken() {
      this.isLoading = true
      const { liff } = await useLiff()
      alert(`"access"${liff}`)

      try {
        alert(liff)
        if (!liff) {
          this.isLoading = false
          return
        }
        this.accessToken = liff.getIDToken() || ''
        setupAxiosInterceptors(this.accessToken)
        this.expiresAt = Date.now() + 55 * 60 * 1000
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        this.isLoading = false
      }
    },
    isTokenExpired() {
      // ตรวจสอบว่ามีเวลาหมดอายุและถึงเวลาหมดอายุหรือยัง
      return this.expiresAt ? Date.now() >= this.expiresAt : true
    },
    async clearToken() {
      const { liff } = await useLiff()
      liff?.logout()
      this.accessToken = ''
      this.expiresAt = null
    },
  },
})
