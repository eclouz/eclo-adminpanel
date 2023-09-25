<script lang="ts">
import { defineComponent } from 'vue'
import axios from '@/plugins/axios'
import { AdminViewModel } from "@/viewmodels/AdminViewModels"
import { getToken } from "@/helpers/TokenHelper"
export default defineComponent ({
    props: {
        id: Number,
        firstName: String,
        lastName: String,
        phoneNumber: String,
        imagePath: String
    },
    data() {
        return {
            admins: new AdminViewModel,
            baseURL: "" as String,
            imageFullPath: "" as string,

            adminfirstName: "",
            adminlastName: "",
            adminphoneNumber: "",
            adminimagePath: null as File | null
        }
    },
    methods: {
        async getDataAsync() {
            const token = getToken();
            const response = await axios.get<AdminViewModel>('/api/admin/profile', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            this.admins = response.data;
            this.load()
        },
        handleFileChange(event: any) {
            const fileInput = event.target as HTMLInputElement;
            if (fileInput.files && fileInput.files[0]) {
                this.adminimagePath = fileInput.files[0];
            }
        },
        async load() {
            this.baseURL = axios.defaults.baseURL!;
            this.imageFullPath = this.baseURL + "/" + this.admins.imagePath;
        },
        signoutAsync(){
            document.cookie = "access_token = " + "" + "; expires: SESSION; path=/";
        }
    },
    mounted() {
        this.getDataAsync();
        this.load();
    }
})
</script>
<template>
    <div class="flex items-center ml-3">
        <div>
            <button type="button"
                class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <span class="sr-only">Open user menu</span>
                <img class="w-10 h-10 rounded-full" v-bind:src="imageFullPath">
            </button>
        </div>
        <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
            id="dropdown-user">
            <div class="px-4 py-3" role="none">
                <p class="text-sm text-gray-900 dark:text-white" role="none">
                    {{ admins.firstName + " " + admins.lastName }}
                </p>
                <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                    {{ admins.phoneNumber }}
                </p>
            </div>
            <ul class="py-1" role="none">
                <li>
                    <router-link to="/auth">
                        <a href="#"
                            @click="signoutAsync"
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem">{{ $t('signout') }}</a>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>