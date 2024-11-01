<script setup lang="ts">
import ProfileCard from '../components/ProfileCard.vue';
</script>

<template>
    <div class="max-w-3xl flex flex-col justify-between mx-auto">
        <ProfileCard />
        <div class="grid grid-cols-1 gap-4 mx-auto">
            <img class="max-h-[30rem]  object-contain"
                src="https://www.scb.co.th/content/media/personal-banking/digital-banking/scb-easy/how-to/qr-code/qr-code-generated-7.jpg"
                alt="">
        </div>
        <div class="grid grid-cols-1 gap-4 mt-6">
            <label
                class="flex flex-col items-center bg-white/80 justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400">
                <span class="text-gray-500">Choose a file or drag it here</span>
                <input type="file" class="hidden" @change="handleFileUpload" />
            </label>

            <button
                class="mt-4 w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none"
                @click="submitFile">
                ยืนยันการโอนเงิน
            </button>

        </div>
    </div>
</template>