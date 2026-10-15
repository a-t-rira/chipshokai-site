(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const gallery = document.querySelector('.gallery');
  const stage = document.querySelector('.gallery-stage');
  const windowEl = document.querySelector('.gallery-window');
  const track = document.querySelector('#gallery-track');
  const progress = document.querySelector('.gallery-progress span');
  let maxShift = 0;
  let startY = 0;
  let pinDistance = 0;
  let frame = 0;
  const desktop = () => window.matchMedia('(min-width: 801px)').matches && !reduced.matches;

  function measure() {
    if (!gallery || !stage || !track) return;
    if (desktop()) {
      maxShift = Math.max(0, track.scrollWidth - window.innerWidth + parseFloat(getComputedStyle(windowEl).paddingLeft || 0));
      pinDistance = maxShift;
      gallery.style.height = `${stage.offsetHeight + pinDistance}px`;
      startY = gallery.getBoundingClientRect().top + window.scrollY;
    } else {
      maxShift = 0;
      pinDistance = 0;
      gallery.style.height = '';
      track.style.transform = '';
      if (progress) progress.style.transform = 'scaleX(1)';
    }
    update();
  }

  function update() {
    frame = 0;
    if (!desktop() || !pinDistance) return;
    const travelled = Math.min(pinDistance, Math.max(0, window.scrollY - startY));
    const amount = travelled / pinDistance;
    track.style.transform = `translate3d(${-maxShift * amount}px,0,0)`;
    if (progress) progress.style.transform = `scaleX(${Math.max(.14, amount)})`;
  }

  function requestUpdate() {
    if (!frame) frame = window.requestAnimationFrame(update);
  }

  if ('IntersectionObserver' in window && !reduced.matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal, .design-card').forEach((item) => observer.observe(item));
  } else {
    document.querySelectorAll('.reveal, .design-card').forEach((item) => item.classList.add('is-visible'));
  }

  if (gallery) {
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    reduced.addEventListener?.('change', measure);
    if ('ResizeObserver' in window) new ResizeObserver(measure).observe(track);
    window.addEventListener('load', measure, { once: true });
    document.fonts?.ready.then(measure);
    measure();
  }
})();
