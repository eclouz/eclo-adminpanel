<script lang="ts">
import { defineComponent } from 'vue'
import { AdminViewModel } from '@/viewmodels/AdminViewModels'
import AdminViewComponent from '@/components/admins/AdminViewComponent.vue'
import AdminSearchAddComponent from '@/components/admins/AdminSearchAddComponent.vue'
import axios from '@/plugins/axios'
import { getToken } from '@/helpers/TokenHelper'

export default defineComponent({
    name: 'SearchItems',
    components: {
        AdminViewComponent,
        AdminSearchAddComponent
    },
    methods: {
        async getDataAsync() {
            const token = getToken();
            const response = await axios.get<AdminViewModel[]>('/api/head/admins?page=1', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            this.usersList = response.data;
        },
        performSearch() {
            const query = this.searchQuery.toLowerCase();
            if (query === '') {
                return this.usersList;
            }
            const filteredItems = this.usersList.filter(user =>
                user.firstName.toLowerCase().includes(query) ||
                user.lastName.toLowerCase().includes(query) ||
                user.phoneNumber.toLowerCase().includes(query)
            );
            return filteredItems;
        },
        searchOnEnter() {
            this.performSearch();
        }
    },
    data() {
        return {
            searchQuery: '',
            usersList: [] as AdminViewModel[]
        }
    },
    computed: {
        filteredItems() {
        const query = this.searchQuery.toLowerCase();
            return this.usersList.filter(user =>
                user.firstName.toLowerCase().includes(query) ||
                user.lastName.toLowerCase().includes(query) ||
                user.phoneNumber.toLowerCase().includes(query)
            );
        },
    },
    setup(){

    },
    async mounted() {
        await this.getDataAsync();
    }
});
</script>

<template>
    <!--begin:: BreadCrumb-->
    <nav class="flex mb-5" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <a href="#"
            class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
              viewBox="0 0 20 20">
              <path
                d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            <!-- {{ $t('home') }} -->
          </a>
        </li>
        <li>
          <div class="flex items-center">
            <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 9 4-4-4-4" />
            </svg>
            <a
              class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
              {{ $t('admins') }} </a>
          </div>
        </li>
      </ol>
    </nav>
    <!--end:: BreadCrumb-->

    <div class="relative shadow-md sm:rounded-lg">
        <!-- begin:: SearchPanel -->
        <div class="flex items-center justify-between py-4 bg-white dark:bg-gray-800">
            <label for="table-search" class="sr-only">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input @keyup.enter="searchOnEnter" v-model="searchQuery" @input="performSearch" type="text" class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for admins">
            </div>
            <AdminSearchAddComponent></AdminSearchAddComponent>
        </div>
        <!-- end:: SearchPanel -->
        <!-- begin:: Users -->
        <div>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <!-- <th scope="col" class="p-4">
                            <div class="flex items-center">
                                <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="checkbox-all-search" class="sr-only">checkbox</label>
                            </div>
                        </th> -->
                        <th scope="col" class="px-6 py-3">
                            <span> #Id </span>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            {{ $t('fullname') }} 
                        </th>
                        <th scope="col" class="px-6 py-3">
                            {{ $t('passport serial') }} 
                        </th>
                        <th scope="col" class="px-6 py-3">
                            {{ $t('birth date') }}
                        </th>
                        <th scope="col" class="px-6 py-3">
                            {{ $t('address') }}
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
                <tbody>
                    <template v-for="element in filteredItems">
                        <AdminViewComponent
                            :id=element.id
                            :firstName=element.firstName
                            :lastName=element.lastName
                            :phoneNumber=element.phoneNumber
                            :imagePath=element.imagePath
                            :passportSerialNumber=element.passportSerialNumber
                            :birthDate=element.birthDate
                            :region=element.region
                            :district=element.district
                            :address=element.address
                            :createdAt=element.createdAt
                            :updatedAt=element.updatedAt>
                        </AdminViewComponent>
                    </template>
                </tbody>
            </table>
        </div>
        <!-- end:: Users -->
    </div>

    <!--begin:: Pagination-->
    <nav class="flex items-center justify-between pt-4" aria-label="Table navigation">
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span class="font-semibold text-gray-900 dark:text-white">1-10</span> of <span class="font-semibold text-gray-900 dark:text-white">1000</span></span>
            <ul class="inline-flex -space-x-px text-sm h-8">
                <li>
                    <a href="#" class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                </li>
                <li>
                    <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                </li>
                <li>
                    <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                </li>
                <li>
                    <a href="#" aria-current="page" class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                </li>
                <li>
                    <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                </li>
                <li>
                    <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                </li>
                <li>
                    <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                </li>
            </ul>
    </nav>
    <!--end:: Pagination-->
</template>

<style scoped></style>