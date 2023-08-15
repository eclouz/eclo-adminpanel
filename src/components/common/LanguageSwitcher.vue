<script setup lang="ts"></script>

<template>
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <div class="flex items-center md:order-2">
            <button type="button" data-dropdown-toggle="language-dropdown-menu"
                class="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                <img class="w-5 h-5 mr-2 rounded-full" aria-hidden="true" src="../../assets/lang-icons/en.svg"/>
                English (US)
            </button>
            <!-- Dropdown -->
            <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
                id="language-dropdown-menu">
                <ul class="py-2 font-medium" role="none">
                    <li>
                        <a href="#"
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem">
                            <div class="inline-flex items-center">
                                <img class="w-5 h-5 mr-2 rounded-full" aria-hidden="true" src="../../assets/lang-icons/en.svg"/>
                                English (US)
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem">
                        <div class="inline-flex items-center">
                            <img class="w-5 h-5 mr-2 rounded-full" aria-hidden="true" src="../../assets/lang-icons/uz.svg"/>
                            O'zbekcha
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem">
                        <div class="inline-flex items-center">
                            <img class="w-5 h-5 mr-2 rounded-full" aria-hidden="true" src="../../assets/lang-icons/qq.svg"/>
                            Qaraqalpaqsha
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem">
                        <div class="inline-flex items-center">
                            <img class="w-5 h-5 mr-2 rounded-full" aria-hidden="true" src="../../assets/lang-icons/ru.svg"/>
                            Русский
                        </div>
                    </a>
                </li>
            </ul>
            </div>
        </div>
    </div>
</template>

<style scoped></style>