<script setup lang="ts">

import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue';
import { backEndApi } from '@/services/axios';
import type { Orders } from './types';

const file = ref<File | null>(null)
const imageUrl = ref<string | null>(null)
const orderRef = ref<Orders>();
const route = useRoute()
const refId = route?.params?.refId as string
const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement

    if (target.files && target.files[0]) {
        file.value = target.files[0]
        imageUrl.value = URL.createObjectURL(file.value)
    }
}

const fetchOrders = async () => {
    const { data: response } = await backEndApi.get(`/orders/${refId}`)
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
        const response = await backEndApi.post('/slips/verify', formData)

        if (response) {
            alert('File uploaded successfully!')
            await fetchOrders()
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const messageError = error.response.data.message
        alert(messageError)
    }
}

</script>


<template>
    <a-spin />
    <div class="max-w-3xl flex flex-col justify-between mx-auto">
        <div v-if="orderRef?.status === 'pending'">
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

        <div v-if="orderRef?.status === 'success'" class="h-[690px]">
            <div class="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                <h2 class="text-xl font-bold text-green-600 mb-4">สั่งซื้อสำเร็จ!</h2>
                <p class="text-gray-700 mb-6">ขอบคุณที่สั่งซื้อสินค้ากับเรา 🎉</p>
            </div>
        </div>
    </div>
</template>