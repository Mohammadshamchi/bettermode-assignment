import '@testing-library/jest-dom'; 

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.options = options;
  }

  readonly root: Element | null = null;
  readonly rootMargin: string = '0px';
  readonly thresholds: ReadonlyArray<number> = [0];
  private callback: IntersectionObserverCallback;
  private options?: IntersectionObserverInit;

  observe() { return null; }
  unobserve() { return null; }
  disconnect() { return null; }
  takeRecords(): IntersectionObserverEntry[] { return []; }
};

// Mock window.matchMedia
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};
