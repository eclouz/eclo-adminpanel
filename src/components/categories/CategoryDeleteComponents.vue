<script lang="ts">
import { defineComponent } from "vue";
import IconDelete from "../icons/common/IconDelete.vue";
import axios from '@/plugins/axios';
import { getToken } from '@/helpers/TokenHelper';

export default defineComponent({
    components: {
        IconDelete
    },
    props:{
        idCategory:Number
    },
    data() {
        return {
            showDeleteModal: false
        };
    },
    methods: {
        openDeleteModal() {
            this.showDeleteModal = true;
        },
        closeDeleteModal() {
            this.showDeleteModal = false;
        },
        async confirmDelete() {
            // Delete
            const token = getToken();  
            const response = await axios.delete("/api/admin/categories/"+this.idCategory,{
                headers:{
                    'Authorization': 'Bearer ' + token 
                }
            });
            console.log(response.data)
            
           
            console.log("Deleting the category...");

            // Modal oynani yopish
            this.closeDeleteModal();
            location.reload();
        }
    }
});
</script>


<template>
    <!--begin:: Delete Modal Button-->
    <button @click="openDeleteModal" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
        <IconDelete></IconDelete>
    </button>
    <!--end:: Delete Modal Button-->

    <!--begin:: Delete Modal Window-->
    <div v-if="showDeleteModal"
        class="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center bg-black bg-opacity-50">
        <div class="relative w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button @click="closeDeleteModal"
                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="popup-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="p-6 text-center">
                    <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure
                        you want to delete this category?</h3>
                    <button  @click="confirmDelete" type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Yes, I'm sure
                    </button>
                    <button  @click="closeDeleteModal" type="button"
                        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No,
                        cancel</button>
                </div>
            </div>
        </div>
    </div>
    <!--end:: Delete Modal Window-->
</template>@/Helpers/TokenHelper