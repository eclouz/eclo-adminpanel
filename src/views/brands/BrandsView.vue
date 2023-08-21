<script lang="ts">
import { defineComponent } from 'vue'
import { BrandViewModel } from '@/viewmodels/BrandViewModels';
import BrandViewComponent from '@/components/brands/BrandViewComponent.vue'
import BrandSkeletonComponent from '@/components/brands/BrandSkeletonComponent.vue'
import BrandSearchAddComponent from '@/components/brands/BrandSearchAddComponent.vue'
import axios from '@/plugins/axios'
import { useI18n } from 'vue-i18n'

export default defineComponent({
    components: {
        BrandViewComponent,
        BrandSkeletonComponent,
        BrandSearchAddComponent,
    },
    methods: {
        async getDataAsync() {
            this.isLoaded = false
            var response = await axios.get<BrandViewModel[]>('/api/common/brands?page=1')
            this.isLoaded = true
            this.brandsList = response.data
        }
    },
    data() {
        return {
            brandsList: [] as BrandViewModel[],
            defaultSkeletons: 1 as Number,
            isLoaded: false as Boolean
        }
    },
    setup() {
        const { t } = useI18n();
    },
    async mounted() {
        await this.getDataAsync();
    },
})
</script>

<template>
    <!--begin:: Brands Skeletons-->
    <div v-show="isLoaded == false">
        <template v-for="element in defaultSkeletons">
            <BrandSkeletonComponent></BrandSkeletonComponent>
        </template>
    </div>
    <!--end:: Brands Skeletons-->

    <div v-show="isLoaded == true">
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
                            class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">{{
                                $t('brands') }}</a>
                    </div>
                </li>
            </ol>
        </nav>
        <!--end:: BreadCrumb-->

        <!--begin:: Brands-->
        <div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <BrandSearchAddComponent></BrandSearchAddComponent>
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 text-center">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="p-4">
                                <div class="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="checkbox-all-search" class="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span> #Id </span>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span> Image </span>
                            </th>
                            <th scope="col" class="px-6 py-3 ">
                                Brand name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Created date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Updated date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="element in brandsList">
                            <BrandViewComponent 
                                :id=element.id
                                :brandIconPath=element.brandIconPath
                                :name=element.name 
                                :createdAt=element.createdAt
                                :updatedAt=element.updatedAt>
                            </BrandViewComponent>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
        <!--end:: Brands-->

        <!--begin:: Pagination-->
        <nav class="flex items-center justify-between pt-4" aria-label="Table navigation"> 
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span
                    class="font-semibold text-gray-900 dark:text-white">1-10</span> of <span
                    class="font-semibold text-gray-900 dark:text-white">1000</span></span>
            <ul class="inline-flex -space-x-px text-sm h-8">
                <li>
                    <a href="#"
                        class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                </li>
                <li>
                    <a href="#"
                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                </li>
                <li>
                    <a href="#"
                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                </li>
                <li>
                    <a href="#" aria-current="page"
                        class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                </li>
                <li>
                    <a href="#"
                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                </li>
                <li>
                    <a href="#"
                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                </li>
                <li>
                    <a href="#"
                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                </li>
            </ul>
        </nav>
        <!--end:: Pagination-->
    </div>
</template>

<style scoped></style>