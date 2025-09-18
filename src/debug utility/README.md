# Debug Utility

Kumpulan snippet untuk mendiagnosa overflow horizontal di UI.

## Cara Pakai
1. Buka halaman yang ingin diuji di browser, open DevTools Console.
2. Copy-paste salah satu snippet berikut ke Console lalu Enter.

### 1) overflow-by-width.js
Mendeteksi elemen yang lebarnya melebihi viewport (umum penyebab scroll horizontal).

```js
// Paste isi file ini ke Console
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
```

### 2) overflow-by-edges.js
Mendeteksi elemen yang tepi kiri/kanannya keluar viewport (walau width tidak melebihi viewport), berguna untuk kasus transform/positioning.

```js
// Paste isi file ini ke Console
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
```

## Catatan
- Hasil bisa menunjukkan elemen off-canvas (mis. sidebar tersembunyi dengan `-translate-x-full`). Itu normal bila root sudah di-clip dan tidak menambah scroll.
- Gunakan `min-w-0`, `overflow-x-hidden`/`[overflow-x:clip]`, dan `contain: paint` pada container tertentu jika ditemukan pelanggar.
