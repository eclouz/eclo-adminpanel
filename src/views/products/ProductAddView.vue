<script  lang="ts">
import { defineComponent } from 'vue'
// import IconAdd from '../icons/common/IconAdd.vue'
import axios from '@/plugins/axios';
import type { SubcategoryViewModel } from '@/viewmodels/SubcategoryViewModels';

export default defineComponent({
  data(){
    return {
      BrandId:  Number ,
      SubCategoryId:  Number,
      Name:"" as String,
      UnitPrice: "" as String ,
      Description:"" as String
      // SubCategoryList: [] as SubcategoryViewModel[]
    }
  },
  methods:{
    async CreateProductAsync(){
      const response = await axios.post("/api/admin/products", { "BrandId": this.BrandId, "SubCategoryId": this.SubCategoryId,"Name": this.Name,"UnitPrice":this.UnitPrice,"Description":this.Description },  {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status == 200) {
                this.$router.push("/products");
                // this.hideModal();

            }
            else {
                // this.createErorr = true;
            }
      


    }
  }

});

</script>

<template>
  <!-- Create Product -->
  <label for="countries" class="block mb-5 text-sm font-medium text-gray-900 dark:text-white"
  style="font-size: 25px; margin-left: 9px;">Add product</label>
  
  <div class="wpHorizontal"
  style="
  display: flex;
  flex-wrap: wrap;
  gap: 10px
  ">
  <!-- Choose brands  -->
<select id="brands" style="margin-bottom: 15px; width: 45%;" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option selected>Choose a brand</option>
  <option value="Nike">Adidas</option>  
</select>
  <!-- Choose brands  -->
  
  <!-- Choose subcategories  -->
  <select id="subcategories" style="margin-bottom: 15px; width: 45%;" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option  selected>Choose a subcategory</option>
  <option value="Nike">T-Shirt</option>  
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
    <input v-model="Name" type="text" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
</div>

<div class="mb-1" style="width: 45%;">
    <label style="margin-left: 9px;" for="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
    <input v-model="UnitPrice" type="text" onkeypress='return event.charCode >= 48 && event.charCode <= 57' id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    
</div>

<div class="mb-6" style="width: 45%;">
  <label style="margin-left: 9px;" for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
  <textarea  v-model="Description"  style="max-height: 100px; min-height: 50px;
   " id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your description here..."></textarea>
</div>

<div class="flex items-center p-4 space-x-2  border-gray-200 rounded-b dark:border-gray-600"
style="width: 45%; margin-top: 65px;">
                    <button @click="" type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        style="width: 100px;">Save</button>                    
                </div>

</div>
<!-- Create Product -->




  </template>

<style scoped></style>