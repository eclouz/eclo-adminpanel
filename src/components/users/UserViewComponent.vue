<script lang="ts">
import { formatDate } from '@/helpers/DateHelper'
import { defineComponent } from 'vue'
import axios from '@/plugins/axios'

export default defineComponent ({
    components: {

    },
    props: {
        id: Number,
        firstName: String,
        lastName: String,
        phoneNumber: String,
        imagePath: String,
        passportSerialNumber: String,
        birthDate: Date,
        region: String,
        district: String,
        address: String,
        createdAt: Date,
        updatedAt: Date
    },
    data() {
        return {
            baseURL: "" as string,
            imageFullPath: "" as string,
            birthDateString: "" as string,
            createdAtString: "" as String,
            updatedAtString: "" as String
        }
    },
    methods: {
        load() {
            this.baseURL = axios.defaults.baseURL!;
            this.imageFullPath = this.baseURL + "/" + this.imagePath;
            this.birthDateString = formatDate(this.birthDate!);
            this.createdAtString = formatDate(this.createdAt!);
            this.updatedAtString = formatDate(this.updatedAt!);
        },
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
                <input id="checkbox-table-search-1" type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
            </div>
        </td>
        <td class="px-6 py-4">
            #{{ id }}
        </td>
        <td scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
            <img class="w-10 h-10 rounded-full" v-bind:src="imageFullPath">
            <div class="pl-3">
                <div class="text-base font-semibold"> {{ firstName + " " + lastName}} </div>
                <div class="font-normal text-gray-500"> {{ phoneNumber }} </div>
            </div>
        </td>
        <td class="px-6 py-4">
            {{ passportSerialNumber }}
        </td>
        <td class="px-6 py-4">
            {{ birthDateString }}
        </td>
        <td class="px-6 py-4">
            {{ region + ", " + district + ", " + address}}
        </td>
        <td class="px-6 py-4">
            {{ createdAtString }}
        </td>
        <td class="px-6 py-4">
            {{ updatedAtString }}
        </td>
    </tr>
</template>@/Helpers/DateHelper