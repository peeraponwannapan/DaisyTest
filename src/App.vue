<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { useProfileStore } from './stores/useProfileStore';
import { accessTokenStore } from './stores/useAccessTokenLine';
import ProfileCard from './views/components/ProfileCard.vue';

onMounted(async () => {
  const profileStore = useProfileStore()
  const accessToke = accessTokenStore()
  // Fetch profile and ID token before setting up interceptors
  await profileStore.fetchProfile()
  await accessToke.getIDToken()
  // Setup Axios interceptors after initialization
})
</script>

<template>
  <div class="max-w-3xl flex flex-col h-[690px]">
    <ProfileCard />
    <RouterView />
  </div>
</template>

<style scoped></style>
