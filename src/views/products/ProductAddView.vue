<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue';
import { ref } from 'vue';
import axios from 'axios';
const t = useI18n()
const dataList = ref<CategoryViewModel[]>([]);
async function loadData() {
const response = await axios.get<CategoryViewModel[]>("http://localhost:5000/api/categories");
  dataList.value = response.data;
}
onMounted(loadData);
</script>

<template>
    <!--begin:: Categories-->
    <ul>
      <template v-for="element in dataList">
        <div
          class="card flex h-48 mt-5 mb-5 me-5 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div class="flex justify-content-start">
            <img style="height: 100%; width: 100%; object-fit: cover;" class="rounded-lg"
              src="https://australianmadeclothes.com.au/cdn/shop/files/HOMEPAGE_BANNER_2.png" />
          </div>
          <div class="p-4 justify-content-between">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ element.name }}</h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">{{ element.description }}</p>
            <div class="flex flex-wrap items-center mt-5 mb-5">
              <IconCalendar></IconCalendar>
              <p class="me-5 mx-1 font-normal bold text-gray-700 dark:text-gray-400">{{ element.createdAt }}</p>
              <IconCalendarEdit></IconCalendarEdit>
              <p class="mx-1 font-normal bold text-gray-700 dark:text-gray-400">{{ element.updatedAt }}</p>
            </div>
          </div>
          <div class="p-4 justify-content-end">
            <button type="button"
              class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <IconEdit></IconEdit>
            </button>
            <button type="button"
              class="mt-5 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
              <IconDelete></IconDelete>
            </button>
          </div>
        </div>
      </template>
    </ul>
    <!--end:: Categories-->
  </template>

<style scoped></style>