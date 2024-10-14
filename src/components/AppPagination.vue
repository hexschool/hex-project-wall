<script setup lang="ts">
import { ref } from "vue";

const onClickHandler = (page: number) => {
  console.log(page);
};

const currentPage = ref(1);
</script>
<template>
  <div class="d-flex justify-content-center py-5">
    <vue-awesome-paginate :total-items="50" :items-per-page="21" :max-pages-shown="5" v-model="currentPage"
      @click="onClickHandler" />
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
