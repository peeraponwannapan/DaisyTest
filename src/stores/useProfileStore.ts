import useLiff from '@/hook/liff'
import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: null as {
      displayName: string
      pictureUrl?: string
      userId: string
    } | null,
    isLoading: false,
  }),
  actions: {
    async fetchProfile() {
      this.isLoading = true
      const { liff } = await useLiff()
      console.log(liff)
      try {
        if (!liff) return
        this.profile = await liff.getProfile()
        console.log(this.profile)
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        this.isLoading = false
      }
    },
  },
})
