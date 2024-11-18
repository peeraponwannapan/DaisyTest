<script setup lang="ts">

import { useRoute } from 'vue-router'
import ProfileCard from '../components/ProfileCard.vue';
import { onMounted, ref } from 'vue';
import { backEndApi } from '@/services/axios';
import { accessTokenStore } from '@/stores/useAccessTokenLine';
import type { Orders } from './types';

const file = ref<File | null>(null)
const imageUrl = ref<string | null>(null)
const orderRef = ref<Orders>();
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

const fetchOrders = async () => {
    const { data: response } = await backEndApi.get(`/orders/${refId}`, {
        headers: {
            Authorization: `Bearer ${getAccessToken?.accessToken || "eyJraWQiOiJhNTI0YTQwNGU3YTk3ZDM1ZGM2NDYzMzc1NjMwNTUyNWVkMmRjNGE1YjQ4YTEzMDczNmY3NGU5YTNhNWQ0YjFkIiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2FjY2Vzcy5saW5lLm1lIiwic3ViIjoiVTg5ODQ5NTkzNDgwOWU5MmFiNDlhNDY2MzRmYjJlZWI0IiwiYXVkIjoiMjAwNjUyNDEzOCIsImV4cCI6MTczMTk1NzAxNywiaWF0IjoxNzMxOTUzNDE3LCJhbXIiOlsibGluZXNzbyJdLCJuYW1lIjoi4bS54bSs4bS6IiwicGljdHVyZSI6Imh0dHBzOi8vcHJvZmlsZS5saW5lLXNjZG4ubmV0LzBoNlVmTmpQMzFhWHBiTjNnenk1SVdMV2R5Wnhjc0dXOHlJMWdnVEhnMk1oMGxWWHdzYjFJaFRDMWpOaDUyQnlsNVpnTjBIbmcxWTBrbCJ9.Fu7X4L0LiZJl_2sLMR3S2IYFv-2Ptjlh7rKo81mW-lXRs1Fq_KnzbXX67wRujmQ8l18GUPxBbAsQzB3UIv9MKg"}`,
        }
    })
    orderRef.value = response
}

onMounted(async () => {
    await fetchOrders()
})

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
                Authorization: `Bearer ${getAccessToken?.accessToken || "eyJraWQiOiJhNTI0YTQwNGU3YTk3ZDM1ZGM2NDYzMzc1NjMwNTUyNWVkMmRjNGE1YjQ4YTEzMDczNmY3NGU5YTNhNWQ0YjFkIiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2FjY2Vzcy5saW5lLm1lIiwic3ViIjoiVTg5ODQ5NTkzNDgwOWU5MmFiNDlhNDY2MzRmYjJlZWI0IiwiYXVkIjoiMjAwNjUyNDEzOCIsImV4cCI6MTczMTk1NzAxNywiaWF0IjoxNzMxOTUzNDE3LCJhbXIiOlsibGluZXNzbyJdLCJuYW1lIjoi4bS54bSs4bS6IiwicGljdHVyZSI6Imh0dHBzOi8vcHJvZmlsZS5saW5lLXNjZG4ubmV0LzBoNlVmTmpQMzFhWHBiTjNnenk1SVdMV2R5Wnhjc0dXOHlJMWdnVEhnMk1oMGxWWHdzYjFJaFRDMWpOaDUyQnlsNVpnTjBIbmcxWTBrbCJ9.Fu7X4L0LiZJl_2sLMR3S2IYFv-2Ptjlh7rKo81mW-lXRs1Fq_KnzbXX67wRujmQ8l18GUPxBbAsQzB3UIv9MKg"}`,
            }
        })

        if (response) {
            await fetchOrders();
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
        <div v-if="orderRef?.status !== 'paid'">
            <div class="grid grid-cols-1 gap-4 mx-auto justify-items-center">
                <img class="max-h-[30rem]  object-contain"
                    src="https://www.scb.co.th/content/media/personal-banking/digital-banking/scb-easy/how-to/qr-code/qr-code-generated-7.jpg"
                    alt="">
            </div>
            <div class="grid grid-cols-1 gap-4 mt-6">
                <img v-if="imageUrl" :src="imageUrl" alt="Preview Image" class="max-h-[30rem] mx-auto object-contain" />
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

        <div v-else>
            <p>สั่งซื้อสำเร็จ</p>
        </div>
    </div>
</template>