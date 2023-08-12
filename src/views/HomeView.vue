<script setup lang="ts">
import Header from '../components/common/Header.vue'
import Sidebar from '../components/common/Sidebar.vue'
import Footer from '../components/common/Footer.vue'
</script>

<template>
  <Header></Header>
  <Sidebar></Sidebar>
  <div class="p-2 sm:ml-64">
      <div class="p-4 mt-14">
        <main>
        </main>
        <Footer></Footer>
      </div>
  </div>
</template>
