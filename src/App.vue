<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { accessTokenStore } from './stores/useAccessTokenLine';
import { useProfileStore } from './stores/useProfileStore';
const accessToken = accessTokenStore();
const profileStore = useProfileStore();

        onMounted(async () => {
            await profileStore.fetchProfile()
            await accessToken.getIDToken()
            if (accessToken.isTokenExpired()) {
                await accessToken.clearToken()
            }
        });
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
