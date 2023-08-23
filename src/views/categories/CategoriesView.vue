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
        }

    },
    setup() {
        const { t } = useI18n();
    },
    data() {
        return {
            categoriesList: [] as CategoryViewModel[],
            defaultSkeletons: 1 as Number,
            isLoaded: false as Boolean
        }
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

        <!--begin:: Create Modal-->
        <CategoryCreatModalComponents></CategoryCreatModalComponents>
        <!--end:: Create Modal-->

        <!--begin:: Table-->
        <div class="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">

                <!--begin:: Table Head-->
                <CategoryTableHeadComponent></CategoryTableHeadComponent>
                <!--end:: Table Head-->

                <!--Table Body Start-->
                <tbody>
                    <template v-for="element in categoriesList">
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
