<script setup lang="ts">
</script>

<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" class="flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
                <img class="w-32 h-24 mr-2" src="../../assets/logo.svg" alt="logo">
            </a>
            <div
                class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Send Code
                </h2>
                <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                    <div>
                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone
                            number</label>
                        <input type="tel" id="phone"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="+998wwXXXyyZZ" pattern="+[0-9]{3}[0-9]{2}[0-9]{3}[0-9]{2}[0-9]{2}"
                            required>
                    </div>
                    <div class="flex items-start">
                        <div class="ml-3 text-sm">
                            <label for="newsletter" class="font-light text-gray-500 dark:text-gray-300">Enter the phone
                                number you used when you joined and we'll <br>send you instructions to reset your
                                password.</label>
                        </div>
                    </div>
                    <RouterLink to="/auth/verify">
                        <button type="submit"
                            class="w-full mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Send</button>
                    </RouterLink>
                </form>
            </div>
        </div>
    </section>
</template>

<style scoped>
</style>