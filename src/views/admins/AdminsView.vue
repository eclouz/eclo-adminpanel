<script lang="ts">
import { defineComponent } from 'vue'
import { AdminViewModel } from '@/viewmodels/AdminViewModels'
import AdminViewComponent from '@/components/admins/AdminViewComponent.vue'
import AdminSkeletonComponent from '@/components/admins/AdminSkeletonComponent.vue'

import AdminSearchAddComponent from '@/components/admins/AdminSearchAddComponent.vue'
import axios from '@/plugins/axios'
import { getToken } from '@/helpers/TokenHelper'
import { PaginationMetaData } from "@/Utils/PaginationUtils";


export default defineComponent({
    name: 'SearchItems',
    components: {
        AdminViewComponent,
        AdminSearchAddComponent,
        AdminSkeletonComponent
    },
    methods: {
        async getDataAsync(page: Number) {
            this.isLoaded = false;
            const token = getToken();
            const response = await axios.get<AdminViewModel[]>('/api/head/admins?page=1', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            if (response.data.length >= 0) {
                this.isLoaded = true;
            }
            else {
                this.isLoaded = false;
            }
            console.log(response.data)
            this.usersList = response.data;

            const paginationJson = JSON.parse(response.headers['x-pagination']);
            this.metaData = new PaginationMetaData();
            this.metaData.currentPage = paginationJson.CurrentPage;
            this.metaData.totalPages = paginationJson.TotalPages;
            this.metaData.hasNext = paginationJson.HasNext;
            this.metaData.hasPrevious = paginationJson.HasPrevious;
            this.metaData.pageSize = paginationJson.PageSize;
            this.metaData.totalItems = paginationJson.TotalItems;
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
        },
        async CountAllAdminAsync(){
            const token = getToken();

            const response = await axios.get('/api/head/admins/count', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            this.countAllAdmins = response.data;
        }
    },
    data() {
        return {
            defaultSkeletons: 1 as number,
            isLoaded: false as boolean,
            metaData: new PaginationMetaData(),
            searchQuery: '',

            countAllAdmins: 0 as number,

            usersList: [] as AdminViewModel[],

            hasNext: false,
            hasPrevious: false,            
            currentPage: 1 as number,
            totalPages: 1 as number
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
    setup() {

    },
    async mounted() {
        await this.getDataAsync(1);
        await this.CountAllAdminAsync();
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
                    <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 6 10">
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
            <div class="flex items-center flex-1 space-x-4">
                <h5>
                    <span class="text-gray-500">{{ $t('all admins') }}: </span>
                    <span class="dark:text-white">{{countAllAdmins}}</span>
                </h5>
            </div>
            <label for="table-search" class="sr-only">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input @keyup.enter="searchOnEnter" v-model="searchQuery" @input="performSearch" type="text"
                    class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="">
            </div>
            <AdminSearchAddComponent></AdminSearchAddComponent>
        </div>
        <!-- end:: SearchPanel -->
        <!--begin:: Admins Skeletons-->
        <div v-show="isLoaded == false">
            <template v-for="element in defaultSkeletons">
                <AdminSkeletonComponent></AdminSkeletonComponent>
            </template>
        </div>
        <!--end:: Admins Skeletons-->
        <!-- begin:: Users -->
        <div v-show="isLoaded == true">
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
                        <AdminViewComponent :id=element.id :firstName=element.firstName :lastName=element.lastName
                            :phoneNumber=element.phoneNumber :imagePath=element.imagePath
                            :passportSerialNumber=element.passportSerialNumber :birthDate=element.birthDate
                            :region=element.region :district=element.district :address=element.address
                            :createdAt=element.createdAt :updatedAt=element.updatedAt>
                        </AdminViewComponent>
                    </template>
                </tbody>
            </table>
        </div>
        <!-- end:: Users -->
    </div>

    <!--begin:: Pagination-->
    <nav class="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
        aria-label="Table navigation">
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing
            <span class="font-semibold text-gray-900 dark:text-white"> {{ metaData.totalItems }} -</span>
            <span class="font-semibold text-gray-900 dark:text-white"> {{ metaData.pageSize }} </span>
            of
            <span class="font-semibold text-gray-900 dark:text-white">{{ metaData.totalPages }}</span>
        </span>
        <ul class="inline-flex items-stretch -space-x-px">
            <li v-show="metaData.hasPrevious == true">
                <button @click="getDataAsync(metaData.currentPage - 1)"
                    class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white">
                    <span class="sr-only">Previous</span>
                    <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
            </li>
            <li v-for="el in metaData.totalPages">
                <!-- <a href="#"
                                class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a> -->
                <button @click="getDataAsync(el)"
                    class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    {{ el }}
                </button>
            </li>

            <li v-show="metaData.hasNext == true">
                <button @click="getDataAsync(metaData.currentPage + 1)"
                    class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span class="sr-only">Next</span>
                    <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
            </li>
        </ul>
    </nav>
    <!--end:: Pagination-->
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const t = useI18n()
</script>
<style scoped></style>
