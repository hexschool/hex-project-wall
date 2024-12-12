<script setup lang="ts">
import type { Ref } from 'vue';
import type { CourseCategory, CourseCategoryDetail } from '../types/global.type';

import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// composables
import { useCountdown } from '../composables/countdownActivity';

// apis
import { apiGetCategories } from '../apis/data';

// assets
import logo from '../assets/logo.svg';

// icons
import IconArrowRight from './icons/IconArrorRight.vue';

// data
import courseCategory from '../data/course-category.json';

const route = useRoute();
const router = useRouter();

const courseCategoryList: Ref<CourseCategory[]> = ref(courseCategory);
const courseCategoryDetail: Ref<CourseCategoryDetail> = ref({
  name: '全部',
  category: 'All',
  description: '六角學員作品牆，程式新手也能完成獨一無二的網頁作品。',
  relLinks: [{
    routeName: 'all-courses',
    url: 'https://www.hexschool.com/courses/?category=all-courses',
    urlText: '我也想做出專屬作品！',
  }],
});

const categories: Ref<Record<string, string[]>> = ref({});
const searchValue: Ref<string> = ref('');
const tags: Ref<string[]> = ref([]);
const selectedTag: Ref<string> = ref('');


onMounted(async () => {
  try {
    const { data } = await apiGetCategories();
    categories.value = data;

    // 透過網址分類進來
    if (route.query.category) {
      const category = courseCategoryList.value.filter((courseCategory) => courseCategory.category === route.query.category);
      onClickHandler(category[0]);
    }
  } catch (err) {
    console.log(err);
  }
})

const onClickHandler = (course: CourseCategory) => {
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
  tags.value = categories.value[course.category];

  // 搜尋與下拉選項回到初始狀態
  searchValue.value = '';
  selectedTag.value = '';

  // route 更新
  router.replace({
    query: {
      ...route.query,
      category: course.category,
    }
  });

};


// 活動倒數公告 
const deadline = 'Nov 13 2024 23:59:59';
const { formattedTime } = useCountdown(deadline);

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

  <router-view
    :filterCourses="{ category: courseCategoryDetail.category, searchValue, tag: selectedTag }"></router-view>

  <footer class="py-3 mt-5" :class="{ 'pb-6': formattedTime }">
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
      " v-if="formattedTime">

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
          <span class="fw-bold">
            {{ formattedTime }}
          </span>
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
