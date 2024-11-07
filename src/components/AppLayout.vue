<script setup lang="ts">
import logo from '../assets/logo.svg';
import IconArrowRight from './icons/IconArrorRight.vue';

import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import httpRequest from '../apis/httpRequest';


import activityCountdown from '../composables/activityCountdown';


// const { countdown, timeId } = activityCountdown()



const route = useRoute();
const router = useRouter();

// onUnmounted(() => {
//   clearInterval(timeId.value);
// });

const courseCategoryList = ref([
  {
    id: 0,
    name: '全部',
    tag: 'All',
    description: '六角學員作品牆，程式新手也能完成獨一無二的網頁作品。',
    isActive: true,
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
    name: 'React',
    tag: 'React',
    description:
      '使用業界熱門框架完成求職作品，提升職場競爭力！',
    isActive: false,
    relLinks: [{
      routeName: 'react',
      url: 'https://www.hexschool.com/courses/react.html',
      urlText: '前往 React 影音課！',
    },
    {
      routeName: 'js-react-training',
      url: 'https://www.hexschool.com/courses/js-react-training.html',
      urlText: '前往前端工程師培訓班',
    }],
  },
  {
    id: 7,
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
const courseCategoryDetail = ref({
  name: '全部',
  tag: 'All',
  description: '六角學員作品牆，程式新手也能完成獨一無二的網頁作品。',
  relLinks: [{
    routeName: 'all-courses',
    url: 'https://www.hexschool.com/courses/?category=all-courses',
    urlText: '我也想做出專屬作品！',
  }],
});

const categories = ref([]);
const searchValue = ref('');
const tags = ref([]);
const selectedTag = ref('');


onMounted(async () => {
  const { data } = await httpRequest.http.get('https://raw.githubusercontent.com/hexschool/hexschoolActionAPI/refs/heads/master/category.json');
  categories.value = data;

  // 透過網址分類進來
  if (route.query.category) {
    const category = courseCategoryList.value.filter((courseCategory) => courseCategory.tag === route.query.category);
    onClickHandler(category[0]);
  }
})

const onClickHandler = (course) => {
  // 切換 category active 
  courseCategoryList.value = courseCategoryList.value.map((courseCategory) => ({
    ...courseCategory,
    isActive: courseCategory.id === course.id
  }));

  //  category 的詳細資訊
  courseCategoryDetail.value = {
    ...course
  }

  // tag 選項更新
  tags.value = categories.value[course.tag];

  // route 更新
  router.replace({
    query: {
      ...route.query,
      category: course.tag,
    }
  });

};

// 活動倒數公告
const countdown = ref({
  isExpired: true,
  seconds: 0,
  minutes: 0,
  hours: 0,
  days: 0
});

const deadline = ref('Nov 13 2024 23:59:59');
if (countdown.value.isExpired) {
  activityCountdown(deadline.value, (updatedDeadline) => {
    countdown.value = { ...updatedDeadline };
  });
}


</script>

<template>
  <header class="py-3 border-bottom">
    <div class="container">
      <router-link to="/" class="d-flex align-items-center">
        <img :src="logo" alt="六角學院作品牆" width="32" height="32">
        <h1 class="h6 mb-0">六角學院作品牆</h1>
      </router-link>
    </div>
  </header>

  <nav class="py-4">
    <ul class="nav nav-pills justify-content-start justify-content-md-center flex-nowrap overflow-auto scrollBar">
      <li v-for="courseCategory in courseCategoryList" :key="courseCategory.id" class="nav-item">
        <a href="#" class="nav-link fs-5" :class="{ 'active': courseCategory.isActive }"
          @click.prevent="onClickHandler(courseCategory)">
          {{ courseCategory.name }}
        </a>
      </li>
    </ul>
  </nav>

  <section class="py-6">
    <h2 class="h4 text-center fw-bold mb-3">{{ courseCategoryDetail.name }}</h2>
    <p class="text-center fw-normal mb-3">
      {{ courseCategoryDetail.description }}
    </p>
    <div class="d-flex justify-content-center">
      <div class="mx-1" v-for="link in courseCategoryDetail.relLinks" :key="link.routeName">
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
          <option v-for="(tag, id) in tags" :key="id" :value="tag">
            {{ tag }}
          </option>
        </select>
      </div>
    </div>
  </form>

  <router-view :filterCourses="{ category: courseCategoryDetail.tag, searchValue, tag: selectedTag }"></router-view>

  <footer class="py-3 mt-5" :class="{ 'pb-6': countdown.isExpired }">
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
      " v-if="countdown.isExpired">

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
        <span class="me-md-5 fw-bold text-start">【熱烈報名中】
          後端工程師-資料庫體驗營
          <!-- <br class="d-md-none d-block" />｜2024 切版直播班 -->
        </span>

        <div class="d-flex justify-content-start text-white text-nowrap">
          <span class="fw-bold">{{ countdown.days }} 天 {{ countdown.hours }} 時
            {{ countdown.minutes }} 分 {{ countdown.seconds }} 秒</span>
        </div>
      </div>
      <div class="
              d-flex
              justify-content-md-start justify-content-end
              ps-md-3 ps-0
            ">
        <a href="https://www.hexschool.com/2024/10/02/2024-10-02-backend-database-camping/" target="_blank"
          class="btn btn-dark btn-sm rounded-0">
          立即享優惠
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
