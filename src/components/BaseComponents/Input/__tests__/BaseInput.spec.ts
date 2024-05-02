import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils';
import InputField from '../BaseInput.vue';

describe('InputField.vue', () => {
  it('emits inputChangeEvent when input event is triggered', async () => {
    const wrapper = mount(InputField, {
      props: {
        label: 'Test Label',
        inputId: 'testId',
        modelValue: ''
      }
    });

    const input = wrapper.find('input');
    await input.setValue('Test Value');
    
    expect(wrapper.emitted().inputChangeEvent).toBeTruthy();
    expect(wrapper.emitted().inputChangeEvent[0]).toEqual(['Test Value']);
  });
});
