import useLiff from '@/hook/liff'
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
      try {
        if (!liff) {
          this.isLoading = false
          return
        }
        console.log(liff.getAccessToken(), 'CHeCK')
        this.accessToken = liff.getAccessToken() || ''
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
    clearToken() {
      this.accessToken = ''
      this.expiresAt = null
    },
  },
})
