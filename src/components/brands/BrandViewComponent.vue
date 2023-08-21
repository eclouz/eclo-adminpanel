<script lang="ts">
import IconDelete from "../../components/icons/common/IconDelete.vue"
import IconEdit from "../../components/icons/common/IconEdit.vue"
import { formatDate } from "@/helpers/DateHelper"
import { defineComponent } from 'vue'
import axios from '@/plugins/axios'

export default defineComponent({
    components: {
        IconDelete, IconEdit
    },
    props: {
        id: Number,
        name: String,
        brandIconPath: String,
        createdAt: Date,
        updatedAt: Date
    },
    data() {
        return {
            baseURL: "" as String,
            iconFullPath: "" as String,
            createdAtString: "" as String,
            updatedAtString: "" as String
        }
    },
    methods: {
        load() {
            this.baseURL = axios.defaults.baseURL!;
            this.iconFullPath = this.baseURL + "/" + this.brandIconPath;
            this.createdAtString = formatDate(this.createdAt!);
            this.updatedAtString = formatDate(this.updatedAt!);
        }
    },
    mounted() {
        this.load();
    }
})
</script>

<template>
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td class="w-4 p-4">
            <div class="flex items-center">
                <input id="checkbox-table-3" type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="checkbox-table-3" class="sr-only">checkbox</label>
            </div>
        </td>
        <td class="px-6 py-4">
            #{{ id }}
        </td>
        <td class="w-32 p-6">
            <img v-bind:src="iconFullPath"/>
        </td>
        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
            {{ name }}
        </td>
        <td class="px-6 py-4">
            {{ createdAtString }}
        </td>
        <td class="px-6 py-4">
            {{ updatedAtString }}
        </td>
        <td class="px-6 py-14 flex justify-center items-center">
            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                <IconEdit></IconEdit>
            </a>
            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                <IconDelete></IconDelete>
            </a>
        </td>
    </tr>
</template>