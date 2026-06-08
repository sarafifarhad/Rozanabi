document.addEventListener('DOMContentLoaded', () => {
  const ribbon = document.querySelector('#home .home-hero-ribbon--cinematic');
  if (!ribbon) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduceMotion.matches) {
    ribbon.classList.add('is-ready');
    return;
  }

  const play = () => {
    ribbon.classList.remove('is-entrance-done');
    ribbon.classList.add('is-active');
    // force reflow for replay if needed
    void ribbon.offsetWidth;
    ribbon.classList.add('is-entrance-done');
  };

  const pause = () => {
    ribbon.classList.remove('is-active');
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        play();
      } else {
        pause();
      }
    });
  }, { threshold: 0.35 });

  io.observe(ribbon);

  // subtle pointer parallax inside hero, premium not aggressive
  const hero = document.querySelector('#home');
  if (hero) {
    let raf = null;
    let tx = 0, ty = 0;
    const update = () => {
      ribbon.style.setProperty('--ribbon-parallax-x', `${tx}px`);
      ribbon.style.setProperty('--ribbon-parallax-y', `${ty}px`);
      raf = null;
    };
    hero.addEventListener('pointermove', (e) => {
      const rect = hero.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) - 0.5;
      const py = ((e.clientY - rect.top) / rect.height) - 0.5;
      tx = px * 10;
      ty = py * 8;
      if (!raf) raf = requestAnimationFrame(update);
    }, { passive: true });

    hero.addEventListener('pointerleave', () => {
      tx = 0; ty = 0;
      if (!raf) raf = requestAnimationFrame(update);
    }, { passive: true });
  }
});
