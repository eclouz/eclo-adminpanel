<script lang="ts">
import { formatDate } from '@/helpers/DateHelper'
import { defineComponent } from 'vue'
import axios from '@/plugins/axios'
import { AdminViewModel } from "@/viewmodels/AdminViewModels"
import { getToken } from "@/helpers/TokenHelper"
import AdminSkeletonComponent from '@/components/admins/AdminSkeletonComponent.vue'

export default defineComponent ({
    components: {
        AdminSkeletonComponent
    },
    props: {
        id: Number,
        firstName: String,
        lastName: String,
        phoneNumber: String,
        imagePath: String,
        passportSerialNumber: String,
        birthDate: Date,
        password: String,
        region: String,
        district: String,
        address: String,
        createdAt: Date,
        updatedAt: Date
    },
    methods: {
        async submitForm() {
            this.isLoaded = false;
            const formData = new FormData();
            const token = getToken();   
            formData.append('FirstName', this.adminfirstName);
            formData.append('LastName', this.adminlastName);
            formData.append('BirthDate', this.adminbirthDate.toString());
            formData.append('PhoneNumber', this.adminphoneNumber);
            formData.append('Password', this.adminpassword);
            formData.append('PassportSerialNumber', this.adminpassportSerialNumber);
            formData.append('Region', this.adminregion);
            formData.append('District', this.admindistrict);
            formData.append('Address', this.adminaddress);
            formData.append('ImagePath', this.adminimagePath!);
            try {
                const response = await axios.put('/api/admin/profile/adminId', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + token
                    }
                });
                if (response.data.length >= 0) {
                    this.isLoaded = true;
                }
                else {
                    this.isLoaded = false;
                }
                console.log('Update successful', response.data);
                this.showEditModal = false;
                location.reload();
            } catch (error) {
                console.error('Update error', error);
            }
        },
        async getDataAsync() {
            const token = getToken();
            const response = await axios.get<AdminViewModel>('/api/admin/profile', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            this.admins = response.data;
            this.load();
            this.openEditModal();
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
            this.birthDateString = formatDate(this.birthDate!);
            this.createdAtString = formatDate(this.createdAt!);
            this.updatedAtString = formatDate(this.updatedAt!);
        },
        openEditModal() {
            this.adminfirstName = this.admins.firstName;
            this.adminlastName = this.admins.lastName;
            this.adminphoneNumber = this.admins.phoneNumber;
            // this.imageFullPath = this.admins.imagePath;
            this.adminpassportSerialNumber = this.admins.passportSerialNumber;
            //this.birthDateString = this.admins.birthDate.toString();
            this.adminpassword = this.admins.password;
            this.adminregion = this.admins.region;
            this.admindistrict = this.admins.district;
            this.adminaddress = this.admins.address;

            this.showEditModal = true;
        },
        closeEditAsync() {
            this.showEditModal = false;
        }
    },
    data() {
        return {
            defaultSkeletons: 1 as number,
            isLoaded: false as boolean,

            admins: new AdminViewModel,
            showEditModal: false as Boolean,

            baseURL: "" as String,
            imageFullPath: "" as string,
            birthDateString: "" as String,
            createdAtString: "" as String,
            updatedAtString: "" as String,

            adminfirstName: "",
            adminlastName: "",
            adminphoneNumber: "",
            adminpassword: "",
            adminimagePath: null as File | null,
            adminpassportSerialNumber: "",
            adminbirthDate: Date,
            adminregion: "",
            admindistrict: "",
            adminaddress: ""
        }
    },
    mounted() {
        this.getDataAsync();
        this.load();
        this.openEditModal();
    }
})
</script>


<template>
    <h1 class="mt-10 mb-4 pb-4 text-2xl font-medium leading-none text-gray-900 dark:text-white border-b border-gray-600">{{ $t('admin profile') }}</h1>
    <!--begin:: Admins Skeletons-->
    <div v-show="isLoaded == true">
        <template v-for="element in defaultSkeletons">
            <AdminSkeletonComponent></AdminSkeletonComponent>
        </template>
    </div>
    <!--end:: Admins Skeletons-->
    <div class="flex justify-between" v-show="isLoaded == false">
        <div class="w-2/5 mr-5">
            <div class="w-full mb-5 p-5 border rounded-lg border-gray-600">
                 <!-- begin:: Profile info-->
                <div class="container d-flex justify-content-center m-5"> 
                    <div class="card"> 
                        <div class="d-flex flex-column justify-content-center align-items-center"> 
                            <div class="flex mr-5"> 
                                <div class="w-36 mr-7">
                                    <img class="border-4 rounded-full border-zinc-200" v-bind:src="imageFullPath">
                                </div>
                                <div class="mt-3">
                                    <div class="mt-2">
                                        <span class="dark:text-white text-2xl font-medium">{{admins.firstName+" "+admins.lastName}}</span>
                                    </div>
                                    <div class="mt-3 date flex items-center"> 
                                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                        </svg>
                                        <p class="dark:text-white">{{ $t("birth date") }}</p>
                                    </div>
                                    <div>
                                        <p class="dark:text-white"><i>{{ ((admins.birthDate.toString()).split('T')[0]) }}</i></p>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
                <!-- end:: Profile info-->
            </div>
        </div>
        <!-- Modal body -->
        <div class="w-full mb-5 space-y-5 p-5 border rounded-lg border-gray-600">
            <form>
                <div class="grid gap-6 mb-5 md:grid-cols-2">
                    <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('first name') }}</label>
                        <input type="text" v-model="adminfirstName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required>
                    </div>
                    <div>
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('last name') }}</label>
                        <input type="text" v-model="adminlastName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required>
                    </div>
                </div>
                <div class="grid gap-3 mb-3 md:grid-cols-2">
                    <div>
                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('phone number') }}</label>
                        <input type="tel" v-model="adminphoneNumber"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="+998wwXXXyyZZ" pattern="+[0-9]{3}[0-9]{2}[0-9]{3}[0-9]{2}[0-9]{2}"
                            required>
                    </div>
                    <div class="mb-2">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('password') }}</label>
                        <input type="password" v-model="adminpassword" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required>
                    </div>
                </div>
                <div class="grid gap-6 mb-5 md:grid-cols-2">
                    <div class="mb-3">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            for="file_input">{{ $t('upload image') }}</label>
                        <input accept="image/jpeg, image/png, image/jpg" @change="handleFileChange"
                            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            type="file">
                    </div>
                    <div>
                        <label for="input-group-1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('birth date') }}</label>
                        <div class="relative max-w-sm">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                </svg>
                            </div>
                            <input v-model="adminbirthDate" datepicker datepicker-buttons type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date">
                        </div>
                    </div>
                </div>
                <div class="grid gap-3 mb-3 md:grid-cols-3">
                    <div>
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('region') }}</label>
                        <input type="text" v-model="adminregion" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nukus" required>
                    </div>
                    <div>
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('district') }}</label>
                        <input type="text" v-model="admindistrict" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bozatau" required>
                    </div>
                    <div>
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('passport serial') }}</label>
                        <input type="text" v-model="adminpassportSerialNumber" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="KA1234567" required>
                    </div>
                </div>
                <div class="mb-2">                                                   
                    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('address') }}</label>
                    <input v-model="adminaddress" rows="4" class="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your current address...">
                </div>
            </form>
            <!-- Modal footer -->
            <div class="flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button @click="submitForm" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{{ $t('update') }}</button>
                <button @click="closeEditAsync" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">{{ $t('cancel') }}</button>
            </div>
            <!-- end::Modal footer -->
        </div>
    </div>
</template>

<!-- <style scoped></style> -->
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const t = useI18n()
</script>