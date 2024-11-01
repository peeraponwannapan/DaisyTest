<template>
    <div class="dark:bg-slate-800 gap-6 flex items-center justify-center mb-3">
        <div
            class="bg-gray-100 dark:bg-gray-700 relative shadow-xl overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all duration-500 transform">
            <div class="flex items-center gap-4">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwyfHxhdmF0YXJ8ZW58MHwwfHx8MTY5MTg0NzYxMHww&ixlib=rb-4.0.3&q=80&w=1080"
                    class="w-32 group-hover:w-36 group-hover:h-36 h-32 object-center object-cover rounded-full transition-all duration-500 delay-500 transform" />
                <div class="w-fit transition-all transform duration-500">
                    <h1 class="text-gray-600 dark:text-gray-200 font-bold">
                        Mary Phiri
                    </h1>
                    <p class="text-gray-400">Senior Developer</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import useLiff from '@/hook/liff';
import { onMounted } from 'vue';

export default {
    setup() {
        const { liff, error } = useLiff();
        console.log(import.meta.env.VITE_LIFF_ID)
        onMounted(async () => {
            console.log(liff, error);
        });
    }
};
</script>