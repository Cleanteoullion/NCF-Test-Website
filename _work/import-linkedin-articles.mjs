import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();
const LINKEDIN_DIR = join(ROOT, 'ressources', 'Linkedin');
const RESSOURCES_DIR = join(ROOT, 'ressources');
const SITE_URL = 'https://novances-evaluation.fr';
const IMPORT_DATE = '2026-05-15';
const AUTHOR = 'Frédéric Lemonnier';
const AUTHOR_LINKEDIN = 'https://www.linkedin.com/in/flemonniernovances/';

const covers = {
  valorisation: 'https://images.unsplash.com/photo-1583009640887-eafd1a994d30?auto=format&fit=crop&w=1600&q=78',
  crise: 'https://images.unsplash.com/photo-1753164726479-867fa7a7e341?auto=format&fit=crop&w=1600&q=78',
  gouvernance: 'https://images.unsplash.com/photo-1758518727707-b023e285b709?auto=format&fit=crop&w=1600&q=78',
};

const configs = [
  {
    match: 'Clôture 2022',
    slug: 'cloture-2022-tests-depreciation-contexte-economique-degrade',
    theme: 'Dépréciation',
    cover: covers.crise,
    related: [
      ['/ressources/clotures-2020-tests-depreciation-difficultes-entreprises/', 'Tests de dépréciation 2020'],
      ['/ressources/valoriser-entreprise-periode-crise-moment-vendre/', 'Valoriser en période de crise'],
      ['/croissance-externe/', 'Page croissance externe NCF'],
    ],
  },
  {
    match: 'Clôtures 2020',
    slug: 'clotures-2020-tests-depreciation-difficultes-entreprises',
    theme: 'Dépréciation',
    cover: covers.crise,
    related: [
      ['/ressources/cloture-2022-tests-depreciation-contexte-economique-degrade/', 'Tests de dépréciation 2022'],
      ['/ressources/dirigeants-pme-lecon-covid/', 'Dirigeants de PME : la leçon du COVID'],
      ['/partenaires/', 'Travailler avec vos conseils'],
    ],
  },
  {
    match: 'Dette publique',
    slug: 'controles-fiscaux-dirigeants-comment-s-y-preparer',
    theme: 'Fiscalité',
    cover: covers.gouvernance,
    related: [
      ['/ressources/preparer-succession-evaluation-premiere-etape/', 'Transmission familiale'],
      ['/ressources/deposer-marques-brevets-titre-personnel-fausse-bonne-idee/', 'Marques et brevets à titre personnel'],
      ['/partenaires/', 'Travailler avec vos conseils'],
    ],
  },
  {
    match: 'Dirigeants de PME',
    slug: 'dirigeants-pme-lecon-covid',
    theme: 'Crise',
    cover: covers.crise,
    related: [
      ['/ressources/valoriser-entreprise-periode-crise-moment-vendre/', 'Valoriser en période de crise'],
      ['/ressources/clotures-2020-tests-depreciation-difficultes-entreprises/', 'Tests de dépréciation 2020'],
      ['/transmission/', 'Page transmission NCF'],
    ],
  },
  {
    match: 'Déposer des marques',
    slug: 'deposer-marques-brevets-titre-personnel-fausse-bonne-idee',
    theme: 'Fiscalité',
    cover: covers.gouvernance,
    related: [
      ['/ressources/controles-fiscaux-dirigeants-comment-s-y-preparer/', 'Contrôles fiscaux des dirigeants'],
      ['/ressources/preparer-succession-evaluation-premiere-etape/', 'Transmission familiale'],
      ['/partenaires/', 'Travailler avec vos conseils'],
    ],
  },
  {
    match: 'Entrepreneurs, choix du Business Model',
    slug: 'business-model-roce-impact-valorisation',
    theme: 'Valorisation',
    cover: covers.valorisation,
    related: [
      ['/ressources/strategie-axee-valeur/', 'Stratégie axée sur la valeur'],
      ['/ressources/valorisation-fonds-commerce-stop-multiples-chiffre-affaires/', 'Valorisation des fonds de commerce'],
      ['/croissance-externe/', 'Page croissance externe NCF'],
    ],
  },
  {
    match: 'La puissance de la stratégie',
    slug: 'strategie-axee-valeur',
    theme: 'Stratégie',
    cover: covers.valorisation,
    related: [
      ['/ressources/business-model-roce-impact-valorisation/', 'Business model et ROCE'],
      ['/ressources/valorisation-fonds-commerce-stop-multiples-chiffre-affaires/', 'Fonds de commerce'],
      ['/croissance-externe/', 'Page croissance externe NCF'],
    ],
  },
  {
    match: 'Quand l’humain fait réussir',
    slug: 'humain-reussir-echouer-reprise-entreprise',
    theme: 'Reprise d’entreprise',
    cover: covers.gouvernance,
    related: [
      ['/croissance-externe/', 'Page croissance externe NCF'],
      ['/ressources/croissance-externe-evaluation-structuration/', 'Structuration patrimoniale'],
      ['/partenaires/', 'Travailler avec vos conseils'],
    ],
  },
  {
    match: 'Valorisation des fonds de commerce',
    slug: 'valorisation-fonds-commerce-stop-multiples-chiffre-affaires',
    theme: 'Valorisation',
    cover: covers.valorisation,
    related: [
      ['/ressources/business-model-roce-impact-valorisation/', 'Business model et ROCE'],
      ['/ressources/strategie-axee-valeur/', 'Stratégie axée sur la valeur'],
      ['/litiges-entre-associes/', 'Page litiges entre associés NCF'],
    ],
  },
  {
    match: 'Valoriser une entreprise en période de crise',
    slug: 'valoriser-entreprise-periode-crise-moment-vendre',
    theme: 'Crise',
    cover: covers.crise,
    related: [
      ['/ressources/dirigeants-pme-lecon-covid/', 'Dirigeants de PME : la leçon du COVID'],
      ['/ressources/cloture-2022-tests-depreciation-contexte-economique-degrade/', 'Tests de dépréciation 2022'],
      ['/transmission/', 'Page transmission NCF'],
    ],
  },
];

const baseArticles = [
  {
    slug: 'preparer-succession-evaluation-premiere-etape',
    title: "Préparer sa succession d'entreprise : pourquoi l'évaluation est la première étape.",
    theme: 'Transmission',
    readingTime: 6,
    date: '2026-05-06',
    excerpt: "Avant la donation, avant le dispositif d'exonération fiscale, avant le notaire : une valeur opposable qui aligne vos enfants, vos conseils et l'administration sur un même chiffre.",
    feature: true,
    image: 'https://images.unsplash.com/photo-1753164726479-867fa7a7e341?auto=format&fit=crop&w=1600&q=78',
  },
  {
    slug: 'litige-associes-prix-juste-securise',
    title: 'Litige entre associés : comment fixer un prix juste et sécurisé.',
    theme: 'Associés',
    readingTime: 7,
    date: '2026-05-06',
    excerpt: 'Une méthode opposable pour fixer un prix de rachat que toutes les parties acceptent — sans contentieux ni blocage.',
    image: 'https://images.unsplash.com/photo-1758518727707-b023e285b709?auto=format&fit=crop&w=900&q=78',
    className: 'mag-card--litiges',
  },
  {
    slug: 'croissance-externe-evaluation-structuration',
    title: "Croissance externe : le rôle de l'évaluation dans la structuration patrimoniale.",
    theme: 'Croissance',
    readingTime: 8,
    date: '2026-05-06',
    excerpt: "Apport de titres, donation, structure familiale : l'évaluation qui sécurise votre montage face à l'administration.",
    image: 'https://images.unsplash.com/photo-1583009640887-eafd1a994d30?auto=format&fit=crop&w=900&q=78',
    className: 'mag-card--croissance',
  },
];

function decodeEntities(value) {
  return value.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity) => {
    const lower = entity.toLowerCase();
    if (lower === 'lt') return '<';
    if (lower === 'gt') return '>';
    if (lower === 'amp') return '&';
    if (lower === 'quot') return '"';
    if (lower === 'apos' || lower === '#39') return "'";
    if (lower === 'nbsp') return ' ';
    if (lower.startsWith('#x')) return String.fromCodePoint(parseInt(lower.slice(2), 16));
    if (lower.startsWith('#')) return String.fromCodePoint(parseInt(lower.slice(1), 10));
    return match;
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, '&#96;');
}

function compact(value) {
  return String(value).replace(/\s+/g, ' ').trim();
}

function truncate(value, max) {
  const text = compact(value);
  if (text.length <= max) return text;
  const slice = text.slice(0, max - 1);
  const cut = slice.lastIndexOf(' ');
  return `${slice.slice(0, cut > 80 ? cut : max - 1).trim()}…`;
}

function stripTags(value) {
  return compact(decodeEntities(value.replace(/<[^>]+>/g, ' ')));
}

function sanitizeArticleHtml(value) {
  let html = decodeEntities(decodeEntities(value));

  html = html
    .replace(/<figure\b[\s\S]*?<\/figure>/gi, '')
    .replace(/<div\b[^>]*>\s*<img\b[^>]*>\s*<\/div>/gi, '')
    .replace(/<img\b[^>]*>/gi, '')
    .replace(/<figcaption\b[\s\S]*?<\/figcaption>/gi, '');

  html = html.replace(/<\s*(\/?)\s*([a-z0-9]+)\b([^>]*)>/gi, (full, slash, rawTag, attrs) => {
    const tag = rawTag.toLowerCase();
    const allowed = new Set(['p', 'strong', 'em', 'u', 'ul', 'ol', 'li', 'h2', 'h3', 'a', 'br', 'hr']);
    if (!allowed.has(tag)) return '';
    if (tag === 'br' || tag === 'hr') return slash ? '' : `<${tag} />`;
    if (slash) return `</${tag}>`;
    if (tag === 'a') {
      const href = attrs.match(/\bhref=(["'])(.*?)\1/i)?.[2] || '';
      if (!/^https?:\/\//i.test(href)) return '<span>';
      return `<a href="${escapeAttr(href)}" target="_blank" rel="noopener noreferrer">`;
    }
    return `<${tag}>`;
  });

  html = html
    .replace(/<\/span>/gi, '')
    .replace(/<p>\s*(?:<strong>\s*<\/strong>|<em>\s*<\/em>|<u>\s*<\/u>|\s)*<\/p>/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return html;
}

function extractArticle(fileName) {
  const source = readFileSync(join(LINKEDIN_DIR, fileName), 'utf8');
  const match = [...source.matchAll(/"linkedInArticleUrn":"[^"]+"[\s\S]{0,15000}?"title":"((?:\\.|[^"\\])*)"[\s\S]{0,15000}?"contentHtml":"((?:\\.|[^"\\])*)"/g)][0];
  if (!match) throw new Error(`Article content not found in ${fileName}`);

  const title = compact(JSON.parse(`"${match[1]}"`));
  const contentHtml = JSON.parse(`"${match[2]}"`);
  const publishedMs = Number(source.match(/"publishedAt":(\d+)/)?.[1] || Date.parse(IMPORT_DATE));
  let sourceUrl = (source.match(/saved from url=\(\d+\)([^\s>]+)/)?.[1] || '')
    .replace(/%25/g, '%')
    .replace(/&amp;/g, '&');
  try {
    const url = new URL(sourceUrl);
    url.search = '';
    sourceUrl = url.toString();
  } catch {
    // Keep the extracted URL as-is if LinkedIn changes the saved-page format.
  }

  const cfg = configs.find((item) => title.includes(item.match));
  if (!cfg) throw new Error(`Missing config for "${title}"`);

  const bodyHtml = sanitizeArticleHtml(contentHtml);
  const text = stripTags(bodyHtml);
  const description = truncate(text, 155);

  return {
    ...cfg,
    title,
    bodyHtml,
    text,
    excerpt: truncate(text, 210),
    description,
    readingTime: Math.max(2, Math.ceil(text.split(/\s+/).filter(Boolean).length / 220)),
    publishedDate: new Date(publishedMs).toISOString().slice(0, 10),
    publishedLabel: new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(new Date(publishedMs)),
    sourceUrl,
  };
}

function linkedinShareUrl(pathname) {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${SITE_URL}${pathname}`)}`;
}

function buildRelatedLinks(article) {
  return article.related
    .map(([href, label]) => `<a href="${escapeAttr(href)}">${escapeHtml(label)}</a>`)
    .join('');
}

function articlePage(article) {
  const pathName = `/ressources/${article.slug}/`;
  const canonical = `${SITE_URL}${pathName}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Person',
      name: AUTHOR,
      url: AUTHOR_LINKEDIN,
    },
    publisher: {
      '@type': 'Organization',
      name: 'NCF Advisory',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/assets/img/brand/logo-ncf-bl-marine.png`,
      },
    },
    datePublished: article.publishedDate,
    dateModified: IMPORT_DATE,
    mainEntityOfPage: canonical,
    image: article.cover,
    isBasedOn: article.sourceUrl,
  };

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(article.title)} | NCF</title>
  <meta name="description" content="${escapeAttr(article.description)}" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:locale" content="fr_FR" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="NCF Advisory" />
  <meta property="og:title" content="${escapeAttr(article.title)}" />
  <meta property="og:description" content="${escapeAttr(article.description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${escapeAttr(article.cover)}" />
  <meta property="article:author" content="${AUTHOR}" />
  <meta property="article:published_time" content="${article.publishedDate}" />
  <meta property="article:modified_time" content="${IMPORT_DATE}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeAttr(article.title)}" />
  <meta name="twitter:description" content="${escapeAttr(article.description)}" />
  <meta name="twitter:image" content="${escapeAttr(article.cover)}" />
  <meta name="theme-color" content="#1A2E6B" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="manifest" href="/site.webmanifest" />
  <script type="application/ld+json">
  ${JSON.stringify(jsonLd, null, 2)}
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/assets/css/global.css" />
</head>
<body>

<div id="novances-band">
  <div class="nb-inner">
    <span>Membre du <strong>Groupe Novances</strong></span>
    <img src="/assets/img/brand/logo-novances.avif" alt="Groupe Novances" class="nb-logo" />
    <span class="nb-sep nb-sep-md">·</span>
    <span class="nb-tag">La force d'un groupe pluridisciplinaire derrière votre évaluation</span>
  </div>
</div>

<nav id="navbar">
  <div class="nav-inner">
    <a href="/" class="nav-logo" aria-label="NCF — accueil">
      <img src="/assets/img/brand/logo-ncf-bl-marine.png" alt="NCF" />
    </a>
    <div class="nav-links">
      <a href="/transmission/" class="nav-link">Transmission</a>
      <a href="/litiges-entre-associes/" class="nav-link">Litiges entre associés</a>
      <a href="/croissance-externe/" class="nav-link">Croissance externe</a>
      <a href="/ressources/" class="nav-link active" aria-current="page">Ressources</a>
      <a href="/equipe/" class="nav-link">L'équipe</a>
    </div>
    <div class="nav-cta-wrap">
      <a href="/#contact" class="nav-cta">
        Parler à un expert
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </div>
    <button id="hbg" aria-label="Menu" aria-expanded="false">
      <span id="b1"></span><span id="b2"></span><span id="b3"></span>
    </button>
  </div>
</nav>
<div id="mob-menu">
  <a href="/transmission/">Transmission</a>
  <a href="/litiges-entre-associes/">Litiges entre associés</a>
  <a href="/croissance-externe/">Croissance externe</a>
  <a href="/ressources/" aria-current="page">Ressources</a>
  <a href="/equipe/">L'équipe</a>
  <a href="/#contact" class="nav-cta">Parler à un expert</a>
</div>

<main>
  <section class="article-hero">
    <div class="article-wrap">
      <nav class="article-breadcrumb" aria-label="Fil d'Ariane">
        <a href="/">Accueil</a><span>›</span><a href="/ressources/">Ressources</a><span>›</span><span>${escapeHtml(article.theme)}</span>
      </nav>
      <div class="article-tag">${escapeHtml(article.theme)}</div>
      <h1>${escapeHtml(article.title)}</h1>
      <p class="article-standfirst">${escapeHtml(article.excerpt)}</p>
      <div class="article-meta">
        <span>Par <strong>${AUTHOR}</strong></span>
        <span>·</span>
        <span>${article.readingTime} min de lecture</span>
        <span>·</span>
        <span>Publié sur LinkedIn le ${article.publishedLabel}</span>
      </div>
      <div class="article-cover">
        <img src="${escapeAttr(article.cover)}" alt="" loading="eager" decoding="async" />
      </div>
    </div>
  </section>

  <section class="article-body">
    <div class="article-layout">
      <article class="article-content">
        <p class="article-origin-note">Article initialement publié sur LinkedIn par ${AUTHOR}. Le texte ci-dessous est repris sans réécriture.</p>
        <div class="linkedin-article-content">
${article.bodyHtml}
        </div>

        <div class="article-cta">
          <h2>Besoin d'une évaluation indépendante ?</h2>
          <p>NCF accompagne les dirigeants de PME dans les sujets de valorisation, de transmission, de croissance externe et de discussion entre associés.</p>
          <a href="/#contact" class="btn-primary">Parler à un expert <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
        </div>
      </article>

      <aside class="article-aside">
        <div class="article-side-card">
          <div class="article-side-title">Publication</div>
          <p>Publié sur LinkedIn le ${article.publishedLabel}.</p>
          <a href="${escapeAttr(article.sourceUrl)}" target="_blank" rel="noopener noreferrer">Voir l'article original</a>
        </div>
        <div class="article-side-card">
          <div class="article-side-title">Partager</div>
          <a class="article-share-link" href="${escapeAttr(linkedinShareUrl(pathName))}" target="_blank" rel="noopener noreferrer">Partager sur LinkedIn</a>
        </div>
        <div class="article-side-card">
          <div class="article-side-title">À lire aussi</div>
          ${buildRelatedLinks(article)}
        </div>
      </aside>
    </div>
  </section>
</main>

<footer id="footer">
  <div class="footer-inner">
    <div class="footer-top">
      <div class="footer-brand">
        <img src="/assets/img/brand/logo-ncf-bl-marine.png" alt="NCF" />
        <p class="footer-brand-tag">Cabinet d'évaluation d'entreprise pour les dirigeants de PME en préparation de transmission.</p>
        <div class="footer-novances">
          <img src="/assets/img/brand/logo-novances.avif" alt="Groupe Novances" />
          <span>Membre du <strong>Groupe Novances</strong></span>
        </div>
      </div>
      <div><div class="footer-col-title">Cas d'usage</div><div class="footer-links"><a href="/transmission/" class="footer-link">Préparation de transmission</a><a href="/litiges-entre-associes/" class="footer-link">Litiges entre associés</a><a href="/croissance-externe/" class="footer-link">Croissance externe</a></div></div>
      <div><div class="footer-col-title">Cabinet</div><div class="footer-links"><a href="/equipe/" class="footer-link">L'équipe</a><a href="/equipe/#novances" class="footer-link">Groupe Novances</a><a href="/partenaires/" class="footer-link">Partenaires</a></div></div>
      <div><div class="footer-col-title">Ressources</div><div class="footer-links"><a href="/ressources/" class="footer-link">Articles</a><a href="/#contact" class="footer-link">Contact</a><a href="/#contact" class="footer-link">Formulaire de contact</a></div></div>
    </div>
    <div class="footer-bottom"><div class="footer-copy">© 2026 NCF Advisory — Tous droits réservés.</div><div class="footer-legal"><a href="/mentions-legales/">Mentions légales</a><a href="/confidentialite/">Confidentialité</a></div></div>
  </div>
</footer>
<script src="/assets/js/site.js" defer></script>

</body>
</html>
`;
}

function resourcesIndex(importedArticles) {
  const cards = importedArticles
    .slice()
    .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))
    .map((article, index) => {
      const delay = (index % 4) + 1;
      return `      <a href="/ressources/${article.slug}/" class="linkedin-resource-card rv d${delay}">
        <div class="linkedin-resource-meta">${escapeHtml(article.theme)} · ${article.readingTime} min · ${article.publishedLabel}</div>
        <h3>${escapeHtml(article.title)}</h3>
        <p>${escapeHtml(article.excerpt)}</p>
        <span>Lire l'article <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
      </a>`;
    })
    .join('\n');

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ressources — Comprendre l'évaluation d'entreprise · NCF</title>
  <meta name="description" content="Articles pédagogiques pour les dirigeants de PME : transmission, litiges entre associés, croissance externe, valorisation, fiscalité et reprise d'entreprise." />
  <link rel="canonical" href="${SITE_URL}/ressources/" />
  <meta property="og:locale" content="fr_FR" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="NCF Advisory" />
  <meta property="og:title" content="Ressources — Comprendre l'évaluation d'entreprise" />
  <meta property="og:description" content="Articles pédagogiques pour dirigeants de PME : transmission, litiges entre associés, croissance externe et valorisation." />
  <meta property="og:url" content="${SITE_URL}/ressources/" />
  <meta property="og:image" content="${SITE_URL}/assets/img/brand/logo-ncf-bl-marine.png" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Ressources — NCF" />
  <meta name="twitter:description" content="Comprendre l'évaluation d'entreprise, étape par étape." />
  <meta name="theme-color" content="#1A2E6B" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="manifest" href="/site.webmanifest" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/assets/css/global.css" />
  <link rel="stylesheet" href="/assets/css/pages/ressources.css" />
</head>

<body class="ressources-page">

<div id="novances-band">
  <div class="nb-inner">
    <span>Membre du <strong>Groupe Novances</strong></span>
    <img src="/assets/img/brand/logo-novances.avif" alt="Groupe Novances" class="nb-logo" />
    <span class="nb-sep nb-sep-md">·</span>
    <span class="nb-tag">La force d'un groupe pluridisciplinaire derrière votre évaluation</span>
  </div>
</div>

<nav id="navbar">
  <div class="nav-inner">
    <a href="/" class="nav-logo" aria-label="NCF — accueil">
      <img src="/assets/img/brand/logo-ncf-bl-marine.png" alt="NCF" />
    </a>
    <div class="nav-links">
      <a href="/transmission/" class="nav-link">Transmission</a>
      <a href="/litiges-entre-associes/" class="nav-link">Litiges entre associés</a>
      <a href="/croissance-externe/" class="nav-link">Croissance externe</a>
      <a href="/ressources/" class="nav-link active" aria-current="page">Ressources</a>
      <a href="/equipe/" class="nav-link">L'équipe</a>
    </div>
    <div class="nav-cta-wrap">
      <a href="/#contact" class="nav-cta">
        Parler à un expert
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </div>
    <button id="hbg" aria-label="Menu" aria-expanded="false">
      <span id="b1"></span><span id="b2"></span><span id="b3"></span>
    </button>
  </div>
</nav>
<div id="mob-menu">
  <a href="/transmission/">Transmission</a>
  <a href="/litiges-entre-associes/">Litiges entre associés</a>
  <a href="/croissance-externe/">Croissance externe</a>
  <a href="/ressources/" aria-current="page">Ressources</a>
  <a href="/equipe/">L'équipe</a>
  <a href="/#contact" class="nav-cta">Parler à un expert</a>
</div>

<section id="hero-ressources">
  <div class="hero-inner">
    <div class="hero-eyebrow rv">Ressources</div>
    <h1 class="rv d1">Comprendre l'évaluation, <span class="accent">étape par étape.</span></h1>
    <p class="hero-sub rv d2">
      Articles pédagogiques pour les dirigeants qui préparent une décision patrimoniale, une transmission, une opération de croissance externe ou une discussion de valeur.
    </p>
  </div>
</section>

<section class="ressources-list">
  <div class="ressources-magazine">

    <a href="/ressources/${baseArticles[0].slug}/" class="mag-feature rv">
      <img class="mag-feature-bg" src="${escapeAttr(baseArticles[0].image)}" alt="" loading="lazy" decoding="async" />
      <div class="mag-feature-body">
        <div class="bento-tag">${baseArticles[0].theme} · ${baseArticles[0].readingTime} min de lecture</div>
        <h2 class="mag-feature-title">${escapeHtml(baseArticles[0].title)}</h2>
        <p class="mag-feature-excerpt">${escapeHtml(baseArticles[0].excerpt)}</p>
        <span class="mag-feature-link">
          Lire l'article
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </span>
      </div>
    </a>

    <div class="mag-grid">
      ${baseArticles.slice(1).map((article, index) => `<a href="/ressources/${article.slug}/" class="mag-card ${article.className} rv d${index + 1}">
        <div class="mag-card-img">
          <img src="${escapeAttr(article.image)}" alt="" loading="lazy" decoding="async" />
        </div>
        <div class="mag-card-body">
          <div class="bento-tag">${article.theme} · ${article.readingTime} min de lecture</div>
          <h3 class="mag-card-title">${escapeHtml(article.title)}</h3>
          <p class="mag-card-excerpt">${escapeHtml(article.excerpt)}</p>
          <span class="mag-card-link">
            Lire l'article
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
        </div>
      </a>`).join('\n\n      ')}
    </div>

    <div class="linkedin-resources-block">
      <div class="linkedin-resources-head rv">
        <div class="linkedin-resources-kicker">Articles LinkedIn</div>
        <h2>Les publications de Frédéric Lemonnier</h2>
        <p>Une sélection d'articles repris depuis LinkedIn, intégrés ici pour faciliter la lecture, le référencement et le partage.</p>
      </div>
      <div class="linkedin-resource-grid">
${cards}
      </div>
    </div>
  </div>
</section>

<section class="ressources-cta">
  <div class="ressources-cta-inner rv">
    <h2>Une question qui n'est pas couverte ?</h2>
    <p>Vingt minutes pour écouter votre situation, comprendre l'enjeu, et vous dire ce qu'une évaluation NCF peut vous apporter — sans engagement.</p>
    <div class="cta-row">
      <a href="/#contact" class="btn-primary btn-magnetic">
        <span class="btn-content">
          Parler à un expert
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </span>
      </a>
      <a href="/#contact" class="btn-outline btn-magnetic">
        <span class="btn-content">Passer par le formulaire</span>
      </a>
    </div>
  </div>
</section>

<footer id="footer">
  <div class="footer-inner">
    <div class="footer-top">
      <div class="footer-brand">
        <img src="/assets/img/brand/logo-ncf-bl-marine.png" alt="NCF" />
        <p class="footer-brand-tag">Cabinet d'évaluation d'entreprise pour les dirigeants de PME en préparation de transmission.</p>
        <div class="footer-novances">
          <img src="/assets/img/brand/logo-novances.avif" alt="Groupe Novances" />
          <span>Membre du <strong>Groupe Novances</strong></span>
        </div>
      </div>
      <div><div class="footer-col-title">Cas d'usage</div><div class="footer-links"><a href="/transmission/" class="footer-link">Préparation de transmission</a><a href="/litiges-entre-associes/" class="footer-link">Litiges entre associés</a><a href="/croissance-externe/" class="footer-link">Croissance externe</a></div></div>
      <div><div class="footer-col-title">Cabinet</div><div class="footer-links"><a href="/equipe/" class="footer-link">L'équipe</a><a href="/equipe/#novances" class="footer-link">Groupe Novances</a><a href="/partenaires/" class="footer-link">Partenaires</a></div></div>
      <div><div class="footer-col-title">Ressources</div><div class="footer-links"><a href="/ressources/" class="footer-link">Articles</a><a href="/#contact" class="footer-link">Contact</a><a href="/#contact" class="footer-link">Formulaire de contact</a></div></div>
    </div>
    <div class="footer-bottom"><div class="footer-copy">© 2026 NCF Advisory — Tous droits réservés.</div><div class="footer-legal"><a href="/mentions-legales/">Mentions légales</a><a href="/confidentialite/">Confidentialité</a></div></div>
  </div>
</footer>
<script src="/assets/js/site.js" defer></script>

</body>
</html>
`;
}

function sitemap(articles) {
  const staticUrls = [
    ['/', '2026-05-06', '1.0'],
    ['/transmission/', '2026-05-06', '0.9'],
    ['/litiges-entre-associes/', '2026-05-06', '0.9'],
    ['/croissance-externe/', '2026-05-06', '0.9'],
    ['/partenaires/', '2026-05-06', '0.8'],
    ['/equipe/', '2026-05-06', '0.7'],
    ['/ressources/', IMPORT_DATE, '0.8'],
    ['/ressources/preparer-succession-evaluation-premiere-etape/', '2026-05-06', '0.7'],
    ['/ressources/litige-associes-prix-juste-securise/', '2026-05-06', '0.7'],
    ['/ressources/croissance-externe-evaluation-structuration/', '2026-05-06', '0.7'],
    ...articles.map((article) => [`/ressources/${article.slug}/`, IMPORT_DATE, '0.7']),
    ['/mentions-legales/', '2026-05-06', '0.3'],
    ['/confidentialite/', '2026-05-06', '0.3'],
  ];

  const urls = staticUrls
    .map(([pathName, lastmod, priority]) => `  <url>
    <loc>${SITE_URL}${pathName}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function updateRobots() {
  const path = join(ROOT, 'robots.txt');
  let robots = readFileSync(path, 'utf8');
  if (!robots.includes('Disallow: /ressources/Linkedin/')) {
    robots = robots.replace('Disallow: /_work/\n', 'Disallow: /_work/\nDisallow: /ressources/Linkedin/\n');
    writeFileSync(path, robots, 'utf8');
  }
}

const files = readdirSync(LINKEDIN_DIR).filter((file) => file.endsWith('.html'));
const articles = files.map(extractArticle);

for (const article of articles) {
  const dir = join(RESSOURCES_DIR, article.slug);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), articlePage(article), 'utf8');
}

writeFileSync(join(RESSOURCES_DIR, 'index.html'), resourcesIndex(articles), 'utf8');
writeFileSync(join(ROOT, 'sitemap.xml'), sitemap(articles), 'utf8');
updateRobots();

console.log(`Imported ${articles.length} LinkedIn articles.`);
for (const article of articles) {
  console.log(`- /ressources/${article.slug}/`);
}
