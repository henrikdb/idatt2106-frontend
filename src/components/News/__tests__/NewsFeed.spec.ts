import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from '../NewsFeed.vue' // Adjust the import path according to your setup

global.fetch = vi.fn(() =>
  Promise.resolve(
    new Response(
      JSON.stringify({
        articles: [
          {
            urlToImage: 'example-image.jpg',
            title: 'Test Title',
            description: 'Test Description',
            url: 'http://example.com'
          }
        ]
      })
    )
  )
)

describe('MyComponent', () => {
  let wrapper: any

  beforeEach(() => {
    vi.useFakeTimers() // Set up fake timers
    vi.spyOn(global, 'setInterval') // Spy on setInterval

    // Setting up the wrapper before each test
    wrapper = mount(MyComponent)
  })

  afterEach(() => {
    // Clearing all mocks and timers after each test
    vi.clearAllMocks()
    vi.restoreAllMocks() // Restore original implementations
    vi.runOnlyPendingTimers()
    vi.useRealTimers() // Use real timers again
  })

  it('sets up an interval to fetch news every 5 minutes', () => {
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 300000)
  })
})
