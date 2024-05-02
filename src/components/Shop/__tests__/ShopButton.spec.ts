import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ImageButtonComponent from '../ShopButton.vue'

describe('ImageButtonComponent', () => {
  it('renders the button with the correct text and image', () => {
    const buttonText = 'Add Coin'
    const wrapper = mount(ImageButtonComponent, {
      props: {
        buttonText
      },
      global: {
        stubs: {
          // This stubs out all <router-link> and <router-view> components used in the app.
          'RouterLink': true,
          'RouterView': true
        }
      }
    })

    const button = wrapper.find('#buttonStyle')
    expect(button.exists()).toBe(true)
    expect(button.text()).toContain('Add Coin')
  })
})
