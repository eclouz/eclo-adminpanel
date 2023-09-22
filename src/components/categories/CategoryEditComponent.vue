<script lang="ts">
import { defineComponent } from "vue";
import IconEdit from "../icons/common/IconEdit.vue";
import axios from '@/plugins/axios';   
import { getToken } from '@/helpers/TokenHelper';

export default defineComponent({
    components: {
        IconEdit
    },
    props: {
         nameProp:String,
         descriptionProp:String,
         idProp:Number
    },
    data() {
        return {
            showModal: false,
            categoryName: "",
            categoryDescription: "",
        };
    },
    methods: {
        openModal() {
            this.categoryName = this.nameProp!;
            this.categoryDescription = this.descriptionProp!;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        async submitForm() {          
            const token = getToken();  

            const response = await axios.put("/api/admin/categories/"+this.idProp, { "name": this.categoryName, "description": this.categoryDescription }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': 'Bearer ' + token 
                },
            });
            this.closeModal()
            location.reload()
        },
    },
});
</script>

<template>
    <!--begin:: Edit Modal Button-->

    <button @click="openModal"
        class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
        <IconEdit> </IconEdit>
    </button>
    <!--end:: Edit Modal Button-->

    <!--For Edit Modal Window  Start-->
    <div v-if="showModal"
        class="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center bg-black bg-opacity-50">
        <div class="relative w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button @click="closeModal"
                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="edit-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="px-6 py-6 lg:px-8">
                    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Edit
                        Category</h3>
                    <form @submit.prevent="submitForm" class="space-y-6" action="#">
                        <!--Category Name Edit Start-->
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category
                                name
                            </label>
                            <input v-model="categoryName" type="text" name="name" id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                >
                        </div>
                        <!--Category Name Edit End-->

                        <!--Edit Description Start-->
                        <div>
                            <label for="description"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category
                                description</label>
                            <textarea v-model="categoryDescription" name="description" id="description"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                >
                            </textarea>
                        </div>
                        <!--Edit Description End-->
                        <div class="m-5">
                            <button type="submit"
                                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create
                            </button>
                        </div>


                    </form>
                </div>
            </div>
        </div>
    </div>
    <!--For Edit Modal Window  End-->
</template>@/Helpers/TokenHelper