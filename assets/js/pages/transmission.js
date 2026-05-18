// ═══════════════════════════════════════════════════════════
// Page transmission — fil conducteur en escalier.
//
// Variante locale du composant fil directeur (thread.js) avec un
// mapping LINÉAIRE entre la progression de scroll dans la piste et
// la longueur de path dessinée. Indispensable ici parce que le tracé
// est un staircase (segments verticaux et horizontaux) : le mapping
// "y-de-viewport → longueur" de thread.js ferait apparaître chaque
// segment horizontal d'un coup quand le front le croise.
//
// Logique de spawn des nœuds identique à thread.js : pour chaque
// nœud, on précalcule la longueur de path la plus proche de l'ancre,
// et on déclenche `.is-spawned` quand drawnLength la franchit.
// ═══════════════════════════════════════════════════════════
(function () {
  function num(v, fallback) {
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : fallback;
  }

  function init() {
    const section = document.getElementById('parcours');
    const path = document.getElementById('thread-path');
    const track = document.querySelector('.parcours-track');
    if (!section || !path || !track) return;

    const front = num(section.dataset.threadFront, 0.78);
    const cardDelay = num(section.dataset.threadCardDelay, 180);
    const sampleStep = 4;

    const pathLength = path.getTotalLength();
    if (!pathLength) return;

    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    // Échantillons (length → x,y) pour retrouver la longueur la plus proche
    // d'une ancre nœud.
    const samples = [];
    for (let len = 0; len <= pathLength; len += sampleStep) {
      const pt = path.getPointAtLength(len);
      samples.push({ len: len, x: pt.x, y: pt.y });
    }
    if (samples[samples.length - 1].len < pathLength) {
      const pt = path.getPointAtLength(pathLength);
      samples.push({ len: pathLength, x: pt.x, y: pt.y });
    }

    const nodes = [];
    document.querySelectorAll('.node-group').forEach((g) => {
      nodes.push({
        element: g,
        x: parseFloat(g.dataset.anchorX),
        y: parseFloat(g.dataset.anchorY),
        thresholdLength: 0,
        thresholdDist: Infinity,
        spawned: false,
      });
    });
    for (let i = 0; i < samples.length; i++) {
      const s = samples[i];
      for (let j = 0; j < nodes.length; j++) {
        const n = nodes[j];
        const d = Math.hypot(s.x - n.x, s.y - n.y);
        if (d < n.thresholdDist) {
          n.thresholdDist = d;
          n.thresholdLength = s.len;
        }
      }
    }

    function getDrawnLength() {
      const r = track.getBoundingClientRect();
      const yInTrack = (window.innerHeight * front) - r.top;
      const progress = yInTrack / r.height;
      if (progress <= 0) return 0;
      if (progress >= 1) return pathLength;
      return progress * pathLength;
    }

    function update() {
      const drawnLength = getDrawnLength();
      path.style.strokeDashoffset = pathLength - drawnLength;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!n.spawned && drawnLength >= n.thresholdLength) {
          n.element.classList.add('is-spawned');
          n.spawned = true;
          const step = n.element.dataset.step;
          if (step != null) {
            const card = document.querySelector('[data-card-step="' + step + '"]');
            if (card) {
              setTimeout(function () { card.classList.add('is-revealed'); }, cardDelay);
            }
          }
        }
      }
    }

    let ticking = false;
    let inView = true;
    function onScroll() {
      if (!inView || ticking) return;
      requestAnimationFrame(function () {
        update();
        ticking = false;
      });
      ticking = true;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update, { passive: true });

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        function (entries) {
          for (let i = 0; i < entries.length; i++) {
            inView = entries[i].isIntersecting;
            if (inView) update();
          }
        },
        { rootMargin: '200px 0px 200px 0px', threshold: 0 }
      );
      io.observe(section);
    }

    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
