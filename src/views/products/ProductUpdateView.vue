<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { getToken } from '@/helpers/TokenHelper'
import axios from '@/plugins/axios'
import { ProductUpdateDto } from '@/dtos/ProductDtos/ProductUpdateDto';
import { ProductCreateDto } from '@/dtos/ProductDtos/ProductCreateDto';
import type { BrandViewModel } from '@/viewmodels/BrandViewModels';
import type { SubcategoryViewModel } from '@/viewmodels/SubcategoryViewModels';
import ProductDetailCreateComponent from "@/components/products/ProductDetailCreateComponent.vue";
import IconDelete from "../../components/icons/common/IconDelete.vue"
import IconEdit from "../../components/icons/common/IconEdit.vue"
import ProductDetailViewComponentVue from '@/components/products/ProductDetailViewComponent.vue';

export default defineComponent({

  components: {
    ProductDetailCreateComponent, IconDelete, IconEdit, ProductDetailViewComponentVue

  },
  props: {
    brandIdProp: Number,
    subCategoryIdProp: Number,
    nameProp: String,
    unitPriceProp: Number,
    descriptionProp: String
  },
  el: '#app',
  methods: {
    load() {
      this.productId;

    },
    async GetDetailsListAsync(id: any) {

      this.isLoaded = false;
      const token = getToken();
      // debugger;
      const response = await axios.get<ProductDetailViewModel[]>("api/admin/product/details/" + id, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      if (response.data.length >= 0) {
        this.isLoaded = true;
      }
      else {
        this.isLoaded = false;
      }

      console.log(response.data)
      this.productDetailViewList = response.data;
    },

    navigateToUpdatePage(id: any) {
      this.$router.push({ name: 'add-details', params: { id: id } });
    },

    async getBrandListAsync() {
      // this.isLoaded = false;
      const token = getToken();
      let pageNumber = 1;

      try {
        const response = await axios.get<BrandViewModel[]>('/api/common/brands?page=' + pageNumber);
        // this.isLoaded = true;
        this.brandList = response.data;
        console.log(this.brandList);
      } catch (error) {
        console.error("TT->" + error);
      }
    },
    async getSubCategoryListAsync() {
      let pageNumber = 1;
      const response = await axios.get<SubcategoryViewModel[]>('/api/common/subcategories?page=' + pageNumber);
      this.subCategoryList = response.data;
    },
    async getProductById(id: any) {
      const token = getToken();
      // debugger;
      const response = await axios.get<ProductCreateDto>("api/common/products/" + id, {
        headers: {
          'Authorization': 'Bearer ' + token
        }

      });

      this.productObject = response.data;
      console.log(this.productObject);


    },
    async submitForm() {
      const token = getToken();

      try {
        const response = await axios.put('api/admin/products/' + this.productId, {
          "BrandId": this.brandId,
          "SubCategoryId": this.subCategoryId, "Name": this.name,
          "UnitPrice": this.unitPrice, "Description": this.description
        }, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token
          }
        });

        console.log('Update successful', response.data);

        // location.reload();
        this.showToast = true;
        setTimeout(() => { this.showToast = false }, 5000);


      } catch (error) {
        console.error('Update error', error);
        // console.log(this.productObject.name);

      }
    }, openEditModal() {
      // Equating response properties to data properties
      this.brandId = this.productObject.brandId;
      this.subCategoryId = this.productObject.subCategoryId;
      this.name = this.productObject.name;
      this.unitPrice = this.productObject.unitPrice;
      this.description = this.productObject.description;
      // console.log(this.name);
    },

  },
  data() {
    return {
      productId: this.$route.params.id,
      defaultSkeletons: 1 as number,

      productObject: new ProductCreateDto,

      brandId: 0 as Number,
      subCategoryId: 0 as Number,
      name: "" as String,
      unitPrice: 0 as Number,
      description: "" as string,

      subCategoryList: [] as SubcategoryViewModel[],
      brandList: [] as BrandViewModel[],

      showToast: false,
      searchQuery: '' as string,
      productDetailViewList: [] as ProductDetailViewModel[],
      isLoaded: false as boolean,
      isLoaded2: false as boolean,



    }
  },

  setup() {
    const { t } = useI18n();
  },

  async mounted() {
    this.load();
    await this.getBrandListAsync();
    await this.getSubCategoryListAsync();
    await this.getProductById(this.productId);
    this.openEditModal();

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
    </ol>
  </nav>
  <!--end:: BreadCrumb-->


  <label for="countries" class="block mb-5 text-sm font-medium text-gray-900 dark:text-white"
    style="font-size: 25px; margin-left: 9px;">Update product</label>

  <!-- Product Detail create -->
  <div class="" style="
  display: flex;
  flex-wrap: wrap;
  gap: 10px
  ">

  </div>
  <!-- Product Detail create -->

  <!-- Update Product -->
  <div class="wpHorizontal" style="
  display: flex;
  flex-wrap: wrap;
  gap: 10px
  ">
    <!-- Choose brands  -->
    <select id="brands" v-model="brandId" style="margin-bottom: 15px; width: 45%;"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option v-for="brands in brandList" :key="brands.id" :value="brands.id">{{ brands.name }}
      </option>
    </select>
    <!-- Choose brands  -->

    <!-- Choose subcategories  -->
    <select id="subcategories" v-model="subCategoryId" style="margin-bottom: 15px; width: 45%;"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option v-for="subCategory in subCategoryList" :key="subCategory.id" :value="subCategory.id">{{ subCategory.name }}
      </option>
    </select>
    <!-- Choose subcategories  -->
  </div>



  <div class="border-b-0" style="
  display: flex;
  flex-wrap: wrap;
  gap: 10px
  ">
    <div class="mb-1" style="width: 45%;">
      <label style="margin-left: 9px;" for="default-input"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
      <input placeholder="Write product name" v-model="name" type="text" id="default-input"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

    </div>

    <div class="mb-1" style="width: 45%;">
      <label style="margin-left: 9px;" for="default-input"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
      <input placeholder="Write product price . . ." v-model="unitPrice" type="text"
        onkeypress='return event.charCode >= 48 && event.charCode <= 57' id="default-input"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    </div>

    <div class="mb-6" style="width: 45%;">
      <label style="margin-left: 9px;" for="message"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
      <textarea v-model="description" style="max-height: 100px; min-height: 50px; 
   " id="message" rows="4"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write your description here..."></textarea>
    </div>

    <div class="flex items-center  p-4 space-x-2 border-gray-200 rounded-b dark:border-gray-600"
      style="margin-top: 65px; ">



      <form @submit.prevent="submitForm" class="space-y-6" action="#">
        <button type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
      </form>
      <!--Start::> Update Toast -->
      <transition name="fade">
        <div id="toast-success" v-if="showToast" class="toast-container">
          <div class="toast-icon">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
              viewBox="0 0 20 20">
              <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="sr-only">Check icon</span>
          </div>
          <div class="toast-content">
            Successfully.
          </div>
          <button type="button" class="toast-close" @click="showToast = false">
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </button>
        </div>
      </transition>
      <!--Finish::> Update Toast -->


    </div>
    <!--Start:: Product detail Create Component -->
    <ProductDetailCreateComponent>
    </ProductDetailCreateComponent>
    <!--Finish:: Product detail Create Component -->
  </div>


  <div class="border-b-2 pb-5" style="

  display: flex;
  flex-wrap: wrap;
  gap: 10px
  
  ">


    <!-- @click="navigateToUpdatePage(productId)" -->



    <!-- <button style="width: 29%; font-size: 16px; margin-left: 0px; height: 45px; margin-top: 10px;" type="button" class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add  fashion</button>
<button style="width: 29%; font-size: 16px; margin-left: 0px; height: 45px; margin-top: 10px;" type="button" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add  size</button> -->



  </div>

  <!--begin::Detail BreadCrumb-->
  <nav class="flex mb-5 mt-5" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li class="inline-flex items-center">
        <a href=""
          class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
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
              $t('Details') }}</a>
        </div>
      </li>
    </ol>
  </nav>
  <!--end::Detail BreadCrumb-->



  <!--Start : Product Detail components show -->
  <div id="accordion-collapse" data-accordion="collapse">
    <h2 id="accordion-collapse-heading-2">
      <button @click="GetDetailsListAsync(productId)" type="button"
        class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        data-accordion-target="#accordion-collapse-body-2" aria-expanded="false"
        aria-controls="accordion-collapse-body-2">
        <label for="countries" class="block mb-5 text-sm font-medium text-gray-900 dark:text-white"
          style="font-size: 25px; margin-left: 9px; margin-top: 20px;">Product details</label>
        <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
        </svg>
      </button>
    </h2>
    <div id="accordion-collapse-body-2" class="hidden" aria-labelledby="accordion-collapse-heading-2">
      <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
        <div class="border-b-2 pb-5">
          <!--  -->
          <div class="wpHorizontal" style="
              display: flex;
              flex-wrap: wrap;
              gap: 10px
              ">
            <ProductDetailViewComponentVue v-for="detail in productDetailViewList" :id=detail.id
              :productId=detail.productId :imagePath=detail.imagePath :color=detail.color>
            </ProductDetailViewComponentVue>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--Finish : Product Detail components show -->
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
  color: #5cb85c;
  /* Adjust the color as needed */
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