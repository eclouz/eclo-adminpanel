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
        }

    },
    setup() {
        const { t } = useI18n();
    },
    data() {
        return {
            subcategoriesList: [] as SubcategoryViewModel[],
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
                <SubcategorySearchComponent></SubcategorySearchComponent>
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
                    <template v-for="element in subcategoriesList">
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