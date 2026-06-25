const isOverflowDebugEnabled = () => {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).has('debug-overflow');
};

const getElementLabel = (element) => {
  const tag = element.tagName.toLowerCase();
  const id = element.id ? `#${element.id}` : '';
  const className =
    typeof element.className === 'string' && element.className.trim()
      ? `.${element.className.trim().split(/\s+/).slice(0, 5).join('.')}`
      : '';
  return `${tag}${id}${className}`;
};

export function initOverflowDebug() {
  if (!isOverflowDebugEnabled()) return undefined;

  const inspect = () => {
    const viewportWidth = window.innerWidth;
    const documentWidth = document.documentElement.scrollWidth;
    const offenders = Array.from(document.querySelectorAll('body *'))
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          element,
          label: getElementLabel(element),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          scrollWidth: element.scrollWidth,
          clientWidth: element.clientWidth,
        };
      })
      .filter((item) => {
        const crossesViewport = item.left < -1 || item.right > viewportWidth + 1;
        const hasInternalOverflow = item.scrollWidth > item.clientWidth + 1;
        return crossesViewport || hasInternalOverflow;
      })
      .sort((a, b) => Math.max(b.right - viewportWidth, b.scrollWidth - b.clientWidth) - Math.max(a.right - viewportWidth, a.scrollWidth - a.clientWidth))
      .slice(0, 20);

    console.groupCollapsed('[overflow-debug]');
    console.log({
      documentElementScrollWidth: documentWidth,
      bodyScrollWidth: document.body.scrollWidth,
      windowInnerWidth: viewportWidth,
      hasPageOverflow: documentWidth > viewportWidth,
    });
    console.table(
      offenders.map(({ label, left, right, width, scrollWidth, clientWidth }) => ({
        label,
        left,
        right,
        width,
        scrollWidth,
        clientWidth,
        delta: Math.max(right - viewportWidth, scrollWidth - clientWidth),
      })),
    );
    offenders.forEach(({ element }) => {
      element.style.outline = '2px solid #ff2f2f';
      element.style.outlineOffset = '-2px';
    });
    console.groupEnd();
  };

  const timer = window.setTimeout(inspect, 800);
  window.addEventListener('resize', inspect);

  return () => {
    window.clearTimeout(timer);
    window.removeEventListener('resize', inspect);
  };
}
