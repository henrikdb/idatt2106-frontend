import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ButtonComponent from '@/components/Buttons/Button1.vue'

describe('ButtonComponent', () => {
  it('displays the passed buttonText prop', () => {
    const buttonText = 'Click Me!'
    const wrapper = mount(ButtonComponent, {
      props: {
        buttonText
      }
    })

    const button = wrapper.find('#buttonStyle')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe(buttonText)
  })
})
