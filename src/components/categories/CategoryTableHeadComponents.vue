<script lang="ts">
import { useI18n } from 'vue-i18n'
import { defineComponent } from 'vue'

    export default defineComponent({
        setup() {
    const { t } = useI18n();
    
  },
})
</script>

<template>
    <!--Table Head Start-->
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr class="text-center">
            <th scope="col" class="p-4">
                <div class="flex items-center">
                    <input id="checkbox-all-search" type="checkbox"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="checkbox-all-search" class="sr-only">checkbox</label>
                </div>
            </th>
            <th scope="col" class="px-6 py-3">
                Id
            </th>
            <th scope="col" class="px-6 py-3">
                {{ $t('name') }}
            </th>
            <th scope="col" class="px-6 py-3">
                {{ $t('description') }}
            </th>
            <th scope="col" class="px-6 py-3">
                {{ $t('created date') }}
            </th>
            <th scope="col" class="px-6 py-3">
                {{ $t('updated date') }}
            </th>
            <th scope="col" class="px-6 py-3">
                {{ $t('action') }}
            </th>
        </tr>
    </thead>
    <!--Table Head End-->
</template>