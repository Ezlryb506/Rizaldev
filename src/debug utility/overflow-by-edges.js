/* Debug: Detect elements whose edges overflow viewport (left/right), even if width doesn't exceed viewport */
(function detectOverflowByEdges() {
  try {
    const offenders = [];
    document.querySelectorAll('body *').forEach((el) => {
      const r = el.getBoundingClientRect();
      const rightOverflow = r.right - window.innerWidth;
      const leftOverflow = -r.left;
      if (rightOverflow > 1 || leftOverflow > 1) {
        offenders.push({
          el,
          rightOverflow: Math.round(rightOverflow),
          leftOverflow: Math.round(leftOverflow),
          width: Math.round(r.width),
          class: el.className,
          id: el.id,
          tag: el.tagName,
        });
      }
    });
    console.group('[Overflow Debug] By Edges');
    console.log('overflow edges:', offenders.slice(0, 20));
    console.groupEnd();
    return offenders;
  } catch (e) {
    console.error('[Overflow Debug] error', e);
    return [];
  }
})();
