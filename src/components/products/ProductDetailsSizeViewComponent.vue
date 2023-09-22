<script lang="ts">
// import IconDelete from "../../components/icons/common/IconDelete.vue"
// import IconEdit from "../../components/icons/common/IconEdit.vue"
// import { formatDate } from "@/helpers/DateHelper"
import { defineComponent } from 'vue'
import axios from '@/plugins/axios'
//import type { BrandViewModel } from "@/viewmodels/BrandViewModels"
import { getToken } from '@/helpers/TokenHelper'

export default defineComponent({
    props:{
        Id:Number,        
        productDetailId:Number,
        // quantitySize:Number,
        quantity:Number,
        size:String,

        idProp:Number,
        productDetailIdProp:Number,
        quantityProp:Number,
        sizeProp:String               
    },
    data() {
        return{
            baseURL: "" as String,
            ProductDetailId: 0 as number,
            idNumber: 0 as Number,       
            sizeString: "" as String     ,
            quantityNumber: 0 as Number,


            showEditModal: false as Boolean,
            showDeleteModal: false as Boolean,
            showToast: false,

        }
    },
    methods: {
        async submitForm(id:any) {    
            debugger;
            // console.log(id);
            // console.log(this.productDetailId);
            // console.log(this.size);                        
            // console.log(this.quantity);                        
            const token = getToken();                                               
                try {
                    const response = await axios.put('api/admin/product/detail/sizes/' + id,{
                        "ProductDetailId":this.ProductDetailId,
                        "Size":this.sizeString,                        
                        "Quantity":this.quantityNumber
                    }, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': 'Bearer ' + token
                        }
                    });
                    if(response.status == 200)
                    {
                        console.log('Update successful', response.data);
                    }
                    else{
                        console.log("SomethingWrong");                         
                    }                    

                    this.showEditModal = false;
                    location.reload();
                } catch (error) {
                    console.error('Update error', error);
                }
            },
        openDeleteModal() {
            this.showDeleteModal = true;
        },
        closeDeleteAsync() {
            this.showDeleteModal = false;
        },        
        closeEditAsync() {
            this.showEditModal = false;
        },       
        load() {            
            this.idNumber = this.Id!;
            this.ProductDetailId = this.productDetailId!;
            this.sizeString = this.size!;
            this.quantityNumber = this.quantity!;

            

            
        },
        openEditModal() {
           this.idNumber= this.idProp!;
           this.sizeString=this.sizeProp!;        
             this.quantityNumber = this.quantity!;           
           this.showEditModal = true;
           
        },        
        async deleteDataAsync(id:any){
            const token = getToken();   
            await axios.delete("api/admin/product/detail/sizes/" + id,{
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
<button @click="openDeleteModal"  class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">  
  <div>      
    <div style="
  padding-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px
  ">  
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Size : </h5>
    <h5 style="color: grey;" class="mb-2 text-2xl font-bold tracking-tight text-gray-500 dark:text-white">{{ size }}</h5>
  </div>
  <div style="
  padding-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px
  ">
  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Quantity : </h5>
  <h5 style="color: grey;" class="mb-2 text-2xl font-bold tracking-tight text-gray-500 dark:text-white">{{quantity}}</h5>
  </div>
</div>
</button>

 <!-- begin:: Delete Modal -->
 <!-- <button @click="openDeleteModal"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    <IconDelete></IconDelete>
                </button> -->
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
                                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Size edit,delete Window</h3>
                                <button  style="background-color: green;" @click="openEditModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                    Edit Size</button>
                                <button @click="deleteDataAsync(Id)" data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end:: Delete Modal -->
                <!-- begin:: Edit Modal -->             
                <div :id-prop=Id
                    :quantity-prop=quantity
                    :size-prop=size
                    v-if="showEditModal" class="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center bg-black bg-opacity-50">
                    <div class="relative w-full max-w-lg max-h-full">
                        <!-- Modal content -->
                        <form @submit.prevent="submitForm(Id)" action="#" class="relative bg-white rounded-lg shadow dark:bg-gray-700">
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
                                        <label for="first_name" class="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Size</label>
                                        <input type="text" v-model="sizeString" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product size . . ." required>
                                    </div>
                                    <div class="mb-6">
                                        <label for="first_name" class="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                                        <input type="text" v-model="quantityNumber" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product quantity . . ." required>
                                    </div>
                                 
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
                <!-- end:: Edit Modal -->

</template>
<style>
.toast-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  width: 300px;
  padding: 16px;
  background-color: #ffffff;
  color: #333333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.toast-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 8px;
  color: #5cb85c; /* Adjust the color as needed */
}

.toast-content {
  flex-grow: 1;
  font-size: 14px;
}

.toast-close {
  margin-left: 8px;
  cursor: pointer;
  color: #777777;
  transition: color 0.3s ease;
}

.toast-close:hover {
  color: #333333;
}
</style>@/Helpers/DateHelper@/Helpers/TokenHelper