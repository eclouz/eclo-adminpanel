<template>
    <aside id="logo-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar">
        <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul class="space-y-2 font-medium">
                <li>
                    <router-link to="/dashboard">
                        <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <IconDashboard></IconDashboard>
                            <span class="ml-3">Dashboard</span>
                        </a>
                    </router-link>
                </li>
                <li>
                    <router-link to="/brands">
                            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <IconBrands></IconBrands>
                            <span class="flex-1 ml-3 whitespace-nowrap">Brands</span>
                        </a>
                    </router-link>
                </li>
                <li>
                    <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <IconCategories></IconCategories>
                        <span class="flex-1 ml-3 whitespace-nowrap">Categories</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <IconDiscounts></IconDiscounts>
                        <span class="flex-1 ml-3 whitespace-nowrap">Discounts</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <IconProducts></IconProducts>
                        <span class="flex-1 ml-3 whitespace-nowrap">Products</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <IconUsers></IconUsers>
                        <span class="flex-1 ml-3 whitespace-nowrap">Users</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <IconSettings></IconSettings>
                        <span class="flex-1 ml-3 whitespace-nowrap">Settings</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <IconSignIn></IconSignIn>
                        <span class="flex-1 ml-3 whitespace-nowrap">Sign In</span>
                    </a>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script setup lang="ts">
import IconDashboard from '../icons/IconDashboard.vue'
import IconBrands from '../icons/IconBrands.vue'
import IconCategories from '../icons/IconCategories.vue'
import IconDiscounts from '../icons/IconDiscounts.vue'
import IconUsers from '../icons/IconUsers.vue'
import IconProducts from '../icons/IconProducts.vue'
import IconSettings from '../icons/IconSettings.vue'
import IconSignIn from '../icons/IconSignIn.vue'
</script>

<style scoped>
</style>