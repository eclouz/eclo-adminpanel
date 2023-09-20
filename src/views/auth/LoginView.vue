<script lang="ts">
import { defineComponent } from 'vue';
import axios from '@/plugins/axios'
import { LoginDto} from '@/dtos/AuthDtos'

export default defineComponent({
    data() {
        return {
            phone: "" as String,
            password: "" as String,
            existError: false as Boolean
        }
    },
    methods: {
        async loginAsync() {
            var loginDto = new LoginDto();
            //  const formData = new FormData();
            //  formData.append('PhoneNumber', this.phone.toString())
            //  formData.append('Password', this.password.toString())
             loginDto.phoneNumber = this.phone;
             loginDto.password = this.password;
             var jsonContent:string = JSON.stringify(loginDto);
             const response = await axios.post('api/admin/auth/login', jsonContent, {
                headers: {
                    'Content-Type': 'application/json'
                }
             });
             if (response.status == 200) {
                var token:string = response.data.token;
                document.cookie = "access_token = " + token + "; expires: SESSION; path=/";
                this.$router.push("/dashboard");
             }
             else{
                this.existError = true;
             }
        },
        closeError() {
            this.existError = false;
        }
    }
})
</script>

<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a class="flex items-center justify-center text-2xl font-semibold text-gray-900 dark:text-white">
                <img class="w-32 h-24 mr-2" src="../../assets/logo.svg" alt="logo">
            </a>
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <!-- begin:: Register Form -->
                    <div class="space-y-4 md:space-y-6">
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                            <input type="tel"
                                v-model="phone"    
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+998wwXXXyyZZ" pattern="+[0-9]{3}[0-9]{2}[0-9]{3}[0-9]{2}[0-9]{2}" required>
                        </div>
                        <div>
                            <label for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" v-model="password" placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox"
                                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800">
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                                </div>
                            </div>
                            <router-link to="/auth/reset-password">
                                <a href="#"
                                    class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot
                                    password?</a>
                            </router-link>
                        </div>
                        <button @click="loginAsync"
                            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign in</button>
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                                This website only for ECLO admins!
                            </p>
                    </div>
                    <!-- end:: Register Form -->
                </div>
            </div>
            <!-- begin:: LoginInvalid error alert -->
            <div v-show="existError == true" 
                id="alert-border-2" class="flex items-center p-4 mt-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
                <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <div class="ml-3 text-sm">
                    <span class="font-medium">Danger alert!</span> Phone number or Password is invalid.
                </div>
                <button @click="closeError" type="button" class="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"  data-dismiss-target="#alert-border-2" aria-label="Close">
                    <span class="sr-only">Dismiss</span>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
            </div>
            <!-- end:: LoginInvalid error alert -->
        </div>
    </section>
</template>

<style scoped></style>