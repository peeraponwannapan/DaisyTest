<template>
  <div class="max-w-3xl flex flex-col h-[690px]">
    <ProfileCard />
    <div class="grid grid-cols-3 gap-4">
      <div v-for="(item, index) in productRef" :key="index"
        :class="['cursor-pointer', 'hover:bg-[#d9f2fa]', 'bg-opacity-75', 'rounded-[35px]', 'flex', 'flex-col', 'items-center', 'justify-center', 'md:h-52', 'md:w-52', { 'hovered': selectedItem === item }]"
        @click="selectItem(item)">
        <img class="md:h-28 md:w-28 sm:h-20 sm:w-20"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/LINE_logo.svg/640px-LINE_logo.svg.png">
        <span class="priceText">{{ item.price }} bath / {{ item.expiredDate }} days</span>
      </div>

      <div
        class="cursor-pointer hover:bg-[#d9f2fa] bg-opacity-75 rounded-[35px] flex flex-col items-center justify-center md:h-52 md:w-52">
        <img class="md:h-28 md:w-28 sm:h-20 sm:w-20"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/LINE_logo.svg/640px-LINE_logo.svg.png">
        <span class="priceText">40 bath / 7 days</span>
      </div>
      <div
        class="cursor-pointer hover:bg-[#d9f2fa] bg-opacity-75 rounded-[35px] flex flex-col items-center justify-center md:h-52 md:w-52">
        <img class="md:h-28 md:w-28 sm:h-20 sm:w-20"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/LINE_logo.svg/640px-LINE_logo.svg.png">
        <span class="priceText">40 bath / 7 days</span>
      </div>
      <div
        class="cursor-pointer hover:bg-[#d9f2fa] bg-opacity-75 rounded-[35px] flex flex-col items-center justify-center md:h-52 md:w-52">
        <img class="md:h-28 md:w-28 sm:h-20 sm:w-20"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/LINE_logo.svg/640px-LINE_logo.svg.png">
        <span class="priceText">40 bath / 7 days</span>
      </div>
    </div>
    <div v-if="selectedItem" class="fixed bottom-0 left-0 right-0 mx-auto bg-white p-4 shadow-lg max-w-3xl">
      <div class="flex items-center justify-center font-bold text-lg mb-2">
        สรุปคำสั่งซื้อ
      </div>
      <div class="flex justify-between">
        <div>
          <div>สินค้า</div> <!-- Label for product -->
          <div class="font-semibold">{{ selectedItem?.name }}</div> <!-- Product name below the label -->
        </div>
        <div>
          <div>ราคา</div> <!-- Label for price -->
          <div class="font-semibold">{{ selectedItem?.price }} ฿</div> <!-- Price below the label -->
        </div>
      </div>
      <hr class="my-3">
      <div class="float-right">
        <button class="bg-[#cee5ed] hover:bg-[#d9f2fa] text-white font-bold py-2 px-4 rounded"
          @click="purchaseButton(selectedItem.id)">สั่งซื้อ</button>
      </div>
    </div>
  </div>

</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Arima:wght@100..700&display=swap');

.priceText {
  font-size: 20px;
  font-family: "Arima", system-ui;
  font-weight: 700;
  padding-top: 10px;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.hovered {
  background-color: #d9f2fa;
}
</style>

<script lang="ts" setup>
import { backEndApi } from '@/services/axios';
import { onMounted, ref } from 'vue';
import type { Product } from './product/types';
import router from '@/router';
import ProfileCard from './components/ProfileCard.vue';
import { accessTokenStore } from '@/stores/useAccessTokenLine';

const productRef = ref<Product[]>([]);
const selectedItem = ref<Product | undefined>(undefined);
const getAccessToken = accessTokenStore();

onMounted(async () => {
  const { data: product } = await backEndApi.get(`/apis/products/${1}`)
  productRef.value = product
  console.log(getAccessToken.accessToken)
  if (getAccessToken.isTokenExpired()) {
    console.log('Token has expired')
    getAccessToken.clearToken()
  }
})

const purchaseButton = async (productId: number) => {
  const { data: response } = await backEndApi.post(`/orders`, { productId }, {
    headers: {
      Authorization: `Bearer ${getAccessToken?.accessToken || "eyJraWQiOiJhMmZkNTE4MTY5MmNjNmRhZjc5OTkwNWQwZGNkN2IwODI2YjQ1OGM5ZmU3OTRiOTA1NmZjN2I0ZGI2MWNmYmE0IiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2FjY2Vzcy5saW5lLm1lIiwic3ViIjoiVTg5ODQ5NTkzNDgwOWU5MmFiNDlhNDY2MzRmYjJlZWI0IiwiYXVkIjoiMjAwNjUyNDEzOCIsImV4cCI6MTczMDc0NDM1NywiaWF0IjoxNzMwNzQwNzU3LCJhbXIiOlsibGluZXNzbyJdLCJuYW1lIjoi4bS54bSs4bS6IiwicGljdHVyZSI6Imh0dHBzOi8vcHJvZmlsZS5saW5lLXNjZG4ubmV0LzBoNlVmTm52VG5hWHBiTjNxajRnOFdMV2R5Wnhjc0dXOHlJMWdnVEhnMk1oMGxWWHdzYjFJaFRDMWpOaDUyQnlsNVpnTjBIbmcxWTBrbCJ9.1b4zZcsw56FyHTgkTZVAebupBj7FQrrXJjZO38cJ7Naealc2dGPIK2ZtmVvbf1FLPELIUj8xmBPRXAagJST0tw"} `,
    }
  })
  if (response) {
    router.push(`/order-status/${response.refId}`)
  }
}
function selectItem(value: Product) {
  selectedItem.value = value;
}
</script>
