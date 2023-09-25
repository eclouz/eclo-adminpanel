<script   lang="ts">
import { useI18n } from 'vue-i18n'
import { defineComponent } from 'vue'   
import axios from '@/plugins/axios'
import BrandSkeletonComponent from '@/components/brands/BrandSkeletonComponent.vue'
import IconDelete from "../../components/icons/common/IconDelete.vue"
import IconEdit from "../../components/icons/common/IconEdit.vue"
import { PaginationMetaData } from "@/Utils/PaginationUtils";
// import ProductViewComponent from 'src/components/products/ProductViewComponent.vue'
import ProductViewComponent from '@/components/products/ProductViewComponent.vue';


import { getToken } from '@/helpers/TokenHelper'



// const t = useI18n()
export default defineComponent({
    components: {
        IconDelete, IconEdit , ProductViewComponent,BrandSkeletonComponent,

    },
    props : {
        id : Number ,

    },  
    methods:{
        async GetDataAsync(page: Number){

            this.isLoaded = false ;
            const token = getToken();            
            // debugger;
            const response = await axios.get<ProductViewModel[]>("api/admin/products?page="+page,{
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            if(response.data.length>=0)
            {
                this.isLoaded = true;                                       
            }
            else{
                this.isLoaded = false;                       
            }
            
            console.log(response.data)
            this.productList = response.data;

        

            const paginationJson = JSON.parse(response.headers['x-pagination']);
            this.metaData = new PaginationMetaData();
            this.metaData.currentPage = paginationJson.CurrentPage;
            this.metaData.totalPages = paginationJson.TotalPages;
            this.metaData.hasNext = paginationJson.HasNext;
            this.metaData.hasPrevious = paginationJson.HasPrevious;               
            this.metaData.pageSize= paginationJson.PageSize;
            this.metaData.totalItems = paginationJson.TotalItems;    
            

            // this.isLoaded = true;

        },
        openEditModal() {
            // this.brandName = this.nameProp!;
            // this.iconFullPath = this.iconPath!;
            this.showEditModal = true;
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
        async deleteDataAsync(id:any){
            await axios.delete("/api/admin/products/" + id)
            location.reload();
        },
        async CountAllProductAsync(){
            const response = await axios.get("/api/common/products/count")
            this.countAllProducts = response.data;
        },
        
        performSearch() {
            const query = this.searchQuery.toLowerCase();
            if (query === '') {
                return this.productList;
            }
            const filteredItems = this.productList.filter(brand =>
                brand.productName.toLowerCase().includes(query)
            );
            return filteredItems;
        },
    },
    data() {
        return {        
            defaultSkeletons: 1 as number,
            isLoaded: false as boolean,

            searchQuery: '' as string,
            showDeleteModal: false as Boolean,
            showEditModal: false as Boolean,
            metaData: new PaginationMetaData(),
            baseURL: "" as string,            
            createdAtString: "" as string,
            updatedAtString: "" as string,

            countAllProducts: 0 as number,
            
            productList:[] as ProductViewModel[]   ,


            hasNext: false,
            hasPrevious: false,            
            currentPage: 1 as number,
            totalPages: 1 as number,




        }
    },
    computed: {
        filteredItems() {
        const query = this.searchQuery.toLowerCase();
            return this.productList.filter(product =>
            product.productName.toLowerCase().includes(query)
            );
        },
    },
    setup() {
    const { t } = useI18n();
    
  },
    async mounted() {
        await this.CountAllProductAsync();
        await this.GetDataAsync(1);
    },
  

})

</script>

<template>
       <!--begin:: Brands Skeletons-->
       <div v-show="isLoaded == false">
        <template v-for="element in defaultSkeletons">
            <BrandSkeletonComponent></BrandSkeletonComponent>
        </template>
    </div>
    <!--end:: Brands Skeletons-->

    <!--begin:: BreadCrumb-->
    <div v-show="isLoaded == true">
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
      </ol>
    </nav>
    <!--end:: BreadCrumb-->
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="mx-auto max-w-screen-2xl">
            <div class="relative overflow-hidden bg-white shadow-md dark:bg-gray-800">
                
                <div
                    class="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
                    <div class="flex items-center flex-1 space-x-4">
                        <h5>
                            <span class="text-gray-500">All Products: </span>
                            <span class="dark:text-white">{{countAllProducts}}</span>
                        </h5>
                    </div>
                    <label for="table-search" class="sr-only">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor"
                                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clip-rule="evenodd"></path>
                            </svg>
                        </div>
                        <input type="text" id="table-search" v-model="searchQuery" @input="performSearch"
                            class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search for items">
                    </div>
                    <div
                        class="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                        <div class="flex">                           
                                                                                 
                            <router-link to="/add-product">
                                <div class="grid justify-items-end">
                                    <button type="button" 
                                        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 font-medium rounded-full text-sm px-2 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                        <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                                            <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                        </svg>
                                    </button>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
                
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                           
                            <tr>
                                <th scope="col" class="p-4">
                                    <div class="flex items-center">
                                        <input id="checkbox-all" type="checkbox"
                                            class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="checkbox-all" class="sr-only">checkbox</label>
                                    </div>
                                </th>                                
                                <th scope="col" class="px-4 py-3">Name</th>
                                <th scope="col" class="px-4 py-3">Category</th>                                                                                                
                                <th scope="col" class="px-4 py-3">Like</th>
                                <th scope="col" class="px-4 py-3">Price</th>                                
                                <th scope="col" class="px-4 py-3">Last Update</th>
                                <th scope="col" class="px-4 py-3">Action</th>

                            </tr>
                        </thead>
                         <!--begin:: Brands Skeletons-->
       <div v-show="isLoaded == false">
        <template v-for="element in defaultSkeletons">
            <BrandSkeletonComponent></BrandSkeletonComponent>
        </template>
    </div>
    <!--end:: Brands Skeletons-->
                        <tbody>                                                                                                                                                                                                                                                                                                                                             
                                <ProductViewComponent  v-for="el in filteredItems"
                                    :id=el.productId                                    
                                    :name= el.productName
                                    :category=el.productCategoryName
                                    :like=el.productLikes
                                    :price=el.productPrice
                                    :updatedAt=el.productLastUpdate>
                                </ProductViewComponent>                         
                        </tbody>

                    </table>
                </div>



                
                <nav class="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
                    aria-label="Table navigation">
                    <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                        Showing
                        <span class="font-semibold text-gray-900 dark:text-white"> {{ metaData.totalItems }}  -</span>
                        <span class="font-semibold text-gray-900 dark:text-white"> {{ metaData.pageSize }} </span>
                        of
                        <span class="font-semibold text-gray-900 dark:text-white">{{ metaData.totalPages }}</span>
                    </span>
                    <ul class="inline-flex items-stretch -space-x-px">
                        <li v-show="metaData.hasPrevious == true">
                            <button @click="GetDataAsync(metaData.currentPage-1)" 
                                class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-00 dark:hover:text-white">
                                <span class="sr-only">Previous</span>
                                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                            </button>
                        </li>
                        <li v-for="el in metaData.totalPages">
                            <!-- <a href="#"
                                class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a> -->
                            <button @click="GetDataAsync(el)" class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                {{ el }}
                            </button>
                        </li>
                      
                        <li v-show="metaData.hasNext == true">
                            <button @click="GetDataAsync(metaData.currentPage+1)" 
                                class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span class="sr-only">Next</span>
                                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </section>
</div>
</template>

<style scoped></style>@/Helpers/TokenHelper