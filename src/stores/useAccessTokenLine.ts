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
      alert("Check")
      const { liff } = await useLiff()
      alert(`Check,:${liff}`)

      try {
        if (!liff) {
          this.isLoading = false
          return
        }
        this.accessToken = liff.getIDToken() || ''
        setupAxiosInterceptors(this.accessToken)
        return
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
