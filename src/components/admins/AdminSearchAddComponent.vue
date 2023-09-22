<script lang="ts">
import { defineComponent } from 'vue'
import IconAdd from '../icons/common/IconAdd.vue'
import axios from '@/plugins/axios';
import { useI18n } from 'vue-i18n'
import { getToken } from '@/helpers/TokenHelper';

export default defineComponent({
    components: {
        IconAdd
    },
    data() {
        return {
            firstName: "" as string,
            lastName: "" as string,
            imagePath: null as File | null,
            birthDate: Date,
            phoneNumber: "" as string,
            password: "" as string,
            passportSerialNumber: "" as string,
            region: "" as string,
            district: "" as string,
            address: "" as string,
            showCreateModal: false as Boolean
        }
    },
    methods: {
        async uploadImageAsync() {
            if (this.imagePath) {
                try {
                    const token = getToken();
                    const response = await axios.post('/api/head/admins', {
                        "FirstName": this.firstName,
                        "LastName": this.lastName,
                        "BirthDate": this.birthDate,
                        "PhoneNumber": this.phoneNumber,
                        "Password": this.password,
                        "PassportSerialNumber": this.passportSerialNumber,
                        "Region": this.region,
                        "District": this.district,
                        "Address": this.address,
                        "ImagePath": this.imagePath
                    }, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': 'Bearer ' + token
                        },
                    });
                    console.log('Upload successful!', response.data);
                    this.showCreateModal = false;
                    location.reload();
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            }
        },
        handleFileChange(event: any) {
            const files = event.target.files;
            if (files && files.length > 0) {
                this.imagePath = files[0];
            }
            else {
                this.imagePath = null;
            }
        },
        openCreateModal() {
            this.showCreateModal = true;
        },
        closeCreateModal() {
            this.showCreateModal = false;
        },
        setup() {
            const { t } = useI18n();
        }
    }
});
</script>
<template>
    <div class="flex items-center justify-between pl-1 pt-1 pb-4">
        <!-- begin:: Admin ADD -->
        <div class="grid justify-items-end">
            <button @click="openCreateModal"
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 font-medium rounded-full text-sm px-2 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                <IconAdd></IconAdd>
            </button>
        </div>
        <form v-if="showCreateModal"
            class="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center bg-black bg-opacity-50">
            <div class="relative w-full max-w-lg max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <!-- Modal header -->
                    <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            {{ $t("admin add window") }}
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
                    <div class="p-5 space-y-5">
                        <form>
                            <div class="grid gap-6 mb-5 md:grid-cols-2">
                                <div>
                                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('first name') }}</label>
                                    <input type="text" v-model="firstName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required>
                                </div>
                                <div>
                                    <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('last name') }}</label>
                                    <input type="text" v-model="lastName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required>
                                </div>
                            </div>
                            <div class="grid gap-3 mb-3 md:grid-cols-2">
                                <div>
                                    <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('phone number') }}</label>
                                    <input type="tel" v-model="phoneNumber"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="+998wwXXXyyZZ" pattern="+[0-9]{3}[0-9]{2}[0-9]{3}[0-9]{2}[0-9]{2}"
                                        required>
                                </div>
                                <div class="mb-2">
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('password') }}</label>
                                    <input type="password" v-model="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required>
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
                                        <input v-model="birthDate" datepicker datepicker-buttons type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date">
                                    </div>
                                </div>
                            </div>
                            <div class="grid gap-3 mb-3 md:grid-cols-3">
                                <div>
                                    <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('region') }}</label>
                                    <input type="text" v-model="region" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nukus" required>
                                </div>
                                <div>
                                    <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('district') }}</label>
                                    <input type="text" v-model="district" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bozatau" required>
                                </div>
                                <div>
                                    <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('passport serial') }}</label>
                                    <input type="text" v-model="passportSerialNumber" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="KA1234567" required>
                                </div>
                            </div>
                            <div class="mb-2">                                                   
                                <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('address') }}</label>
                                <input v-model="address" rows="4" class="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your current address...">
                            </div>
                        </form>
                    </div>
                    <!-- Modal footer -->
                    <div class="flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button @click="uploadImageAsync" type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                    <button @click="closeCreateModal" type="button"
                        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                </div>
            </div>
        </div>
        </form>
        <!-- end:: Admin ADD -->
    </div>
</template>