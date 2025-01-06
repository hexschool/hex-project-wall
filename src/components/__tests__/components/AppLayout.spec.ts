import { describe, vi, beforeEach, it, expect } from 'vitest'

import { mount, flushPromises, VueWrapper } from '@vue/test-utils'

import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router'

import AppLayout from '@/components/AppLayout.vue'

import apis from '@/apis/data'

import category from '@/data/course-category.json'

type Course = {
  id: string
  category: string
}

// router
const router = createRouter({
  history: createWebHistory(),
  routes
})
const push = vi.spyOn(router, 'push')

const tags = {
  Vue: [
    '2020 作品直播夏季班',
    'Vue 出一個電商網站',
    'Vue 3 實戰影音課程',
    '2021 Vue 作品直播夏季班',
    '2022 Vue 作品直播春季班',
    '2022 Vue 作品直播冬季班',
    '2023 Vue 作品直播冬季班'
  ],
  React: ['React 實戰影音課程'],
  HTML: ['2022 網頁切版直播班夏季班', '2023 網頁切版直播班', '2024 網頁切版專題班'],
  Node: ['2023 Node.js 企業專題班', '2024 Node.js 入門班'],
  JS: ['2022 Javascript 工程師養成直播班秋季班', '2023 JS 直播班'],
  Bootstrap: ['精通 Bootstrap 4 - 開發超強不解釋', 'Bootstrap 5 網頁切版整合術'],
  UI: ['UI 設計入門：畫出有程式邏輯的設計稿']
}
const mockApiGetCategories = vi.spyOn(apis, 'apiGetCategories')
mockApiGetCategories.mockResolvedValue(tags)

describe('AppLayout', async () => {
  let wrapper: VueWrapper

  beforeEach(async () => {
    push.mockClear()
    mockApiGetCategories.mockClear()

    router.push({ name: 'AppLayout' })
    await router.isReady()

    wrapper = mount(AppLayout, {
      global: {
        plugins: [router]
      }
    })
    await flushPromises()
  })

  it('AppLayout is visible', () => {
    expect(wrapper.isVisible()).toBe(true)
  })

  it('apiGetCategories 至少會呼叫一次', () => {
    expect(mockApiGetCategories).toHaveBeenCalled()
    // 會呼叫兩次，因為有兩個子路由
  })

  it('路由帶入 category 進入頁面，有觸發 onClickHandler 函式', async () => {
    const mockOnClickHandler = vi.fn()

    router.push({ name: 'AppLayout', query: { category: 'HTML' } })
    await router.isReady()
    await flushPromises()

    mockOnClickHandler(category[2])

    expect(mockOnClickHandler).toHaveBeenCalledWith(category[2])
  })

  it('觸發 onClickHandler 時，更新 courseCategoryList 對應的 category isActive 屬性為 true，其餘為 false', () => {
    let courseCategoryList = [
      { id: '0', category: 'HTML', isActive: false },
      { id: '1', category: 'JS', isActive: false }
    ]
    const course = { id: '0', category: 'HTML' }
    const onClickHandler = (course: Course) => {
      courseCategoryList = courseCategoryList.map((courseCategory) => ({
        ...courseCategory,
        isActive: courseCategory.id === course.id
      }))
    }
    onClickHandler(course)
    expect(courseCategoryList).toEqual([
      { id: '0', category: 'HTML', isActive: true },
      { id: '1', category: 'JS', isActive: false }
    ])
  })

  it('觸發 onClickHandler 時，更新 courseCategoryDetail 的內容', () => {
    let courseCategoryDetail = {}
    const course = { id: '0', category: 'HTML' }

    const onClickHandler = (course: Course) => {
      courseCategoryDetail = { ...course }
    }

    onClickHandler(course)

    expect(courseCategoryDetail).toEqual({ id: '0', category: 'HTML' })
  })

  it('觸發 onClickHandler 時，更新 tags 的內容', async () => {
    const categories: Record<string, string[]> = { HTML: ['tag1', 'tag2'], JS: ['tag3'] }
    let tags: string[] = []
    const course: Course = { id: '0', category: 'HTML' }

    const onClickHandler = (course: Course) => {
      tags = categories[course.category]
    }

    onClickHandler(course)

    expect(tags).toEqual(['tag1', 'tag2'])
  })

  it('觸發 onClickHandler 時，重置搜尋與下拉選項為初始狀態', () => {
    let searchValue = 'something'
    let selectedTag = 'tag1'

    const onClickHandler = () => {
      searchValue = ''
      selectedTag = ''
    }

    onClickHandler()

    expect(searchValue).toBe('')
    expect(selectedTag).toBe('')
  })

  it('觸發 onClickHandler 時，更新路由', () => {
    const replaceMock = vi.fn()
    const mockRouter = { replace: replaceMock }
    const mockRoute = { query: { category: 'HTML' } }

    const course = { id: '0', category: 'HTML' }

    const onClickHandler = (course: Course) => {
      mockRouter.replace({
        query: {
          ...mockRoute.query,
          category: course.category
        }
      })
    }
    onClickHandler(course)

    expect(replaceMock).toHaveBeenCalledWith({
      query: {
        category: 'HTML'
      }
    })
  })
})
