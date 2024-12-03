import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '@/views/ProductView.vue'
import OrderStatusView from '@/views/order-status/OrderStatusView.vue'
import { accessTokenStore } from '@/stores/useAccessTokenLine'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductView,
    },
    {
      path: '/order-status/:refId',
      name: 'orderStatus',
      component: OrderStatusView,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const accessToken = accessTokenStore();
  if (!accessToken.accessToken) {
    try {
      await accessToken.getIDToken();
      console.log("Profile and ID Token fetched successfully");
    } catch (err) {
      console.error("Error fetching ID Token:", err);
      next('/error'); // เปลี่ยนเส้นทางไปยังหน้า error
      return;
    }
  }
  console.log("Access Token:", accessToken.accessToken);
  next(); // อนุญาตให้ไปยังเส้นทางที่ร้องขอ
});

export default router
