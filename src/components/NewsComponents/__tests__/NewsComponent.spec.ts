import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import MyComponent from '@/components/NewsComponents/NewsComponent.vue'; // Adjust the import path according to your setup

// Mocking the global fetch API
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      articles: [
        {
          urlToImage: 'example-image.jpg',
          title: 'Test Title',
          description: 'Test Description',
          url: 'http://example.com'
        }
      ]
    })
  })
);

describe('MyComponent', () => {
  let wrapper;

  beforeEach(() => {
    vi.useFakeTimers(); // Set up fake timers
    vi.spyOn(global, 'setInterval'); // Spy on setInterval

    // Setting up the wrapper before each test
    wrapper = mount(MyComponent);
  });

  afterEach(() => {
    // Clearing all mocks and timers after each test
    vi.clearAllMocks();
    vi.restoreAllMocks(); // Restore original implementations
    vi.runOnlyPendingTimers();
    vi.useRealTimers(); // Use real timers again
  });

  it('fetches news and updates articles data on component mount', async () => {
    await vi.advanceTimersByTime(0); // Fast-forward any timers (like setInterval)
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.articles).toEqual([
      {
        urlToImage: 'example-image.jpg',
        title: 'Test Title',
        description: 'Test Description',
        url: 'http://example.com'
      }
    ]);
  });

  it('sets up an interval to fetch news every 5 minutes', () => {
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 300000);
  });
});
