import { describe, it, expect, beforeEach, vi } from 'vitest'

import { mount, flushPromises, VueWrapper } from '@vue/test-utils'

import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router'

import HomeView from '@/views/HomeView.vue'

import apis from '@/apis/data'

type HomeViewInstance = InstanceType<typeof HomeView>
// router
const router = createRouter({
  history: createWebHistory(),
  routes
})
const push = vi.spyOn(router, 'push')

const projects = {
  data: [
    {
      id: '0',
      course: '2020 作品直播夏季班',
      course_tag: 'Vue',
      description: '以登山為主題的電商網站',
      git_repo: '',
      is_display: '是',
      name: 'Alice',
      social_behance_link: '',
      social_fb_link: '',
      social_github_link: '',
      tags: ['Vue'],
      thumbnail: 'https://firebasestorage.googleapis.com/image.png',
      thumbnail_small: 'https://firebasestorage.googleapis.com/image_small.png',
      title: 'MOUNTAIN',
      url: 'https://chukuohua.github.io/mountain/#/',
      year: '2020',
      六角審核: true
    },
    {
      id: '1',
      course: '2022 網頁切版直播班夏季班',
      course_tag: 'HTML',
      description: '',
      git_repo: '',
      is_display: '是',
      name: 'masaki',
      social_behance_link: '',
      social_fb_link: '',
      social_github_link: '',
      tags: ['Bootstrap', 'Sass/SCSS', 'RWD'],
      thumbnail: 'https://firebasestorage.googleapis.com/image.png',
      thumbnail_small: 'https://firebasestorage.googleapis.com/image_small.png',
      title: '日日背單字',
      url: 'https://masakilee.github.io/memory/',
      year: '2022',
      六角審核: true
    },
    {
      id: '2',
      course: 'UI 設計入門：畫出有程式邏輯的設計稿',
      course_tag: 'UI',
      description: '「懶散營業中」是以販售二手選物、古董老件為主的模擬電商平臺。',
      git_repo: '',
      is_display: '是',
      name: 'Chen',
      social_behance_link: '',
      social_fb_link: '',
      social_github_link: '',
      tags: [''],
      thumbnail: 'https://firebasestorage.googleapis.com/image.png',
      thumbnail_small: 'https://firebasestorage.googleapis.com/image_small.png',
      title: '懶散營業中',
      url: 'https://www.behance.net/gallery/129106075/E-Commerce-Website',
      year: '2021',
      六角審核: true
    }
  ]
}
const mockApiGetProjects = vi.spyOn(apis, 'apiGetProjects')
mockApiGetProjects.mockResolvedValue(projects)

describe('HomeView', async () => {
  let wrapper: VueWrapper<HomeViewInstance>

  beforeEach(async () => {
    push.mockClear()
    mockApiGetProjects.mockClear()

    router.push({ name: 'HomeView' })
    await router.isReady()

    wrapper = mount(HomeView, {
      global: {
        plugins: [router]
      },
      props: {
        filterCourses: {
          category: 'All',
          searchValue: '',
          tag: ''
        }
      }
    })
    await flushPromises()
  })

  it('HomeView is visible', () => {
    expect(wrapper.isVisible()).toBe(true)
  })

  it('apiGetProjects 至少會呼叫一次', () => {
    expect(mockApiGetProjects).toHaveBeenCalledTimes(1)
  })

  it('當沒有條件時，回傳所有作品', async () => {
    wrapper.setProps({
      filterCourses: { category: 'All', searchValue: '', tag: '' }
    })
    await flushPromises()
    expect(wrapper.vm.filteredCourses).toEqual(projects.data)
  })

  it('以 category 篩選', async () => {
    wrapper.setProps({
      filterCourses: {
        category: 'Vue',
        searchValue: '',
        tag: ''
      }
    })
    await flushPromises()
    expect(wrapper.vm.filteredCourses).toEqual([projects.data[0]])
  })

  it('以 searchValue 篩選', async () => {
    wrapper.setProps({
      filterCourses: { category: 'All', searchValue: 'MOUNTAIN', tag: '' }
    })
    await flushPromises()
    expect(wrapper.vm.filteredCourses).toEqual([projects.data[0]])
  })

  it('以 tag 篩選', async () => {
    wrapper.setProps({
      filterCourses: { category: 'All', searchValue: '', tag: '2020 作品直播夏季班' }
    })
    await flushPromises()
    expect(wrapper.vm.filteredCourses).toEqual([projects.data[0]])
  })

  it('綜合條件篩選', async () => {
    wrapper.setProps({
      filterCourses: { category: 'Vue', searchValue: 'MOUNTAIN', tag: '2020 作品直播夏季班' }
    })
    await flushPromises()
    expect(wrapper.vm.filteredCourses).toEqual([projects.data[0]])
  })

  it('第一頁回傳 3 筆作品', () => {
    expect(wrapper.vm.pagedCourses).toHaveLength(3)
  })

  it('當超出頁面範圍時，回傳 0 筆作品', () => {
    wrapper.vm.currentPage = 2
    expect(wrapper.vm.pagedCourses).toHaveLength(0)
  })

  it('當沒有專案時，回傳 0 筆作品', () => {
    wrapper.vm.projects = []
    expect(wrapper.vm.pagedCourses).toHaveLength(0)
  })
})
