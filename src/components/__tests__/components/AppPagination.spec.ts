import { describe, beforeEach, it, expect, vi } from 'vitest'

import { flushPromises, mount, VueWrapper } from '@vue/test-utils'

import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router'

import AppPagination from '@/components/AppPagination.vue'

type AppPaginationInstance = InstanceType<typeof AppPagination>

// router
const router = createRouter({
  history: createWebHistory(),
  routes
})
const push = vi.spyOn(router, 'push')

describe('AppPagination', () => {
  let wrapper: VueWrapper<AppPaginationInstance>

  beforeEach(async () => {
    push.mockClear()

    router.push({ name: 'AppLayout', query: { category: 'HTML' } })
    await router.isReady()

    wrapper = mount(AppPagination, {
      props: {
        projects: Array(30).fill({
          id: '1',
          title: 'Test Project 1',
          name: 'Author 1',
          year: '2021',
          thumbnail_small: '',
          course_tag: 'Vue',
          tags: ['Tag1', 'Tag2'],
          url: 'http://example.com/project1',
          social_github_link: 'http://github.com/project1',
          git_repo: 'http://github.com/repo1',
          social_behance_link: '',
          description: 'Description for project 1'
        }) // 模擬 30 筆資料
      },
      global: {
        plugins: [router]
      }
    })
    await flushPromises()
  })

  it('顯示分頁元件', () => {
    expect(wrapper.find('.pagination-container').exists()).toBe(true)
  })

  it('當點擊分頁時 onClickHandler 觸發 emit 事件', async () => {
    const pagination = wrapper.findAll('.paginate-buttons')
    await pagination[2].trigger('click') // 點擊第二頁
    await flushPromises()

    expect(wrapper.emitted('update:currentPage')).toBeTruthy()
    expect(wrapper.emitted('update:currentPage')?.[0]).toEqual([2])
  })

  it('路由改變時回到第一頁', async () => {
    wrapper.vm.$emit('update:currentPage', 2) // 模擬目前在第 2 頁
    await wrapper.vm.$nextTick()

    // 路由變更
    router.push({ name: 'AppLayout', query: { category: 'JS' } })
    await router.isReady()
    await flushPromises()

    expect(wrapper.vm.currentPage).toBe(1)
  })
})
