<script setup lang="ts">
import { ref } from 'vue';

import IconChevronDown from './icons/IconChevronDown.vue';
import IconBehance from './icons/IconBehance.vue';
import IconGitHub from './icons/IconGitHub.vue';
import IconLink from './icons/IconLink.vue';

const props = defineProps({
  projects: {
    type: Object,
    default: () => { },
  },
});

const colorMap = {
  HTML: '#005856',
  Bootstrap: '#7952b3',
  JS: '#8E240E',
  Vue: '#3eaf7c',
  React: '#6dd3fd',
  Node: '#27866b',
  UI: '#2962ff',
  default: '#000000'
};

const activeCardId = ref(null);
const onClickHandler = (id) => {
  activeCardId.value = activeCardId.value === id ? null : id;
};
const isActive = (id) => {
  return activeCardId.value === id;
};

const hoveredProjectId = ref(null);
const isHovered = (id) => {
  return hoveredProjectId.value === id;
}
</script>

<template>
  <div class="row g-4">
    <div class="col-md-6 col-lg-4" v-for="project in props.projects" :key="project.id">
      <div class="card" @mouseover="hoveredProjectId = project.id" @mouseleave="hoveredProjectId = null">
        <div class="position-relative card-inner">
          <template v-if="project.thumbnail_small">
            <img :src="project.thumbnail_small" class="card-img-top border rounded" :alt="project.title" />
          </template>
          <template v-else>
            <img src="https://fakeimg.pl/415x312/?text=Coming Soon" class="img-fluid" />
          </template>
          <span class="badge rounded-pill position-absolute top-0 end-0 mt-3 me-3"
            :style="{ backgroundColor: colorMap[project.course_tag] || colorMap.default }">{{ project.course
            }}</span>
          <transition name="fade">
            <div v-show="isHovered(project.id)" class="overlay w-100 position-absolute bottom-0 px-3">
              <div class="overlay-text d-flex justify-content-between text-white"
                :class="{ 'mb-2': project.tags.length > 1 }">
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
          <a :href="project.url" target="_blank" class="stretched-link me-auto">
            <h2 class="h6 card-title mb-0">{{ project.title }}</h2>
          </a>
          <button type="button" class="btn p-0 position-relative z-1" @click="onClickHandler(project.id)">
            <IconChevronDown />
            <div v-if="isActive(project.id)" class="
              position-absolute
              end-0
              border
              bg-white
              p-3
              rounded
              shadow-sm
              z-1
              text-start
            " style="width: 300px">
              <div class="d-flex justify-content-between mb-3">
                <h5 class="fs-6 mb-0">作者：{{ project.name }}</h5>
                <h5 class="fs-6 mb-0">{{ project.year }} 年</h5>
              </div>
              <ul class="list-unstyled">
                <li v-if="project.social_github_link" class="text-truncate">
                  <a :href="project.social_github_link" target="_blank">
                    <IconGitHub />
                    {{ project.social_github_link }}
                  </a>
                </li>
                <li v-if="project.git_repo" class="text-truncate">
                  <a :href="project.git_repo" target="_blank">
                    <IconLink />
                    {{ project.git_repo }}
                  </a>
                </li>
                <li v-if="project.social_behance_link" class="text-truncate">
                  <a :href="project.social_behance_link" target="_blank">
                    <IconBehance />
                    {{ project.social_behance_link }}
                  </a>
                </li>
              </ul>
              <p>{{ project.description }}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-img-top {
  object-fit: cover;
  height: 312px;
}

.card-inner {
  height: 312px;
  background-color: #d9d9d9;
  border-radius: 6px;
}

/* 遮罩 */
.overlay {
  background: linear-gradient(180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.7) 100%);
  background-size: 100%;
  background-position-y: bottom;
  background-repeat: no-repeat;
  padding-top: 100px;
  border-radius: 4px;
}

/* 淡入淡出動畫效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>