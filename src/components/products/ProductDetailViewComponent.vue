<script lang="ts">
import IconDelete from "../../components/icons/common/IconDelete.vue"
import IconEdit from "../../components/icons/common/IconEdit.vue"
import { formatDate } from "@/helpers/DateHelper"
import { defineComponent } from 'vue'
import axios from '@/plugins/axios'
import type { BrandViewModel } from "@/viewmodels/BrandViewModels"
import { getToken } from '@/helpers/TokenHelper'

export default defineComponent({
    props:{
        id: Number,
        productId:Number,
        imagePath:String,
        color:String,

        idProp:Number,
        productIdProp:Number,
        imagePathProp:String,
        colorProp:String,

        refreshAction: Function,

    },
    data() {
        return{
            baseURL: "" as String,
            productIdNumber: 0 as number,
            idNumber: 0 as Number,
            imageFullPath: "" as string,
            imageFilePath: null as File | null,
            colorString:"" as String,
            showEditModal: false as Boolean,
            showDeleteModal: false as Boolean,


        }
    },
    methods: {
        openDeleteModal() {
            this.showDeleteModal = true;
        },
        closeDeleteAsync() {
            this.showDeleteModal = false;
        },
        navigateToUpdatePage(id:any) {
            this.$router.push({ name: 'product-detail-edit', params: { idDetail: id } });            
            // this.refreshAction();

        },    
        
        closeEditAsync() {
            this.showEditModal = false;
        },
        handleFileChange(event: any) {
            const fileInput = event.target as HTMLInputElement;
            if (fileInput.files && fileInput.files[0]) {
                this.imageFilePath = fileInput.files[0];
                console.log(this.imageFilePath)
            }
        },
        load() {
            this.baseURL = axios.defaults.baseURL!;
            this.idNumber = this.id!;
            this.productIdNumber = this.productId!;
            this.imageFullPath = this.baseURL + "/" + this.imagePath!;    
            this.colorString = this.colorString!;        
        },
        async deleteDataAsync(id:any){
            const token = getToken();   
            await axios.delete("api/admin/product/details/" + id,{
                headers:{
                    'Authorization': 'Bearer ' + token
                }
            })
            location.reload();
        },
    },
    mounted() {
        this.load();
    }


})
</script>
<template>        
<div    :id-prop=id
        :productId-prop=productIdProp
        :imagePath-prop=imagePathProp
        :color-prop=color

 style="width: 15%;" class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">    
           <img v-bind:src="imageFullPath" style="height: 200px; width: 100%;" class="rounded-t-lg"  alt="" />    
       <div style="  margin: auto;width: 50%;padding: 10px;;" class="p-5">
           
           <!-- <p class="mb-3  font-normal text-gray-700 dark:text-gray-400">{{ color }}</p> -->
           <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{{ color }}</h5>
           <button @click="navigateToUpdatePage(id)" style="width: 100%;" href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                 Edit             
           </button>
           
           <button @click="openDeleteModal" style="width: 100%;   background-color: red; margin-top: 5px;" href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                 Delete             
           </button>
            <!-- begin:: Delete Modal -->          
                <div v-if="showDeleteModal" class="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center bg-black bg-opacity-50">
                    <div class="relative w-full max-w-md max-h-full">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button  @click="closeDeleteAsync" type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                            <div class="p-6 text-center">
                                <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this detail?</h3>
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
   </div>  

</template>
<style>
</style>@/Helpers/DateHelper@/Helpers/TokenHelper