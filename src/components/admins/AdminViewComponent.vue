<script lang="ts">
import IconDelete from "../../components/icons/common/IconDelete.vue"
import IconEdit from "../../components/icons/common/IconEdit.vue"
import { formatDate } from '@/helpers/DateHelper'
import { defineComponent } from 'vue'
import axios from '@/plugins/axios'
import type { AdminViewModel } from "@/viewmodels/AdminViewModels"
import { getToken } from "@/helpers/TokenHelper"
export default defineComponent ({
    components: {
        IconDelete, IconEdit
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
    data() {
        return {
            adminsList: [] as AdminViewModel[],
            showDeleteModal: false as Boolean,
            showEditModal: false as Boolean,

            baseURL: "" as String,
            imageFullPath: "" as String,
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
    methods: {
        async submitForm() {
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
            if (this.adminimagePath) {
                formData.append('ImagePath', this.adminimagePath);
                try {
                    const response = await axios.put('/api/head/admins/' + this.id, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': 'Bearer ' + token
                        }
                    });
                    console.log('Update successful', response.data);
                    this.showEditModal = false;
                    location.reload();
                } catch (error) {
                    console.error('Update error', error);
                }
            }
        },
        async getDataAsync() {
            const response = await axios.get<AdminViewModel[]>('/api/head/admins?page=1');
            this.adminsList = response.data;
        },
        handleFileChange(event: any) {
            const fileInput = event.target as HTMLInputElement;
            if (fileInput.files && fileInput.files[0]) {
                this.adminimagePath = fileInput.files[0];
                console.log(this.adminimagePath)
            }
        },
        load() {
            this.baseURL = axios.defaults.baseURL!;
            this.imageFullPath = this.baseURL + "/" + this.imagePath;
            this.birthDateString = formatDate(this.birthDate!);
            this.createdAtString = formatDate(this.createdAt!);
            this.updatedAtString = formatDate(this.updatedAt!);
        },
        async deleteDataAsync(id:any){
            const token = getToken();
            await axios.delete("/api/head/admins/" + id, {
                headers:{
                    'Authorization': 'Bearer ' + token
                }
            })
            location.reload();
        },
        openDeleteModal() {
            this.showDeleteModal = true;
        },
        closeDeleteAsync() {
            this.showDeleteModal = false;
        },
        openEditModal() {
            this.adminfirstName = this.firstName?.toString()!;
            this.adminlastName = this.lastName?.toString()!;
            this.adminphoneNumber = this.phoneNumber!;
            this.imageFullPath = this.imagePath!;
            this.adminpassportSerialNumber = this.passportSerialNumber!;
            this.birthDateString = this.birthDate?.toString()!;
            this.adminpassword = this.password!;
            this.adminregion = this.region!;
            this.admindistrict = this.district!;
            this.adminaddress = this.address!;

            this.showEditModal = true;
        },
        closeEditAsync() {
            this.showEditModal = false;
        }
    },
    mounted() {
        this.load();
    }
})
</script>

<template>
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <!-- <td class="w-4 p-4">
            <div class="flex items-center">
                <input id="checkbox-table-search-1" type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
            </div>
        </td> -->
        <td class="px-6 py-4">
            #{{ id }}
        </td>
        <td scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
            <img class="w-10 h-10 rounded-full" v-bind:src="imageFullPath">
            <div class="pl-3">
                <div class="text-base font-semibold"> {{ firstName + " " + lastName}} </div>
                <div class="font-normal text-gray-500"> {{ phoneNumber }} </div>
            </div>
        </td>
        <td class="px-6 py-4">
            {{ passportSerialNumber }}
        </td>
        <td class="px-6 py-4">
            {{ birthDateString }}
        </td>
        <td class="px-6 py-4">
            {{ region + ", " + district + ", " + address}}
        </td>
        <td class="px-6 py-4">
            {{ createdAtString }}
        </td>
        <td class="px-6 py-4">
            {{ updatedAtString }}
        </td>
        <td class="px-6 py-14 flex justify-center items-center" >
            <div>
                <!-- begin:: Edit Modal -->
                <button @click="openEditModal"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    <IconEdit></IconEdit>
                </button>
                <div v-if="showEditModal" class="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center bg-black bg-opacity-50">
                    <div class="relative w-full max-w-lg max-h-full">
                        <!-- Modal content -->
                        <form @submit.prevent="submitForm" action="#" class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <!-- Modal header -->
                            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    {{ $t("admin update window") }}
                                </h3>
                                <button @click="closeEditAsync" type="button"
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
                            </div>
                            <!-- Modal footer -->
                            <div class="flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                                <button @click="closeEditAsync" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- end:: Edit Modal -->
                <!-- begin:: Delete Modal -->
                <button @click="openDeleteModal"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    <IconDelete></IconDelete>
                </button>
                <div v-if="showDeleteModal" class="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center bg-black bg-opacity-50">
                    <div class="relative w-full max-w-md max-h-full">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button @click="closeDeleteAsync" type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                            <div class="p-6 text-center">
                                <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this admin?</h3>
                                <button @click="deleteDataAsync(id)" data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                    Yes, I'm sure
                                </button>
                                <button @click="closeDeleteAsync" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end:: Delete Modal -->
            </div>
        </td>
    </tr>
</template>