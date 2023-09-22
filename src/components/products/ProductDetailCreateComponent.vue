<script lang="ts">
import { defineComponent } from "vue"
import axios from '@/plugins/axios'
import { getToken } from '@/helpers/TokenHelper'
import FlowbiteSetup from "@/FlowbiteSetup.vue";
export default defineComponent({
 
    components: {
        FlowbiteSetup
    },
    data() {
        return {            
            productId: this.$route.params.id,
            ImagePath:null as File | null,
            Color:"" as String,
            showCreateModal: false as Boolean,
            createErorr: false as Boolean,
            showToast: false,


        };
    },
    methods: {
        async createAsync() {
            debugger;
            const token = getToken();  
            console.log(this.$route.params.id)    
            console.log(this.ImagePath)    
            console.log(this.Color)    

            const response = await axios.post("api/admin/product/details", { "productId": this.productId , 
            "imagePath":this.ImagePath,"color":this.Color  }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': 'Bearer ' + token 
                },
            });
            // console.log(response.data);
            if (response.status == 200) {
                // this.$router.push("update-product/");
                console.log('Upload successful!', response.data);
                this.hideModal();
                location.reload();                
                this.closeCreateModal();
                
                    // setTimeout(() => { this.showToast = false }, 5000);
            }
            else {
                this.createErorr = true;
            }
        },
        handleFileChange(event: any) {
            const files = event.target.files;
            if (files && files.length > 0) {
                this.ImagePath = files[0];
            }
            else {
                this.ImagePath = null;
            }
        },
        openCreateModal() {
            this.showCreateModal = true;
        },
        closeCreateModal() {
            this.showCreateModal = false;
        },
        async hideModal() {
            const modal = document.getElementById("create-modal");
            if (modal) {
                modal.classList.add("hidden");
                modal.setAttribute("aria-hidden", "true");
            }
        },
        load(){
            // this.productId = this.$route.params.id;
            // console.log(this.productId)
            // alert(this.productId);
        }
        
    }, 
     mounted() {
        this.load();
    }


});
</script>
<template>
    <FlowbiteSetup></FlowbiteSetup>

    <button @click="openCreateModal" data-modal-target="create-modal" data-modal-toggle="create-modal"  style="width: 30%; font-size: 16px; margin-left: 0px; height: 40px; margin-top: 88px;" type="button" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add details</button>

<!-- begin:: Modal Window -->
<div id="create-modal" tabindex="-1" aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button type="button"
                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="create-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <form @submit.prevent="createAsync" v-if="showCreateModal" class="px-6 py-6 lg:px-8">
                    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create product detail</h3>
                    <div class="space-y-6">
                        <div class="mb-3">
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    for="file_input">Upload product image</label>
                                <input accept="image/jpeg, image/png, image/jpg" @change="handleFileChange"
                                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    type="file">
                            </div>
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Color
                            </label>
                            <input type="text" name="name" id="name" v-model="Color"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                        </div>
                      
                        <button type="submit"
                            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >Create              
                        </button>

                        

                        <!--begin:: Alert error-->
                        <div id="alert-border-2" v-show="createErorr == true"
                            class="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
                            role="alert">
                            <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <div class="ml-3 text-sm font-medium">
                                A simple danger alert with an <a href="#"
                                    class="font-semibold underline hover:no-underline">example link</a>. Give it a click if
                                you like.
                            </div>
                            <button type="button"
                                class="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                                data-dismiss-target="#alert-border-2" aria-label="Close">
                                <span class="sr-only">Dismiss</span>
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                            </button>
                        </div>
                        <!--end:: Alert error-->
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!--end:: Modal Window-->
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
</style>@/Helpers/TokenHelper