<template>
  <div class="grid grid-cols-3 gap-4">
    <div v-for="(item, index) in productRef" :key="index"
      :class="['cursor-pointer', 'hover:bg-[#d9f2fa]', 'bg-opacity-75', 'rounded-[35px]', 'flex', 'flex-col', 'items-center', 'justify-center', 'md:h-52', 'md:w-52', { 'hovered': selectedItem === item }]"
      @click="selectItem(item)">
      <img class="md:h-28 md:w-28 sm:h-20 sm:w-20"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/LINE_logo.svg/640px-LINE_logo.svg.png">
      <span class="priceText">{{ item.price }} bath / {{ item.expiredDate }} days</span>
    </div>
  </div>
  <div v-if="selectedItem" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

    <!-- Modal -->
    <div class="flex items-center justify-center h-screen p-4 bg-black/50">
      <div class="relative bg-white rounded-lg shadow-xl max-w-3xl w-full">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-4 border-b">
          <h3 class="text-lg font-bold text-center flex-grow">
            รายละเอียดสินค้า
          </h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            <span class="text-2xl">&times;</span>
          </button>
        </div>

        <!-- Modal Content -->
        <div class="p-4">
          <div class="flex flex-col md:flex-row gap-6">
            <!-- Product Image -->
            <div class="w-full md:w-1/2">
              <div class="relative aspect-square rounded-lg overflow-hidden">
                <img :src="selectedItem?.productType.image || '/placeholder-image.jpg'" :alt="selectedItem?.name"
                  class="object-cover w-full h-full" />
              </div>
            </div>

            <!-- Product Details -->
            <div class="w-full md:w-1/2">
              <div class="space-y-4">
                <!-- Product Name and Price -->
                <div>
                  <div class="text-gray-600">สินค้า</div>
                  <div class="font-semibold text-xl">{{ selectedItem?.name }}</div>
                </div>
                <div>
                  <div class="text-gray-600">ราคา</div>
                  <div class="font-semibold text-2xl text-red-600">{{ selectedItem?.price }} ฿</div>
                </div>

                <!-- Product Description -->
                <div class="border-t pt-4" v-if="selectedItem?.productType.condition">
                  <h3 class="font-semibold mb-2">รายละเอียดสินค้า</h3>
                  <p class="text-sm text-gray-600">
                    {{ selectedItem.productType.condition }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="border-t pt-3 mt-4">
            <div class="flex justify-between items-center">
              <!-- Quantity controls on the left -->
              <div class="flex items-center space-x-2">
                <button @click="decreaseQuantity"
                  class="touch-none px-3 py-1 text-gray-600 border rounded hover:bg-gray-100">
                  -
                </button>
                <span class="w-12 text-center">{{ quantity }}</span>
                <button @click="increaseQuantity"
                  class="touch-none px-3 py-1 text-gray-600 border rounded hover:bg-gray-100">
                  +
                </button>
              </div>

              <!-- Action buttons on the right -->
              <div class="flex space-x-2">
                <button @click="closeModal" class="px-4 py-2 text-gray-600 rounded hover:bg-gray-100">
                  ยกเลิก
                </button>
                <button @click="purchaseButton(selectedItem?.id)"
                  class="bg-[#cee5ed] hover:bg-[#d9f2fa] text-white font-bold py-2 px-4 rounded">
                  สั่งซื้อ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Arima:wght@100..700&display=swap');

.priceText {
  font-size: 20px;
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

const productRef = ref<Product[]>([]);
const selectedItem = ref<Product | undefined>(undefined);
const quantity = ref(1);

onMounted(async () => {
  const { data: product } = await backEndApi.get(`/apis/products/${1}`)
  productRef.value = product
})

const purchaseButton = async (productId: number) => {
  const { data: response } = await backEndApi.post(`/orders`, { productId, quantity: quantity.value })
  if (response) {
    router.push(`/order-status/${response.refId}`)
  }
}

function selectItem(value: Product) {
  selectedItem.value = value;
}

function increaseQuantity() {
  quantity.value++
}

function decreaseQuantity() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const closeModal = () => {
  selectedItem.value = undefined
}
</script>
