// ═══════════════════════════════════════════════════════════
// Fil directeur — révélation au scroll
//
// La pointe du tracé est synchronisée à une position fixe du
// viewport (front de dessin). À mesure que la section défile,
// la pointe avance le long du path en suivant la position y
// que franchit visuellement ce front.
// Conséquence : quand une ancre passe sous le front, le path
// est exactement dessiné jusqu'à elle → le nœud spawne pile
// à ce moment.
//
// Composant configurable via data-attributes sur .thread-section :
//   data-thread-front="0.9"          (0–1, position viewport du front)
//   data-thread-card-delay="180"     (ms entre spawn nœud et carte)
//   data-thread-sample-step="4"      (résolution échantillonnage path)
//   data-thread-tip="off|follow"     (off : pointe masquée, comportement actuel
//                                     follow : pointe suit le tracé via getPointAtLength)
// ═══════════════════════════════════════════════════════════
(function () {
  function num(value, fallback) {
    const n = parseFloat(value);
    return Number.isFinite(n) ? n : fallback;
  }

  function readConfig(section) {
    const d = section ? section.dataset : {};
    return {
      front: num(d.threadFront, 0.9),
      cardDelay: num(d.threadCardDelay, 180),
      sampleStep: num(d.threadSampleStep, 4),
      tipMode: d.threadTip || 'off',
    };
  }

  function init() {
    const section = document.querySelector('.thread-section');
    const path = document.getElementById('thread-path');
    if (!section || !path) return;

    const cfg = readConfig(section);

    const track =
      document.querySelector('.parcours-track') ||
      document.querySelector('.thread-spine-wrap') ||
      section;
    if (!track) return;

    const pathLength = path.getTotalLength();
    if (!pathLength) return;

    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    const tip = cfg.tipMode === 'follow' ? document.getElementById('thread-tip') : null;
    const tipHalo = cfg.tipMode === 'follow' ? document.getElementById('thread-tip-halo') : null;

    const svg = path.ownerSVGElement;
    const vb = svg.viewBox.baseVal;
    const vbHeight = vb && vb.height ? vb.height : 1800;

    // Pré-échantillonnage du path : (length → point) pour retrouver
    // rapidement la length pour un y viewBox donné, ET la position
    // (x,y) pour un drawnLength donné (utile pour la pointe mobile).
    const samples = [];
    const step = cfg.sampleStep > 0 ? cfg.sampleStep : 4;
    for (let len = 0; len <= pathLength; len += step) {
      const pt = path.getPointAtLength(len);
      samples.push({ len: len, x: pt.x, y: pt.y });
    }
    if (samples[samples.length - 1].len < pathLength) {
      const pt = path.getPointAtLength(pathLength);
      samples.push({ len: pathLength, x: pt.x, y: pt.y });
    }

    // Pour chaque nœud, longueur de path la plus proche de son ancre
    function computeNodeThresholds() {
      const nodes = [];
      document.querySelectorAll('.node-group').forEach((g) => {
        nodes.push({
          element: g,
          x: parseFloat(g.dataset.anchorX),
          y: parseFloat(g.dataset.anchorY),
          threshold: Infinity,
          thresholdLength: 0,
          spawned: false,
        });
      });
      for (let i = 0; i < samples.length; i++) {
        const s = samples[i];
        for (let j = 0; j < nodes.length; j++) {
          const n = nodes[j];
          const dx = s.x - n.x;
          const dy = s.y - n.y;
          const dist = Math.hypot(dx, dy);
          if (dist < n.threshold) {
            n.threshold = dist;
            n.thresholdLength = s.len;
          }
        }
      }
      return nodes;
    }
    const nodes = computeNodeThresholds();

    // Convertit la position du front (en viewport) en longueur de path
    // à dessiner. Le tracé est dessiné jusqu'au point dont la projection
    // verticale correspond au "front de dessin" sur l'écran.
    function getDrawnLength() {
      const trackRect = track.getBoundingClientRect();
      const wh = window.innerHeight;
      const frontScreenY = wh * cfg.front;
      const yInTrack = frontScreenY - trackRect.top;
      // Conversion track → viewBox (preserveAspectRatio="meet" : même hauteur de rendu)
      const yInViewBox = (yInTrack / trackRect.height) * vbHeight;

      if (yInViewBox <= samples[0].y) return 0;
      if (yInViewBox >= samples[samples.length - 1].y) return pathLength;

      let lo = 0;
      let hi = samples.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (samples[mid].y >= yInViewBox) hi = mid;
        else lo = mid + 1;
      }
      return samples[lo].len;
    }

    function update() {
      const drawnLength = getDrawnLength();
      path.style.strokeDashoffset = pathLength - drawnLength;

      // Pointe lumineuse — suit le tracé à la position courante
      if (tip) {
        const drawing = drawnLength > 1 && drawnLength < pathLength - 0.5;
        if (drawing) {
          const pt = path.getPointAtLength(drawnLength);
          tip.setAttribute('cx', pt.x);
          tip.setAttribute('cy', pt.y);
          if (tipHalo) {
            tipHalo.setAttribute('cx', pt.x);
            tipHalo.setAttribute('cy', pt.y);
          }
          if (!tip.classList.contains('is-drawing')) {
            tip.classList.add('is-drawing');
            if (tipHalo) tipHalo.classList.add('is-drawing');
          }
        } else if (tip.classList.contains('is-drawing')) {
          tip.classList.remove('is-drawing');
          if (tipHalo) tipHalo.classList.remove('is-drawing');
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!n.spawned && drawnLength >= n.thresholdLength) {
          n.element.classList.add('is-spawned');
          n.spawned = true;
          const stepIdx = n.element.dataset.step;
          if (stepIdx != null) {
            const card = document.querySelector('[data-card-step="' + stepIdx + '"]');
            if (card) {
              setTimeout(function () { card.classList.add('is-revealed'); }, cfg.cardDelay);
            }
          }
        }
      }
    }

    let ticking = false;
    let inView = true;
    function onScroll() {
      if (!inView || ticking) return;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
      ticking = true;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update, { passive: true });

    // Ne dépenser le rAF que quand la section est dans le viewport.
    // Marges larges pour ne pas couper l'animation en arrivant/sortant.
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            inView = e.isIntersecting;
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
