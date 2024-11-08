<script setup lang="ts">

import { useRoute } from 'vue-router'
import ProfileCard from '../components/ProfileCard.vue';
import { ref } from 'vue';
import { backEndApi } from '@/services/axios';
import { accessTokenStore } from '@/stores/useAccessTokenLine';

const file = ref<File | null>(null)
const imageUrl = ref<string | null>(null)
const route = useRoute()
const getAccessToken = accessTokenStore();
const refId = route?.params?.refId as string
const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement

    if (target.files && target.files[0]) {
        file.value = target.files[0]
        imageUrl.value = URL.createObjectURL(file.value)
    }
}

const submitForm = async () => {
    if (!file.value) {
        alert('กรุณาเลือกไฟล์ก่อนส่ง')
        return
    }

    const formData = new FormData()
    formData.append('file', file.value)
    formData.append('refId', refId)

    try {
        // Replace 'YOUR_API_ENDPOINT' with the actual API URL
        const response = await backEndApi.post('/slips/verify', formData, {
            headers: {
                Authorization: `Bearer ${getAccessToken?.accessToken || "eyJraWQiOiI1Y2VlMzdlNjljMzUzNzY2YTNmZTAxZmEwNWJmODIxMjgzNTQxYTg0YTY2OTJjZGVkZGY5NDdkMGMwOTA0MzY3IiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2FjY2Vzcy5saW5lLm1lIiwic3ViIjoiVTg5ODQ5NTkzNDgwOWU5MmFiNDlhNDY2MzRmYjJlZWI0IiwiYXVkIjoiMjAwNjUyNDEzOCIsImV4cCI6MTczMDkyNDk0OCwiaWF0IjoxNzMwOTIxMzQ4LCJhbXIiOlsibGluZXNzbyJdLCJuYW1lIjoi4bS54bSs4bS6IiwicGljdHVyZSI6Imh0dHBzOi8vcHJvZmlsZS5saW5lLXNjZG4ubmV0LzBoNlVmTm52VG5hWHBiTjNxajRnOFdMV2R5Wnhjc0dXOHlJMWdnVEhnMk1oMGxWWHdzYjFJaFRDMWpOaDUyQnlsNVpnTjBIbmcxWTBrbCJ9.9ifz-3j2jesCgQE3px4oHEGUgA-griel45-cPU8ktizNwCYMYe55uWkKFSmLuifMO1sUlp45z_xfJ1IDTzjMJA"} `,
            }
        })

        if (response) {
            alert('File uploaded successfully!')
        } else {
            alert('File upload failed.')
        }
    } catch (error) {
        console.error('Error uploading file:', error)
        alert('Error uploading file.')
    }
}
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
            <img v-if="imageUrl" :src="imageUrl" alt="Preview Image" class="max-h-[30rem] object-contain" />
            <label
                class="flex flex-col items-center bg-white/80 justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400">
                <span class="text-gray-500">Choose a file or drag it here</span>
                <input type="file" class="hidden" ref="fileInput" @change="handleFileChange" />
            </label>

            <button
                class="mt-4 w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none"
                @click="submitForm">
                ยืนยันการโอนเงิน
            </button>

        </div>
    </div>
</template>