<script setup lang="ts">
import type { Ref } from 'vue';
import type { Project } from '@/types/global.type';

import { ref, watch } from "vue";
import { useRoute } from 'vue-router';

// plugin
import { VueAwesomePaginate } from 'vue-awesome-paginate'
import 'vue-awesome-paginate/dist/style.css'

interface Props {
  projects: Project[]
}

const route = useRoute();

const props = defineProps<Props>();

const emit = defineEmits(["update:currentPage"]);

const currentPage: Ref<number> = ref(1);
const itemsPerPage: Ref<number> = ref(21);

const onClickHandler = (newPage: number) => {
  currentPage.value = newPage;
  emit('update:currentPage', newPage);
};

// 路由改變時回到第一頁
watch(
  () => route.query.category,
  () => {
    onClickHandler(1);
  }
);

defineExpose({ currentPage })
</script>
<template>
  <div class="d-flex justify-content-center py-5">
    <VueAwesomePaginate :total-items="props.projects.length" :items-per-page="itemsPerPage" :max-pages-shown="5"
      v-model="currentPage" @click="onClickHandler" />
  </div>
</template>

<style scoped>
.pagination-container {
  display: flex;
  column-gap: 10px;
  margin-bottom: 0;
}

:deep(.paginate-buttons) {
  height: 36px;
  width: 36px;
  cursor: pointer;
  border-radius: 4px;
  background-color: white;
  border: none;
  color: black;
}

:deep(.paginate-buttons:hover) {
  background-color: #d8d8d8;
}

:deep(.active-page) {
  background-color: #00251A;

  border: 1px solid #00251A;

  color: white;
}

:deep(.active-page:hover) {
  background-color: #00251A;
}
</style>
