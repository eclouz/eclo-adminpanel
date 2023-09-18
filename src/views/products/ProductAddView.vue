<script lang="ts">
import { defineComponent } from 'vue'
// import IconAdd from '../icons/common/IconAdd.vue'
import axios from '@/plugins/axios';
import { useI18n } from 'vue-i18n'
import { SubcategoryViewModel } from '@/viewmodels/SubcategoryViewModels';
import { getToken } from '@/helpers/TokenHelper';
import { BrandViewModel } from '@/viewmodels/BrandViewModels';

export default defineComponent({
  data(){
    return {
      BrandId: 0 as number,
      SubCategoryId: 0 as number,
      Name:"" as string,
      UnitPrice: "" as string ,
      Description:"" as string,
      isLoaded : false as boolean,
      brandList : [] as BrandViewModel[],
      subCategoryList: [] as SubcategoryViewModel[],
      createErorr: false as boolean,
      
    }
  },
  methods:{

    async getBrandListAsync() {
      this.isLoaded = false;
      const token = getToken();
      let pageNumber = 1;

      try {
        const response = await axios.get<BrandViewModel[]>('/api/common/brands?page='+pageNumber);
        this.isLoaded = true;
        this.brandList = response.data;
        console.log(this.brandList);
      } catch (error) {
        console.error("TT->"+ error);
      }          
    },
    async getSubCategoryListAsync(){
      let pageNumber = 1;
        const response = await axios.get<SubcategoryViewModel[]>('/api/common/subcategories?page='+pageNumber);
        this.subCategoryList = response.data;
    },
    async CreateProductAsync(){
      const token = getToken();  
      const formData = new FormData();
                formData.append('BrandId', this.BrandId.toString());
                formData.append('SubCategoryId', this.SubCategoryId.toString());
                formData.append('Name', this.Name.toString());
                formData.append('UnitPrice', this.UnitPrice.toString());
                formData.append('Description', this.Description.toString());                                
      const response = await axios.post("/api/admin/products", formData,{//{ "BrandId": this.BrandId, "SubCategoryId": this.SubCategoryId,"Name": this.Name,"UnitPrice":this.UnitPrice,"Description":this.Description },  {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': 'Bearer ' + token
                },
            });
            console.log(response.data);
            if (response.status == 200) {
                this.$router.push("/products");
                this.hideModal();

            }
            else {
                this.createErorr = true;
            }      
    },
    async hideModal() {
            const modal = document.getElementById("create-modal");
            if (modal) {
                modal.classList.add("hidden");
                modal.setAttribute("aria-hidden", "true");
            }
            
        }
    
  },
  setup() {
    const { t } = useI18n();
  },
  async mounted() {
    await this.getBrandListAsync();
    await this.getSubCategoryListAsync();
  },

});

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
                $t('product-add') }}</a>
          </div>
        </li>
      </ol>
    </nav>
    <!--end:: BreadCrumb-->
<div>
  <!-- Create Product -->
  <label for="countries" class="block mb-5 text-sm font-medium text-gray-900 dark:text-white"
  style="font-size: 25px; margin-left: 9px;">Add product</label>
  <div class="wpHorizontal"
  style="
  display: flex;
  flex-wrap: wrap;
  gap: 10px
  ">
  <label style="margin-left: 9px; width: 45%;" for="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>  
  <label style="margin-left: 5px; width: 45%;" for="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subcategory</label>  
  </div>
  <div class="wpHorizontal"
  style="
  display: flex;
  flex-wrap: wrap;
  gap: 10px
  ">
  <!-- Choose brands  -->
<select id="brands" v-model="BrandId" style="margin-bottom: 15px; width: 45%;" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option v-for="brands in brandList" :key="brands.id" :value="brands.id">{{ brands.name }}
  </option>  
</select>
  <!-- Choose brands  -->
  
  <!-- Choose subcategories  -->
  <select id="subcategories" v-model="SubCategoryId" style="margin-bottom: 15px; width: 45%;" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option v-for="subCategory in subCategoryList" :key="subCategory.id" :value="subCategory.id">{{ subCategory.name}}
    </option>
</select>
  <!-- Choose subcategories  -->
</div>



<div class="border-b-0" style="
  display: flex;
  flex-wrap: wrap;
  gap: 10px
  ">
<div class="mb-1" style="width: 45%;" >
    <label style="margin-left: 9px;" for="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
    <input v-model="Name" type="text" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    maxlength="33"
    required>
</div>

<div class="mb-1" style="width: 45%;">
    <label style="margin-left: 9px;" for="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
    <input v-model="UnitPrice" type="text" onkeypress='return event.charCode >= 48 && event.charCode <= 57' id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    maxlength="20"
    required>
    
</div>

<div class="mb-6" style="width: 45%;">
  <label style="margin-left: 9px;" for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
  <textarea v-model="Description" maxlength="300" style="max-height: 100px; min-height: 50px; 
   " id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your description here..."
   required></textarea>
</div>

<div class="flex items-center p-4 space-x-2  border-gray-200 rounded-b dark:border-gray-600"
style="width: 45%; margin-top: 65px;">
  
                    <button @click="CreateProductAsync" type="submit"
                    
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        style="width: 100px;">Save 
                      
                      </button>                    
                </div>
                
    

</div>
<!-- Create Product -->

   <!--begin:: Alert Error-->
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
                        <!--end:: Alert Error-->

</div>



  </template>

<style scoped></style>