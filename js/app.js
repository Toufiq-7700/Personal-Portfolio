/**
 * app.js  — Main entry point
 *
 * Responsibilities:
 *  1. Run the splash screen animation
 *  2. After splash, animate the homepage in (nav + hero stagger)
 *  3. Start the profile card floating loop
 *  4. Wire up nav interactions
 */

// ── Homepage entrance animation ──────────────────────────────────
function animateHomepageIn() {
  const { gsap } = window;

  // Unlock body scroll
  document.body.classList.add('ready');

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Nav bar drops in
  tl.to('.nav', {
    opacity: 1,
    y: 0,
    duration: 0.7,
  });

  // Hero left children stagger up
  tl.to('.hero__left > *', {
    opacity: 1,
    y: 0,
    duration: 0.65,
    stagger: 0.12,
  }, '-=0.35');

  // Hero right (profile card) slides in from the right
  tl.to('.hero__right', {
    opacity: 1,
    x: 0,
    duration: 0.8,
    ease: 'power2.out',
  }, '-=0.55');

  // ── Profile card gentle float loop ───────────────────────────
  gsap.to('.profile-card', {
    y: -14,
    duration: 3.2,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    delay: 0.6,
  });
}

// ── Bootstrap ────────────────────────────────────────────────────
window.addEventListener('load', () => {
  // Initialise navigation (smooth scroll + active link)
  if (typeof window.initNav === 'function') {
    window.initNav();
  }

  // Run splash → then animate homepage in
  if (typeof window.runSplash === 'function') {
    window.runSplash(animateHomepageIn);
  } else {
    animateHomepageIn();
  }
});
