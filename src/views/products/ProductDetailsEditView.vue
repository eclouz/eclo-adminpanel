<script lang="ts">
import { defineComponent } from 'vue'
import { getToken } from '@/helpers/TokenHelper'
import axios from '@/plugins/axios'
import ProductFashionViewComponent from "@/components/products/ProductFashionViewComponent.vue";
import { useI18n } from 'vue-i18n'
import ProductDetailsSizeViewComponentVue from '@/components/products/ProductDetailsSizeViewComponent.vue';
import type { ProductSizeUpdateDto } from '@/dtos/ProductDtos/ProductSizeUpdateDto';


export default defineComponent({
  components:{
    ProductFashionViewComponent,
    ProductDetailsSizeViewComponentVue
},
    data(){
      return{
        detailId: this.$route.params.idDetail,
        productId:this.$route.params.id,
        imageString:"" as String,
        imageFile:null as File | null,        
        colorString:"" as String,
        showCreateModal: false as Boolean,
        showCreateModal2:false as Boolean,
        showToast: false,

        size: "" as string,
        quantity: 0 as number,

        detailImageFIle:null as File | null,        
        fashionList:[] as ProductFashionViewModel[],
        sizeList:[] as ProductSizeUpdateDto[],
      }
    },
    methods:{
      async GetFashionListAsync(detailId: any){
        // this.isLoaded = false ;
        const token = getToken();            
        // debugger;
        const response = await axios.get<ProductFashionViewModel[]>("api/product/detail/fashions/"+detailId,{
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        if(response.data.length>=0)
        {
            // this.isLoaded = true; 
            console.log("Successfully",response.data);
        }
        if(response.status!=200){
          console.log("Something wrong",response.data);          
        }
        
        this.fashionList = response.data;
        },
        async GetSizeListAsync(detailId: any){                             
        const token = getToken();            
        // debugger;
        const response = await axios.get<ProductSizeUpdateDto[]>("api/admin/product/detail/sizes/"+detailId,{
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        if(response.data.length>=0)
        {
            // this.isLoaded = true; 
            console.log("Successfully",response.data);
        }
        if(response.status!=200){
          console.log("Something wrong",response.data);          
        }
        
        this.sizeList = response.data;
        },

        async updateAsync(id:any){
          const token = getToken();  
          console.log(id);      
          try {

                    const response = await axios.put('api/admin/product/details/' + id, { 
                      "ProductId":this.productId,
                      "ImagePath":this.imageFile,
                      "Color":this.colorString
                    },{
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': 'Bearer ' + token 
                        }
                    });
                    if(response.status == 200)
                    {
                      console.log('Update successful', response.data);      
                      this.showToast = true;
                      setTimeout(() => { this.showToast = false }, 5000);
                    }
                    else{
                      console.log('SomeThing Wrong', response.data);      
                    }
                    
                    // location.reload();
                    
                   
                 
                  } catch (error) {
                    console.error('Update error', error);                                        
            }
        },   
        handleFileChange(event: any) {
            const files = event.target.files;
            if (files && files.length > 0) {
                this.imageFile = files[0];
            }
            else {
                this.imageFile = null;
            }
        },
        handleFileChangeForFashion(event: any) {
            const files = event.target.files;
            if (files && files.length > 0) {
                this.detailImageFIle = files[0];
            }
            else {
                this.detailImageFIle = null;
            }
        },
        openCreateModal() {
            this.showCreateModal = true;
        },
        openCreateModal2(){
            this.showCreateModal2 = true;
        },
        closeCreateModal2() {
            this.showCreateModal2 = false;
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
        async createDetailsAsync(detailId:any) {
            debugger;
            console.log(detailId);            
            const token = getToken();           
            const response = await axios.post("api/product/detail/fashions", { 
              "ProductDetailId":detailId,
              "ImagePath":this.detailImageFIle,
              }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': 'Bearer ' + token 
                },
            });
            // console.log(response.data);
            if (response.status == 200) {                
                console.log('Upload successful!', response.data);
                this.hideModal();
                // location.reload();                
                this.closeCreateModal();
                this.showToast = true;
                      setTimeout(() => { this.showToast = false }, 5000);                    
            }
            else {
                // this.createErorr = true;
                console.log("Something wrong!");
                
            }
            
        },   
        async createSizeAsync(detailId:any) {
            debugger;
            console.log(detailId);            
            console.log(this.size);            
            console.log(this.quantity);            
            const token = getToken();           
            const response = await axios.post("api/admin/product/detail/sizes", { 
              "ProductDetailId":detailId,
              "Size":this.size,
              "Quantity":this.quantity
              }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': 'Bearer ' + token 
                },
            });            
            if (response.status == 200) {                
                console.log('Upload successful!', response.data);
                this.hideModal();
                // location.reload();                
                this.closeCreateModal2();
                this.showToast = true;
                      setTimeout(() => { this.showToast = false }, 5000);                    
            }
            else {
                // this.createErorr = true;
                console.log("Something wrong!");
                
            }
            
        },      

    },
    setup() {
        const { t } = useI18n();                
    },
   
    async mounted() {      

    },
    })
</script>
<template>   
<!--begin:: BreadCrumb-->
<nav class="flex mb-5" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <a href="#"  
            class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
              viewBox="0 0 20 20">
              <path
                d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            <!-- {{ $t('home') }} -->
          </a>
        </li>
        <li>
          <div class="flex items-center">
            <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 9 4-4-4-4" />
            </svg>
            <a
              class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">{{
                $t('products') }}</a>
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 9 4-4-4-4" />
            </svg>
            <a
              class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">{{
                $t('product-update') }}</a>
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 9 4-4-4-4" />
            </svg>
            <a
              class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">{{
                $t('Edit-details') }}</a>
          </div>
        </li>
      </ol>
    </nav>
    <!--end:: BreadCrumb--> 
    <label for="countries" class="block mb-5 mt-10 text-sm font-medium text-gray-900 dark:text-white"
  style="font-size: 25px; margin-left: 9px;">Update details</label>
  <form @submit.prevent="updateAsync(detailId)"  >
  <div class=""
  style="
  display: flex;
  flex-wrap: wrap;
  gap: 10px
  ">

   <div style="width: 45%;">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    for="file_input">Upload product detail image</label>
      <input accept="image/jpeg, image/png, image/jpg" @change="handleFileChange"
      class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
      type="file">
    </div>  
    <div style="width: 45%;">
      
      <label style="margin-left: 9px;" for="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Color</label>
      <input placeholder="Write product color . . ." v-model="colorString" type="text" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    </div>
   
    <div class="" style="margin-top: 15px; margin-right: 110px;  margin-left: auto; display: block;">
      <button  type="submit" style="height: 43px; width: 100%;"
                        class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >Save</button>  
                      </div>
  </div>
  <!--Start::> Update Toast -->
  <transition name="fade">
    <div id="toast-success" v-if="showToast" class="toast-container">
      <div class="toast-icon">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>
        <span class="sr-only">Check icon</span>
      </div>
      <div class="toast-content">
         Success.
      </div>
      <button type="button" class="toast-close" @click="showToast = false">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </button>
    </div>
  </transition>
<!--Finish::> Update Toast -->
</form>



<div class="border-b-2" style="
  padding-bottom: 25px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px
  ">
  <button @click="openCreateModal" style="margin-top: 25px; width: 45%; height: 220px;" href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img style="height: 220px; width: 180px;" class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w- md:rounded-none md:rounded-l-lg"
     src="@/assets/products/wepik-export-20230921035230vRXa.png" alt="product fashion picture">
    <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Add  fashion for this product</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">You can add color for this product .</p>
    </div>
</button>
<!-- begin:: detail ADD -->
<div class="grid justify-items-end">            
        </div>
        <form @submit.prevent="createDetailsAsync(detailId)" v-if="showCreateModal" 
            class="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center bg-black bg-opacity-50">
            <div class="relative w-full max-w-lg max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <!-- Modal header -->
                    <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Fashion Add Window
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
                            <div class="mb-3">
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    for="file_input">Upload image</label>
                                <input accept="image/jpeg, image/png, image/jpg" @change="handleFileChangeForFashion"
                                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    type="file">
                            </div>
                        </div>
                    </div>
                    <!-- Modal footer -->
                    <div class="flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button  type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >Save</button>
                    <button @click="closeCreateModal" type="button"
                        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                </div>
            </div>
        </div>
        </form>

        <!-- end:: detail ADD -->


<button @click="openCreateModal2" style="margin-top: 25px; width: 45%; height: 220px;" href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img style="height: 220px; width: 180px;" class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w- md:rounded-none md:rounded-l-lg"
     src="@/assets/products/wepik-export-20230920105837qW2c.png" alt="product fashion picture">
    <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Add size for this product</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">You can add size for this product . </p>
    </div>
</button>
<!-- begin:: Size ADD -->
<div class="grid justify-items-end">            
        </div>
        <form @submit.prevent="createSizeAsync(detailId)" v-if="showCreateModal2" 
            class="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center bg-black bg-opacity-50">
            <div class="relative w-full max-w-lg max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <!-- Modal header -->
                    <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Size Add Window
                        </h3>
                        <button @click="closeCreateModal2" type="button"
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
                            <div class="mb-3">
                              <label  for="first_name"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Size</label>
                                <input type="text" v-model="size" autocomplete="off"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="M , L , XL or 45 , 46 , 47" required>
                                <label style="margin-top: 15px;" for="first_name"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                                <input type="text" v-model="quantity" autocomplete="off"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Write quantity . . ." required>
                            </div>
                        </div>
                    </div>
                    <!-- Modal footer -->
                    <div class="flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button  type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >Save</button>
                    <button @click="closeCreateModal2" type="button"
                        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                </div>
            </div>
        </div>
        </form>

        <!-- end:: Size ADD -->
</div>

      <!-- <button style="width: 45%; font-size: 16px; margin-left: 0px; height: 45px; margin-top: 25px;" type="button" class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add  fashion</button>
<button style="width: 45%; font-size: 16px; margin-left: 0px; height: 45px; margin-top: 10px;" type="button" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add  size</button> -->

<!--Start : Product Fashion components show -->
<div style="margin-top: 25px;" id="accordion-collapse" data-accordion="collapse"> 
  <h2 id="accordion-collapse-heading-2">
    <button @click="GetFashionListAsync(detailId)" type="button" class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2">      
      <label for="countries" class="block mb-5 text-sm font-medium text-gray-900 dark:text-white"
style="font-size: 25px; margin-left: 9px; margin-top: 20px;">Product fashions </label>
      <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>
  <div id="accordion-collapse-body-2" class="hidden" aria-labelledby="accordion-collapse-heading-2">
    <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
      <div class="border-b-2 pb-5" >                   
        <div  
        class="wpHorizontal" style="display: flex;flex-wrap: wrap;gap: 10px"
              >                 
              <!--Fashion view  Component -->
            <ProductFashionViewComponent v-for="fashion in fashionList"
                  :Id=fashion.id
                  :ImagePath=fashion.imagePath
                  :ProductDetailId=fashion.productDetailId>

            </ProductFashionViewComponent>
      </div>
     </div>
    </div>
  </div>  
</div>  
<!--Finish : Product Fashion components show -->

<!--Start : Product Size components show -->
<div style="margin-top: 25px;" id="accordion-collapse2" data-accordion="collapse"> 
  <h2 id="accordion-collapse-heading-3">
    <button @click="GetSizeListAsync(detailId)" type="button" class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-3" aria-expanded="false" aria-controls="accordion-collapse-body-2">      
      <label for="countries" class="block mb-5 text-sm font-medium text-gray-900 dark:text-white"
style="font-size: 25px; margin-left: 9px; margin-top: 20px;">Product sizes</label>
      <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>
  <div id="accordion-collapse-body-3" class="hidden" aria-labelledby="accordion-collapse-heading-3">
    <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
      <div class="border-b-2 pb-5" >                   
        <div  
        class="wpHorizontal" style="display: flex;flex-wrap: wrap;gap: 10px"
              >                 
              <!--Size view  Component -->              
          <ProductDetailsSizeViewComponentVue v-for="size in sizeList"
                :Id=size.id
                :size=size.size
                :productDetailId=size.productDetailId
                :quantity=size.quantity
                    >
            
          </ProductDetailsSizeViewComponentVue>
          
      </div>
     </div>
    </div>
  </div>  
</div>  
<!--Start : Product Size components show -->

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
}</style>@/Helpers/TokenHelper