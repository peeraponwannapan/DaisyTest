<template>
    <div class="dark:bg-slate-800 gap-6 flex items-center justify-center mb-3">
        <div
            class="bg-gray-100 dark:bg-gray-700 relative shadow-xl overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all duration-500 transform">
            <div class="flex items-center gap-4">
                <img :src="profile?.pictureUrl"
                    class="w-32 group-hover:w-36 group-hover:h-36 h-32 object-center object-cover rounded-full transition-all duration-500 delay-500 transform" />
                <div class="w-fit transition-all transform duration-500">
                    <h1 class="text-gray-600 dark:text-gray-200 font-bold">
                        {{ profile?.displayName || 'Loading...' }}
                    </h1>
                    <p class="text-gray-400">Senior Developer</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { useProfileStore } from '@/stores/useProfileStore';
import { onMounted, ref, watch } from 'vue';

export default {
    setup() {
        const profileStore = useProfileStore();
        const profile = ref(profileStore.profile);
        onMounted(async () => {
            await profileStore.fetchProfile()
        });

        watch(() => profileStore.profile, (newProfile) => {
            profile.value = newProfile;
            console.log('Profile updated:', newProfile); // ตรวจสอบค่าที่ถูกโหลด
        });
        console.log(profile)
        return { profile };
    },
};
</script>
