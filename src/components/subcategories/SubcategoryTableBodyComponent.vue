<script lang="ts">

import SubcategoryEditComponent from "@/components/subcategories/SubcategoryEditComponent.vue";
import SubcategoryDeleteComponent from "@/components/subcategories/SubcategoryDeleteComponent.vue";

import axios from '@/plugins/axios';
import { formatDate } from "@/helpers/DateHelper";
import { defineComponent } from "vue";

export default defineComponent({
    components: {
        SubcategoryEditComponent,
        SubcategoryDeleteComponent
    },
    props: {
        categoryId: Number,
        name: String,
        categoryName: String,
        createdAt: Date,
        updatedAt: Date,
        id: Number
    },
    data() {
        return {
            baseURL: "" as String,
            createdAtString: "" as String,
            updatedAtString: "" as String
        }
    },
    methods: {
        load() {
            this.baseURL = axios.defaults.baseURL!;
            
            this.createdAtString = formatDate(this.createdAt!);
            this.updatedAtString = formatDate(this.updatedAt!);
        },

    },
    mounted() {
        this.load();
    }
});
</script>

<template>
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td class="w-4 p-4">
            <div class="flex items-center">
                <input id="checkbox-table-search-1" type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
            </div>
        </td>
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            #{{ id }}
        </th>
        <td class="px-6 py-4">
            {{ name }}
        </td>
        <td class="px-6 py-4">
            {{ categoryName }}
        </td>
        <td class="px-6 py-4">
            {{ createdAtString }}
        </td>
        <td class="px-6 py-4">
            {{ updatedAtString }}
        </td>

        <!--For Action Start-->
        <td class="px-6 py-4 flex justify-start">
            <div>
                <!--begin:: Edit Modal-->
                <SubcategoryEditComponent 
                    :id-prop=id
                    :id-category-prop=categoryId
                    :name-prop=name
                    :name-ctegory-prop=categoryName
                    >
                
                </SubcategoryEditComponent>
                <!--end:: Edit Modal-->

                <!--begin:: Delete Modal-->
                <SubcategoryDeleteComponent :id-sub-category=id></SubcategoryDeleteComponent>
                <!--end:: Delete Modal-->
            </div>
        </td>
        <!--For Action End-->
    </tr>
</template>

@/Helpers/DateHelper