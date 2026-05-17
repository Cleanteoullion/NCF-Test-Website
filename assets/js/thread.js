// ═══════════════════════════════════════════════════════════
// Fil directeur — révélation au scroll
// La pointe du tracé est synchronisée à une position fixe du
// viewport (drawingFrontVh). À mesure que la section défile,
// la pointe avance le long du path en suivant la position y
// que franchit visuellement le "front de dessin".
// Conséquence : quand une ancre passe sous le front, le path
// est exactement dessiné jusqu'à elle → le nœud spawne pile
// à ce moment.
// ═══════════════════════════════════════════════════════════
(function () {
  // Position fixe (en % du viewport) où "vit" la pointe du tracé.
  // 0.9 = 90% depuis le haut → presque en bas du viewport. Le fil
  // se dessine "à hauteur de l'œil" du lecteur, et chaque rond
  // spawne dès qu'il entre dans le viewport depuis le bas.
  const DRAWING_FRONT_VH = 0.9;

  function init() {
    const path = document.getElementById('thread-path');
    const tip = document.getElementById('thread-tip');
    if (!path) return;

    // Élément qui sert d'ancre pour le calcul (track SVG) — sinon section
    const track =
      document.querySelector('.parcours-track') ||
      document.querySelector('.thread-spine-wrap') ||
      document.querySelector('.thread-section');
    if (!track) return;

    const pathLength = path.getTotalLength();
    if (!pathLength) return;

    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    // Récupérer les dimensions du viewBox depuis l'attribut SVG
    const svg = path.ownerSVGElement;
    const vb = svg.viewBox.baseVal; // { x, y, width, height }
    const vbHeight = vb && vb.height ? vb.height : 1800;

    // Pré-échantillonner le path pour obtenir un tableau (len → y en viewBox)
    // → permet de retrouver rapidement la length pour un y donné.
    const samples = [];
    const step = 4;
    for (let len = 0; len <= pathLength; len += step) {
      const pt = path.getPointAtLength(len);
      samples.push({ len: len, y: pt.y });
    }
    // Assurer le dernier point
    if (samples[samples.length - 1].len < pathLength) {
      const pt = path.getPointAtLength(pathLength);
      samples.push({ len: pathLength, y: pt.y });
    }

    // Pour chaque nœud, calculer la longueur du path la plus proche de l'ancre
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
        const pt = path.getPointAtLength(s.len);
        for (let j = 0; j < nodes.length; j++) {
          const n = nodes[j];
          const dx = pt.x - n.x;
          const dy = pt.y - n.y;
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

    // Convertit un y viewport en longueur de path à dessiner.
    // Le tracé est dessiné jusqu'au point dont la projection
    // verticale correspond au "front de dessin" sur l'écran.
    function getDrawnLength() {
      const trackRect = track.getBoundingClientRect();
      const wh = window.innerHeight;
      const frontScreenY = wh * DRAWING_FRONT_VH; // ex: 70% du viewport

      // y du front dans l'espace du track
      const yInTrack = frontScreenY - trackRect.top;

      // Conversion track → viewBox (en supposant preserveAspectRatio="meet"
      // qui fait que track et viewBox partagent la même hauteur de rendu)
      // Le rendu SVG a sa hauteur = trackRect.height, donc y_track / height = y_viewBox / vbHeight
      const yInViewBox = (yInTrack / trackRect.height) * vbHeight;

      // Cas limites
      if (yInViewBox <= samples[0].y) return 0;
      if (yInViewBox >= samples[samples.length - 1].y) return pathLength;

      // Recherche binaire de la première sample dont le y >= yInViewBox
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

      // Spawn des nœuds atteints — pile à l'instant où drawnLength
      // dépasse la longueur de l'ancre (qui coïncide avec le moment
      // où le rond entre sous le front de dessin du viewport).
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!n.spawned && drawnLength >= n.thresholdLength) {
          n.element.classList.add('is-spawned');
          n.spawned = true;
          const step = n.element.dataset.step;
          if (step != null) {
            const card = document.querySelector('[data-card-step="' + step + '"]');
            if (card) {
              setTimeout(function () { card.classList.add('is-revealed'); }, 180);
            }
          }
        }
      }
    }

    let ticking = false;
    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            update();
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
