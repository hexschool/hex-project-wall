<script setup lang="ts">
import { ref, watch } from "vue";

import { VueAwesomePaginate } from 'vue-awesome-paginate'
import 'vue-awesome-paginate/dist/style.css'

import { useRoute } from 'vue-router';
const route = useRoute();

defineProps({
  projects: {
    type: Object,
    default: () => { },
  },
});

const emit = defineEmits(["update:currentPage"]);
const currentPage = ref(1);
const itemsPerPage = ref(21);

const onClickHandler = (newPage) => {
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

</script>
<template>
  <div class="d-flex justify-content-center py-5">
    <VueAwesomePaginate :total-items="projects.length" :items-per-page="itemsPerPage" :max-pages-shown="5"
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
