import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'

import App from '@/App.vue'

describe('App', () => {
  const wrapper = mount(App, {
    global: {
      stubs: ['RouterView']
    }
  })

  it('App is visible', () => {
    expect(wrapper.isVisible()).toBe(true)
  })

  it('包含 RouterView 元件', () => {
    const routerView = wrapper.findComponent({ name: 'RouterView' })
    expect(routerView.exists()).toBe(true)
  })
})
