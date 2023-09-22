import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      redirect: '/auth/login',
      component: ()=>import('../layouts/Layout.vue'),
      children: [
        {
          path: 'dashboard',
          component: () => import('../views/dashboard/DashboardView.vue'),
          meta: { requiresAuth: true }
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
          path: 'subcategories',
          component: ()=>import('../views/categories/SubCategoriesView.vue')
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
          path: 'admins',
          component: ()=>import('../views/admins/AdminsView.vue')
        },
        {
          path: 'settings',
          component: ()=>import('../views/settings/SettingsView.vue')
        },
        {
          path: 'account',
          component: ()=>import('../views/account/AccountView.vue')
        },
        {
          path: 'add-product',
          component: ()=>import('../views/products/ProductAddView.vue')
        },
        {
          path : 'update-product/:id',
          name: 'product-update',
          component: ()=>import('../views/products/ProductUpdateView.vue')
        },
        {
          path : 'update-product/:id/edit-details/:idDetail',
          name: 'product-detail-edit',
          component: ()=>import('../views/products/ProductDetailsEditView.vue')
        },
        
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
        },
        {
          path:'verify',
          component: ()=> import('../views/auth/VerifyView.vue')
        },
        {
          path:'change-password',
          component: ()=>import('../views/auth/ChangePasswordView.vue')
        }

      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  const token = Cookies.get('access_token');
  if (to.path !== '/auth/login') {
    if (token) {
      try {
        const payload = jwtDecode(token)
        const currentTime = Math.floor(Date.now() / 1000); 
        if ((payload as any).exp < currentTime) {
          next('/auth/login');
        } else {
           if ((payload as { [key: string]: string })['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Head' || (payload as { [key: string]: string })['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin') {
            next(); 
          } else {
            next("/");
          }
        }
      } catch (error) {
        next('/auth/login');
      }
    } else {
      next('/auth/login');
    }
  } else {
    next();
  }
});

export default router