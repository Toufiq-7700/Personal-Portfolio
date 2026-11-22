/**
 * splash.js
 * Handles the intro splash animation using GSAP.
 */

function runSplash(onComplete) {
  const { gsap } = window;

  const splash = document.getElementById('splash');
  if (!splash) return;

  const label = splash.querySelector('.splash__label');
  const name = splash.querySelector('.splash__name');

  // ── 1. Animate label + name in ──────────────────────────────
  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
  });

  tl
    .to(label, { opacity: 1, y: 0, duration: 0.45, delay: 0.1 })
    .to(name, { opacity: 1, y: 0, duration: 0.55 }, '-=0.25');

  // ── 2. Short hold, then slide the whole splash UP ────────────
  tl.to(splash, {
    yPercent: -100,
    duration: 0.75,
    ease: 'power4.inOut',
    delay: 0.5,           // short pause on name before exit
    onComplete: () => {
      splash.style.display = 'none';
      if (typeof onComplete === 'function') {
        onComplete();
      }
    },
  });
}

window.runSplash = runSplash;
