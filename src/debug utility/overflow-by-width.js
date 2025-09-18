/* Debug: Detect elements whose width exceeds viewport width */
(function detectOverflowByWidth() {
  try {
    const doc = document.scrollingElement || document.documentElement;
    const pageInfo = { clientWidth: doc.clientWidth, scrollWidth: doc.scrollWidth };
    console.group('[Overflow Debug] By Width');
    console.log('page', pageInfo);

    const offenders = [];
    document.querySelectorAll('body *').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > window.innerWidth + 1) {
        offenders.push({ el, width: Math.round(r.width), class: el.className, id: el.id, tag: el.tagName });
      }
    });

    console.log('overflow elements:', offenders.slice(0, 20));
    if (offenders.length === 0) {
      console.log('No width-based offenders found. Consider running overflow-by-edges.js.');
    }
    console.groupEnd();
    return offenders;
  } catch (e) {
    console.error('[Overflow Debug] error', e);
    return [];
  }
})();
