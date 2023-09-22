<script lang="ts">
import IconDelete from "../../components/icons/common/IconDelete.vue"
import IconEdit from "../../components/icons/common/IconEdit.vue"
import { formatDate } from '@/helpers/DateHelper'
import { defineComponent } from 'vue'
import axios from '@/plugins/axios'

export default defineComponent ({
    components: {
        IconDelete, IconEdit
    },
    props: {
        id: Number,
        name: String,
        percentage: Number,
        description: String,
        createdAt: Date,
        updatedAt: Date,

        idProp: Number,
        nameProp: String,
        percentageProp: Number,
        descriptionProp: String,
    },
    data() {
        return {
            baseURL: "" as string,
            createdAtString: "" as string,
            updatedAtString: "" as string,
            showEditModal: false as Boolean,
            showDeleteModal: false as Boolean,

            discountName: "" as String,
            discountPercentage: 0 as Number,
            discountDescription: "" as string
        }
    },
    methods: {
        load() {
            this.baseURL = axios.defaults.baseURL!;
            this.createdAtString = formatDate(this.createdAt!);
            this.updatedAtString = formatDate(this.updatedAt!);
        },
        openEditModal() {
            this.showEditModal = true;
            this.discountName = this.nameProp!;
            this.discountPercentage = this.percentageProp!;
            this.discountDescription = this.descriptionProp!;
        },
        closeEditModal() {
            this.showEditModal = false;
        },
        async submitForm() {
            const response = await axios.put("/api/admin/discounts/" + this.id, { "name": this.discountName, "percentage": this.discountPercentage, "description": this.discountDescription }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            debugger;
            this.closeEditModal()
            location.reload()
        },
        async deleteDataAsync(id:any){
            await axios.delete("/api/admin/discounts/" + id)
            location.reload();
        },
        openDeleteModal() {
            this.showDeleteModal = true;
        },
        closeDeleteAsync() {
            this.showDeleteModal = false;
        },
    },
    mounted() {
        this.load();
    }
})
</script>

<template>
    <tr class="border-b dark:border-gray-700">
        <td scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">#{{ id }}</td>
        <td class="px-4 py-3">{{ name }}</td>
        <td class="px-4 py-3">{{ percentage }}</td>
        <td class="px-4 py-3">{{ description }}</td>
        <td class="px-4 py-3">{{ createdAtString }}</td>
        <td class="px-4 py-3">{{ updatedAtString }}</td>
        <td class="px-4 py-3 flex items-center justify-end">
            <div>
                <!-- begin:: Edit Modal -->
                <button @click="openEditModal"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    <IconEdit></IconEdit>
                </button>
                <div :id-prop=id
                    :name-prop=name
                    :percentage-prop=percentage
                    :description-prop=description
                    v-if="showEditModal"
                    class="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center bg-black bg-opacity-50">
                    <div class="relative w-full max-w-lg max-h-full">
                        <!-- Modal content -->
                        <form @submit.prevent="submitForm" action="#" class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <!-- Modal header -->
                            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    Update Discount Window
                                </h3>
                                <button @click="closeEditModal" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
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
                                        <label for="first_name" class="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount name</label>
                                        <input type="text" v-model="discountName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required>
                                    </div>
                                    <div class="mb-6">
                                          <label for="percentage"
                                              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Percentage</label>
                                          <input type="number" v-model="discountPercentage"
                                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                              placeholder="50" required>
                                      </div>
                                      <div>
                                        <label for="description"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount
                                            description</label>
                                        <textarea v-model="discountDescription"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                            <!-- Modal footer -->
                            <div class="flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                                <button @click="closeEditModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
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
                                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this discount?</h3>
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
</template>

<style scoped></style>@/Helpers/DateHelper