import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      redirect: '/dashboard',
      component: ()=>import('../layouts/Layout.vue'),
      children: [
        {
          path: 'dashboard',
          component: () => import('../views/dashboard/DashboardView.vue')
        },
        {
          path: 'brands',
          component: () => import('../views/brands/BrandsView.vue')
        },
        {
          path: 'categories',
          component: ()=>import('../views/categories/CategoriesView.vue')
        },
        {
          path: 'discounts',
          component: ()=>import('../views/discounts/DiscountsView.vue')
        },
        {
          path: 'products',
          component: ()=>import('../views/products/ProductsView.vue')
        },
        {
          path: 'users',
          component: ()=>import('../views/users/UsersView.vue')
        },
        {
          path: 'settings',
          component: ()=>import('../views/settings/SettingsView.vue')
        }
      ]
    },
    {
      path: '/auth',
      component: () => import('../layouts/AuthLayout.vue'),
      redirect: '/auth/login',
      children: [
        {
          path: 'login',
          component: () => import('../views/auth/LoginView.vue'),
        },
        {
          path: 'reset-password',
          component: () => import('../views/auth/ForgotPasswordView.vue')
        }
      ]
    },
  ]
})

export default router