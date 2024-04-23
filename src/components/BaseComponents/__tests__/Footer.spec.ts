import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FooterComponent from '@/components/BaseComponents/Footer.vue'

describe('FooterComponent', () => {
  it('renders properly and includes the correct copyright notice', () => {
    const wrapper = mount(FooterComponent)
    const footer = wrapper.find('#footer')
    expect(footer.exists()).toBe(true)
    expect(footer.text()).toContain('© 2024 Copyright: Anders Høvik, Andreas Svendsrud, Henrik Dybdal, Henrik Sandok, Jens Aanestad, Victor Kaste, Viktor Grevskott')
  })
})
