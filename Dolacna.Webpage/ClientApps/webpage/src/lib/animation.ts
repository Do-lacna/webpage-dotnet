// This function will initialize animation observers for elements with the reveal-animation class
export function initRevealAnimations(
  threshold = 0.1,
  rootMargin = '0px 0px -100px 0px',
) {
  if (typeof window !== 'undefined') {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        threshold,
        rootMargin,
      },
    );

    // Observe all elements with the reveal-animation class
    const elements = document.querySelectorAll('.reveal-animation');
    elements.forEach((el) => observer.observe(el));

    return () => {
      if (elements) {
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }

  return () => {}; // Return empty cleanup function for SSR
}

// This function adds a class to an element after a delay
export function delayedClass(
  element: HTMLElement,
  className: string,
  delay: number,
) {
  setTimeout(() => {
    element.classList.add(className);
  }, delay);
}

// This function creates a staggered animation effect for multiple elements
export function staggerAnimation(
  elements: NodeListOf<Element> | HTMLElement[],
  className: string,
  baseDelay = 100,
  staggerAmount = 50,
) {
  Array.from(elements).forEach((el, index) => {
    const delay = baseDelay + index * staggerAmount;
    setTimeout(() => {
      el.classList.add(className);
    }, delay);
  });
}
