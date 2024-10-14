<script setup lang="ts">
import { onMounted, ref } from 'vue'

import AppCard from '../components/AppCard.vue'
import AppPagination from '../components/AppPagination.vue'

import axios from 'axios'
const http = axios.create({
  baseURL: import.meta.env.MODE === 'production' ? import.meta.env.VITE_APP_PATH : ''
})

const projects = ref([]);
onMounted(async () => {
  const { data } = await http.get('https://raw.githubusercontent.com/hexschool/hexschoolActionAPI/master/data.json')
  projects.value = data;
})
</script>

<template>
  <main class="container">
    <section class="py-5">
      <AppCard :projects="projects" />
    </section>
    <AppPagination />
  </main>
</template>
