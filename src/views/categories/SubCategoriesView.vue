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
        async getDataAsync() {
            this.isLoaded = false;
            var response = await axios.get<SubcategoryViewModel[]>("/api/common/subcategories?page=1");
            this.isLoaded = true;
            this.subcategoriesList = response.data;
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
            isLoaded: false as Boolean
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
        await this.getDataAsync();
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
            <SubcategoryFilterComponent></SubcategoryFilterComponent>
            <!--Filter end-->

            <div class="flex items-center">
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
                <SubcategoryCreateModalComponent></SubcategoryCreateModalComponent>
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

            <!--Table End-->
            <SubcategoryPagenationComponent></SubcategoryPagenationComponent>


        </div>
    </div>
</template>
<style scoped></style>