<script lang="ts">

import { defineComponent } from 'vue'
import IconAdd from '../icons/common/IconAdd.vue'
import axios from '@/plugins/axios';

import { getToken } from '@/helpers/TokenHelper';

export default defineComponent({
    components: {
        IconAdd
    },
    data() {
        return {
            name: "" as String,
            iconFilePath: null as File | null,
            showCreateModal: false as Boolean
        }
    },
    methods: {
        async uploadImageAsync() {
        const token = getToken();  
            
            if (this.iconFilePath) {
                const formData = new FormData();
                formData.append('Name', this.name.toString());
                formData.append('BrandIconPath', this.iconFilePath);
                try {
                    const response = await axios.post('/api/admin/brands', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': 'Bearer ' + token                          
                        },
                    });
                    console.log('Upload successful!', response.data);
                    this.showCreateModal = false;
                    location.reload();
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            }
        },
        handleFileChange(event: any) {
            const files = event.target.files;
            if (files && files.length > 0) {
                this.iconFilePath = files[0];
            }
            else {
                this.iconFilePath = null;   
            }
        },
        openCreateModal() {
            this.showCreateModal = true;
        },
        closeCreateModal() {
            this.showCreateModal = false;
        }
    }
});
</script>
<template>
    <div class="flex items-center justify-between pl-1 pt-1 pb-4">
        <!-- begin:: Brand ADD -->
        <div class="grid justify-items-end">
            <button @click="openCreateModal"
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 font-medium rounded-full text-sm px-2 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                <IconAdd></IconAdd>
            </button>
        </div>
        <form v-if="showCreateModal" action="#"
            class="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center bg-black bg-opacity-50">
            <div class="relative w-full max-w-lg max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <!-- Modal header -->
                    <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Brand Add Window
                        </h3>
                        <button @click="closeCreateModal" type="button"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <div class="p-6 space-y-6">
                        <div>
                            <div class="mb-6">
                                <label for="first_name"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand name</label>
                                <input type="text" v-model="name"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="John" required>
                            </div>
                            <div class="mb-3">
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    for="file_input">Upload image</label>
                                <input accept="image/jpeg, image/png, image/jpg" @change="handleFileChange"
                                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    type="file">
                            </div>
                        </div>
                    </div>
                    <!-- Modal footer -->
                    <div class="flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button @click="uploadImageAsync" type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                    <button @click="closeCreateModal" type="button"
                        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                </div>
            </div>
        </div>
        </form>
        <!-- end:: Brand ADD -->
    </div>
</template>