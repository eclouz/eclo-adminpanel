<script lang="ts">
import { defineComponent } from 'vue'
import { DiscountViewModel } from '@/viewmodels/DiscountViewModels'
import DiscountViewComponent from '@/components/discounts/DiscountViewComponent.vue'
import IconAdd from '@/components/icons/common/IconAdd.vue'
import axios from '@/plugins/axios'
import { getToken } from '@/helpers/TokenHelper'
import { PaginationMetaData } from "@/Utils/PaginationUtils";


export default defineComponent({
  components: {
    DiscountViewComponent,
    IconAdd
  },
  methods: {
    async getDataAsync(page: Number) {
      const token = getToken();
      const response = await axios.get<DiscountViewModel[]>('/api/common/discounts?page=1', {
        headers: {

          'Authorization': 'Bearer ' + token
        }
      });
      this.discountsList = response.data;
      const paginationJson = JSON.parse(response.headers['x-pagination']);
      this.metaData = new PaginationMetaData();
      this.metaData.currentPage = paginationJson.CurrentPage;
      this.metaData.totalPages = paginationJson.TotalPages;
      this.metaData.hasNext = paginationJson.HasNext;
      this.metaData.hasPrevious = paginationJson.HasPrevious;
      this.metaData.pageSize = paginationJson.PageSize;
      this.metaData.totalItems = paginationJson.TotalItems;
    },
    openCreateModal() {
      this.showCreateModal = true;
    },
    closeCreateModal() {
      this.showCreateModal = false;
    },
    async createAsync() {
      const token = getToken();
      const response = await axios.post("/api/admin/discounts", { "name": this.name, "percentage": this.percentage, "description": this.description }, {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': 'Bearer ' + token
        },
      });
      if (response.status == 200) {
        this.$router.push("/discounts");
        location.reload();
        this.showCreateModal = false;
      }
      else {
        this.showCreateModal = true;
      }
    },
    performSearch() {
      const query = this.searchQuery.toLowerCase();
      if (query === '') {
        return this.discountsList;
      }
      const filteredItems = this.discountsList.filter(discount =>
        discount.name.toLowerCase().includes(query) ||
        discount.percentage.toString().toLowerCase().includes(query)
      );
      return filteredItems;
    },
    searchOnEnter() {
      this.performSearch();
    }
  },
  data() {
    return {
      searchQuery: '',
      discountsList: [] as DiscountViewModel[],
      showCreateModal: false as Boolean,
      name: "" as string,
      percentage: 0 as number,
      description: "" as string,
      metaData: new PaginationMetaData(),

            hasNext: false,
            hasPrevious: false,            
            currentPage: 1 as number,
            totalPages: 1 as number,

    }
  },
  computed: {
    filteredItems() {
      const query = this.searchQuery.toLowerCase();
      return this.discountsList.filter(discount =>
        discount.name.toLowerCase().includes(query) ||
        discount.percentage.toString().toLowerCase().includes(query)
      );
    },
  },
  async mounted() {
    await this.getDataAsync(1);
  }
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
              $t('discounts') }}</a>
        </div>
      </li>
    </ol>
  </nav>
  <!--end:: BreadCrumb-->

  <!-- begin:: Discounts -->
  <div>
    <section>
      <div class="mx-auto max-w-screen-xl">
        <!-- Start coding here -->
        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <!-- begin:: Search and Add -->
          <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 pb-4">
            <div class="w-full">
              <div class="flex justify-between items-center">
                <div>
                  <label for="simple-search" class="sr-only">Search</label>
                  <div class="relative w-full mt-2 ml-1">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                        viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clip-rule="evenodd" />
                      </svg>
                    </div>
                    <input type="text" id="simple-search" @keyup.enter="searchOnEnter" v-model="searchQuery"
                      @input="performSearch"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Search">
                  </div>
                </div>
                <div>
                  <!-- begin:: Discount Add -->
                  <div class="grid justify-items-end mt-2">
                    <button @click="openCreateModal"
                      class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 font-medium rounded-full text-sm px-2 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                      <IconAdd></IconAdd>
                    </button>
                  </div>
                  <form v-if="showCreateModal" action="#"
                    class="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center bg-black bg-opacity-50">
                    <div class="relative w-full max-w-lg max-h-full">
                      <!-- Modal content -->
                      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <!-- Modal header -->
                        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Discount Add Window
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
                            <div class="mb-6">
                              <label for="first_name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount name</label>
                              <input type="text" v-model="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="John" required>
                            </div>
                            <div class="mb-6">
                              <label for="percentage"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Percentage</label>
                              <input type="number" v-model="percentage"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="50" required>
                            </div>
                            <div>
                              <label for="description"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount
                                description</label>
                              <textarea id="description" v-model="description"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                                        </textarea>
                            </div>
                          </div>
                        </div>
                        <!-- Modal footer -->
                        <div
                          class="flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                          <button @click="createAsync" type="submit"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                          <button @click="closeCreateModal" type="button"
                            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <!-- end:: Discount Add -->
                </div>
              </div>
            </div>
            <div
              class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <div class="flex items-center space-x-3 w-full md:w-auto">
                <!-- here for a add discount button -->
              </div>
            </div>
          </div>
          <!-- end:: Search and Add -->
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3"><span>#Id</span></th>
                  <th scope="col" class="px-4 py-3">Discount name</th>
                  <th scope="col" class="px-4 py-3">Percentage</th>
                  <th scope="col" class="px-4 py-3">Description</th>
                  <th scope="col" class="px-6 py-3">Created date</th>
                  <th scope="col" class="px-6 py-3">Updated date</th>
                  <th scope="col" class="px-4 py-3">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <template v-for="element in filteredItems">
                  <DiscountViewComponent :id=element.id :name=element.name :percentage=element.percentage
                    :description=element.description :createdAt=element.createdAt :updatedAt=element.updatedAt>
                  </DiscountViewComponent>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
  <!-- end:: Discounts -->

  <!-- begin:: Pagination -->
  <nav class="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
    aria-label="Table navigation">
    <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
      Showing
      <span class="font-semibold text-gray-900 dark:text-white"> {{ metaData.totalItems }} -</span>
      <span class="font-semibold text-gray-900 dark:text-white"> {{ metaData.pageSize }} </span>
      of
      <span class="font-semibold text-gray-900 dark:text-white">{{ metaData.totalPages }}</span>
    </span>
    <ul class="inline-flex items-stretch -space-x-px">
      <li v-show="metaData.hasPrevious == true">
        <button @click="getDataAsync(metaData.currentPage - 1)"
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
        <button @click="getDataAsync(el)"
          class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          {{ el }}
        </button>
      </li>

      <li v-show="metaData.hasNext == true">
        <button @click="getDataAsync(metaData.currentPage + 1)"
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
  <!-- end:: Pagination -->
</template>

<style scoped></style>@/Helpers/TokenHelper