<script setup lang="ts">
    import { useI18n } from 'vue-i18n'
    const { t } = useI18n()
</script>

<template>
    <footer
        class="mt-10 bottom-0 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/"
                class="hover:underline">Eclo™</a>.{{ $t(' all rights reserved.') }}
        </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
                <a href="#" class="mr-4 hover:underline md:mr-6">{{ $t('about') }}</a>
            </li>
            <li>
                <a href="#" class="mr-4 hover:underline md:mr-6">{{ $t('privacy policy') }}</a>
            </li>
            <li>
                <a href="#" class="mr-4 hover:underline md:mr-6">{{ $t('licensing') }}</a>
            </li>
            <li>
                <a href="#" class="hover:underline">{{ $t('contact') }}</a>
            </li>
        </ul>
    </footer>
</template>

<style></style>