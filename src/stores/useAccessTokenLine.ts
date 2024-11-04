import useLiff from '@/hook/liff'
import { defineStore } from 'pinia'

export const accessTokenStore = defineStore('accessToken', {
  state: () => ({
    accessToken: '',
    isLoading: false,
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
        this.accessToken = liff.getIDToken() || ''
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        this.isLoading = false
      }
    },
  },
})
