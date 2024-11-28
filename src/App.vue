<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { accessTokenStore } from './stores/useAccessTokenLine';
import { useProfileStore } from './stores/useProfileStore';
import setupAxiosInterceptors from './services/axios';

onMounted(async () => {
  const accessToken = accessTokenStore()
  const profileStore = useProfileStore()

  // Fetch profile and ID token before setting up interceptors
  await profileStore.fetchProfile()
  await accessToken.getIDToken()
  console.log("Profile and ID Token fetched successfully");
  console.log("Access Token:", accessToken.accessToken);
  // Setup Axios interceptors after initialization
  setupAxiosInterceptors()
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
