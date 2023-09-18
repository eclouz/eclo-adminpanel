<script lang="ts">
import { defineComponent } from "vue"
import IconDelete from "../../components/icons/common/IconDelete.vue"
import IconEdit from "../../components/icons/common/IconEdit.vue"
import axios from '@/plugins/axios'
import { getToken } from '@/helpers/TokenHelper'
import { formatDate } from "@/helpers/DateHelper"

export default defineComponent({
    components: {
        IconDelete, IconEdit
    },
    props: {   
        id:Number,

        imagePath: String,
        name:  String,
        category:String,
        like:Number,
        price:Number,
        createdAt:Date,

        idProp:Number,
        imagePathProp:String,
        nameProp: String,
        categoryProp:String,
        likeProp:Number,
        priceProp:Number,
        createdAtProp:Date,

        updatedAt:Date
    },
    data() {
        return {
            idNumber: 0 as number,
            showDeleteModal: false as boolean,
            showEditModal: false as boolean,
            baseURL: "" as string,

            nameString:"" as string,
            imageFullPath: "" as string,
            categoryString:"" as string,
            likeNumber:0 as number,
            priceNumber: 0 as number,
            
            createdAtString: "" as string,
            updatedAtString: "" as string,
            
            imagePathString: null as File | null,
            
        }
    },    
    methods: {
        load() { 
           
            this.baseURL = axios.defaults.baseURL!;
            this.imageFullPath = this.baseURL + "/" + this.imagePath!;
             this.nameString = this.name!;
            this.categoryString = this.category!;
            this.likeNumber = this.like!;
            this.priceNumber = this.priceNumber!;
            this.updatedAtString = formatDate(this.updatedAt!);            
        },
        navigateToUpdatePage(id:any) {
            this.$router.push({ name: 'product-update', params: { id: id } });
        },
        closeEditAsync() {
            this.showEditModal = false;
        },
        openDeleteModal() {
            this.showDeleteModal = true;
        },
        closeDeleteAsync() {
            this.showDeleteModal = false;
        },
        openEditModal() {
            // this.idNumber=this.idProp!;
            // this.imageFullPath=this.imagePathProp!;
            // this.nameString=this.nameProp!;
            // this.categoryString= this.categoryProp!;
            // this.likeString = this.likeProp!;
            // this.priceProp!;
            // this.createdAtProp!;
        },
        async deleteDataAsync(id:any){
            const token = getToken();            

            await  axios.delete("/api/admin/products/" + id,{
                headers:{
                    'Authorization': 'Bearer ' + token
                }
                
            })
            console.log()
            location.reload();
        },
    },

    mounted() {
     
        this.load();
    }
})
</script>
<template>
    <tr class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td class="w-4 px-4 py-3">
                                    <div class="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox"
                                            onclick="event.stopPropagation()"
                                            class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <th scope="row"
                                    class="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <!-- <img src="https://flowbite.s3.amazonaws.com/blocks/application-ui/devices/benq-ex2710q.png"
                                        alt="iMac Front Image" class="w-auto h-8 mr-3">
                                     -->
                                    <img v-bind:src="imageFullPath" style="width: 40px;height: 55px; "/>
                                    
                                </th>
                                <td class="px-4 py-2">
                                    <span 
                                        class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                                         {{ name }} </span>
                                </td>                                                               
                                <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ category }}  </td>                                                                
                                <td class="px-4 py-2">{{ like }}</td>
                                <td class="px-4 py-2">{{ price }}</td>
                                <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ updatedAtString }}
                                </td>
                                <td class=" "> 
                                    <!-- <router-link to="/update-product"> -->
                                        <button @click="navigateToUpdatePage(id)"
                                        class="ml-3 font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        <IconEdit></IconEdit>
                                        </button>
                                    <!-- </router-link> -->
                                        <div v-if="showEditModal" class="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center bg-black bg-opacity-50">
                                            <div class="relative w-full max-w-lg max-h-full">
                        <!-- Modal content -->
                        <form @submit.prevent="" action="#" class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <!-- Modal header -->
                            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
                            >
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    Update Product Window
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
                                    
                                </div>
                            </div>
                            <!-- Modal footer -->
                            <div class="flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                                <button @click="closeEditAsync" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                            </div>
                        </form>
                    </div>
                                        </div>

                                        <button @click="openDeleteModal"                                        
                                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        <IconDelete></IconDelete>
                                        </button>
                                        <!-- begin:: Delete Modal -->                
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
                                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                                <button @click="deleteDataAsync(id)" data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                    Yes, I'm sure
                                </button>
                                <button @click="closeDeleteAsync" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                    <!-- end:: Delete Modal -->
                                   
                                </td>
                            </tr>
</template>