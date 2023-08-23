<script lang="ts">

import { defineComponent } from "vue";
import IconEdit from "../icons/common/IconEdit.vue";
import axios from '@/plugins/axios';

export default defineComponent({
    components: {
        IconEdit
    }


});
</script>

<template>
    <button data-modal-target="edit-modal" data-modal-toggle="edit-modal" href="#"
        class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
        <IconEdit> </IconEdit>
    </button>
    <!--For Edit Modal Window  Start-->
    <!-- Main modal -->
    <div id="edit-modal" tabindex="-1" aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button type="button"
                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="edit-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="px-6 py-6 lg:px-8">
                    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Edit
                        Subcategory</h3>
                    <form class="space-y-6" action="#">
                        <!--SubCategory Name Input Start-->
                        <div>
                            <label for="name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subcategory
                                name
                            </label>
                            <input type="text" name="name" id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required value="Shim">
                        </div>
                        <!--SubCategory Name Input End-->

                        <!--Select Category Start-->
                        <div>
                            <label for="countries"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select
                                category
                            </label>
                            <select id="countries"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option>Men</option>
                                <option>Woomen</option>
                                <option>Baby</option>
                            </select>
                        </div>
                        <!--Select Category End-->
                        <div class="m-5">
                            <button type="submit"
                                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create
                            </button>
                        </div>


                    </form>
                </div>
            </div>
        </div>
    </div>
    <!--For Edit Modal Window  End-->
</template>