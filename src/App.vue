<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { useProfileStore } from './stores/useProfileStore';

onMounted(async () => {
  const profileStore = useProfileStore()
  // Fetch profile and ID token before setting up interceptors
  await profileStore.fetchProfile()
  // Setup Axios interceptors after initialization
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
