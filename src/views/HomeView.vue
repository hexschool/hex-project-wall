<script setup lang="ts">
import type { Ref } from 'vue';
import type { Project } from '../types/global.type';

import { onMounted, ref, computed } from 'vue';

// components
import AppCard from '../components/AppCard.vue';
import AppPagination from '../components/AppPagination.vue';

// apis
import { apiGetProjects } from '../apis/data';

interface Props {
  filterCourses: {
    category: string
    searchValue: string
    tag: string
  }
}

const props = withDefaults(defineProps<Props>(), {
  filterCourses: () => ({
    category: 'All',
    searchValue: '',
    tag: ''
  })
});


const projects: Ref<Project[]> = ref([]);
onMounted(async () => {
  try {
    const { data } = await apiGetProjects();
    projects.value = data;
  } catch (err) {
    console.log(err);
  }
});

const filteredCourses = computed(() => {
  const { category, searchValue, tag } = props.filterCourses;

  return projects.value.filter((project) => {
    // 檢查 category 條件
    const matchCategory = category === 'All' || project.course_tag === category;

    // 檢查 tag 條件
    const matchTag = !tag || project.course === tag;

    // 檢查 searchValue 條件，搜尋作品標題或作者
    const reg = new RegExp(searchValue, 'i');
    const matchSearchValue = searchValue === '' ||
      reg.test(project.title) ||
      reg.test(project.name)

    // 所有條件都符合才返回 true
    return matchCategory && matchSearchValue && matchTag;
  })
});

const currentPage = ref(1);
const itemsPerPage = 21;
// 根據 currentPage 計算當前頁的資料，ex: 第一頁呈現 0-20 的資料，共 21 筆
const pagedCourses = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredCourses.value.slice(start, end);
});
</script>

<template>
  <main class="container">
    <section class="py-5">
      <AppCard :projects="pagedCourses" />
    </section>
    <AppPagination :projects="filteredCourses" @update:currentPage="(newPage: number) => currentPage = newPage" />
  </main>
</template>
