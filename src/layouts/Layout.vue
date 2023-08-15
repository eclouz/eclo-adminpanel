<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '../components/common/Header.vue'
import Sidebar from '../components/common/Sidebar.vue'
import Footer from '../components/common/Footer.vue'
import ThemeSetter from '../components/common/ThemeSetter.vue'
import FlowbiteSetup from './FlowbiteSetup.vue'
</script>

<template>
  <ThemeSetter></ThemeSetter>
  <Header></Header>
  <Sidebar></Sidebar>
  <div class="p-2 sm:ml-64">
      <div class="p-4 mt-14">
        <RouterView></RouterView>
        <Footer></Footer>
      </div>
  </div>
</template>