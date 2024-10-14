<script setup lang="ts">
import { ref } from 'vue';

const tagBg = ref('');

defineProps({
  projects: {
    type: Object,
    default: () => { },
  },
});
</script>

<template>
  <div class="row">
    <div class="col-md-6 col-lg-4" v-for="project in projects" :key="project.id">
      <div class="card">
        <div class="position-relative card-inner">
          <template v-if="project.thumbnail_small">
            <img :src="project.thumbnail_small" class="card-img-top border" :alt="project.title"
              style="height: 312px" />
          </template>
          <template v-else>
            <img src="https://fakeimg.pl/415x312/?text=Coming Soon" class="img-fluid" />
          </template>
          <span class="badge rounded-pill position-absolute start-3 top-3" :class="tagBg">{{ project.course }}</span>
          <transition>
            <div v-show="hover" class="overlay w-100 position-absolute bottom-0 px-3">
              <div class="overlay-text d-flex justify-content-between text-white">
                <h5 class="fs-6 mb-0">作者：{{ project.name }}</h5>
                <h5 class="fs-6 mb-0">{{ project.year }} 年</h5>
              </div>
              <ul class="list-unstyled d-flex overflow-auto scrollBar">
                <li class="ms-1" v-for="(tag, id) in project.tags" :key="id">
                  <span class="badge rounded-pill bg-primary">{{ tag }}</span>
                </li>
              </ul>
            </div>
          </transition>
        </div>

        <div class="card-body d-flex align-items-center">
          <a :href="project.url" target="_blank" class="stretched-link mr-auto text-decoration-none">
            <h2 class="h6 card-title mb-0">{{ project.title }}</h2>
          </a>
          <button type="button" class="btn p-0 position-relative z-index" @click="btnActive">
            <i class="fas fa-angle-down"></i>
            <div v-if="active" class="
              position-absolute
              right-0
              border
              bg-white
              py-2
              px-3
              rounded
              shadow-sm
              z-index
            " style="width: 300px">
              <div class="d-flex justify-content-between">
                <h5 class="fs-6">作者：{{ project.name }}</h5>
                <h5 class="fs-6">{{ project.year }} 年</h5>
              </div>
              <ul class="list-unstyled">
                <li v-if="project.social_github_link" class="text-truncate">
                  <a :href="project.social_github_link" target="_blank">
                    <i class="fab fa-github mr-2"></i>
                    {{ project.social_github_link }}
                  </a>
                </li>
                <li v-if="project.git_repo" class="text-truncate">
                  <a :href="project.git_repo" target="_blank">
                    <i class="fas fa-link mr-2"></i>
                    {{ project.git_repo }}
                  </a>
                </li>
                <li v-if="project.social_behance_link" class="text-truncate">
                  <a :href="project.social_behance_link" target="_blank">
                    <i class="fab fa-behance mr-2"></i>
                    {{ project.social_behance_link }}
                  </a>
                </li>
              </ul>
              <p class="text-left mb-0">{{ project.description }}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-inner {
  height: 312px;
  background-color: #d9d9d9;
}
</style>