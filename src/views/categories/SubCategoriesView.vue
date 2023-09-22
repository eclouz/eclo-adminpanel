<script lang="ts">
import { SubcategoryViewModel } from "@/viewmodels/SubcategoryViewModels";

import SubcategoryTableHeadComponent from "@/components/subcategories/SubcategoryTableHeadComponent.vue";
import SubcategoryTableBodyComponent from "@/components/subcategories/SubcategoryTableBodyComponent.vue";
import SubcategoryBreadCrumbComponent from "@/components/subcategories/SubcategoryBreadCrumbComponent.vue";
import SubcategoryFilterComponent from "@/components/subcategories/SubcategoryFilterComponent.vue";
import SubcategorySearchComponent from "@/components/subcategories/SubcategorySearchComponent.vue";
import SubcategoryCreateModalComponent from "@/components/subcategories/SubcategoryCreateModalComponent.vue";
import SubcategoryPagenationComponent from "@/components/subcategories/SubcategoryPagenationComponent.vue";
import SubcategorySkeletonComponent from "@/components/subcategories/SubcategorySkeletonComponent.vue";
import { defineComponent } from 'vue';
import axios from '@/plugins/axios';
import { useI18n } from 'vue-i18n'
import { PaginationMetaData } from "@/Utils/PaginationUtils";


export default defineComponent({
    props: {

    },
    components: {
        SubcategoryTableHeadComponent,
        SubcategoryTableBodyComponent,
        SubcategoryBreadCrumbComponent,
        SubcategoryFilterComponent,
        SubcategorySearchComponent,
        SubcategoryPagenationComponent,
        SubcategoryCreateModalComponent,
        SubcategorySkeletonComponent

    },
    methods: {
        async getDataAsync(page:Number) {
            this.isLoaded = false;
            var response = await axios.get<SubcategoryViewModel[]>("/api/common/subcategories?page="+page);
            this.isLoaded = true;
            this.subcategoriesList = response.data;

            const paginationJson = JSON.parse(response.headers['x-pagination']);
            this.metaData = new PaginationMetaData();
            this.metaData.currentPage = paginationJson.CurrentPage;
            this.metaData.totalPages = paginationJson.TotalPages;
            this.metaData.hasNext = paginationJson.HasNext;
            this.metaData.hasPrevious = paginationJson.HasPrevious;               
            this.metaData.pageSize= paginationJson.PageSize;
            this.metaData.totalItems = paginationJson.TotalItems; 

        },
        performSearch() {
            const query = this.searchQuery.toLowerCase();
            if (query === '') {
                return this.subcategoriesList;
            }
            const filteredItems = this.subcategoriesList.filter(subcategory =>
                subcategory.name.toLowerCase().includes(query) ||
                subcategory.categoryName.toLowerCase().includes(query)
            );
            return filteredItems;
        },
        searchOnEnter() {
            this.performSearch();
        }
    },
    setup() {
        const { t } = useI18n();
    },
    data() {
        return {
            searchQuery: '',
            subcategoriesList: [] as SubcategoryViewModel[],
            defaultSkeletons: 1 as Number,
            isLoaded: false as Boolean,
            metaData: new PaginationMetaData(),
            

        }
    },
    computed: {
        filteredItems() {
        const query = this.searchQuery.toLowerCase();
            return this.subcategoriesList.filter(subcategory =>
                subcategory.name.toLowerCase().includes(query) ||
                subcategory.categoryName.toLowerCase().includes(query)
            );
        },
    },
    async mounted() {
        await this.getDataAsync(1);
    }

});

</script>

<template>
    <!--begin:: BreadCrumb-->
    <SubcategoryBreadCrumbComponent></SubcategoryBreadCrumbComponent>
    <!--end:: BreadCrumb-->

    <!--begin:: SubCategories Skeletons-->
    <ul v-show="isLoaded == false">
        <template v-for="element in defaultSkeletons">
            <SubcategorySkeletonComponent>
            </SubcategorySkeletonComponent>
        </template>
    </ul>
    <!--end:: SubCategories Skeletons-->

    <div v-show="isLoaded == true">
        <div class="flex items-center justify-between">
            <!--Filter start-->
            <!-- <SubcategoryFilterComponent></SubcategoryFilterComponent> -->
            <!--Filter end-->

            <div class="flex items-center ">
                <!--Search start-->
                <!-- <SubcategorySearchComponent></SubcategorySearchComponent> -->
                <label for="table-search" class="sr-only">Search</label>
                <div class="relative ">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <input type="text" @keyup.enter="searchOnEnter" v-model="searchQuery" @input="performSearch"
                        class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for items">
                </div>
                <!--Search end-->

                <!--begin:: Create Modal-->
                <SubcategoryCreateModalComponent class="flex items-center"></SubcategoryCreateModalComponent>
                <!--end:: Create Modal-->
            </div>
        </div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">

            <!--Table Start-->

            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">

                <!--begin:: Table Head-->
                <SubcategoryTableHeadComponent></SubcategoryTableHeadComponent>
                <!--end:: Table Head-->

                <!--Table Body Start-->
                <tbody>
                    <template v-for="element in filteredItems">
                        <SubcategoryTableBodyComponent 
                            :id=element.id
                            :category-id=element.categoryid
                            :name=element.name
                            :category-name=element.categoryName
                            :created-at=element.createdAt
                            :updated-at=element.updatedAt>

                        </SubcategoryTableBodyComponent>
                    </template>


                </tbody>
                <!--Table Body End-->
            </table>
            <nav class="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
                    aria-label="Table navigation">
                    <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                        Showing
                        <span class="font-semibold text-gray-900 dark:text-white"> {{ metaData.totalItems }}  -</span>
                        <span class="font-semibold text-gray-900 dark:text-white"> {{ metaData.pageSize }} </span>
                        of
                        <span class="font-semibold text-gray-900 dark:text-white">{{ metaData.totalPages }}</span>
                    </span>
                    <ul class="inline-flex items-stretch -space-x-px">
                        <li v-show="metaData.hasPrevious == true">
                            <button @click="getDataAsync(metaData.currentPage-1)" 
                                class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
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
                            <button @click="getDataAsync(el)" class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                {{ el }}
                            </button>
                        </li>
                      
                        <li v-show="metaData.hasNext == true">
                            <button @click="getDataAsync(metaData.currentPage+1)" 
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

            <!--Table End-->
            <!-- <SubcategoryPagenationComponent></SubcategoryPagenationComponent> -->


        </div>
    </div>
</template>
<style scoped></style>