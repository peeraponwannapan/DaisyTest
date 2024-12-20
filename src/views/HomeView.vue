<script setup lang="ts">

</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <router-link :to="{ name: 'product', params: { id: 1 } }"
      class="cursor-pointer hover:bg-[#d9f2fa] bg-opacity-75 rounded-[35px] flex flex-col items-center justify-center md:h-52 md:w-52">
      <img class="md:h-28 md:w-28 sm:h-20 sm:w-20"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/LINE_logo.svg/640px-LINE_logo.svg.png">
    </router-link>
    <div
      class="cursor-pointer hover:bg-[#d9f2fa] bg-opacity-75 rounded-[35px] flex items-center justify-center md:h-52 md:w-52">
      <img class="md:h-28 md:w-28 sm:h-20 sm:w-20"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGZhYUrmk6vDmi1-Pj7oI-HzTpQDCi9-IFTA&s">
    </div>
    <div
      class="cursor-pointer hover:bg-[#d9f2fa] bg-opacity-75 rounded-[35px] flex items-center justify-center md:h-52 md:w-52">
      <img class="md:h-28 md:w-28 sm:h-20 sm:w-20"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/LINE_logo.svg/640px-LINE_logo.svg.png">
    </div>
    <div
      class="cursor-pointer hover:bg-[#d9f2fa] bg-opacity-75 rounded-[35px] flex items-center justify-center md:h-52 md:w-52">
      <img class="md:h-28 md:w-28 sm:h-20 sm:w-20"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/LINE_logo.svg/640px-LINE_logo.svg.png">
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>
