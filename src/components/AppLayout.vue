<script setup lang="ts">
import IconArrowRight from './icons/IconArrorRight.vue'
import LogoHexschool from './icons/LogoHexschool.vue'


import { ref } from 'vue'

const courseNavigatorList = ref([
  {
    id: 0,
    name: '全部',
    tag: 'All',
    description: '六角學員作品牆，程式新手也能完成獨一無二的網頁作品。',
    isActive: false,
    relLinks: [{
      routeName: 'all-courses',
      url: 'https://www.hexschool.com/courses/?category=all-courses',
      urlText: '我也想做出專屬作品！',
    }],
  },
  {
    id: 1,
    name: 'Vue',
    tag: 'Vue',
    description: '使用業界熱門框架完成求職作品，提升職場競爭力！',
    isActive: false,
    relLinks: [
      {
        routeName: 'vue3',
        url: 'https://www.hexschool.com/courses/vue3.html',
        urlText: '前往 Vue 影音課',
      },
      {
        routeName: 'vue-training',
        url: 'https://www.hexschool.com/courses/vue-training.html',
        urlText: '前往 Vue 直播班',
      }],
  },
  {
    id: 2,
    name: '切版直播班',
    tag: 'HTML',
    description: '用三個月的時間，將切版技能練到巔峰。',
    isActive: false,
    relLinks: [{
      routeName: 'web-layout-training-1st',
      url: 'https://www.hexschool.com/courses/web-layout-training-1st.html',
      urlText: '我也想提升切版力！',
    }],
  },
  {
    id: 3,
    name: 'Node',
    tag: 'Node',
    description: '團隊共同完成符合商業邏輯的 Node.js 專案。',
    isActive: false,
    relLinks: [{
      routeName: 'node-project-training',
      url: 'https://www.hexschool.com/courses/node-project-training.html',
      urlText: '完成專案，提升競爭力！',
    }],
  },
  {
    id: 4,
    name: 'JS',
    tag: 'JS',
    description: '從基礎到 AJAX，體驗前端工程師的第一課！',
    isActive: false,
    relLinks: [{
      routeName: 'js-training',
      url: 'https://www.hexschool.com/courses/js-training.html',
      urlText: '循序漸進掌握 JS 邏輯',
    }],
  },
  {
    id: 5,
    name: 'Bootstrap',
    tag: 'Bootstrap',
    description:
      '使用 Bootstrap 快速完成切版版型，從設計稿到可觀賞網頁的不二選擇！',
    isActive: false,
    relLinks: [{
      routeName: 'bootstrap5',
      url: 'https://www.hexschool.com/courses/bootstrap5.html',
      urlText: '掌握業界必備網頁設計框架！',
    }],
  },
  {
    id: 6,
    name: 'UI',
    tag: 'UI',
    description: '好的設計，讓網站品質大加分！',
    isActive: false,
    relLinks: [{
      routeName: 'ui',
      url: 'https://www.hexschool.com/courses/ui.html',
      urlText: '我也想畫出有程式邏輯的設計稿！',
    }],
  },
]);

const courseName = ref('全部');
const courseDescription = ref('六角學員作品牆，程式新手也能完成獨一無二的網頁作品。');
const courseRelLinks = ref([{
  routeName: 'all-courses',
  url: 'https://www.hexschool.com/courses/?category=all-courses',
  urlText: '我也想做出專屬作品！',
}]);

const searchValue = ref('');
const selectedTag = ref('');
const tags = ref([]);

const deadline = ref({
  isExpired: false,
  seconds: 0,
  minutes: 0,
  hours: 0,
  days: 0,
});
defineProps<{
  // msg: string
}>()
</script>

<template>
  <header class="py-3 border-bottom">
    <div class="container">
      <router-link to="/" class="d-flex align-items-center">
        <LogoHexschool width="32" height="32" />
        <h1 class="h6 mb-0">六角學院作品牆</h1>
      </router-link>
    </div>
  </header>

  <nav class="py-4">
    <ul class="nav nav-pills justify-content-start justify-content-md-center flex-nowrap overflow-auto scrollBar">
      <li v-for="course in courseNavigatorList" :key="course.id" class="nav-item">
        <a href="#" class="nav-link fs-5" :class="{ 'active': course.isActive }" @click.prevent="tagClicked(course)">
          {{ course.name }}
        </a>
      </li>
    </ul>
  </nav>

  <section class="py-6">
    <h2 class="h4 text-center fw-bold mb-3">{{ courseName }}</h2>
    <p class="text-center fw-normal mb-3">
      {{ courseDescription }}
    </p>
    <div class="d-flex justify-content-center">
      <div class="mx-1" v-for="link in courseRelLinks" :key="link.routeName">
        <a :href="link.url" class="btn btn-outline-secondary" target="_blank">{{ link.urlText }}</a>
      </div>
    </div>
  </section>

  <form class="container">
    <div class="row justify-content-center align-items-center py-3 gap-2 gap-md-0">
      <div class="col-md-4 mb-md-0">
        <input class="form-control rounded-pill" v-model="searchValue" type="search" placeholder="搜尋此標籤下的作品"
          aria-label="Search" />
      </div>
      <div class="col-md-2 mb-md-0">
        <select class="form-select rounded-pill" v-model="selectedTag">
          <option disabled selected>選擇此標籤課程</option>
          <option value="">全部</option>
          <option v-for="(tag, id) in tags" :key="id" :value="item">
            {{ tag }}
          </option>
        </select>
      </div>
    </div>
  </form>

  <router-view></router-view>

  <footer class="py-3 mt-5" :class="{ 'pb-6': deadline.isExpired }">
    <div class="container">
      <p class="d-flex flex-column flex-md-row justify-content-md-between">
        <small class="fw-normal">
          <a href="mailto:service@hexschool.com">聯絡我們</a>
        </small>
        <small class="fw-normal">
          Copyright © 2024 HexSchool.All rights reserved.
        </small>
      </p>
    </div>
  </footer>
  <div class="
        text-center text-white
        fixed-bottom
        bg-danger
        px-2
        py-2
      " v-if="deadline.countStatus">

    <div class="
            d-flex
            align-items-center
            justify-content-md-center justify-content-between
          ">
      <div class="
              d-flex
              flex-md-row flex-column
              text-white
              justify-content-md-end
              pe-md-3 pe-0
            ">
        <span class="me-md-5 fw-bold text-start">最後報名機會 已破 330 人報名<br class="d-md-none d-block" />｜2024
          切版直播班</span>

        <div class="d-flex justify-content-start text-white text-nowrap">
          <span class="fw-bold">{{ deadline.days }} 天 {{ deadline.hours }} 時
            {{ deadline.minutes }} 分 {{ deadline.seconds }} 秒</span>
        </div>
      </div>
      <div class="
              d-flex
              justify-content-md-start justify-content-end
              ps-md-3 ps-0
            ">
        <a href="https://www.hexschool.com/courses/web-layout-training-1st.html" target="_blank"
          class="btn btn-dark btn-sm rounded-0">
          晚鳥 66 折
          <IconArrowRight />
        </a>
      </div>
    </div>

  </div>
</template>

<style scoped>
.scrollBar::-webkit-scrollbar {
  display: none;
}

.nav-link {
  white-space: nowrap;
}
</style>
