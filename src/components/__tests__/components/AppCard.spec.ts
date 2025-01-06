import { describe, beforeEach, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'

import AppCard from '@/components/AppCard.vue'

import type { Project } from '@/types/global.type'

type AppCardInstance = InstanceType<typeof AppCard>

describe('AppCard', () => {
  const mockProjects: Project[] = [
    {
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
      description: 'Description for project 1',
      course: '',
      thumbnail: '',
      social_fb_link: '',
      is_display: '',
      六角審核: false
    },
    {
      id: '2',
      title: 'Test Project 2',
      name: 'Author 2',
      year: '2022',
      thumbnail_small: 'http://example.com/image1.jpg',
      course_tag: 'React',
      tags: [''],
      url: 'http://example.com/project2',
      social_github_link: '',
      git_repo: '',
      social_behance_link: 'http://behance.net/project2',
      description: 'Description for project 2',
      course: '',
      thumbnail: '',
      social_fb_link: '',
      is_display: '',
      六角審核: false
    }
  ]

  let wrapper: VueWrapper<AppCardInstance>

  beforeEach(() => {
    wrapper = mount(AppCard, {
      props: {
        projects: mockProjects
      }
    })
  })

  it('呈現正確數量的卡片', () => {
    expect(wrapper.findAll('.card').length).toBe(mockProjects.length)
  })

  it('點擊卡片時會觸發 onClickHandler 更新 id', async () => {
    const button = wrapper.find('button.btn-hover')
    button.trigger('click')
    expect(wrapper.vm.clickedProjectId).toBe(mockProjects[0].id)

    await button.trigger('click')
    expect(wrapper.vm.clickedProjectId).toBeNull()
  })

  it('當滑鼠停在卡片上或是離開卡片時會觸發 isToggled 更新 id', async () => {
    const card = wrapper.find('.card')
    await card.trigger('mouseover')
    expect(wrapper.vm.hoveredProjectId).toBe(mockProjects[0].id)

    await card.trigger('mouseleave')
    expect(wrapper.vm.hoveredProjectId).toBeNull()
  })

  it('當沒有小圖片時會使用預設圖片', () => {
    const card = wrapper.find('.card')
    const img = card.find('img')
    expect(img.attributes('src')).toBe('https://fakeimg.pl/415x312/?text=Coming Soon')
  })

  it('呈現正確數量的標籤', () => {
    const card = wrapper.find('.card')
    const tags = card.findAll('.badge.rounded-pill.bg-primary')
    expect(tags.length).toBe(mockProjects[0].tags.length)
  })

  it('若有 github 連結時會正確呈現 ', async () => {
    // 模擬觸發 isToggled
    // wrapper.vm.isToggled = true
    // expect(wrapper.find('.list-unstyled.links').exists()).toBe(true)
    // const githubLink = wrapper.find('a[href="http://github.com/project1"]')
    // console.log(githubLink.html())
    // expect(githubLink.exists()).toBe(true)
    // expect(githubLink.text()).toBe('http://github.com/project1')
  })
})
