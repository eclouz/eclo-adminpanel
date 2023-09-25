<script lang="ts">
import IconDelete from "../../components/icons/common/IconDelete.vue"
import IconEdit from "../../components/icons/common/IconEdit.vue"
import { formatDate } from "@/helpers/DateHelper"

import { defineComponent } from 'vue'
import axios from '@/plugins/axios'
import type { BrandViewModel } from "@/viewmodels/BrandViewModels"
import { getToken } from '@/helpers/TokenHelper'
export default defineComponent({
    components: {
        IconDelete, IconEdit
    },
    props: {
        id: Number,
        name: String,
        brandIconPath: String,
        createdAt: Date,
        updatedAt: Date,

        nameProp: String,
        iconPath: String,
        idProp: Number,
        refreshAction: Function,
    },
    data() {
        return {
            brandsList: [] as BrandViewModel[],
            showDeleteModal: false as Boolean,
            showEditModal: false as Boolean,

            baseURL: "" as String,
            iconFullPath: "" as string,
            createdAtString: "" as String,
            updatedAtString: "" as String,

            brandName: "",
            iconFilePath: null as File | null
        }
    },
    methods: {
        async submitForm() {
            const formData = new FormData();
            const token = getToken();   
            formData.append('Name', this.brandName);
            if (this.iconFilePath) {
                formData.append('BrandIconPath', this.iconFilePath);
                try {
                    const response = await axios.put('/api/admin/brands/' + this.id, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': 'Bearer ' + token
                        }
                    });
                    console.log('Update successful', response.data);
                    this.showEditModal = false;
                    location.reload();
                } catch (error) {
                    console.error('Update error', error);
                }
            }
        },
        async getDataAsync() {
            const response = await axios.get<BrandViewModel[]>('/api/common/brands?page=1');
            this.brandsList = response.data;
        },
        handleFileChange(event: any) {
            const fileInput = event.target as HTMLInputElement;
            if (fileInput.files && fileInput.files[0]) {
                this.iconFilePath = fileInput.files[0];
                console.log(this.iconFilePath)
            }
        },
        load() {
            this.baseURL = axios.defaults.baseURL!;
            this.iconFullPath = this.baseURL + "/" + this.brandIconPath;
            this.createdAtString = formatDate(this.createdAt!);
            this.updatedAtString = formatDate(this.updatedAt!);
        },
        async deleteDataAsync(id:any){
            const token = getToken();   
            await axios.delete("/api/admin/brands/" + id,{
                headers:{
                    'Authorization': 'Bearer ' + token
                }
            });
            this.showDeleteModal = false;
            // this.refreshAction();
            location.reload();
        },
        openDeleteModal() {
            this.showDeleteModal = true;
        },
        closeDeleteAsync() {
            this.showDeleteModal = false;
        },
        openEditModal() {
            this.brandName = this.nameProp!;
            this.iconFullPath = this.iconPath!;
            this.showEditModal = true;
        },
        closeEditAsync() {
            this.showEditModal = false;
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
        <td class="w-32 p-6" style="width: 25px; height: 25px;">
            <img v-bind:src="iconFullPath"/>
        </td>
        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ name }}
        </td>
        <td class="px-6 py-4">
            {{ createdAtString }}
        </td>
        <td class="px-6 py-4">
            {{ updatedAtString }}
        </td>
        <td class="px-6 py-14 flex justify-center items-center" >
            <div>
                <!-- begin:: Edit Modal -->
                <button @click="openEditModal"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    <IconEdit></IconEdit>
                </button>
                <div :id-prop=id
                    :name-prop=name
                    :iconPath=brandIconPath
                    v-if="showEditModal" class="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center bg-black bg-opacity-50">
                    <div class="relative w-full max-w-lg max-h-full">
                        <!-- Modal content -->
                        <form @submit.prevent="submitForm" action="#" class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <!-- Modal header -->
                            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    Update Brand Window
                                </h3>
                                <button @click="closeEditAsync" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            <!-- Modal body --> 
                            <div class="p-6 space-y-6">
                                <div>
                                    <div class="mb-6">
                                        <label for="first_name" class="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand name</label>
                                        <input type="text" v-model="brandName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload image</label>
                                        <input ref="brandImageInput" @change="handleFileChange" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file">
                                    </div>
                                </div>
                            </div>
                            <!-- Modal footer -->
                            <div class="flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <span >Save</span>
                                <!-- <svg  aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                </svg> -->
                                </button>
                                <button @click="closeEditAsync" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- end:: Edit Modal -->

                <!-- begin:: Delete Modal -->
                <button @click="openDeleteModal"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    <IconDelete></IconDelete>
                </button>
                <div v-if="showDeleteModal" class="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center bg-black bg-opacity-50">
                    <div class="relative w-full max-w-md max-h-full">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button @click="closeDeleteAsync" type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                            <div class="p-6 text-center">
                                <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this brand?</h3>
                                <button @click="deleteDataAsync(id)" data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                    Yes, I'm sure
                                </button>
                                <button @click="closeDeleteAsync" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end:: Delete Modal -->
            </div>
        </td>
    </tr>
</template>@/Helpers/DateHelper@/Helpers/TokenHelper@/helpers/DateHelper@/helpers/TokenHelper