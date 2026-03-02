import "@testing-library/jest-dom";

// IntersectionObserver is not available in jsdom - mock it for Row lazy loading tests
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {
    this.callback([{ isIntersecting: true }]);
  }
  disconnect() {}
  unobserve() {}
}
global.IntersectionObserver = MockIntersectionObserver;
