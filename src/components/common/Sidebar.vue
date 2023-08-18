<script setup lang="ts">
import IconDashboard from '../icons/IconDashboard.vue'
import IconBrands from '../icons/IconBrands.vue'
import IconCategories from '../icons/IconCategories.vue'
import IconDiscounts from '../icons/IconDiscounts.vue'
import IconUsers from '../icons/IconUsers.vue'
import IconProducts from '../icons/IconProducts.vue'
import IconSettings from '../icons/IconSettings.vue'
import IconSignIn from '../icons/IconSignIn.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
    <aside id="sidebar-multi-level-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar">
        <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul class="space-y-2 font-medium">
                <li>
                    <router-link to="/dashboard">
                        <div
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <IconDashboard></IconDashboard>
                            <span class="ml-3">{{ $t('dashboard') }}</span>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/brands">
                        <div
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <IconBrands></IconBrands>
                            <span class="ml-3">{{ $t('brands') }}</span>
                        </div>
                    </router-link>
                </li>
                <li>
                    <button type="button"
                        class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                        aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                        <IconCategories></IconCategories>
                        <span class="flex-1 ml-3 text-left whitespace-nowrap">{{ $t('categories') }}</span>
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    <ul id="dropdown-example" class="hidden py-2 space-y-2">
                        <li>
                            <RouterLink to="/categories">
                                <div href="#"
                                    class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                    {{
                                        $t('categories') }}</div>
                            </RouterLink>

                        </li>
                        <li>
                            <RouterLink to="/subcategories">
                                <a href="#"
                                    class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                    {{
                                        $t('subcategories') }}</a>
                            </RouterLink>

                        </li>
                    </ul>
                </li>
                <li>
                    <router-link to="/discounts">
                        <div
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <IconDiscounts></IconDiscounts>
                            <span class="flex-1 ml-3 whitespace-nowrap">{{ $t('discounts') }}</span>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/products">
                        <div
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <IconProducts></IconProducts>
                            <span class="flex-1 ml-3 whitespace-nowrap">{{ $t('products') }}</span>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/users">
                        <div
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <IconUsers></IconUsers>
                            <span class="flex-1 ml-3 whitespace-nowrap">{{ $t('users') }}</span>
                        </div>
                    </router-link>
                </li>



                <li>
                    <router-link to="/settings">
                        <div
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <IconSettings></IconSettings>
                            <span class="flex-1 ml-3 whitespace-nowrap">{{ $t('settings') }}</span>
                        </div>
                    </router-link>
                </li>

                <!-- <li>
                    <router-link to="/auth">
                        <div class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <IconSignIn></IconSignIn>
                            <span class="flex-1 ml-3 whitespace-nowrap">Sign In</span>
                        </div>
                    </router-link>
                </li> -->
            </ul>
        </div>
    </aside>
</template>

<style scoped></style>