<script  lang="ts">
import { defineComponent } from 'vue';
import { CategoryViewModel } from '@/viewmodels/CategoryViewModels';
import CategoryTabelBodyComponents from '@/components/categories/CategoryTabelBodyComponents.vue';
import CategoryBreadCrumbComponent from "@/components/categories/CategoryBreadCrumbComponent.vue";
import CategoryCreatModalComponents from "@/components/categories/CategoryCreatModalComponents.vue";
import CategorySkeletonComponent from '@/components/categories/CategorySkeletonComponent.vue';
import CategoryTableHeadComponent from "@/components/categories/CategoryTableHeadComponents.vue";
import axios from '@/plugins/axios';
import { useI18n } from 'vue-i18n';
import FlowbiteSetup from "@/FlowbiteSetup.vue";
export default defineComponent({
    props: {

    },
    components: {
        CategoryTabelBodyComponents,
        CategoryBreadCrumbComponent,
        CategoryCreatModalComponents,
        CategorySkeletonComponent,
        CategoryTableHeadComponent
    },
    methods: {
        async getDataAsync() {
            this.isLoaded = false;
            var response = await axios.get<CategoryViewModel[]>("/api/common/categories?page=1");
            this.isLoaded = true;
            this.categoriesList = response.data;
        },
        performSearch() {
            const query = this.searchQuery.toLowerCase();
            if (query === '') {
                return this.categoriesList;
            }
            const filteredItems = this.categoriesList.filter(category =>
                category.name.toLowerCase().includes(query)
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
            categoriesList: [] as CategoryViewModel[],
            defaultSkeletons: 1 as Number,
            isLoaded: false as Boolean
        }
    },
    computed: {
        filteredItems() {
        const query = this.searchQuery.toLowerCase();
            return this.categoriesList.filter(category =>
                category.name.toLowerCase().includes(query)
            );
        },
    },
    async mounted() {
        await this.getDataAsync();
    }
});
</script>

<template>
    <FlowbiteSetup></FlowbiteSetup>
    <!--begin:: BreadCrumb-->
    <CategoryBreadCrumbComponent></CategoryBreadCrumbComponent>
    <!--end:: BreadCrumb-->

    <!--begin:: Categories Skeletons-->
    <ul v-show="isLoaded == false">
        <template v-for="element in defaultSkeletons">
            <CategorySkeletonComponent class="mt-2 mb-3">
            </CategorySkeletonComponent>
        </template>
    </ul>
    <!--end:: Categories Skeletons-->

    <div v-show="isLoaded == true">
        <div class="flex justify-between items-center">
            <!-- begin:: SearchPanel -->
            <div class="flex items-center justify-end py-4 bg-white dark:bg-gray-800">
                <label for="table-search" class="sr-only">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input @keyup.enter="searchOnEnter" v-model="searchQuery" @input="performSearch" type="text" class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users">
                </div>
            </div>
            <!-- end:: SearchPanel -->
            
            <!--begin:: Create Modal-->
            <CategoryCreatModalComponents></CategoryCreatModalComponents>
            <!--end:: Create Modal-->
        </div>

        <!--begin:: Table-->
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">

                <!--begin:: Table Head-->
                <CategoryTableHeadComponent></CategoryTableHeadComponent>
                <!--end:: Table Head-->

                <!--Table Body Start-->
                <tbody>
                    <template v-for="element in filteredItems">
                        <CategoryTabelBodyComponents :id=element.id :name=element.name :description=element.description
                            :createdAt=element.createdAt :updatedAt=element.updatedAt>
                        </CategoryTabelBodyComponents>
                    </template>
                </tbody>
                <!--Table Body End-->
            </table>
        </div>
        <!--end:: Table-->

    </div>
</template>

<style scoped></style>
